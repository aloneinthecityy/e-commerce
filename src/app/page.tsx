// app/page.tsx
import { client } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";

// Tipo para nosso produto, para garantir que os dados estejam corretos
interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  images: any[]; // Simplificando por agora
  price: number;
}

// A função para buscar os dados
async function getProducts() {
  // GROQ é a linguagem de query do Sanity. É como SQL ou GraphQL.
  // '*' significa "todos os documentos"
  // '[_type == "product"]' filtra para pegar apenas os do tipo produto.
  const query = `*[_type == "product"]{
    _id,
    name,
    slug,
    "imageUrl": images[0].asset->url, // Pega a URL da primeira imagem
    price
  }`;

  const data = await client.fetch(query);
  return data;
}

// Esta é uma Server Component!
// A palavra-chave 'async' permite que usemos 'await' para buscar dados
// diretamente no componente, antes de enviar a página para o navegador.
export default async function HomePage() {
  const products: Product[] = await getProducts();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Nossos Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product.slug.current}`} key={product._id} className="group">
            <div className="border rounded-lg overflow-hidden">
              {/* Next.js Image otimiza a imagem para nós! */}
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 mt-2">US$ {product.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}