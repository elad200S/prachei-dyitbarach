import Image from "next/image";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "המוצרים הנמכרים ביותר · פרחי ד' יתברך",
};

export default function BestSellersPage() {
  const bestSellers = products.filter((p) => p.bestSeller);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink">המוצרים הנמכרים ביותר</h1>
        <p className="text-ink/60 mt-3 max-w-xl mx-auto leading-7">
          הזרים והמארזים שתמיד קונים — נבחרו בשבילכם. המחירים הסופיים יעודכנו בקרוב; בינתיים,
          להזמנה ולבדיקת מחיר מדויק דברו איתנו ישירות בוואטסאפ.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {bestSellers.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-14 text-ink/50 text-xs">
        <Image src="/logo-icon.png" alt="" width={18} height={18} className="object-contain opacity-70" />
        פרחי ד&apos; יתברך · משלוח מהיר זמין רק בעיר חולון
      </div>
    </div>
  );
}
