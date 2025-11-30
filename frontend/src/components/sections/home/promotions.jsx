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
    <section 
    // className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="text-center mb-16">
        {/* <div className="inline-block mb-6 px-4 py-2 rounded-full bg-accent/10 border border-accent text-accent text-sm font-semibold">
          Khuyến mãi
        </div> */}
        <h2 className="text-4xl font-bold text-foreground mb-4">Ưu đãi và khuyến mãi đặc biệt</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promotions.map((promo, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-8 border-2 border-accent overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16" />

            <div className="relative z-10">
              <div className="text-5xl font-bold text-accent mb-2">{promo.discount}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">{promo.title}</h3>
              <p className="text-foreground/70 mb-4 leading-relaxed">{promo.description}</p>
              <p className="text-sm text-foreground/50">{promo.valid}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
