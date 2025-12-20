"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Wrench, ChevronDown, LogOut, User } from "lucide-react"
import {  useAuth } from "@/context/AuthContext"
import { UserProfileDesktop, UserProfileMobile } from "@/components/common/userAvatar"
import "./navbar.css"
import CartHeader from "./cartHeader"


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const {user , isLoading, logout} = useAuth(); 

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
  if ( isLoading ) {
    return (
      <div> 
      </div>
    ) 
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__content">

          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-wrapper">
              <div className="navbar__logo-icon">
                <Wrench className="navbar__logo-icon-svg" />
              </div>
              <div className="navbar__logo-text">
                <span className="navbar__logo-title">Garage Đại Lộc</span>
                <span className="navbar__logo-subtitle">Garage Chuyên Nghiệp</span>
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="navbar__links">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="navbar__link">
                {link.label}
                <span className="navbar__link-underline" />
              </Link>
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
               <>
                  <CartHeader>

                  </CartHeader>
                  <UserProfileDesktop
                  user={user}
                  isOpen={isProfileOpen}
                  onToggle={() => setIsProfileOpen(!isProfileOpen)}
                  onLogout={handleLogout}
                  />
               
                </>
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
                  <>
                  <CartHeader>

                  </CartHeader>
                  <UserProfileMobile user={user} onLogout={handleLogout} />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
