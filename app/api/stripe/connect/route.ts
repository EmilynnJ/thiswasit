import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { readerProfile: true },
    });

    if (!user || user.role !== 'READER' || !user.readerProfile) {
      return new NextResponse('Forbidden: User is not a reader', { status: 403 });
    }

    let stripeAccountId = user.readerProfile.stripeAccountId;

    // Create a new Stripe Connect account if one doesn't exist
    if (!stripeAccountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'US',
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_type: 'individual',
      });
      stripeAccountId = account.id;

      // Save the Stripe Account ID to the reader's profile
      await prisma.reader.update({
        where: { id: user.readerProfile.id },
        data: { stripeAccountId: stripeAccountId },
      });
    }

    // Create an account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/reader-dashboard/payouts`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/reader-dashboard/payouts/return?account_id=${stripeAccountId}`,
      type: 'account_onboarding',
    });

    return NextResponse.json({ url: accountLink.url });

  } catch (error) {
    console.error('[STRIPE_CONNECT_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
