"use client";

import { useState } from "react";
import Link from "next/link";
import { products, productTypes } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

const ALL = "all";
const tabs = [{ slug: ALL, title: "הכל" }, ...productTypes];
const PAGE_SIZE = 8;

export default function RecommendedTabs() {
  const [active, setActive] = useState(ALL);
  const filtered =
    active === ALL ? products : products.filter((p) => p.productType === active);
  const shown = filtered.slice(0, PAGE_SIZE);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center font-serif text-3xl sm:text-4xl text-ink mb-8">
          המומלצים שלנו
        </h2>

        <div className="flex gap-6 overflow-x-auto no-scrollbar justify-start sm:justify-center mb-10 px-1 border-b border-black/10">
          {tabs.map((tab) => (
            <button
              key={tab.slug}
              onClick={() => setActive(tab.slug)}
              className={`shrink-0 -mb-px border-b-2 pb-3 text-sm sm:text-base transition-colors ${
                active === tab.slug
                  ? "border-accent text-ink font-medium"
                  : "border-transparent text-ink/50 hover:text-ink"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="text-center text-ink/50 text-sm">אין עדיין מוצרים בקטגוריה הזו.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {shown.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href={active === ALL ? "/shop" : `/shop/${active}`}
            className="inline-block border border-accent text-accent text-sm px-7 py-3 rounded-lg hover:bg-accent hover:text-white transition-colors"
          >
            לכל המוצרים
          </Link>
        </div>
      </div>
    </section>
  );
}
