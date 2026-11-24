import Link from "next/link";
import { listAbandonedCarts } from "@/lib/db";
import { formatDateTime } from "@/lib/format";
import { toWhatsAppLink } from "@/lib/contact";
import LogoutButton from "../LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminCartsPage() {
  let carts: Awaited<ReturnType<typeof listAbandonedCarts>> = [];
  let dbError = false;

  try {
    carts = await listAbandonedCarts();
  } catch {
    dbError = true;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-ink">עגלות נטושות</h1>
          <div className="flex gap-4">
            <Link href="/admin" className="text-sm text-ink/60 hover:text-ink">
              ← ניהול הזמנות
            </Link>
            <Link href="/admin/products" className="text-sm text-ink/60 hover:text-ink">
              ניהול מוצרים ←
            </Link>
          </div>
        </div>
        <LogoutButton />
      </div>

      <p className="text-sm text-ink/60 mb-6">
        לקוחות שהתחילו למלא פרטים בקופה אך לא השלימו הזמנה, ב-14 הימים האחרונים.
      </p>

      {dbError && (
        <p className="text-sm text-red-600 mb-6">
          לא הצלחתי להתחבר למסד הנתונים. ודאו שמשתנה הסביבה DATABASE_URL מוגדר.
        </p>
      )}

      {!dbError && carts.length === 0 && (
        <p className="text-ink/60 text-sm">אין עגלות נטושות כרגע.</p>
      )}

      {carts.length > 0 && (
        <div className="space-y-4">
          {carts.map((cart) => {
            const items = cart.items
              .map((item) => `${item.title} (${item.sizeLabel}) ×${item.quantity}`)
              .join(", ");
            const message = `היי ${cart.sender_name ?? ""}, שמנו לב שהתחלת להזמין זר אצלנו ולא הספקת לסיים 🌸 אפשר לעזור להשלים את ההזמנה?`;
            const whatsapp = cart.sender_phone ? toWhatsAppLink(cart.sender_phone, message) : null;

            return (
              <div key={cart.id} className="border border-black/10 p-4 flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 space-y-1">
                  <p className="text-ink font-medium">{cart.sender_name || "ללא שם"}</p>
                  <p className="text-sm text-ink/70" dir="ltr">
                    {[cart.sender_phone, cart.sender_email].filter(Boolean).join(" · ")}
                  </p>
                  <p className="text-sm text-ink/60">{items || "עגלה ללא פריטים"}</p>
                  <p className="text-xs text-ink/40">עודכן לאחרונה: {formatDateTime(cart.updated_at)}</p>
                </div>
                <div className="text-end shrink-0 space-y-2">
                  <p className="text-ink font-medium">{cart.subtotal} ₪</p>
                  {whatsapp && (
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-ink text-paper text-xs tracked-xs uppercase px-4 py-2 hover:bg-ink/85 transition-colors"
                    >
                      פנייה בוואטסאפ
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
