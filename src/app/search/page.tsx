import { client } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";

// A interface do produto que já conhecemos
interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  imageUrl: string;
  price: number;
}

// Nova função para buscar produtos com base em uma query
async function searchProducts(query: string) {
  // A query GROQ usa o operador 'match' para buscar textos.
  // O '*' no final funciona como um curinga (wildcard).
  const sanityQuery = `*[_type == "product" && name match "${query}*"]{
    _id,
    name,
    slug,
    "imageUrl": images[0].asset->url,
    price
  }`;

  const data = await client.fetch(sanityQuery);
  return data;
}

// Props da página que incluem os searchParams da URL
interface SearchPageProps {
  searchParams: Promise<{ q: string }>;
}

export default async function SearchPage(props: SearchPageProps) {
  const { q: query } = await props.searchParams;
  const products: Product[] = await searchProducts(query);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Resultados para: <span className="text-primary">{query}</span>
      </h1>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <Link href={`/product/${product.slug.current}`} key={product._id} className="group">
              <div className="border rounded-lg overflow-hidden">
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
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">Nenhum produto encontrado.</p>
          <Link href="/" className="mt-4 inline-block text-primary hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      )}
    </main>
  );
}