// Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Wrench, Phone } from "lucide-react";
import "./navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/services", label: "Dịch Vụ" },
    { href: "/about", label: "Về Chúng Tôi" },
    { href: "/promotions", label: "Khuyến Mãi" },
    { href: "/reviews", label: "Đánh Giá" },
    { href: "/contact", label: "Liên Hệ" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* INNER */}
        <div className="navbar__content">
          {/* Logo */}
          <a href="/" className="navbar__logo link-as-flex">
            <div className="flex items-center gap-3">

              <div className="navbar__logo-icon">
              <Wrench className="navbar__logo-icon-svg" />
              </div>

              <div className="navbar__logo-text">
                <span className="navbar__logo-title">ProGarage</span>
                <span className="navbar__logo-subtitle">
                  Garage Chuyên Nghiệp
                </span>
              </div>

            </div>
           
          </a>

          {/* Desktop Links */}
          <div className="navbar__nav--desktop">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="navbar__link">
                {link.label}
                <span className="navbar__link-underline"></span>
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="navbar__actions--desktop">
            <a href="tel:+84123456789" className="navbar__phone">
              <Phone className="navbar__phone-icon" />
              <span className="navbar__phone-number">1800 1234</span>
            </a>

            <Link to="/booking" className="navbar__button">
              Đặt Lịch
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="navbar__menu-toggle"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="navbar__menu-toggle-icon" />
            ) : (
              <Menu className="navbar__menu-toggle-icon" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
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
            </div>

            <div className="navbar__mobile-actions">
              <a href="tel:+84123456789" className="navbar__mobile-phone">
                <Phone className="navbar__mobile-phone-icon" />
                Gọi
              </a>

              <button className="navbar__mobile-button">Đặt Lịch</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
