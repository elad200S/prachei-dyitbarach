export type Size = "S" | "M" | "L";

export type ProductType =
  | "bouquet"
  | "arrangement"
  | "plant"
  | "giftset"
  | "balloon"
  | "chocolate-wine";

export interface SizeOption {
  size: Size;
  label: string;
  price: number;
  originalPrice?: number;
  isDefault?: boolean;
}

export interface AddOn {
  id: string;
  label: string;
  price: number;
  hasTextArea?: boolean;
}

export interface Product {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  productType: ProductType;
  images: string[];
  startingPrice: number;
  startingOriginalPrice?: number;
  sizes: SizeOption[];
  bestSeller?: boolean;
  emailThemeColor?: string;
}

export interface Category {
  slug: string;
  title: string;
  image: string;
}

export interface Service {
  slug: string;
  title: string;
  image: string;
}

export interface EventCollection {
  slug: string;
  title: string;
  image: string;
  productSlugs: string[];
}

export interface Testimonial {
  name: string;
  city: string;
  bouquet: string;
  quote: string;
}
