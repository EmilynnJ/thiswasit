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
    const { productId } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!productId) {
        return new NextResponse('Bad Request: Missing productId', { status: 400 });
    }

    // In a real app, you'd fetch the product from your database
    // For now, we'll use a mock product lookup
    const product = await prisma.product.findUnique({ where: { id: productId }});

    if (!product) {
        return new NextResponse('Product not found', { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [{
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.name,
                description: product.description || undefined,
                images: product.imageUrl ? [product.imageUrl] : [],
            },
            unit_amount: Math.round(product.price * 100), // Amount in cents
        },
        quantity: 1,
    }];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop?canceled=true`,
      metadata: {
        userId: userId,
        productId: product.id,
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('[PRODUCT_PURCHASE_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
