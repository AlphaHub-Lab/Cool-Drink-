import HeroSection from "@/components/home/HeroSection";
import NothingToHide from "@/components/home/NothingToHide";
import FeaturedCarousel from "@/components/home/FeaturedCarousel";
import VideoStorySection from "@/components/home/VideoStorySection";
import CinematicHomepage from "@/components/home/CinematicHomepage";
import WhyNoFilter from "@/components/home/WhyNoFilter";
import Testimonials from "@/components/home/Testimonials";
import ShopCTA from "@/components/home/ShopCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <NothingToHide />
      <FeaturedCarousel />
      <VideoStorySection />
      <CinematicHomepage />
      <WhyNoFilter />
      <Testimonials />
      <ShopCTA />
    </>
  );
}
