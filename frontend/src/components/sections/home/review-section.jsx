const reviews = [
  {
    name: "Nguyễn Văn A",
    rating: 5,
    comment: "Dịch vụ rất chuyên nghiệp, kỹ thuật viên tận tình. Xe chạy mượt hơn sau khi bảo dưỡng!",
    vehicle: "Toyota Camry",
  },
  {
    name: "Trần Thị B",
    rating: 5,
    comment: "Giá cả hợp lý, chất lượng tốt. Sẽ quay lại lần tới chắc chắn.",
    vehicle: "Honda Civic",
  },
  {
    name: "Lê Văn C",
    rating: 5,
    comment: "Nhân viên lịch sự, chuyên nghiệp. Khuyên bạn bè đều sang đây.",
    vehicle: "Mazda 3",
  },
  {
    name: "Phạm Thị D",
    rating: 5,
    comment: "Xử lý vấn đề nhanh chóng, giải thích chi tiết. Rất hài lòng!",
    vehicle: "Hyundai i10",
  },
]

export default function ReviewsSection() {
  return (
    <section 
    // className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-muted/50"
    >
      <div className="text-center mb-16">
        {/* <div className="inline-block mb-6 px-4 py-2 rounded-full bg-accent/10 border border-accent text-accent text-sm font-semibold">
          Đánh giá khách hàng
        </div> */}
        <h2 className="text-4xl font-bold text-foreground mb-4">Khách hàng nói gì về chúng tôi</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review, index) => (
          <div key={index} className="bg-background rounded-lg p-8 border border-border">
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i} className="text-accent text-xl">
                  ★
                </span>
              ))}
            </div>

            <p className="text-foreground/80 mb-6 leading-relaxed italic">"{review.comment}"</p>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-sm text-foreground/60">{review.vehicle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
