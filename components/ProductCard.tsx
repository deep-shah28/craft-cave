'use client'

import { useState, useCallback, memo } from 'react'
import Image from 'next/image'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import { Product, useStore } from '@/lib/store'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

const ProductCard = memo(({ product }: ProductCardProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addToCart, toggleLike, isLiked: checkIsLiked, isLikesLoading } = useStore()
  const isLiked = checkIsLiked(product.id)

  const handleAddToCart = useCallback(async () => {
    if (isAddingToCart) return
    
    setIsAddingToCart(true)
    try {
      await addToCart(product)
      toast.success('Added to cart!', {
        duration: 2000,
        position: 'bottom-right',
      })
    } catch (error) {
      toast.error('Failed to add to cart. Please try again.', {
        duration: 2000,
        position: 'bottom-right',
      })
    } finally {
      setIsAddingToCart(false)
    }
  }, [addToCart, product, isAddingToCart])

  const handleLikeToggle = useCallback(async () => {
    try {
      await toggleLike(product.id)
      toast.success(isLiked ? 'Removed from likes' : 'Added to likes!', {
        duration: 2000,
        position: 'bottom-right',
      })
    } catch (error) {
      toast.error('Failed to update likes. Please try again.', {
        duration: 2000,
        position: 'bottom-right',
      })
    }
  }, [toggleLike, product.id, isLiked])

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-stone-50 rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            -{discountPercentage}%
          </div>
        )}
        
        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-stone-50 text-stone-900 px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleLikeToggle}
            disabled={isLikesLoading}
            className={`p-2 rounded-full transition-colors disabled:opacity-50 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-stone-50 text-stone-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className="h-4 w-4" fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 bg-stone-50 text-stone-600 rounded-full hover:bg-stone-100 transition-colors">
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-amber-800 font-medium uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-stone-900 mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-stone-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Product Details */}
        <div className="flex justify-between items-center text-xs text-stone-500 mb-3">
          <span>🕯️ {product.burnTime}</span>
          <span>📏 {product.size}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-stone-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-stone-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAddingToCart}
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
            product.inStock && !isAddingToCart
              ? 'bg-amber-800 text-white hover:bg-amber-900'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>
            {!product.inStock 
              ? 'Out of Stock' 
              : isAddingToCart 
                ? 'Adding...' 
                : 'Add to Cart'
            }
          </span>
        </button>
      </div>
    </motion.div>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
