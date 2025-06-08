// src/components/AddToCartButton.tsx

'use client'; // <-- Isso é ESSENCIAL! Marca este como um Client Component.

import { useCartStore, CartItem } from '@/store/cartStore'; // Importamos nossa store e o tipo

// O componente receberá os dados do produto como uma prop
interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  // Usamos o hook para acessar a função addToCart da nossa store
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    // Opcional: Mostrar uma notificação/alerta de que o item foi adicionado!
    alert(`${product.name} foi adicionado ao carrinho!`);
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