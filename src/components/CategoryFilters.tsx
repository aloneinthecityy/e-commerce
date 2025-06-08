import { client } from "@/lib/sanity";
import Link from "next/link";
import { Button } from "./ui/button";

interface Category {
  _id: string;
  name: string;
}

// Função para buscar as categorias do Sanity
async function getCategories() {
  const query = `*[_type == "category"]{
    _id,
    name
  }`;
  const data = await client.fetch(query);
  return data;
}

export async function CategoryFilters() {
  const categories: Category[] = await getCategories();

  // console.log("CATEGORIAS RECEBIDAS DO SANITY:", categories);


  return (
    <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
      <Button asChild variant="secondary">
        <Link href="/">Todos</Link>
      </Button>
      {categories.map((category) => (
        <Button asChild key={category._id} variant="secondary">
          <Link href={`/?category=${category.name}`}>{category.name}</Link>
        </Button>
      ))}
    </div>
  );
}