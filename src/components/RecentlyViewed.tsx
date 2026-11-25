"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

const KEY = "prachei-dyitbarach-recent";
const MAX = 8;

function read(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export default function RecentlyViewed({
  products,
  trackSlug,
}: {
  products: Product[];
  /** On a product page: record this product and hide it from the list. */
  trackSlug?: string;
}) {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    let list = read();
    if (trackSlug) {
      list = [trackSlug, ...list.filter((s) => s !== trackSlug)].slice(0, MAX);
      try {
        localStorage.setItem(KEY, JSON.stringify(list));
      } catch {
        // ignore storage errors
      }
    }
    setSlugs(list.filter((s) => s !== trackSlug));
  }, [trackSlug]);

  const items = slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is Product => !!p)
    .slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section className="py-14 border-t border-black/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center font-serif text-2xl sm:text-3xl text-ink mb-8">
          נצפו לאחרונה
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
