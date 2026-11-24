import Link from "next/link";
import { getProducts } from "@/lib/db";
import LogoutButton from "../LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let dbError = false;

  try {
    products = await getProducts();
  } catch {
    dbError = true;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-ink">ניהול מוצרים</h1>
          <div className="flex gap-4">
            <Link href="/admin" className="text-sm text-ink/60 hover:text-ink">
              ← ניהול הזמנות
            </Link>
            <Link href="/admin/carts" className="text-sm text-ink/60 hover:text-ink">
              עגלות נטושות ←
            </Link>
          </div>
        </div>
        <LogoutButton />
      </div>

      <div className="mb-6">
        <Link
          href="/admin/products/new"
          className="inline-block bg-ink text-paper text-xs tracked-xs uppercase px-6 py-3 hover:bg-ink/85 transition-colors"
        >
          + מוצר חדש
        </Link>
      </div>

      {dbError && (
        <p className="text-sm text-red-600 mb-6">
          לא הצלחתי להתחבר למסד הנתונים. ודאו שמשתנה הסביבה DATABASE_URL מוגדר.
        </p>
      )}

      {!dbError && products.length === 0 && <p className="text-ink/60 text-sm">עדיין אין מוצרים.</p>}

      {products.length > 0 && (
        <div className="overflow-x-auto border border-black/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black/[0.03] text-ink/60">
                <th className="text-right font-normal py-2.5 px-3">שם</th>
                <th className="text-right font-normal py-2.5 px-3">סוג</th>
                <th className="text-right font-normal py-2.5 px-3">מחיר</th>
                <th className="text-right font-normal py-2.5 px-3">נמכר ביותר</th>
                <th className="text-right font-normal py-2.5 px-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.slug} className="border-t border-black/10 hover:bg-black/[0.02]">
                  <td className="py-2.5 px-3">
                    <Link href={`/admin/products/${product.slug}`} className="text-ink hover:underline">
                      {product.title}
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 text-ink/70">{product.productType}</td>
                  <td className="py-2.5 px-3 text-ink">{product.startingPrice} ₪</td>
                  <td className="py-2.5 px-3 text-ink/70">{product.bestSeller ? "כן" : ""}</td>
                  <td className="py-2.5 px-3">
                    <Link href={`/products/${product.slug}`} target="_blank" className="text-sm text-ink/60 hover:text-ink">
                      צפייה באתר ↗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
