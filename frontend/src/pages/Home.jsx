import HeroBanner from "../components/sections/home/hero-banner"
import AboutSection from "../components/sections/home/about-section"
import ServicesSection from "../components/sections/home/services"
import PromotionsSection from "../components/sections/home/promotions"
import StatisticsSection from "@/components/sections/home/statistics-section"
import SectionWrapper from "@/components/layout/section-wrapper"
import FeaturesSection from "@/components/sections/home/features-section"
import { BrandStorySection } from "@/components/sections/home/brandstory-section" 

const sections =[
        <FeaturesSection />,
        <AboutSection />,
        <StatisticsSection />,
        <BrandStorySection />,
        <ServicesSection />,
        <PromotionsSection />
]

export default function Home() {
  return (
    <main className="">
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
