import { client } from '@/lib/sanity';
import Image from 'next/image';
import { AddToCartButton } from '@/components/AddToCartButton';

// A interface para os dados do produto
interface Product {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

// A função para buscar os dados do Sanity (sem alterações)
async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id,
    name,
    description,
    "imageUrl": images[0].asset->url,
    price
  }`;
  
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

// 1. Defina o tipo para os props da página, com `params` como uma Promise.
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage(props: ProductPageProps) {
  // 2. Use `await` para resolver a Promise e obter o objeto de parâmetros.
  const { slug } = await props.params;

  const productData: Product = await getProduct(slug);

  if (!productData) {
    return <div>Produto não encontrado!</div>;
  }

  const productForCart = {
    id: productData._id,
    name: productData.name,
    price: productData.price,
    imageUrl: productData.imageUrl,
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={productData.imageUrl}
            alt={productData.name}
            width={500}
            height={500}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{productData.name}</h1>
          <p className="text-2xl text-gray-800 mb-6">R$ {productData.price.toFixed(2)}</p>
          <p className="text-gray-600 leading-relaxed">{productData.description}</p>
          <AddToCartButton product={productForCart} />
        </div>
      </div>
    </main>
  );
}