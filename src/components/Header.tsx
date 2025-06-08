import Link from 'next/link';
import { CartDrawer } from './CartDrawer';
import { SearchBar } from './SearchBar'; // 1. Importe o componente

export function Header() {
  return (
    <header className="sticky flex justify-center items-center top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo/Nome da Loja */}
        <Link href="/" className="text-xl font-bold mr-4">
          Modern Threads
        </Link>

        {/* Barra de Pesquisa (Centralizada) */}
        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>

        {/* Ícone do Carrinho */}
        <CartDrawer />
      </div>
    </header>
  );
}