import { Wrench, Shield, Clock, Award } from "lucide-react"

const features = [
  {
    icon: Wrench,
    title: "Thiết bị hiện đại",
    description: "Trang bị công nghệ chẩn đoán và sửa chữa tiên tiến nhất",
  },
  {
    icon: Shield,
    title: "Bảo hành đảm bảo",
    description: "Cam kết bảo hành dài hạn cho mọi dịch vụ",
  },
  {
    icon: Clock,
    title: "Nhanh chóng",
    description: "Thời gian xử lý nhanh, không làm bạn chờ đợi lâu",
  },
  {
    icon: Award,
    title: "Chuyên nghiệp",
    description: "Đội ngũ kỹ thuật viên giàu kinh nghiệm và tận tâm",
  },
]

export default function FeaturesSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (

            <div
              key={index}
              className="group relative bg-background rounded-2xl p-8 border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-[3rem] transition-all group-hover:w-24 group-hover:h-24" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                  <Icon className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
