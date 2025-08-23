import ImageCard from "@/components/image-card";
import ProductCard from "@/components/product-card";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dataService } from "@/lib/data-fetching";

export async function generateStaticParams() {
  const collections = await dataService.categoryRepo.getAllCollections();
  return collections.map((group) => ({
    slug: group.name.replace(/\s+/g, "-").toLowerCase(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const packageCollection = await dataService.categoryRepo.getCollectionBySlug(slug);

  if (!packageCollection) return notFound();

  return (
    <>
      {packageCollection.subGroups && packageCollection.subGroups.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {packageCollection.subGroups.map((group, index) => (
            <li key={index}>
              <Link
                href={`/packages/${encodeURIComponent(
                  group.name.toLowerCase().replace(/\W+/g, "-")
                )}`}
                key={index}
              >
                <ImageCard title={group.name} imageUrl={group.imageUrl} />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {packageCollection.packages && packageCollection.packages.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {packageCollection.packages.map((product, index) => (
            <li key={index}>
              <Link
                href={`/package/${encodeURIComponent(
                  product.title.toLowerCase().replace(/\W+/g, '-')
                )}`}
                key={index}
              >
                <ProductCard
                  name={product.title}
                  alt={product.title}
                  category={product.duration}
                  price={product.price}
                  imgUrl={product.imageUrl}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}