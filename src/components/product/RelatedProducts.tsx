import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function RelatedProducts({
  current,
  products,
}: {
  current: Product;
  products: Product[];
}) {
  const others = products.filter((p) => p.slug !== current.slug);
  const sameType = others.filter((p) => p.productType === current.productType);
  const rest = others.filter((p) => p.productType !== current.productType);
  const related = [...sameType, ...rest].slice(0, 4);
  if (related.length === 0) return null;

  return (
    <section className="py-16 border-t border-black/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center font-serif text-2xl sm:text-3xl text-ink mb-8">
          אולי תאהבו גם
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
