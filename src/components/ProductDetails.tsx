import { client } from '@/lib/sanity';
import Image from 'next/image';
import { AddToCartButton } from '@/components/AddToCartButton';

// A função de buscar dados agora vive aqui
async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id, name, description, "imageUrl": images[0].asset->url, price
  }`;
  
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

// Este é o nosso novo componente async
export async function ProductDetails({ slug }: { slug: string }) {
  const productData = await getProduct(slug);

  if (!productData) {
    return <div>Produto não encontrado!</div>;
  }

  const productForCart = {
    id: productData._id,
    name: productData.name,
    price: productData.price,
    imageUrl: productData.imageUrl,
  };

  // O JSX que antes estava na página agora está aqui
  return (
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
  );
}