import Hero from "@/components/home/Hero";
import Advantages from "@/components/home/Advantages";
import RecommendedTabs from "@/components/home/RecommendedTabs";
import CategoryCircles from "@/components/home/CategoryCircles";
import BestSellers from "@/components/home/BestSellers";
import Testimonials from "@/components/home/Testimonials";
import EditorialIntro from "@/components/home/EditorialIntro";

export default function Home() {
  return (
    <>
      <Hero />
      <RecommendedTabs />
      <BestSellers />
      <CategoryCircles />
      <Advantages />
      <Testimonials />
      <EditorialIntro />
    </>
  );
}
