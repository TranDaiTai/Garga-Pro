import HeroBanner from "../components/sections/home/hero-banner"
import AboutSection from "../components/sections/home/about-section"
import ServicesSection from "../components/sections/home/services"
import PromotionsSection from "../components/sections/home/promotions"
import ReviewsSection from "../components/sections/home/review-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroBanner />
      <AboutSection />
      <ServicesSection />
      <PromotionsSection />
      <ReviewsSection />
      {/* Nếu có section Liên Hệ */}
        {/* ContactSection hoặc nội dung liên hệ */}
    </main>
  )
}
