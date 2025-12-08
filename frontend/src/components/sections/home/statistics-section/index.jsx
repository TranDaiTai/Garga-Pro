"use client"



import { useEffect, useState, useRef } from "react"
import { Wrench, Users, Star, Car, MapPin, CheckCircle } from "lucide-react"


const stats = [
  {
    value: 15,
    label: "Năm kinh nghiệm",
    sublabel: "Phục vụ với chất lượng tuyệt vời",
    suffix: "+",
    icon: <Wrench className="w-8 h-8" />,
  },
  {
    value: 5000,
    label: "Khách hàng",
    sublabel: "Đã tin tưởng dịch vụ của chúng tôi",
    suffix: "+",
    icon: <Users className="w-8 h-8" />,
  },
  {
    value: 98,
    label: "Hài lòng",
    sublabel: "Tỷ lệ khách hàng hài lòng",
    suffix: "%",
    icon: <Star className="w-8 h-8" />,
  },
  {
    value: 500,
    label: "Xe được bảo dưỡng",
    sublabel: "Hàng tháng chúng tôi phục vụ",
    suffix: "+",
    icon: <Car className="w-8 h-8" />,
  },
  {
    value: 8,
    label: "Năm hoạt động",
    sublabel: "Tại các địa điểm khác nhau",
    suffix: "+",
    icon: <MapPin className="w-8 h-8" />,
  },
  {
    value: 100,
    label: "Dịch vụ hoàn hảo",
    sublabel: "Với đảm bảo chất lượng cao",
    suffix: "%",
    icon: <CheckCircle className="w-8 h-8" />,
  },
]

function Counter({ target, suffix, duration = 1000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return (
    <div ref={ref}>
      <div className="text-2xl md:text-3xl font-bold text-accent">
        {count}
        {suffix}
      </div>
    </div>
  )
}

export default function StatisticsSection() {
  return (
    <section 
    // className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-muted"
    >
   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">ProGarage & những con số</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Chúng tôi tự hào với những thành tích đạt được qua nhiều năm phục vụ khách hàng với tâm huyết
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-8 rounded-xl bg-background border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 "
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Icon with accent color */}
              <div className="text-accent mb-4">{stat.icon}</div>

              {/* Counter */}
              <Counter target={stat.value} suffix={stat.suffix} />

              {/* Labels */}
              <p className="text-foreground font-semibold mt-4">{stat.label}</p>
              <p className="text-foreground/60 text-sm text-center mt-2">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

