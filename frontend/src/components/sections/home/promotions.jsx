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
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-transparent opacity-50 rounded-3xl" />

      <div className="relative">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-semibold">
            Ưu đãi đặc biệt
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Khuyến mãi hot trong tháng</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Nhận ngay ưu đãi hấp dẫn khi sử dụng dịch vụ của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border-2 border-accent overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 group-hover:w-40 group-hover:h-40 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full -ml-12 -mb-12" />

              <div className="relative z-10">
                <div className="inline-block px-4 py-2 bg-accent/10 rounded-lg mb-4">
                  <div className="text-4xl font-bold text-accent">{promo.discount}</div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">{promo.title}</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">{promo.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-sm text-foreground/60">{promo.valid}</p>
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                    <svg className="w-4 h-4 text-accent group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
