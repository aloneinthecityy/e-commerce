'use server';

import { CartItem } from "@/store/cartStore";
import { redirect } from "next/navigation";
import Stripe from 'stripe'; // 1. Importe o Stripe no topo do arquivo

// 2. Crie uma nova instância do Stripe aqui
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(items: CartItem[]) {
  // 3. O resto da sua função continua EXATAMENTE o mesmo
  const line_items = items.map(item => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.imageUrl],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: line_items,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
  });

  if (session.url) {
    redirect(session.url);
  }
}