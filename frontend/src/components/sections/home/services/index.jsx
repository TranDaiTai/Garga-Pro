import {ServiceCard} from "@/components/ui/Card/index"
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
    <section className="services">
      <div className="services__background" > 
        <div className="services__container"> 
      <div className="services__header">
        <h2 className="services__title">Dịch vụ chuyên nghiệp</h2>
        <p className="services__subtitle">
          Chúng tôi cung cấp các dịch vụ bảo dưỡng và sửa chữa ô tô toàn diện
        </p>
      </div>

      <div className="services__grid">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
      </div>
      </div>

    </section>
  )
}
