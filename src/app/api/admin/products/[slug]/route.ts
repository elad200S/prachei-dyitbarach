import { NextResponse } from "next/server";
import { deleteProduct, updateProduct } from "@/lib/db";
import { isAdminRequest } from "@/lib/adminAuth";
import { parseProductInput } from "@/lib/productInput";

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }

  const { slug } = await params;
  const input = parseProductInput(await request.json().catch(() => null));
  if (!input) {
    return NextResponse.json({ error: "חסרים פרטים או שהם לא תקינים" }, { status: 400 });
  }

  try {
    const product = await updateProduct(slug, input);
    return NextResponse.json({ product });
  } catch (error) {
    console.error("Failed to update product", error);
    return NextResponse.json({ error: "שגיאה בעדכון המוצר" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    await deleteProduct(slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete product", error);
    return NextResponse.json({ error: "שגיאה במחיקת המוצר" }, { status: 500 });
  }
}
