"use client"

import { createContext, useContext, useEffect, useState } from "react"



const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [loading, setIsLoading]= useState(false)

  useEffect(()=>{
  const fetchLocalStorage = () =>{
    setIsLoading(true)
    const cart = JSON.parse(localStorage.getItem('cart_user')) ; 
    if ( cart) setItems(prev => [...prev,...cart]) 
    setIsLoading(false)
  }
  fetchLocalStorage() ;
  },[])

  const addToCart = (newItem) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item,
        )
      }
      return [...prev, newItem]
    })
    localStorage.setItem('cart_user', JSON.stringify(items))
  }

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    localStorage.setItem('cart_user', items)

  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    localStorage.setItem('cart_user', JSON.stringify(items))


  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem('cart_user')


  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
