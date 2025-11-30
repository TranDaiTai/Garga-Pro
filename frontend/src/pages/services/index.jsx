

import {Link} from "react-router-dom"
import { servicesData } from "@/lib/services-data"
import { ArrowRight } from "lucide-react"

export default function Services() {
  return (
    <main className="min-h-screen bg-background">

      {/* Header */}
      <section className="bg-gradient-to-b from-orange-50 to-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">Các Dịch Vụ Của Chúng Tôi</h1>
          <p className="text-xl text-foreground/70">Giải pháp bảo dưỡng và sửa chữa ô tô toàn diện</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <Link key={service.id} to={`/services/${service.id}`} className="group">
              <div className="bg-background rounded-xl border border-border hover:border-accent overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-100 transition-colors duration-300">
                  <span className="text-6xl">{service.icon}</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-foreground/70 mb-4 flex-grow">{service.description}</p>
                  <div className="flex items-center text-accent font-semibold group-hover:gap-2 transition-all duration-300">
                    Xem chi tiết
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}
