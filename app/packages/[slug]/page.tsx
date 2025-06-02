import BannerCard from "@/components/banner-card";
import ImageCard from "@/components/image-card";
import ProductCard from "@/components/product-card";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const packageCollectionsList = [
    {
      "name": "Group Tour Packages",
      "imageUrl": "",
      "packages": [
        {
          "title": "Affordable Group Tour Package to Wayanad - 1 Day",
          "duration": "1 Day",
          "price": "₹4,500",
          "imageUrl": "/packages/1D-wayanad-group-tour-package.webp"
        },
        {
          "title": "Affordable Group Tour Package to Wayanad - 2 Days and 1 Night",
          "duration": "2 Days and 1 Night",
          "price": "₹4,500",
          "imageUrl": "/packages/2D1N-wayanad-group-tour-package.webp"
        },
        {
          "title": "Best Group Tour Package to Wayanad with Adventure Activities - 3 Days and 2 Nights",
          "duration": "3 Days and 2 Nights",
          "price": "₹6,500",
          "imageUrl": "/packages/3D2N-wayanad-group-tour-package.webp"
        }
      ]
    },
    {
      "name": "Couple Tour Packages",
      "imageUrl": "",
      "packages": [
        {
          "title": "Romantic Couple Tour Package to Wayanad - 2 Days and 1 Night",
          "duration": "2 Days and 1 Night",
          "price": "₹5,000",
          "imageUrl": "/packages/2D1N-wayanad-couple-tour-package.webp"
        },
        {
          "title": "Luxury Couple Tour Package to Wayanad with Private Stay - 3 Days and 2 Nights",
          "duration": "3 Days and 2 Nights",
          "price": "₹8,000",
          "imageUrl": "/packages/3D2N-wayanad-couple-tour-package.webp"
        },
        {
          "title": "Premium Couple Tour Package to Wayanad with Private Stay - 4 Days and 3 Nights",
          "duration": "3 Days and 2 Nights",
          "price": "₹8,000",
          "imageUrl": "/packages/4D3N-wayanad-couple-tour-package.webp"
        }
      ]
    },
    {
      "name": "Family Tour Packages",
      "imageUrl": "",
      "packages": [
        {
          "title": "Family-Friendly Tour Package to Wayanad - 1 Day",
          "duration": "1 Day",
          "price": "₹6,000",
          "imageUrl": "/packages/2D1N-wayanad-family-tour-package.webp"
        }, {
          "title": "Family-Friendly Tour Package to Wayanad - 2 Days and 1 Night",
          "duration": "2 Days and 1 Night",
          "price": "₹6,000",
          "imageUrl": "/packages/2D1N-wayanad-family-private-pool-tour-package.webp"
        }, {
          "title": "Family-Friendly Tour Package to Wayanad - 3 Days and 2 Night",
          "duration": "3 Days and 2 Night",
          "price": "₹6,000",
          "imageUrl": "/packages/2D1N-wayanad-family-common-pool-tour-package.webp"
        },
        {
          "title": "Exclusive Family Tour Package to Wayanad with Sightseeing - 4 Days and 3 Nights",
          "duration": "4 Days and 3 Nights",
          "price": "₹9,000",
          "imageUrl": "/packages/2D1N-wayanad-family-tour-package.webp"
        }
      ]
    },
    {
      "name": "Bangalore to Wayanad Tour Packages",
      "imageUrl": "",
      "subGroups": [
        {
          "name": "Bangalore to Wayanad Group Tour Packages",
          "imageUrl": "/packages/b2b-group-tour-package.webp",
        },
        {
          "name": "Bangalore to Wayanad Couple Tour Packages",
          "imageUrl": "/packages/b2b-couple-tour-package.webp",
        },
        {
          "name": "Bangalore to Wayanad Private Tour Packages",
          "imageUrl": "/packages/b2b-private-tour-package.webp",
        }
      ],
    },
    {
      "name": "Bangalore to Wayanad Group Tour Packages",
      "imageUrl": "",
      "packages": [
        {
          "title": "Budget Group Tour Package from Bangalore to Wayanad - 2 Days and 1 Night",
          "duration": "2 Days and 1 Night",
          "price": "₹4,500",
          "imageUrl": "/packages/2D1N-bangalore-wayanad-tour-package.webp"
        },
        {
          "title": "Budget Group Tour Package from Bangalore to Wayanad - 3 Days and 2 Night",
          "duration": "3 Days and 2 Night",
          "price": "₹4,500",
          "imageUrl": "/packages/2D1N-wayanad-family-tour-package.webp"
        },
        {
          "title": "Budget Group Tour Package from Bangalore to Wayanad - 4 Days and 3 Night",
          "duration": "4 Days and 3 Night",
          "price": "₹4,500",
          "imageUrl": "/packages/2D1N-wayanad-family-common-pool-tour-package.webp"
        },
      ]
    },
    {
      "name": "Bangalore to Wayanad Couple Tour Packages",
      "imageUrl": "",
      "packages": [
        {
          "title": "Romantic Couple Tour Package from Bangalore to Wayanad - 2 Days and 1 Night",
          "duration": "2 Days and 1 Night",
          "price": "₹5,000",
          "imageUrl": "/packages/3D2N-wayanad-b2b-couple-tour-package.webp"
        },
        {
          "title": "Romantic Couple Tour Package from Bangalore to Wayanad - 3 Days and 2 Night",
          "duration": "3 Days and 2 Night",
          "price": "₹9,000",
          "imageUrl": "/packages/2D1N-wayanad-family-private-pool-tour-package.webp"
        },
        {
          "title": "Romantic Couple Tour Package from Bangalore to Wayanad - 4 Days and 3 Night",
          "duration": "4 Days and 3 Night",
          "price": "₹15,000",
          "imageUrl": "/packages/2D1N-wayanad-family-tour-package.webp"
        },
      ]
    },
    {
      "name": "Bangalore to Wayanad Private Tour Packages",
      "imageUrl": "",
      "packages": [
        {
          "title": "Exclusive Private Tour Package from Bangalore to Wayanad - 2 Days and 2 Nights",
          "duration": "2 Days and 2 Nights",
          "price": "₹10,000",
          "imageUrl": "/packages/3D2N-bangalore-wayanad-tour-package.webp"
        },
        {
          "title": "Exclusive Private Tour Package from Bangalore to Wayanad - 3 Days and 2 Nights",
          "duration": "3 Days and 2 Nights",
          "price": "₹15,000",
          "imageUrl": "/packages/3D2N-wayanad-group-tour-package.webp"
        },
        {
          "title": "Exclusive Private Tour Package from Bangalore to Wayanad - 4 Days and 3 Nights",
          "duration": "4 Days and 3 Nights",
          "price": "₹18,000",
          "imageUrl": "/packages/3D2N-wayanad-couple-tour-package.webp"
        },
      ]
    },
    {
      "name": "Chennai to Wayanad Tour Packages",
      "imageUrl": "",
      "subGroups": [
        {
          "name": "Chennai to Wayanad Group Tour Packages",
          "imageUrl": "/packages/b2b-group-tour-package.webp",
        },
        {
          "name": "Chennai to Wayanad Couple Tour Packages",
          "imageUrl": "/packages/b2b-couple-tour-package.webp",
        },
        {
          "name": "Chennai to Wayanad Private Tour Packages",
          "imageUrl": "/packages/b2b-private-tour-package.webp",
        }
      ],
    },
    {
      "name": "Chennai to Wayanad Group Tour Packages",
      "imageUrl": "",
      "packages": [
        {
          "title": "Budget Group Tour Package from Chennai to Wayanad - 2 Days and 1 Night",
          "duration": "2 Days and 1 Night",
          "price": "₹4,500",
          "imageUrl": "/packages/2D1N-bangalore-wayanad-tour-package.webp"
        },
        {
          "title": "Budget Group Tour Package from Chennai to Wayanad - 3 Days and 2 Night",
          "duration": "3 Days and 2 Night",
          "price": "₹4,500",
          "imageUrl": "/packages/2D1N-wayanad-family-tour-package.webp"
        },
        {
          "title": "Budget Group Tour Package from Chennai to Wayanad - 4 Days and 3 Night",
          "duration": "4 Days and 3 Night",
          "price": "₹4,500",
          "imageUrl": "/packages/2D1N-wayanad-family-common-pool-tour-package.webp"
        },
      ]
    },
    {
      "name": "Chennai to Wayanad Couple Tour Packages",
      "imageUrl": "",
      "packages": [
        {
          "title": "Romantic Couple Tour Package from Chennai to Wayanad - 2 Days and 1 Night",
          "duration": "2 Days and 1 Night",
          "price": "₹5,000",
          "imageUrl": "/packages/3D2N-wayanad-b2b-couple-tour-package.webp"
        },
        {
          "title": "Romantic Couple Tour Package from Chennai to Wayanad - 3 Days and 2 Night",
          "duration": "3 Days and 2 Night",
          "price": "₹9,000",
          "imageUrl": "/packages/2D1N-wayanad-family-private-pool-tour-package.webp"
        },
        {
          "title": "Romantic Couple Tour Package from Chennai to Wayanad - 4 Days and 3 Night",
          "duration": "4 Days and 3 Night",
          "price": "₹15,000",
          "imageUrl": "/packages/2D1N-wayanad-family-tour-package.webp"
        },
      ]
    },
    {
      "name": "Chennai to Wayanad Private Tour Packages",
      "imageUrl": "",
      "packages": [
        {
          "title": "Exclusive Private Tour Package from Chennai to Wayanad - 2 Days and 2 Nights",
          "duration": "2 Days and 2 Nights",
          "price": "₹10,000",
          "imageUrl": "/packages/3D2N-bangalore-wayanad-tour-package.webp"
        },
        {
          "title": "Exclusive Private Tour Package from Chennai to Wayanad - 3 Days and 2 Nights",
          "duration": "3 Days and 2 Nights",
          "price": "₹15,000",
          "imageUrl": "/packages/3D2N-wayanad-group-tour-package.webp"
        },
        {
          "title": "Exclusive Private Tour Package from Chennai to Wayanad - 4 Days and 3 Nights",
          "duration": "4 Days and 3 Nights",
          "price": "₹18,000",
          "imageUrl": "/packages/3D2N-wayanad-couple-tour-package.webp"
        },
      ]
    }

  ];


  const packageCollection = packageCollectionsList.find(
    (group) => group.name.replace(/\s+/g, "-").toLowerCase() === slug
  );

  return (
    <div className="container max-w-11/12 mx-auto my-16">
      <BannerCard
        imageUrl="/images/bg-1.webp"
        title={packageCollection?.name || ""}
        subtitle="Explore our exclusive tour services"
      />

      {packageCollection?.subGroups?.length != 0 &&
        (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
            {
              packageCollection?.subGroups?.map((group, index) => (
                <li key={index}>
                  <Link
                    href={`/packages/${encodeURIComponent(group.name.toLowerCase().replace(/ /g, '-'))}`}
                    key={index}>
                    <ImageCard
                      title={group.name}
                      imageUrl={group.imageUrl}
                    />
                  </Link>
                </li>
              ))
            }
          </ul>
        )
      }
      {packageCollection?.packages?.length != 0 &&
        (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
            {packageCollection?.packages?.map((product, index) => (
              <li key={index}>
                <Link
                  href={`/package/${encodeURIComponent(product.title.toLowerCase().replace(/ /g, '-'))}`}
                  key={index}>
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