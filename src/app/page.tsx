import Hero from "@/components/home/Hero";
import Advantages from "@/components/home/Advantages";
import RecommendedTabs from "@/components/home/RecommendedTabs";
import CategoryCircles from "@/components/home/CategoryCircles";
import BestSellers from "@/components/home/BestSellers";
import Testimonials from "@/components/home/Testimonials";
import EditorialIntro from "@/components/home/EditorialIntro";
import Reveal from "@/components/Reveal";
import RecentlyViewed from "@/components/RecentlyViewed";
import FinalCta from "@/components/home/FinalCta";
import { getProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <Reveal><RecommendedTabs products={products} /></Reveal>
      <BestSellers products={products} />
      <Reveal><CategoryCircles /></Reveal>
      <RecentlyViewed products={products} />
      <Reveal><Advantages /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><EditorialIntro /></Reveal>
      <FinalCta />
    </>
  );
}
