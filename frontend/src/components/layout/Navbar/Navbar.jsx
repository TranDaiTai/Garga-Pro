import { useState } from "react"
import { Link } from 'react-router-dom'
import { Menu, X, Wrench, Phone } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/services", label: "Dịch Vụ" },
    { href: "/about", label: "Về Chúng Tôi" },
    { href: "/promotions", label: "Khuyến Mãi" },
    { href: "/reviews", label: "Đánh Giá" },
    { href: "/contact", label: "Liên Hệ" },
  ]

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__content">
          {/* Logo Block */}
          <a href="/" className="navbar__logo">
            <div className="navbar__logo-wrapper">
              <div className="navbar__logo-icon">
                <Wrench className="navbar__logo-icon-svg" />
              </div>
              <div className="navbar__logo-text">
                <span className="navbar__logo-title">ProGarage</span>
                <span className="navbar__logo-subtitle">Garage Chuyên Nghiệp</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links Block */}
          <div className="navbar__links">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="navbar__link"
              >
                {link.label}
                <span className="navbar__link-underline" />
              </a>
            ))}
          </div>

          {/* Desktop Actions Block */}
          <div className="navbar__actions">
            {/* <a
              href="tel:+84123456789"
              className="navbar__phone"
            >
              <Phone className="navbar__phone-icon" />
              <span className="navbar__phone-text">1800 1234</span>
            </a> */}
             <Link
              to="/register"
              className="navbar__phone"
            >
              Đăng Ký
            </Link>
            <Link
              to="/login"
              className="navbar__button"
            >
              Đăng Nhập
            </Link>
            
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="navbar__menu-button"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="navbar__menu-icon" />
            ) : (
              <Menu className="navbar__menu-icon" />
            )}
          </button>
        </div>

        {/* Mobile Menu Block */}
        {isOpen && (
          <div className="navbar__mobile-menu">
            <div className="navbar__mobile-content">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="navbar__mobile-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="navbar__mobile-actions">
                <Link
                  to="/register"
                  className="navbar__phone"
                  >
                    Đăng Ký
                </Link>
                <Link
                  to="/login"
                  className="navbar__button"
                >
                  Đăng Nhập
                </Link>
            
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}