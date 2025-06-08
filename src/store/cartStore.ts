import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 1. Importar o middleware 'persist'

// 2. Adicionar 'quantity' à nossa interface de item
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// 3. Adicionar as novas funções à interface do estado
interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
}

// 4. Envolver nossa store com o middleware 'persist'
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      
      // 5. Lógica de addToCart atualizada
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            // Se o item já existe, apenas aumenta a quantidade
            const updatedItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return { items: updatedItems };
          } else {
            // Se é um novo item, adiciona ao carrinho com quantidade 1
            const updatedItems = [...state.items, { ...product, quantity: 1 }];
            return { items: updatedItems };
          }
        }),

      removeFromCart: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
        
      // 6. Lógica para aumentar a quantidade
      increaseQuantity: (itemId) => 
        set((state) => ({
          items: state.items.map((item) => 
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      // 7. Lógica para diminuir a quantidade
      decreaseQuantity: (itemId) =>
        set((state) => ({
          items: state.items.map((item) => 
            item.id === itemId 
              ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
              : item
          ),
        })),
    }),
    {
      name: 'cart-storage', // Nome da chave que será usada no localStorage
    }
  )
);