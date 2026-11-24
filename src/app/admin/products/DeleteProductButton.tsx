"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteProductButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("למחוק את המוצר הזה? הפעולה לא הפיכה.")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
      if (!res.ok) {
        alert("המחיקה נכשלה, נסו שוב.");
        setBusy(false);
        return;
      }
      router.push("/admin/products");
      router.refresh();
    } catch {
      alert("המחיקה נכשלה, נסו שוב.");
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      disabled={busy}
      onClick={handleDelete}
      className="text-sm text-red-600 hover:underline disabled:opacity-50"
    >
      מחיקת מוצר
    </button>
  );
}
