import type { MetadataRoute } from "next";
import { categories, events } from "@/lib/data";
import { getProducts } from "@/lib/db";
import { SITE_URL } from "@/lib/contact";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const staticPaths = [
    "",
    "shop",
    "about",
    "contact",
    "delivery",
    "terms",
    "privacy",
    "cancellations",
    "accessibility",
  ];

  const staticRoutes = staticPaths.map((path) => ({
    url: path ? `${SITE_URL}/${path}` : SITE_URL,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    lastModified: new Date(),
  }));

  const eventRoutes = events.map((e) => ({
    url: `${SITE_URL}/event/${e.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...eventRoutes];
}
