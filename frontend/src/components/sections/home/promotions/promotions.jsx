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

function PromotionCard({ promotion }) {
  return (
    <div className="promotion-card">
      <div className="promotion-card__background">
        <div className="promotion-card__circle promotion-card__circle--top-right" />
        <div className="promotion-card__circle promotion-card__circle--bottom-left" />
      </div>
      
      <div className="promotion-card__content">
        <div className="promotion-card__discount-badge">
          <div className="promotion-card__discount-value">{promotion.discount}</div>
        </div>
        
        <h3 className="promotion-card__title">{promotion.title}</h3>
        <p className="promotion-card__description">{promotion.description}</p>
        
        <div className="promotion-card__footer">
          <p className="promotion-card__validity">{promotion.valid}</p>
          <div className="promotion-card__arrow">
            <svg className="promotion-card__arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}