"use client";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { Footer } from "@/components/layout/footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Ensure scroll position is at top on mount
    window.scrollTo(0, 0);
  }, []);

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
