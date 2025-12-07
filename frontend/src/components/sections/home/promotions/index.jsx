import { PromotionCard } from "@/components/ui/Card_custom/index" 
const promotions = [
  {
    title: "Bảo dưỡng định kỳ",
    discount: "20%",
    description: "Giảm giá bảo dưỡng định kỳ (thay dầu, lọc, cảm biến)",
    valid: "Đến hết tháng 12/2025",
  },
  {
    title: "Thay lốp xe",
    discount: "15%",
    description: "Giảm giá khi thay bộ 4 lốp chính hãng",
    valid: "Đến hết tháng 12/2025",
  },
  {
    title: "Rửa xe chuyên nghiệp",
    discount: "Miễn phí",
    description: "Rửa xe miễn phí khi thực hiện dịch vụ sửa chữa trên 2 triệu đồng",
    valid: "Mỗi tuần thứ Bảy & Chủ nhật",
  },
]

export default function PromotionsSection() {
  return (
    <section className="promotions">
      <div className="promotions__background" />
      
      <div className="promotions__container">
        <div className="promotions__header">
          <h2 className="promotions__title">Khuyến mãi hot trong tháng</h2>
          <p className="promotions__subtitle">
            Nhận ngay ưu đãi hấp dẫn khi sử dụng dịch vụ của chúng tôi
          </p>
        </div>

        <div className="promotions__grid">
          {promotions.slice(0,3).map((promo, index) => (
            <PromotionCard key={index} promotion={promo} />
          ))}
        </div>
      </div>
    </section>
  )
}
