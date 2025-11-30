
import {Link} from "react-router-dom"
import { Wrench } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Wrench className="w-32 h-32 text-accent opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-accent">404</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold text-foreground mb-4">Không Tìm Thấy Trang</h1>
        <p className="text-lg text-muted-foreground mb-2">
          Rất tiếc! Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <p className="text-base text-muted-foreground mb-8">
          Giống như chiếc xe không có bánh, điều gì đó không đúng ở đây! 😊
        </p>

        {/* Buttons */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
          >
            Về Trang Chủ
          </Link>
          <Link
            to="/services"
            className="px-8 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-white transition-all"
          >
            Xem Dịch Vụ
          </Link>
        </div> */}

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-muted">
          <p className="text-sm text-muted-foreground mb-4">Cần giúp đỡ?</p>
          <Link to="/booking" className="text-accent font-semibold hover:underline">
            Liên hệ chúng tôi qua trang đặt lịch
          </Link>
        </div>
      </div>
    </div>
  )
}
