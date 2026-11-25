"use client";

import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

// Mobile-only bar that keeps the cart one tap away while browsing, and acts
// as a gentle "your bouquet is waiting" reminder when a visitor returns.
export default function CartReminderBar() {
  const { itemCount, subtotal, openCart } = useCart();
  const pathname = usePathname();
  const hidden =
    itemCount === 0 ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/admin");
  if (hidden) return null;

  return (
    <button
      onClick={openCart}
      className="md:hidden fixed bottom-3 right-3 left-20 z-30 flex items-center justify-between rounded-xl bg-accent text-white px-4 py-3 shadow-lg text-sm font-medium"
    >
      <span className="flex items-center gap-2">
        <ShoppingBag size={16} />
        הזר שלך מחכה בסל · {itemCount}
      </span>
      <span>{subtotal} ₪ · לסל</span>
    </button>
  );
}
