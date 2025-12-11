"use client"

import {Link} from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"

function CartHeader() {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <Link to="/cart" className="relative p-2 text-foreground hover:text-accent transition-colors" title="Giỏ hàng">
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  )
}

export default CartHeader
