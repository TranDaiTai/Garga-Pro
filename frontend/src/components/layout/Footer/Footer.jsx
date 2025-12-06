import "./footer.css";

// Footer.jsx
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Main grid */}
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__column">
            <h3 className="footer__title">Garage Pro</h3>
            <p className="footer__text">
              Chăm sóc xe của bạn như gia đình của chúng tôi
            </p>
          </div>

          {/* Services */}
          <div className="footer__column">
            <h4 className="footer__subtitle">Dịch vụ</h4>
            <ul className="footer__list">
              <li><a href="#" className="footer__link">Bảo dưỡng định kỳ</a></li>
              <li><a href="#" className="footer__link">Sửa chữa động cơ</a></li>
              <li><a href="#" className="footer__link">Rửa xe</a></li>
              <li><a href="#" className="footer__link">Thay phụ tùng</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__column">
            <h4 className="footer__subtitle">Liên hệ</h4>
            <ul className="footer__list">
              <li className="footer__text">Địa chỉ: 123 Đường Cao Bằng, TP.HCM</li>
              <li className="footer__text">Điện thoại: 0123 456 789</li>
              <li className="footer__text">Email: info@garagepro.com</li>
            </ul>
          </div>

          {/* Hours */}
          <div className="footer__column">
            <h4 className="footer__subtitle">Giờ làm việc</h4>
            <ul className="footer__list">
              <li className="footer__text">Thứ Hai - Thứ Sáu: 8:00 - 18:00</li>
              <li className="footer__text">Thứ Bảy: 8:00 - 16:00</li>
              <li className="footer__text">Chủ nhật: Đóng cửa</li>
            </ul>
          </div>
        </div>

        {/* /.footer__grid */}

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2025 Garage Pro. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}