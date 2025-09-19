'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useStore } from '@/lib/store'
import Image from 'next/image'

export default function Cart() {
  const [mounted, setMounted] = useState(false)
  const { cart, isCartOpen, isCartLoading, toggleCart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isCartOpen])

  if (!mounted || !isCartOpen) return null

  const total = getCartTotal()

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray bg-opacity-50" 
        onClick={toggleCart}
      />
      
      {/* Cart Sidebar */}
      <div className="absolute right-0 top-0 h-full w-96 bg-stone-50 shadow-xl overflow-hidden">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-stone-200">
            <h2 className="text-lg font-semibold text-stone-900">Shopping Cart</h2>
            <button
              onClick={toggleCart}
              className="p-1 hover:bg-stone-200 rounded-full transition-colors text-stone-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-stone-500">
                <ShoppingBag className="h-16 w-16 mb-4" />
                <p className="text-lg mb-2">Your cart is empty</p>
                <p className="text-sm text-center">Add some beautiful candles to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 bg-stone-100 p-3 rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-stone-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-stone-600">₹{item.price}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={isCartLoading}
                          className="p-1 hover:bg-stone-300 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-stone-700"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isCartLoading}
                          className="p-1 hover:bg-stone-300 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-stone-700"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <p className="text-sm font-semibold">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        disabled={isCartLoading}
                        className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-stone-200 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-stone-900">Total:</span>
                <span className="text-lg font-bold text-amber-800">
                  ₹{total.toLocaleString()}
                </span>
              </div>
              
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  className="w-full bg-amber-800 text-white py-3 px-4 rounded-lg hover:bg-amber-900 transition-colors font-medium block text-center"
                  onClick={toggleCart}
                >
                  Proceed to Checkout
                </Link>
                <button 
                  onClick={clearCart}
                  disabled={isCartLoading}
                  className="w-full bg-stone-200 text-stone-700 py-2 px-4 rounded-lg hover:bg-stone-300 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCartLoading ? 'Clearing...' : 'Clear Cart'}
                </button>
              </div>
              
              <p className="text-xs text-stone-500 text-center">
                Free shipping on orders above ₹999
              </p>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
