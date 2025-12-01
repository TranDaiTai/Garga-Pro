const services = [
  {
    icon: "🔧",
    title: "Sửa chữa động cơ",
    description: "Sửa chữa và bảo dưỡng các hệ thống động cơ, hộp số với chất lượng tốt nhất",
  },
  {
    icon: "⚙️",
    title: "Bảo dưỡng định kỳ",
    description: "Thay dầu, lọc không khí, kiểm tra hệ thống để xe luôn trong tình trạng tốt",
  },
  {
    icon: "🔌",
    title: "Sửa chữa hệ thống điện",
    description: "Sửa chữa bình acquy, alternator, hệ thống đánh lửa và các thiết bị điện",
  },
  {
    icon: "🛞",
    title: "Thay lốp & các phụ tùng",
    description: "Cung cấp và lắp đặt lốp xe, phanh, và các phụ tùng chính hãng",
  },
  {
    icon: "🧼",
    title: "Rửa xe & chi tiết",
    description: "Rửa xe chuyên nghiệp, wax, phủ nano và dịch vụ chi tiết xe",
  },
  {
    icon: "🩺",
    title: "Kiểm tra toàn diện",
    description: "Kiểm tra định kỳ toàn bộ hệ thống xe để phát hiện sớm các vấn đề",
  },
]

export default function ServicesSection() {
  return (
    <section>
      <div className="text-center mb-16">
        <div className="inline-block mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-semibold">
          Dịch vụ của chúng tôi
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Dịch vụ chuyên nghiệp</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
          Chúng tôi cung cấp các dịch vụ bảo dưỡng và sửa chữa ô tô toàn diện
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl p-8 border border-border hover:shadow-2xl hover:border-accent transition-all duration-300 hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">{service.title}</h3>
              <p className="text-foreground/70 leading-relaxed mb-4">{service.description}</p>
              <div className="flex items-center text-accent font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Xem chi tiết
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
