import Hero from "@/components/home/Hero";
import Advantages from "@/components/home/Advantages";
import RecommendedTabs from "@/components/home/RecommendedTabs";
import CategoryCircles from "@/components/home/CategoryCircles";
import BestSellers from "@/components/home/BestSellers";
import Testimonials from "@/components/home/Testimonials";
import EditorialIntro from "@/components/home/EditorialIntro";
import { getProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <RecommendedTabs products={products} />
      <BestSellers products={products} />
      <CategoryCircles />
      <Advantages />
      <Testimonials />
      <EditorialIntro />
    </>
  );
}
