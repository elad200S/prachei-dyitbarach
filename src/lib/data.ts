import type { AddOn, Category, EventCollection, Product, ProductType, Service, Testimonial } from "./types";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export const productTypes: { slug: ProductType; title: string }[] = [
  { slug: "bouquet", title: "זרי פרחים" },
  { slug: "arrangement", title: "סידורי פרחים וקופסאות פרחים" },
  { slug: "plant", title: "עציצים וצמחים" },
  { slug: "giftset", title: "מארזי מתנה" },
  { slug: "balloon", title: "בלונים ועיצובי בלונים" },
  { slug: "chocolate-wine", title: "שוקולדים, יין ותוספות למתנה" },
];

export const categories: Category[] = [
  { slug: "roses", title: "ורדים", image: "/products/luxury-red-pink-roses.jpeg" },
  { slug: "tulips", title: "צבעונים", image: img("1554494583-c4e1649bfe71") },
  { slug: "sunflowers", title: "חמניות", image: "/products/sunflowers-wholesale-bulk.jpeg" },
  { slug: "peonies", title: "פיוניות", image: "/products/pink-lisianthus-bouquet.jpeg" },
  { slug: "orchids", title: "סחלבים", image: img("1610397648930-477b8c7f0943") },
  { slug: "gerbera", title: "גרברה", image: "/products/mixed-gerbera-handheld.jpeg" },
  { slug: "lily", title: "לילי", image: "/products/white-lily-buds.jpeg" },
  { slug: "carnation", title: "ציפורן", image: img("1617265178200-facb3f9d8f37") },
  { slug: "hydrangea", title: "הידרנגיה", image: img("1447875569765-2b3db822bec9") },
];

export const services: Service[] = [
  { slug: "weddings", title: "חתונות", image: img("1519225421980-715cb0215aed") },
  { slug: "corporate", title: "מתנות לעסקים", image: img("1561181274-ac181107c1ff") },
  { slug: "weekend", title: "פרחי שבוע", image: img("1523694576729-dc99e9c0f9b4") },
];

export interface DeliveryZone {
  city: string;
  cost: number;
  costLabel: string;
  time: string;
}

export const deliveryZones: DeliveryZone[] = [
  { city: "חולון", cost: 0, costLabel: "משלוח חינם", time: "באותו היום בהזמנה עד 14:00" },
  { city: "בת ים", cost: 20, costLabel: "20 ₪", time: "באותו היום בהזמנה עד 14:00" },
  { city: "ראשון לציון", cost: 25, costLabel: "25 ₪", time: "באותו היום בהזמנה עד 14:00" },
  { city: "תל אביב", cost: 35, costLabel: "35 ₪", time: "עד יום עסקים אחד" },
];

export const RUSH_DELIVERY_COST = 30;

export const deliveryTimeSlots: { id: string; label: string }[] = [
  { id: "9-13", label: "09:00–13:00" },
  { id: "13-17", label: "13:00–17:00" },
  { id: "17-20", label: "17:00–20:00" },
];

export const addOns: AddOn[] = [
  { id: "card", label: "כרטיס ברכה", price: 15, hasTextArea: true },
  { id: "chocolate", label: "קופסת שוקולד", price: 35 },
  { id: "balloon", label: "בלון", price: 20 },
  { id: "vase", label: "אגרטל זכוכית", price: 45 },
];

export const products: Product[] = [];

export const events: EventCollection[] = [
  {
    slug: "birthday",
    title: "יום הולדת",
    image: "/products/bicolor-pink-white-gerbera.jpeg",
    productSlugs: [],
  },
  {
    slug: "anniversary",
    title: "יום נישואין",
    image: "/products/white-red-pink-luxury-mix.jpeg",
    productSlugs: [],
  },
  {
    slug: "love",
    title: "אהבה ורומנטיקה",
    image: "/products/classic-red-roses-card.jpeg",
    productSlugs: [],
  },
  {
    slug: "birth",
    title: "לידה",
    image: "/products/pure-white-lisianthus.jpeg",
    productSlugs: [],
  },
  {
    slug: "thanks",
    title: "תודה",
    image: "/products/pink-daisy-white-lily-arranged.jpeg",
    productSlugs: [],
  },
  {
    slug: "holidays",
    title: "חגים",
    image: "/products/gift-set-plant-wine-chocolate.jpeg",
    productSlugs: [],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "מיכל כהן",
    city: "חולון",
    bouquet: "זר ורדים אדומים קלאסי",
    quote: "הזר הגיע מדויק לשעה שהתבקשה והיה מרהיב. השירות היה אישי וחם, ממש מורגש שאוהבים את מה שעושים.",
  },
  {
    name: "דניאל לוי",
    city: "בת ים",
    bouquet: "זר פיוניות \"חלום פסטל\"",
    quote: "הזמנתי ליום הנישואין שלנו וקיבלתי תמונה של הזר לפני המשלוח - פרט קטן שעשה הבדל גדול.",
  },
  {
    name: "נועה אברהם",
    city: "חולון",
    bouquet: "זר חמניות \"קיץ זוהר\"",
    quote: "זר צבעוני ומרנין, הגיע טרי וארוז בצורה מושלמת. ממליצה בחום!",
  },
  {
    name: "עידו שמעוני",
    city: "ראשון לציון",
    bouquet: "זר סחלבים \"אלגנטיות\"",
    quote: "הזמנה עסקית לפתיחת משרד - נראה יוקרתי בדיוק כמו בתמונה. יחס מקצועי מהרגע הראשון.",
  },
  {
    name: "שירה גולן",
    city: "חולון",
    bouquet: "זר \"טוהר\" לבן-ירוק",
    quote: "אהבתי את העיצוב הנקי והאלגנטי. גם המשלוח הגיע מוקדם מהצפוי.",
  },
];
