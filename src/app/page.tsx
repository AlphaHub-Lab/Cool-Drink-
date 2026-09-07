import HeroSection from "@/components/home/HeroSection";
import BrandStatement from "@/components/home/BrandStatement";
import MoodSelector from "@/components/home/MoodSelector";
import SplitShowcase from "@/components/home/SplitShowcase";
import WhatsInside from "@/components/home/WhatsInside";
import LiquidMotion from "@/components/home/LiquidMotion";
import SocialCTA from "@/components/home/SocialCTA";

export default function Home() {
  return (
    <div className="bg-background min-h-screen overflow-hidden">
      <HeroSection />
      <BrandStatement />
      <MoodSelector />
      <SplitShowcase />
      <LiquidMotion />
      <WhatsInside />
      <SocialCTA />
    </div>
  );
}
