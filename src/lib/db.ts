import { neon } from "@neondatabase/serverless";
import type { Product, SizeOption } from "./types";
import { SEED_BATCH_KEY, seedBatch } from "./seedProducts";

export interface OrderItem {
  slug?: string;
  title: string;
  image: string;
  sizeLabel: string;
  quantity: number;
  basePrice: number;
  addOns: { label: string; price: number }[];
  cardMessage?: string | null;
}

export interface Order {
  id: number;
  created_at: string;
  sender_name: string;
  sender_phone: string;
  sender_email: string;
  recipient_name: string;
  recipient_phone: string;
  city: string;
  street: string;
  floor: string | null;
  delivery_date: string;
  delivery_time: string | null;
  rush_delivery: boolean;
  card_message: string | null;
  payment_method: string;
  items: OrderItem[];
  delivery_cost: number;
  total: number;
  fulfilled: boolean;
}

export interface CartSession {
  id: string;
  created_at: string;
  updated_at: string;
  sender_name: string | null;
  sender_phone: string | null;
  sender_email: string | null;
  city: string | null;
  items: OrderItem[];
  subtotal: number;
  completed: boolean;
}

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(process.env.DATABASE_URL);
}

let schemaReady: Promise<void> | null = null;

async function ensureSchema() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      sender_name TEXT NOT NULL,
      sender_phone TEXT NOT NULL,
      sender_email TEXT NOT NULL DEFAULT '',
      recipient_name TEXT NOT NULL,
      recipient_phone TEXT NOT NULL,
      city TEXT NOT NULL,
      street TEXT NOT NULL,
      floor TEXT,
      delivery_date DATE NOT NULL,
      delivery_time TEXT,
      rush_delivery BOOLEAN NOT NULL DEFAULT false,
      card_message TEXT,
      payment_method TEXT NOT NULL,
      items JSONB NOT NULL,
      delivery_cost INTEGER NOT NULL,
      total INTEGER NOT NULL,
      fulfilled BOOLEAN NOT NULL DEFAULT false
    )
  `;
  // Table may already exist from before these columns were added.
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS sender_email TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_time TEXT`;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      long_description TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'unsorted',
      product_type TEXT NOT NULL,
      images JSONB NOT NULL DEFAULT '[]',
      starting_price INTEGER NOT NULL,
      starting_original_price INTEGER,
      sizes JSONB NOT NULL DEFAULT '[]',
      best_seller BOOLEAN NOT NULL DEFAULT false,
      email_theme_color TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  // First deploy after this table was introduced: seed it with the catalog that
  // used to live in src/lib/data.ts, so nothing changes on the live site.
  const [{ count }] = await sql`SELECT count(*)::int AS count FROM products`;
  if (count === 0) {
    const seed: Product[] = [
      {
        slug: "red-roses-cream-wrap",
        title: "זר ורדים אדומים בעטיפה בז'",
        description: "פריט מהמלאי שלנו — תיאור מלא בקרוב",
        longDescription: "פריט מהמלאי שלנו — תיאור מלא בקרוב",
        category: "unsorted",
        productType: "bouquet",
        images: ["/products/red-roses-cream-wrap.jpeg"],
        startingPrice: 189,
        startingOriginalPrice: 399,
        sizes: [{ size: "M", label: "רגיל", price: 189, originalPrice: 399, isDefault: true }],
        emailThemeColor: "#fdeae6",
      },
      {
        slug: "red-roses-black-wrap",
        title: "זר ורדים אדומים בעטיפה שחורה",
        description: "פריט מהמלאי שלנו — תיאור מלא בקרוב",
        longDescription: "פריט מהמלאי שלנו — תיאור מלא בקרוב",
        category: "unsorted",
        productType: "bouquet",
        images: ["/products/red-roses-black-wrap.jpeg"],
        startingPrice: 189,
        startingOriginalPrice: 399,
        sizes: [{ size: "M", label: "רגיל", price: 189, originalPrice: 399, isDefault: true }],
        emailThemeColor: "#f7e1e4",
      },
      {
        slug: "snake-plant-wine-giftset",
        title: "מארז מתנה - עציץ שרך ובקבוק יין",
        description: "פריט מהמלאי שלנו — תיאור מלא בקרוב",
        longDescription: "פריט מהמלאי שלנו — תיאור מלא בקרוב",
        category: "unsorted",
        productType: "giftset",
        images: ["/products/snake-plant-wine-giftset.jpeg"],
        startingPrice: 189,
        startingOriginalPrice: 399,
        sizes: [{ size: "M", label: "רגיל", price: 189, originalPrice: 399, isDefault: true }],
        emailThemeColor: "#f1ece2",
      },
      {
        slug: "croton-smiley-pot",
        title: "עציץ קרוטון באגרטל חייכן",
        description: "פריט מהמלאי שלנו — תיאור מלא בקרוב",
        longDescription: "פריט מהמלאי שלנו — תיאור מלא בקרוב",
        category: "unsorted",
        productType: "plant",
        images: ["/products/croton-smiley-pot.jpeg"],
        startingPrice: 189,
        startingOriginalPrice: 399,
        sizes: [{ size: "M", label: "רגיל", price: 189, originalPrice: 399, isDefault: true }],
        emailThemeColor: "#e9f2ea",
      },
    ];
    for (let i = 0; i < seed.length; i++) {
      const p = seed[i];
      await sql`
        INSERT INTO products (
          slug, title, description, long_description, category, product_type,
          images, starting_price, starting_original_price, sizes, email_theme_color, sort_order
        ) VALUES (
          ${p.slug}, ${p.title}, ${p.description}, ${p.longDescription}, ${p.category}, ${p.productType},
          ${JSON.stringify(p.images)}, ${p.startingPrice}, ${p.startingOriginalPrice ?? null},
          ${JSON.stringify(p.sizes)}, ${p.emailThemeColor ?? null}, ${i}
        )
        ON CONFLICT (slug) DO NOTHING
      `;
    }
  }

  await sql`CREATE TABLE IF NOT EXISTS seed_flags (key TEXT PRIMARY KEY)`;
  const flagged = await sql`INSERT INTO seed_flags (key) VALUES (${SEED_BATCH_KEY}) ON CONFLICT DO NOTHING RETURNING key`;
  if (flagged.length > 0) {
    const [{ next }] = await sql`SELECT coalesce(max(sort_order) + 1, 0) AS next FROM products`;
    for (let i = 0; i < seedBatch.length; i++) {
      const p = seedBatch[i];
      const sizes = [{ size: "M", label: "רגיל", price: p.price, isDefault: true }];
      await sql`
        INSERT INTO products (
          slug, title, description, long_description, category, product_type,
          images, starting_price, starting_original_price, sizes, email_theme_color, sort_order
        ) VALUES (
          ${p.slug}, ${p.title}, ${"פריט מהמלאי שלנו — תיאור מלא בקרוב"}, ${"פריט מהמלאי שלנו — תיאור מלא בקרוב"},
          ${"unsorted"}, ${p.productType}, ${JSON.stringify(p.images)}, ${p.price}, ${null},
          ${JSON.stringify(sizes)}, ${null}, ${Number(next) + i}
        )
        ON CONFLICT (slug) DO NOTHING
      `;
    }
  }

  await sql`
    CREATE TABLE IF NOT EXISTS cart_sessions (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      sender_name TEXT,
      sender_phone TEXT,
      sender_email TEXT,
      city TEXT,
      items JSONB NOT NULL DEFAULT '[]',
      subtotal INTEGER NOT NULL DEFAULT 0,
      completed BOOLEAN NOT NULL DEFAULT false
    )
  `;
}

function withSchema<T>(fn: () => Promise<T>): Promise<T> {
  if (!schemaReady) schemaReady = ensureSchema();
  return schemaReady.then(fn);
}

export interface NewOrder {
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  recipientName: string;
  recipientPhone: string;
  city: string;
  street: string;
  floor: string;
  deliveryDate: string;
  deliveryTime: string;
  rushDelivery: boolean;
  cardMessage?: string;
  paymentMethod: string;
  items: OrderItem[];
  deliveryCost: number;
  total: number;
}

export async function createOrder(order: NewOrder): Promise<Order> {
  return withSchema(async () => {
    const sql = getSql();
    const rows = await sql`
      INSERT INTO orders (
        sender_name, sender_phone, sender_email, recipient_name, recipient_phone,
        city, street, floor, delivery_date, delivery_time, rush_delivery, card_message,
        payment_method, items, delivery_cost, total
      ) VALUES (
        ${order.senderName}, ${order.senderPhone}, ${order.senderEmail}, ${order.recipientName}, ${order.recipientPhone},
        ${order.city}, ${order.street}, ${order.floor || null}, ${order.deliveryDate}, ${order.deliveryTime || null}, ${order.rushDelivery}, ${order.cardMessage || null},
        ${order.paymentMethod}, ${JSON.stringify(order.items)}, ${order.deliveryCost}, ${order.total}
      )
      RETURNING *
    `;
    return rows[0] as Order;
  });
}

export async function listOrders(): Promise<Order[]> {
  return withSchema(async () => {
    const sql = getSql();
    const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
    return rows as Order[];
  });
}

export async function getOrder(id: number): Promise<Order | null> {
  return withSchema(async () => {
    const sql = getSql();
    const rows = await sql`SELECT * FROM orders WHERE id = ${id}`;
    return (rows[0] as Order) ?? null;
  });
}

export async function setOrderFulfilled(id: number, fulfilled: boolean): Promise<void> {
  return withSchema(async () => {
    const sql = getSql();
    await sql`UPDATE orders SET fulfilled = ${fulfilled} WHERE id = ${id}`;
  });
}

export interface CartSessionUpdate {
  id: string;
  senderName?: string;
  senderPhone?: string;
  senderEmail?: string;
  city?: string;
  items: OrderItem[];
  subtotal: number;
}

export async function upsertCartSession(update: CartSessionUpdate): Promise<void> {
  return withSchema(async () => {
    const sql = getSql();
    await sql`
      INSERT INTO cart_sessions (id, sender_name, sender_phone, sender_email, city, items, subtotal, updated_at)
      VALUES (
        ${update.id}, ${update.senderName || null}, ${update.senderPhone || null},
        ${update.senderEmail || null}, ${update.city || null}, ${JSON.stringify(update.items)},
        ${update.subtotal}, now()
      )
      ON CONFLICT (id) DO UPDATE SET
        sender_name = EXCLUDED.sender_name,
        sender_phone = EXCLUDED.sender_phone,
        sender_email = EXCLUDED.sender_email,
        city = EXCLUDED.city,
        items = EXCLUDED.items,
        subtotal = EXCLUDED.subtotal,
        updated_at = now()
      WHERE cart_sessions.completed = false
    `;
  });
}

export async function markCartSessionCompleted(id: string): Promise<void> {
  return withSchema(async () => {
    const sql = getSql();
    await sql`UPDATE cart_sessions SET completed = true WHERE id = ${id}`;
  });
}

// Carts with at least one way to reach the customer, not yet converted into an
// order, updated within the last two weeks (older ones aren't worth a callback).
export async function listAbandonedCarts(): Promise<CartSession[]> {
  return withSchema(async () => {
    const sql = getSql();
    const rows = await sql`
      SELECT * FROM cart_sessions
      WHERE completed = false
        AND jsonb_array_length(items) > 0
        AND (coalesce(sender_phone, '') <> '' OR coalesce(sender_email, '') <> '')
        AND updated_at > now() - interval '14 days'
      ORDER BY updated_at DESC
    `;
    return rows as CartSession[];
  });
}

// Row shape uses snake_case columns; the rest of the app works with the
// camelCase Product type from lib/types.ts.
function mapProductRow(row: {
  slug: string;
  title: string;
  description: string;
  long_description: string;
  category: string;
  product_type: string;
  images: string[];
  starting_price: number;
  starting_original_price: number | null;
  sizes: SizeOption[];
  best_seller: boolean;
  email_theme_color: string | null;
}): Product {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    longDescription: row.long_description,
    category: row.category,
    productType: row.product_type as Product["productType"],
    images: row.images,
    startingPrice: row.starting_price,
    startingOriginalPrice: row.starting_original_price ?? undefined,
    sizes: row.sizes,
    bestSeller: row.best_seller,
    emailThemeColor: row.email_theme_color ?? undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  return withSchema(async () => {
    const sql = getSql();
    const rows = await sql`SELECT * FROM products ORDER BY sort_order ASC, created_at ASC`;
    return (rows as Parameters<typeof mapProductRow>[0][]).map(mapProductRow);
  });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return withSchema(async () => {
    const sql = getSql();
    const rows = await sql`SELECT * FROM products WHERE slug = ${slug}`;
    return rows[0] ? mapProductRow(rows[0] as Parameters<typeof mapProductRow>[0]) : null;
  });
}

export type ProductInput = Omit<Product, "sizes" | "bestSeller"> & {
  originalPrice?: number;
  bestSeller?: boolean;
};

function sizesFromInput(input: ProductInput): SizeOption[] {
  return [
    {
      size: "M",
      label: "רגיל",
      price: input.startingPrice,
      originalPrice: input.originalPrice,
      isDefault: true,
    },
  ];
}

export async function createProduct(input: ProductInput): Promise<Product> {
  return withSchema(async () => {
    const sql = getSql();
    const [{ next }] = await sql`SELECT coalesce(max(sort_order) + 1, 0) AS next FROM products`;
    const rows = await sql`
      INSERT INTO products (
        slug, title, description, long_description, category, product_type,
        images, starting_price, starting_original_price, sizes, best_seller, email_theme_color, sort_order
      ) VALUES (
        ${input.slug}, ${input.title}, ${input.description}, ${input.longDescription},
        ${input.category}, ${input.productType}, ${JSON.stringify(input.images)},
        ${input.startingPrice}, ${input.originalPrice ?? null}, ${JSON.stringify(sizesFromInput(input))},
        ${input.bestSeller ?? false}, ${input.emailThemeColor ?? null}, ${next}
      )
      RETURNING *
    `;
    return mapProductRow(rows[0] as Parameters<typeof mapProductRow>[0]);
  });
}

export async function updateProduct(slug: string, input: ProductInput): Promise<Product> {
  return withSchema(async () => {
    const sql = getSql();
    const rows = await sql`
      UPDATE products SET
        title = ${input.title},
        description = ${input.description},
        long_description = ${input.longDescription},
        category = ${input.category},
        product_type = ${input.productType},
        images = ${JSON.stringify(input.images)},
        starting_price = ${input.startingPrice},
        starting_original_price = ${input.originalPrice ?? null},
        sizes = ${JSON.stringify(sizesFromInput(input))},
        best_seller = ${input.bestSeller ?? false},
        email_theme_color = ${input.emailThemeColor ?? null}
      WHERE slug = ${slug}
      RETURNING *
    `;
    return mapProductRow(rows[0] as Parameters<typeof mapProductRow>[0]);
  });
}

export async function deleteProduct(slug: string): Promise<void> {
  return withSchema(async () => {
    const sql = getSql();
    await sql`DELETE FROM products WHERE slug = ${slug}`;
  });
}
