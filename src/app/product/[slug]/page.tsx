// app/produto/[slug]/page.tsx
import { client } from "@/lib/sanity";
import Image from "next/image";

interface Product {
  name: string;
  description: string;
  images: any[];
  price: number;
}

async function getProduct(slug: string) {
  // Query para buscar um ÚNICO produto baseado no seu slug
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    name,
    description,
    "imageUrl": images[0].asset->url,
    price
  }`;

  const data = await client.fetch(query);
  return data;
}

// A feature que impressiona: Generate Static Params
// Isso diz ao Next.js: "vá ao Sanity, pegue todos os slugs de produtos
// e gere uma página HTML para cada um deles durante a build".
// O resultado é um site ultra-rápido.
export async function generateStaticParams() {
  const query = `*[_type == "product"]{ "slug": slug.current }`;
  const slugs: { slug: string }[] = await client.fetch(query);
  
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product: Product = await getProduct(params.slug);

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-gray-800 mb-6">US$ {product.price.toFixed(2)}</p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <button className="mt-8 bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </main>
  );
}