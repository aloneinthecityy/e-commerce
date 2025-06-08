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

// A função para buscar os dados do Sanity
async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id,
    name,
    description,
    "imageUrl": images[0].asset->url,
    price
  }`;
  
  // A opção de cache está correta para garantir dados frescos
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

// A MÁGICA ESTÁ AQUI NA ASSINATURA DA FUNÇÃO
export default async function ProductPage(props: { params: { slug: string } }) {
  // Aguarde props.params antes de acessar slug
  const params = await props.params;
  const { slug } = params;

  // Agora a variável 'slug' já está disponível diretamente!
  const productData: Product = await getProduct(slug);

  // Tratamento de erro caso o produto não seja encontrado
  if (!productData) {
    return <div>Produto não encontrado!</div>;
  }

  // Prepara os dados para o botão do carrinho
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