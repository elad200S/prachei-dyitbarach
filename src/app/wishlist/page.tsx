import { getProducts } from "@/lib/db";
import WishlistContent from "./WishlistContent";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  const products = await getProducts();
  return <WishlistContent products={products} />;
}
