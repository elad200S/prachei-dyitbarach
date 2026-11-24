import type { ProductInput } from "./db";

export function parseProductInput(body: unknown): ProductInput | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;

  if (
    typeof b.slug !== "string" ||
    !/^[a-z0-9-]+$/.test(b.slug) ||
    typeof b.title !== "string" ||
    !b.title ||
    typeof b.productType !== "string" ||
    !Array.isArray(b.images) ||
    b.images.length === 0 ||
    !b.images.every((i) => typeof i === "string" && i) ||
    typeof b.startingPrice !== "number" ||
    !Number.isFinite(b.startingPrice)
  ) {
    return null;
  }

  return {
    slug: b.slug,
    title: b.title,
    description: typeof b.description === "string" ? b.description : "",
    longDescription: typeof b.longDescription === "string" ? b.longDescription : "",
    category: typeof b.category === "string" && b.category ? b.category : "unsorted",
    productType: b.productType as ProductInput["productType"],
    images: b.images as string[],
    startingPrice: b.startingPrice,
    originalPrice: typeof b.originalPrice === "number" ? b.originalPrice : undefined,
    bestSeller: Boolean(b.bestSeller),
    emailThemeColor: typeof b.emailThemeColor === "string" && b.emailThemeColor ? b.emailThemeColor : undefined,
  };
}
