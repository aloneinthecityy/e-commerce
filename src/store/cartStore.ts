import { create } from "zustand";
import { persist } from "zustand/middleware";

// Definindo os tipos para os itens do carrinho e o estado da store
// Isso é ótimo para a segurança de tipos e autocompletar do TypeScript.
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

// Criando a nossa store com Zustand
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [], // Estado inicial: o carrinho começa vazio

      // Ação para limpar o carrinho
      clearCart: () => set({ items: [] }),

      // Ação para remover um item específico
      removeFromCart: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),

      // Ação para adicionar um item ao carrinho
      addToCart: (newItem) =>
        set((state) => {
          const itemExists = state.items.find((item) => item.id === newItem.id);

          if (itemExists) {
            // Se o item existe, criamos um NOVO array usando map.
            // Para o item que corresponde ao ID, criamos um NOVO objeto com a quantidade atualizada.
            // Para todos os outros itens, nós os mantemos como estão.
            const updatedItems = state.items.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return { items: updatedItems };
          } else {
            // Se é um item novo, criamos um novo array com o item antigo e o novo.
            return { items: [...state.items, { ...newItem, quantity: 1 }] };
          }
        }),
    }),
    {
      name: "cart-storage", // Nome da chave que será usada no localStorage
    }
  )
);
