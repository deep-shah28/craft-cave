'use client'

import { useState, useEffect } from 'react'
import { X, Heart, ShoppingCart } from 'lucide-react'
import { useStore, Product } from '@/lib/store'
import { sampleProducts } from '@/lib/data'
import Image from 'next/image'

export default function LikesModal() {
  const [mounted, setMounted] = useState(false)
  const { 
    likedItems, 
    isLikesOpen, 
    isLikesLoading, 
    toggleLikes, 
    removeFromLikes, 
    addToCart,
    isCartLoading
  } = useStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isLikesOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isLikesOpen])

  if (!mounted || !isLikesOpen) return null

  // Get product details for liked items
  const likedProducts = sampleProducts.filter(product => likedItems.includes(product.id))

  const handleAddToCart = async (product: Product) => {
    await addToCart(product)
  }

  const handleRemoveFromLikes = async (productId: string) => {
    await removeFromLikes(productId)
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-opacity-50" 
        onClick={toggleLikes}
      />
      
      {/* Likes Sidebar */}
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl overflow-hidden">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500 fill-current" />
              <h2 className="text-lg font-semibold text-gray-900">Liked Items</h2>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                {likedItems.length}
              </span>
            </div>
            <button
              onClick={toggleLikes}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors color-black"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {isLikesLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              </div>
            ) : likedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                <Heart className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No liked items yet</h3>
                <p className="text-gray-500 text-sm">
                  Items you like will appear here. Start browsing to find products you love!
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {likedProducts.map((product) => (
                  <div key={product.id} className="flex space-x-3 bg-gray-50 rounded-lg p-3">
                    <div className="relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-amber-600">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isCartLoading}
                        className="p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-xs disabled:opacity-50"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleRemoveFromLikes(product.id)}
                        disabled={isLikesLoading}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-xs disabled:opacity-50"
                        title="Remove from Likes"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {likedProducts.length > 0 && (
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => {
                  likedProducts.forEach((product: Product) => handleAddToCart(product))
                }}
                disabled={isCartLoading}
                className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCartLoading ? 'Adding...' : 'Add All to Cart'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
