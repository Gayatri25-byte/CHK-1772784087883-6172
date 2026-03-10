import Navbar from "@/components/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeatureCards from "@/components/landing/FeatureCards";
import WardrobeDemo from "@/components/landing/WardrobeDemo";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeatureCards />
      <WardrobeDemo />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
