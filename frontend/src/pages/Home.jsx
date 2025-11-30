import HeroBanner from "../components/sections/home/hero-banner"
import AboutSection from "../components/sections/home/about-section"
import ServicesSection from "../components/sections/home/services"
import PromotionsSection from "../components/sections/home/promotions"
import ReviewsSection from "../components/sections/home/review-section"
import StatisticsSection from "@/components/sections/home/statistics-section"
import SectionWrapper from "@/components/sections/layout/section-wrapper"

const sections =[
        <AboutSection />,
        <StatisticsSection />,
        <ServicesSection />,
        <PromotionsSection />
        // <ReviewsSection />
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroBanner />

     
       { sections.map((Section, index) => (
          <div key={index}>
            <SectionWrapper>
              {Section}
            </SectionWrapper>
          </div>
        ))}

      {/* <ReviewsSection /> */}
      {/* Nếu có section Liên Hệ */}
        {/* ContactSection hoặc nội dung liên hệ */}
    </main>
  )
}
