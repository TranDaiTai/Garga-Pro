"use client"
import {ServiceCard} from "@/components/ui/Card/index";
import { Link } from "react-router-dom"
import { servicesData } from "@/lib/services-data"
import { ArrowRight } from "lucide-react"

export default function Services() {
  return (
    <main className="services-page">
      {/* Header */}
      <section className="services-page__header">
        <div className="services-page__header-container">
          <h1 className="services-page__title">Các Dịch Vụ Của Chúng Tôi</h1>
          <p className="services-page__subtitle">
            Giải pháp bảo dưỡng và sửa chữa ô tô toàn diện
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-page__grid-section">
        <div className="services-page__grid-container">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </main>
  )
}
