import {Link,useParams} from "react-router-dom"
import { servicesData } from "@/lib/services-data"
import { ArrowLeft, Check } from "lucide-react"

export default function ServiceDetail() {
  const params = useParams()
  const serviceId = Number.parseInt(params.id || "")
  const service = servicesData.find((s) => s.id === serviceId)

  if (!service) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Dịch vụ không được tìm thấy</h1>
          <Link to="/services" className="text-accent font-semibold hover:underline">
            Quay lại danh sách dịch vụ
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-border">
        <Link to="/services" className="inline-flex items-center text-accent font-semibold hover:underline gap-2">
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách dịch vụ
        </Link>
      </div>

      {/* Service Detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="flex items-center">
            <div className="w-full aspect-square bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center">
              <span className="text-9xl">{service.icon}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-foreground mb-6">{service.title}</h1>

            <div className="mb-8 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground/60 uppercase mb-1">Giá dịch vụ</h3>
                <p className="text-2xl font-bold text-accent">{service.price}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground/60 uppercase mb-1">Thời gian hoàn thành</h3>
                <p className="text-lg font-semibold text-foreground">{service.duration}</p>
              </div>
            </div>

            <p className="text-lg text-foreground/80 leading-relaxed mb-8">{service.fullDescription}</p>

            <Link
              to="/booking"
              className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200 text-center text-lg"
            >
              Đặt Lịch Ngay
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-orange-50 rounded-xl p-12 border border-orange-200">
          <h2 className="text-3xl font-bold text-foreground mb-8">Lợi ích của dịch vụ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Check className="w-6 h-6 text-accent" />
                </div>
                <p className="text-lg text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
