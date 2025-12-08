"use client"

export function BrandStorySection() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="animate-slideUp">
            {/* <div className="inline-block mb-6 px-4 py-2 rounded-full bg-accent/10 border border-accent text-accent text-sm font-semibold">
              Câu chuyện của chúng tôi
            </div> */}

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              ProGarage - Cùng bạn đến mọi hành trình
            </h2>

            <p className="text-lg text-foreground/70 mb-6">
              Từ năm 2010, ProGarage được thành lập với mục đích duy nhất: cung cấp dịch vụ sửa chữa và bảo dưỡng ô tô
              chất lượng cao nhất. Chúng tôi tin rằng một chiếc xe được chăm sóc kỹ lưỡng sẽ mang lại sự an toàn và
              thoải mái cho chủ nhân.
              <br />
              <br />
              Với đội ngũ kỹ thuật viên giàu kinh nghiệm, công nghệ hiện đại, và cam kết về chất lượng, chúng tôi đã
              phục vụ hàng ngàn khách hàng và trở thành địa chỉ tin cậy cho mọi nhu cầu bảo dưỡng xe của bạn.
            </p>

            {/* <p className="text-foreground/70 mb-8">
              Với đội ngũ kỹ thuật viên giàu kinh nghiệm, công nghệ hiện đại, và cam kết về chất lượng, chúng tôi đã
              phục vụ hàng ngàn khách hàng và trở thành địa chỉ tin cậy cho mọi nhu cầu bảo dưỡng xe của bạn.
            </p> */}

            {/* <a
              href="/about"
              className="inline-block px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30"
            >
              Tìm hiểu thêm về chúng tôi
            </a> */}
          </div>

          {/* Right: Images with skewed effect */}
          {/* <div className="animate-fadeIn relative h-96 hidden lg:block"> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
            
            {/* Top right image */}
            <div className="rounded-2xl overflow-hidden shadow-xl ">
              <img
                src="/professional-garage-technician-with-tools.jpg"
                alt="Technician"
                className="w-full object-cover"
              />
            </div>

            {/* Bottom left image */}
            <div className="rounded-2xl overflow-hidden shadow-xl ">
              <img
                src="/car-repair-service-garage.jpg"
                alt="Car Repair"
                className="w-full object-cover"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
