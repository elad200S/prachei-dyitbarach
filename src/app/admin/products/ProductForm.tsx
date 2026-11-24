"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { categories, categoryIcons, productTypes } from "@/lib/data";

const categoryOptions = [
  { slug: "unsorted", title: "לא מסווג" },
  ...categories,
  ...categoryIcons.filter((c) => !categories.some((existing) => existing.slug === c.slug)),
];

export default function ProductForm({
  mode,
  product,
}: {
  mode: "create" | "edit";
  product?: Product;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [title, setTitle] = useState(product?.title ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [longDescription, setLongDescription] = useState(product?.longDescription ?? "");
  const [category, setCategory] = useState(product?.category ?? "unsorted");
  const [productType, setProductType] = useState<string>(product?.productType ?? productTypes[0].slug);
  const [imagesText, setImagesText] = useState((product?.images ?? []).join("\n"));
  const [startingPrice, setStartingPrice] = useState(String(product?.startingPrice ?? ""));
  const [originalPrice, setOriginalPrice] = useState(
    product?.startingOriginalPrice ? String(product.startingOriginalPrice) : "",
  );
  const [bestSeller, setBestSeller] = useState(product?.bestSeller ?? false);
  const [emailThemeColor, setEmailThemeColor] = useState(product?.emailThemeColor ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const images = imagesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const price = Number(startingPrice);
    if (!slug.trim() || !/^[a-z0-9-]+$/.test(slug.trim())) {
      setError("מזהה (slug) חייב להיות באנגלית קטנה, מספרים ומקפים בלבד");
      return;
    }
    if (images.length === 0) {
      setError("נדרשת לפחות תמונה אחת");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setError("נדרש מחיר תקין");
      return;
    }

    setSubmitting(true);
    try {
      const url = mode === "create" ? "/api/admin/products" : `/api/admin/products/${product!.slug}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug.trim(),
          title: title.trim(),
          description: description.trim(),
          longDescription: longDescription.trim(),
          category,
          productType,
          images,
          startingPrice: price,
          originalPrice: originalPrice ? Number(originalPrice) : undefined,
          bestSeller,
          emailThemeColor: emailThemeColor.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "שגיאה בשמירה");
        setSubmitting(false);
        return;
      }

      router.push("/admin/products");
    } catch {
      setError("שגיאה בשמירה, נסו שוב.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      <div>
        <label className="block text-xs text-ink/60 mb-1">מזהה (slug, באנגלית, לא ישתנה בעתיד)</label>
        <input
          required
          disabled={mode === "edit"}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="red-roses-cream-wrap"
          className="input disabled:opacity-60"
          dir="ltr"
        />
      </div>

      <div>
        <label className="block text-xs text-ink/60 mb-1">שם המוצר</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
      </div>

      <div>
        <label className="block text-xs text-ink/60 mb-1">תיאור קצר</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} className="input" />
      </div>

      <div>
        <label className="block text-xs text-ink/60 mb-1">תיאור מלא (בעמוד המוצר)</label>
        <textarea
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          rows={4}
          className="input"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-ink/60 mb-1">סוג פרח</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
            {categoryOptions.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-ink/60 mb-1">סוג מוצר</label>
          <select value={productType} onChange={(e) => setProductType(e.target.value)} className="input">
            {productTypes.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-ink/60 mb-1">תמונות — כתובת אחת בכל שורה</label>
        <textarea
          value={imagesText}
          onChange={(e) => setImagesText(e.target.value)}
          rows={3}
          className="input"
          dir="ltr"
          placeholder="/products/example.jpeg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-ink/60 mb-1">מחיר (₪)</label>
          <input
            required
            type="number"
            min={0}
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="block text-xs text-ink/60 mb-1">מחיר מקורי (לא חובה — לקו חוצה)</label>
          <input
            type="number"
            min={0}
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-ink/60 mb-1">צבע רקע במייל אישור הזמנה (לא חובה)</label>
        <input
          value={emailThemeColor}
          onChange={(e) => setEmailThemeColor(e.target.value)}
          placeholder="#fdeae6"
          className="input"
          dir="ltr"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
        <input
          type="checkbox"
          checked={bestSeller}
          onChange={(e) => setBestSeller(e.target.checked)}
          className="w-4 h-4"
        />
        מוצר נמכר ביותר (יוצג בדף הבית וב&quot;נמכרים ביותר&quot;)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-accent text-white px-8 py-3 hover:brightness-110 transition-all disabled:opacity-50"
      >
        {submitting ? "שומר..." : mode === "create" ? "יצירת מוצר" : "שמירת שינויים"}
      </button>
    </form>
  );
}
