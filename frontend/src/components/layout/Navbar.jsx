
import { useState } from "react"
import {Link} from 'react-router-dom';
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
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex-shrink-0 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/30">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-lg font-bold text-gray-900">ProGarage</span>
                <span className="text-xs text-orange-600 font-medium">Garage Chuyên Nghiệp</span>
              </div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+84123456789"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">1800 1234</span>
            </a>
            {/* <button className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium text-sm hover:bg-orange-700 transition-all duration-200 hover:shadow-lg hover:shadow-orange-600/30">
              Đặt Lịch
            </button> */}
              <Link
              to="/booking"
              className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium text-sm hover:bg-orange-700 transition-all duration-200 hover:shadow-lg hover:shadow-orange-600/30"
            >
              Đặt Lịch
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-orange-200">
            <div className="flex flex-col gap-3 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 pt-2 border-t border-orange-200 mt-2">
                <a
                  href="tel:+84123456789"
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Gọi
                </a>
                <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium text-sm hover:bg-orange-700 transition-all duration-200">
                  Đặt Lịch
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
