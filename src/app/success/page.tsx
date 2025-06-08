import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="container mx-auto text-center py-16">
      <h1 className="text-4xl font-bold text-green-600">Pagamento Realizado com Sucesso!</h1>
      <p className="mt-4 text-lg">Obrigado por comprar na Modern Threads.</p>
      <Link href="/" className="mt-8 inline-block bg-black text-white py-2 px-6 rounded">
        Voltar para a Loja
      </Link>
    </div>
  );
}