import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/db";
import { SITE_URL } from "@/lib/contact";
import ProductClient from "@/components/product/ProductClient";
import RecentlyViewed from "@/components/RecentlyViewed";
import RelatedProducts from "@/components/product/RelatedProducts";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.title} | פרחי ד' יתברך`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      url: `${SITE_URL}/products/${product.slug}`,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const allProducts = await getProducts();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      price: product.startingPrice,
      priceCurrency: "ILS",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/products/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductClient product={product} />
      <RelatedProducts current={product} products={allProducts} />
      <RecentlyViewed products={allProducts} trackSlug={product.slug} />
    </>
  );
}
