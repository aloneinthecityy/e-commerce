import { client } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { CategoryFilters } from "@/components/CategoryFilters"; // Importe o novo componente

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

// Função de busca de produtos agora aceita um filtro de categoria opcional
async function getProducts(category: string | null) {
  let query = `*[_type == "product"`;

  // Se uma categoria foi fornecida, adiciona o filtro à query
  if (category) {
    query += ` && category->name == "${category}"`;
  }
  
  query += `]{
    _id,
    name,
    slug,
    "imageUrl": images[0].asset->url,
    price
  }`;

  const data = await client.fetch(query);
  return data;
}

// A página agora recebe 'searchParams'
interface HomePageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // Aguarde a resolução de searchParams antes de acessar suas propriedades
  const { category } = await searchParams; 
  
  const products: Product[] = await getProducts(category || null);
  
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Nossos Produtos</h1>
      
      <CategoryFilters />
      
      {/* O resto do seu JSX continua exatamente o mesmo */}
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
          <p className="text-lg text-gray-500">Nenhum produto encontrado nesta categoria.</p>
        </div>
      )}
    </main>
  );
}