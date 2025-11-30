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
    <section 
    // className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-muted/50"
    >
      <div className="text-center mb-16">
        {/* <div className="inline-block mb-6 px-4 py-2 rounded-full bg-accent/10 border border-accent text-accent text-sm font-semibold">
          Dịch vụ
        </div> */}
        <h2 className="text-4xl font-bold text-foreground mb-4">Dịch vụ chuyên nghiệp</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
          Chúng tôi cung cấp các dịch vụ bảo dưỡng và sửa chữa ô tô toàn diện
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-background rounded-lg p-8 border border-border hover:shadow-lg hover:border-accent transition-all duration-300"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
            <p className="text-foreground/70 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
