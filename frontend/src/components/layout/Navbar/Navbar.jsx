"use client"

import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Wrench, ChevronDown, LogOut, User } from "lucide-react"
import { AuthContext } from "@/context/AuthContext"
import { UserProfileDesktop, UserProfileMobile } from "@/components/common/userAvatar"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)

  const navLinks = [
    { href: "/services", label: "Dịch Vụ" },
    { href: "/product", label: "Sản Phẩm" },
    { href: "/promotions", label: "Khuyến Mãi" },
    { href: "/about", label: "Về Chúng Tôi" },
    { href: "/contact", label: "Liên Hệ" },
  ]

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    setIsOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__content">

          {/* Logo */}
          <a href="/" className="navbar__logo">
            <div className="navbar__logo-wrapper">
              <div className="navbar__logo-icon">
                <Wrench className="navbar__logo-icon-svg" />
              </div>
              <div className="navbar__logo-text">
                <span className="navbar__logo-title">Garage Đại Lộc</span>
                <span className="navbar__logo-subtitle">Garage Chuyên Nghiệp</span>
              </div>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="navbar__links">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="navbar__link">
                {link.label}
                <span className="navbar__link-underline" />
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="navbar__actions">
            {!user ? (
              <>
                <Link to="/register" className="navbar__button-secondary">
                  Đăng Ký
                </Link>
                <Link to="/login" className="navbar__button-primary">
                  Đăng Nhập
                </Link>
              </>
            ) : (
              <UserProfileDesktop
                user={user}
                isOpen={isProfileOpen}
                onToggle={() => setIsProfileOpen(!isProfileOpen)}
                onLogout={handleLogout}
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="navbar__menu-button"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="navbar__menu-icon" /> : <Menu className="navbar__menu-icon" />}
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

              <div className="navbar__mobile-divider"></div>

              <div className="navbar__mobile-actions">
                {!user ? (
                  <>
                    <Link to="/register" className="navbar__button-secondary-full">
                      Đăng Ký
                    </Link>
                    <Link to="/login" className="navbar__button-primary-full">
                      Đăng Nhập
                    </Link>
                  </>
                ) : (
                  <UserProfileMobile user={user} onLogout={handleLogout} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
