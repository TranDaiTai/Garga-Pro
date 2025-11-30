export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Garage Pro</h3>
            <p className="text-background/70">Chăm sóc xe của bạn như gia đình của chúng tôi</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#" className="hover:text-background transition">
                  Bảo dưỡng định kỳ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Sửa chữa động cơ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Rửa xe
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Thay phụ tùng
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-background/70">
              <li>Địa chỉ: 123 Đường Cao Bằng, TP.HCM</li>
              <li>Điện thoại: 0123 456 789</li>
              <li>Email: info@garagepro.com</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Giờ làm việc</h4>
            <ul className="space-y-2 text-background/70">
              <li>Thứ Hai - Thứ Sáu: 8:00 - 18:00</li>
              <li>Thứ Bảy: 8:00 - 16:00</li>
              <li>Chủ nhật: Đóng cửa</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/70">
          <p>&copy; 2025 Garage Pro. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
