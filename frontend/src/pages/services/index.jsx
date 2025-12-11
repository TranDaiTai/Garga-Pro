"use client"

import { useState, useMemo } from "react"
import { Wrench, Search, Clock } from "lucide-react"
import "./index.css"

const SAMPLE_SERVICES = [
  {
    id: 1,
    name: "Sửa chữa động cơ",
    category: "Sửa chữa chính",
    price: 500000,
    duration: "2-4 giờ",
    image: "/motor-oil-automotive.jpg",
    description: "Kiểm tra, sửa chữa và bảo dưỡng toàn bộ hệ thống động cơ của xe",
  },
  {
    id: 2,
    name: "Bảo dưỡng định kỳ",
    category: "Bảo dưỡng",
    price: 300000,
    duration: "1-2 giờ",
    image: "/tire-wheel-automotive.jpg",
    description: "Thay dầu, kiểm tra lọc không khí, chất lỏng hệ thống",
  },
  {
    id: 3,
    name: "Sửa chữa hệ thống phanh",
    category: "Sửa chữa chính",
    price: 700000,
    duration: "1-3 giờ",
    image: "/brake-disc-pads.jpg",
    description: "Kiểm tra, sửa chữa phanh, thay phanh đĩa hoặc phanh tang",
  },
  {
    id: 4,
    name: "Sửa chữa hệ thống điện",
    category: "Sửa chữa chính",
    price: 400000,
    duration: "1.5-3 giờ",
    image: "/car-battery.png",
    description: "Sửa chữa pin, máy phát điện, hệ thống đánh lửa",
  },
  {
    id: 5,
    name: "Cân bằng và thay lốp",
    category: "Bảo dưỡng",
    price: 250000,
    duration: "1 giờ",
    image: "/alloy-wheels-rim.jpg",
    description: "Cân bằng bánh xe, thay lốp, kiểm tra áp suất",
  },
  {
    id: 6,
    name: "Bảo dưỡng hệ thống làm mát",
    category: "Bảo dưỡng",
    price: 350000,
    duration: "1-2 giờ",
    image: "/coolant-engine.jpg",
    description: "Kiểm tra, vệ sinh và bổ sung chất lỏng làm mát",
  },
  {
    id: 7,
    name: "Sửa chữa hệ thống gầm",
    category: "Sửa chữa chính",
    price: 800000,
    duration: "3-5 giờ",
    image: "/side-mirror-automotive.jpg",
    description: "Kiểm tra phanh treo, giảm xóc, cò ro",
  },
  {
    id: 8,
    name: "Vệ sinh nội thất",
    category: "Dịch vụ khác",
    price: 150000,
    duration: "1-2 giờ",
    image: "/car-floor-mat.jpg",
    description: "Vệ sinh ghế, sàn, vô lăng, xóa mùi",
  },
  {
    id: 9,
    name: "Sơn sửa chữa",
    category: "Dịch vụ khác",
    price: 600000,
    duration: "2-4 giờ",
    image: "/tire-wheel-automotive.jpg",
    description: "Sơn sửa chữa xe, khắc phục trầy xước",
  },
]

const CATEGORIES = ["Tất cả", "Sửa chữa chính", "Bảo dưỡng", "Dịch vụ khác"]

const PRICE_RANGES = [
  { label: "Tất cả", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Dưới 300K", min: 0, max: 300000 },
  { label: "300K - 500K", min: 300000, max: 500000 },
  { label: "500K - 800K", min: 500000, max: 800000 },
  { label: "Trên 800K", min: 800000, max: Number.POSITIVE_INFINITY },
]

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedPrice, setSelectedPrice] = useState("Tất cả")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredServices = useMemo(() => {
    const priceRange = PRICE_RANGES.find((range) => range.label === selectedPrice)

    return SAMPLE_SERVICES.filter((service) => {
      const categoryMatch = selectedCategory === "Tất cả" || service.category === selectedCategory
      const priceMatch = service.price >= priceRange.min && service.price <= priceRange.max
      const searchMatch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())

      return categoryMatch && priceMatch && searchMatch
    })
  }, [selectedCategory, selectedPrice, searchTerm])

  return (
    <div className="min-h-screen bg-background">

      <div className="services__header">
        <div className="services__container">
          <h1 className="services__title">Dịch Vụ</h1>
          <p className="services__subtitle">Các dịch vụ sửa chữa và bảo dưỡng xe chuyên nghiệp với đội thợ lành nghề</p>
        </div>
      </div>

      <div className="services__container">
        <div className="services__filters">
          <div className="services__filter-group flex-1">
            <Search className="w-5 h-5 text-muted-foreground absolute ml-3" />
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground transition-colors duration-200 hover:border-accent focus:border-accent focus:outline-none"
            />
          </div>

          <div className="services__filter-group">
            <label htmlFor="category" className="services__filter-label">
              Danh mục:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="services__filter-select"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="services__filter-group">
            <label htmlFor="price" className="services__filter-label">
              Giá:
            </label>
            <select
              id="price"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="services__filter-select"
            >
              {PRICE_RANGES.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredServices.length > 0 ? (
          <div className="services__grid">
            {filteredServices.map((service) => (
              <div key={service.id} className="services__card">
                <div className="services__image">
                  <img src={service.image || "/placeholder.svg"} alt={service.name} className="services__image-img" />
                </div>
                <div className="services__content">
                  <p className="services__category">{service.category}</p>
                  <h3 className="services__name">{service.name}</h3>
                  <p className="services__description">{service.description}</p>
                  <div className="services__info">
                    <div className="services__info-item">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  <div className="services__footer">
                    <span className="services__price">{service.price.toLocaleString("vi-VN")} ₫</span>
                    <button className="services__button">
                      <Wrench className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="services__empty">
            <div className="services__empty-icon">
              <Wrench className="w-full h-full" />
            </div>
            <p className="services__empty-text">Không tìm thấy dịch vụ phù hợp</p>
          </div>
        )}
      </div>
    </div>
  )
}
