import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { amount, description } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!amount || amount <= 0) {
        return new NextResponse('Bad Request: Invalid amount', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
        return new NextResponse('User not found', { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [{
        price_data: {
            currency: 'usd',
            product_data: {
                name: description || 'Add funds to wallet',
            },
            unit_amount: Math.round(amount * 100), // Amount in cents
        },
        quantity: 1,
    }];


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/wallet?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/wallet?canceled=true`,
      metadata: {
        userId: user.id, // Pass internal user ID
        clerkUserId: userId, // Pass Clerk user ID
        amount: amount,
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('[ADD_FUNDS_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
