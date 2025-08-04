import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const { userId, amount } = session.metadata || {};

  if (event.type === 'checkout.session.completed') {
    if (!userId || !amount) {
      return new NextResponse('Webhook Error: Missing metadata', { status: 400 });
    }

    try {
      // Find user by internal ID
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return new NextResponse('Webhook Error: User not found', { status: 404 });
      }

      // Update user balance
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          balance: {
            increment: parseFloat(amount),
          },
        },
      });

      // Create a transaction record
      await prisma.transaction.create({
          data: {
              userId: userId,
              type: 'ADD_FUNDS',
              amount: parseFloat(amount),
              description: `Added funds to wallet. New balance: ${updatedUser.balance}`,
              stripeChargeId: typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
          }
      });

    } catch (error) {
      console.error('Error updating balance from webhook:', error);
      return new NextResponse('Webhook database error', { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
