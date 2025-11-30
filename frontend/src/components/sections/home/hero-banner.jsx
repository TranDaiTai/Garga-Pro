"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Chăm sóc xe của bạn như gia đình",
    description: "Dịch vụ bảo dưỡng định kỳ chuyên nghiệp với đội kỹ thuật viên giàu kinh nghiệm",
    image: "/modern-garage-bao-duong-xe.jpg",
    cta: "Đặt lịch bảo dưỡng",
  },
  {
    id: 2,
    title: "Khuyến mãi hot tháng này",
    description: "Giảm 30% dịch vụ sửa chữa động cơ cho khách hàng mới. Không giới hạn!",
    image: "/khuy-n-m-i-garage-th-ng.jpg",
    cta: "Xem chi tiết",
  },
  {
    id: 3,
    title: "Sửa chữa động cơ & hệ thống điện",
    description: "Công nghệ chẩn đoán hiện đại, sửa chữa nhanh chóng với bảo hành 6 tháng",
    image: "/sua-chua-dong-co-garage.jpg",
    cta: "Liên hệ tư vấn",
  },
  {
    id: 4,
    title: "Rửa xe & chăm sóc ngoại thất",
    description: "Sử dụng sản phẩm premium, bảo vệ sơn xe và làm sạch hoàn toàn",
    image: "/rua-xe-tham-soc-garage.jpg",
    cta: "Đặt lịch ngay",
  },
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlay(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 10000)
  }

  const slide = slides[currentSlide]

  return (
    <section
      className="relative w-full h-96 md:h-[500px] bg-foreground overflow-hidden group"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <div className="relative w-full h-full">
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background image overlay */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url(${s.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Content overlay */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 leading-tight max-w-3xl">
                {s.title}
              </h1>
              <p className="text-base md:text-lg text-background/90 mb-8 max-w-2xl leading-relaxed">{s.description}</p>
              <button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 hover:shadow-lg">
                {s.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-accent w-8" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
