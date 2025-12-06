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
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
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
    <section className="hero-banner">
      <div className="hero-banner__slides">
        {slides.map((s, index) => (
          <SlideItem key={s.id} slide={s} isActive={index === currentSlide} />
        ))}
      </div>

      <NavigationButtons onPrev={prevSlide} onNext={nextSlide} />
      <SlideIndicators slides={slides} currentSlide={currentSlide} onGoToSlide={goToSlide} />
    </section>
  )
}

function SlideItem({ slide, isActive }) {
  return (
    <div className={`slide-item ${isActive ? 'slide-item--active' : ''}`}>
      <div 
        className="slide-item__background"
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      <div className="slide-item__overlay" />
      
      <div className="slide-item__content">
        <div className="slide-item__text">
          <h1 className="slide-item__title">{slide.title}</h1>
          <p className="slide-item__description">{slide.description}</p>
        </div>
        
        <div className="slide-item__actions">
          <button className="slide-item__button slide-item__button--primary">
            {slide.cta}
          </button>
          <button className="slide-item__button slide-item__button--secondary">
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </div>
  )
}

function NavigationButtons({ onPrev, onNext }) {
  return (
    <>
      <button
        onClick={onPrev}
        className="hero-banner__nav-button hero-banner__nav-button--prev"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={onNext}
        className="hero-banner__nav-button hero-banner__nav-button--next"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </>
  )
}

function SlideIndicators({ slides, currentSlide, onGoToSlide }) {
  return (
    <div className="hero-banner__indicators">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => onGoToSlide(index)}
          className={`hero-banner__indicator ${index === currentSlide ? 'hero-banner__indicator--active' : ''}`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}