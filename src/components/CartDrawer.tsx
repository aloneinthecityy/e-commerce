"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore, CartItem } from "@/store/cartStore";
import Image from "next/image";
import { createCheckoutSession } from "@/actions/checkout"; // 1. Importe a Server Action
import { useTransition } from "react"; // 2. Importe o hook useTransition

// Este é o componente para um único item dentro do carrinho.
// É uma boa prática separar componentes menores.
function CartItemCard({ item }: { item: CartItem }) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  // 1. Puxe as novas actions da store
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b">
      <div className="flex items-center gap-4">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={60}
          height={60}
          className="rounded-md object-cover"
        />
        <div>
          <p className="font-semibold">{item.name}</p>
          {/* 2. Mostre o preço total do item (preço * quantidade) */}
          <p className="text-lg font-bold">
            R$ {(item.price * item.quantity).toFixed(2)}
          </p>
          {/* 3. Adicione o controle de quantidade */}
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => decreaseQuantity(item.id)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => increaseQuantity(item.id)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="self-start" // Alinha o botão X ao topo
        onClick={() => removeFromCart(item.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    startTransition(async () => {
      try {
        await createCheckoutSession(items);
      } catch (error) {
        // Opcional: Mostrar uma notificação de erro com Sonner
        console.error("Erro ao criar sessão de checkout:", error);
      }
    });
  };
  // Truque para evitar erro de hidratação com Zustand + Next.js SSR
  // Garante que o componente só renderize no cliente.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!isMounted) {
    return null; // Não renderiza nada no servidor
  }

  return (
    <Sheet>
      {/* O GATILHO: O ícone do carrinho que fica visível na página */}
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      {/* O CONTEÚDO: O painel que desliza da direita */}
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Seu Carrinho ({totalItems})</SheetTitle>
        </SheetHeader>

        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4">
              {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </ScrollArea>

            {/* RODAPÉ COM TOTAL E BOTÃO DE CHECKOUT */}
            <SheetFooter className="mt-4">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isPending} // 4. Desabilite o botão enquanto a ação está em andamento
                >
                  {isPending ? "Processando..." : "Finalizar Compra"}
                </Button>{" "}
              </div>
            </SheetFooter>
          </>
        ) : (
          // MENSAGEM DE CARRINHO VAZIO
          <div className="flex-grow flex flex-col items-center justify-center gap-4">
            <ShoppingCart className="h-16 w-16 text-gray-300" />
            <p className="text-gray-500">Seu carrinho está vazio.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
