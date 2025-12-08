export default function AboutSection() {
  return (
    // <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <section >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
          
          {/* Left side - Image */}
          <div className="relative">
            <img
              src="/professional-garage-team-working-on-vehicle.png"
              alt="Garage team"
              className="rounded-2xl w-full h-96 object-cover shadow-lg "
            />
          </div>

          {/* Right side - Content */}
          <div>
          
            <h2 className="text-4xl font-bold text-foreground mb-6 leading-tight">Hơn 15 năm dịch vụ ô tô hàng đầu</h2>

            <p className="text-foreground/70 mb-6 leading-relaxed text-lg">
              Garage của chúng tôi được thành lập vào năm 2009 với mục tiêu cung cấp dịch vụ sửa chữa và bảo dưỡng ô tô
              chất lượng cao. Chúng tôi đã phục vụ hàng nghìn khách hàng hài lòng.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-3xl font-bold text-accent mb-2">5000+</h3>
                <p className="text-foreground/70">Khách hàng hài lòng</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-accent mb-2">50+</h3>
                <p className="text-foreground/70">Kỹ thuật viên chuyên nghiệp</p>
              </div>
            </div>

            <p className="text-foreground/70 mb-6 leading-relaxed text-lg">

              Với đội ngũ kỹ thuật viên được đào tạo bài bản và trang thiết bị tối tân, chúng tôi cam kết mang lại trải
              nghiệm dịch vụ tốt nhất cho mọi khách hàng.
            </p>

            {/* <button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200">
              Tìm hiểu thêm
            </button> */}
          </div>
        </div>

      </div>
    </section>
  )
}
