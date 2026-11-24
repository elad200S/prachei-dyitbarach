import Link from "next/link";
import ProductForm from "../ProductForm";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <Link href="/admin/products" className="text-sm text-ink/60 hover:text-ink">
        ← חזרה לרשימת המוצרים
      </Link>
      <h1 className="font-serif text-2xl text-ink mt-4 mb-8">מוצר חדש</h1>
      <ProductForm mode="create" />
    </div>
  );
}
