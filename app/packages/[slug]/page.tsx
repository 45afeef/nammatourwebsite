import BannerCard from "@/components/banner-card";
import ImageCard from "@/components/image-card";
import ProductCard from "@/components/product-card";
import Link from "next/link";
import { PackageRepository } from "@/lib/data-fetching/repositories/package-repository";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const repo = new PackageRepository();
  const packageCollection = await repo.getCollectionBySlug(slug);

  if (!packageCollection) return notFound();

  return (
    <div className="container max-w-11/12 mx-auto my-16">
      <BannerCard
        imageUrl="/images/bg-1.webp"
        title={packageCollection.name}
        subtitle="Explore our exclusive tour services"
      />

      {packageCollection.subGroups && packageCollection.subGroups.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {packageCollection.subGroups.map((group, index) => (
            <li key={index}>
              <Link
                href={`/packages/${encodeURIComponent(
                  group.name.toLowerCase().replace(/ /g, "-")
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
                  product.title.toLowerCase().replace(/ /g, "-")
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
    </div>
  );
}