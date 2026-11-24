import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/db";
import ProductForm from "../ProductForm";
import DeleteProductButton from "../DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <Link href="/admin/products" className="text-sm text-ink/60 hover:text-ink">
        ← חזרה לרשימת המוצרים
      </Link>
      <div className="flex items-center justify-between mt-4 mb-8">
        <h1 className="font-serif text-2xl text-ink">{product.title}</h1>
        <DeleteProductButton slug={product.slug} />
      </div>
      <ProductForm mode="edit" product={product} />
    </div>
  );
}
