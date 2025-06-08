'use client'; 

import { useCartStore, CartItem } from '@/store/cartStore';
import { toast } from 'sonner'; // 1. Importe o 'toast'

interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    // 2. Substitua o alert pela chamada do toast
    toast.success(`${product.name} foi adicionado ao carrinho!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-8 w-full bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
    >
      Adicionar ao Carrinho
    </button>
  );
}