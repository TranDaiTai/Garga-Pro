import {ServiceCard} from "@/components/ui/Card_custom/index"
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





// export default function ServicesSection() {
//   return (
    
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//       <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-12 p">
//         {/* Left side - content */}
//         <div className="relative">
//            <h2 className="text-4xl font-bold text-foreground mb-6 leading-tight">Hơn 15 năm dịch vụ ô tô hàng đầu</h2>
//         </div>

//         {/* Right side - Content */}
//         <div>

//           <p className="text-foreground/70 mb-6 leading-relaxed text-lg">
//             Garage của chúng tôi được thành lập vào năm 2009 với mục tiêu cung cấp dịch vụ sửa chữa và bảo dưỡng ô tô
//             chất lượng cao. Chúng tôi đã phục vụ hàng nghìn khách hàng hài lòng.
//           </p>
//           <p className="text-foreground/70 leading-relaxed mb-6">
//             Với đội ngũ kỹ thuật viên được đào tạo bài bản và trang thiết bị tối tân, chúng tôi cam kết mang lại trải
//             nghiệm dịch vụ tốt nhất cho mọi khách hàng.
//           </p>

//         </div>
        
//       </div>
//     </div>
      
//   )
// }
