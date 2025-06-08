'use server'; 

import { CartItem } from "@/store/cartStore";
import { redirect } from "next/navigation";

// Inicializa o Stripe com a chave secreta do servidor
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(items: CartItem[]) {
  // 1. Mapear os itens do nosso carrinho para o formato que o Stripe espera
  const line_items = items.map(item => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.imageUrl],
        },
        unit_amount: Math.round(item.price * 100), // Preço em centavos
      },
      quantity: item.quantity,
    };
  });

  // 2. Definir as URLs de sucesso e cancelamento
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: line_items,
    mode: 'payment',
    // IMPORTANTE: Use variáveis de ambiente para a URL base em produção
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
  });

  // 3. Redirecionar o usuário para a URL de checkout do Stripe
  if (session.url) {
    redirect(session.url);
  }
}