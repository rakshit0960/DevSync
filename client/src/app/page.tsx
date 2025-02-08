import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
