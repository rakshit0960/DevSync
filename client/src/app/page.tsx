import { HeroSection } from '@/components/home/hero-section'
import { FeaturesSection } from '@/components/home/features-section'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
