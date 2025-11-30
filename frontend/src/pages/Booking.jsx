
import { useState } from "react"
import { servicesData } from "@/lib/services-data"
import { Calendar, Clock, User, Mail, Phone, Car } from "lucide-react"

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceId: "",
    date: "",
    time: "",
    carModel: "",
    carPlate: "",
    notes: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Booking submitted:", formData)
    alert("Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      serviceId: "",
      date: "",
      time: "",
      carModel: "",
      carPlate: "",
      notes: "",
    })
  }

  return (
    <main className="min-h-screen bg-background">

      {/* Header */}
      <section className="bg-gradient-to-b from-orange-50 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">Đặt Lịch Hẹn</h1>
          <p className="text-xl text-foreground/70">Chọn dịch vụ và thời gian phù hợp cho bạn</p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form onSubmit={handleSubmit} className="bg-background rounded-xl border border-border shadow-lg p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên của bạn"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0123456789"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                required
              />
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Chọn dịch vụ</label>
              <select
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                required
              >
                <option value="">-- Chọn dịch vụ --</option>
                {servicesData.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                Ngày hẹn
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                Giờ hẹn
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                required
              />
            </div>

            {/* Car Model */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Car className="w-4 h-4 text-accent" />
                Hãng/Dòng xe
              </label>
              <input
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleChange}
                placeholder="VD: Toyota Camry 2020"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                required
              />
            </div>

            {/* Car Plate */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Biển số xe</label>
              <input
                type="text"
                name="carPlate"
                value={formData.carPlate}
                onChange={handleChange}
                placeholder="VD: 51A-12345"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-foreground mb-3">Ghi chú (tùy chọn)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Nhập bất kỳ ghi chú nào về dịch vụ bạn cần..."
              rows={4}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition-all duration-200 text-lg"
          >
            Đặt Lịch Ngay
          </button>

          <p className="text-center text-foreground/60 text-sm mt-4">
            Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận đặt lịch
          </p>
        </form>
      </section>

    </main>
  )
}
