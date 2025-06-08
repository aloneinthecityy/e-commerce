import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // O ideal é mostrar um número de skeletons que preencha a tela inicial. 8 é um bom começo.
  const skeletonItems = Array.from({ length: 1 });

  return (
    <div className="container mx-auto p-4">
      {/* Skeleton para o título da página */}
      <Skeleton className="h-8 w-64 mb-6" />

      {/* Grid para os skeletons dos produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skeletonItems.map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            {/* Skeleton para a imagem do produto */}
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="space-y-2 p-4">
              {/* Skeleton para o nome do produto */}
              <Skeleton className="h-4 w-4/5" />
              {/* Skeleton para o preço */}
              <Skeleton className="h-4 w-2/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}