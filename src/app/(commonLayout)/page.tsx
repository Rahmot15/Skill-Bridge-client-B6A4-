import CTA from "@/components/modules/HomePages/CTA";
import FeaturedTutors from "@/components/modules/HomePages/featured-tutors";
import Features from "@/components/modules/HomePages/Features";
import Hero from "@/components/modules/HomePages/Hero";
import HowItWorks from "@/components/modules/HomePages/HowItWorks";
import Pricing from "@/components/modules/HomePages/Pricing";
import Stats from "@/components/modules/HomePages/Stats";
import Testimonials from "@/components/modules/HomePages/Testimonials";

  export default async function Home() {
  return (
    <div className="">
      <Hero/>
      <Stats/>
      <FeaturedTutors />
      <Features/>
      <HowItWorks/>
      <Pricing/>
      <Testimonials/>
      <CTA/>
    </div>
  );
}
