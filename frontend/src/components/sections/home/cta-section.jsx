import { Link } from "react-router-dom"
import { Phone, Calendar, MapPin } from "lucide-react"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-700" />
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/600')] opacity-10 bg-cover bg-center" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sẵn sàng trải nghiệm dịch vụ tốt nhất?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Đặt lịch hẹn ngay hôm nay và nhận ưu đãi đặc biệt cho khách hàng mới
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
          <Link
            to="/booking"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-accent rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:shadow-xl hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            Đặt Lịch Ngay
          </Link>
          <a
            href="tel:18001234"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-200 border-2 border-white"
          >
            <Phone className="w-5 h-5" />
            Hotline: 1800 1234
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="font-semibold mb-1">Gọi ngay</h4>
            <p className="text-white/80 text-sm">Thứ 2 - Thứ 7: 8:00 - 18:00</p>
          </div>
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-semibold mb-1">Ghé thăm</h4>
            <p className="text-white/80 text-sm">123 Đường Cao Bằng, TP.HCM</p>
          </div>
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="font-semibold mb-1">Đặt lịch online</h4>
            <p className="text-white/80 text-sm">Nhanh chóng & tiện lợi</p>
          </div>
        </div>
      </div>
    </section>
  )
}
