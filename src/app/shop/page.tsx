import { getProducts } from "@/lib/db";
import ShopContent from "./ShopContent";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopContent products={products} />;
}
