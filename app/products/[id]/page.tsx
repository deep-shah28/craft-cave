'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Star, Plus, Minus, ShoppingCart, Heart, Share, Play } from 'lucide-react'
import { useStore } from '@/lib/store'
import { sampleProducts } from '@/lib/data'
import HoverVideo from '@/components/HoverVideo'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart, toggleLike, isLiked } = useStore()
  
  const [mounted, setMounted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const product = sampleProducts.find(p => p.id === params.id)
  
  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-4">Product not found</h1>
          <button
            onClick={() => router.push('/products')}
            className="bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  // Simulate multiple media (images + videos)
  const mediaItems = [
    { type: 'image', src: product.image, alt: product.name },
    ...product.images.slice(1).map(img => ({ type: 'image', src: img, alt: product.name })),
    // Add video support (when available)
    ...(product.videos || []).map((video: string) => ({ type: 'video', src: video, alt: `${product.name} video` }))
  ]

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    toast.success(`Added ${quantity} ${product.name} to cart!`)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Product link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Media Gallery */}
          <div className="space-y-4">
            {/* Main Media Display */}
            <div className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden">
              {mediaItems[selectedImageIndex]?.type === 'video' ? (
                <HoverVideo
                  src={mediaItems[selectedImageIndex].src}
                  poster={product.image}
                  alt={mediaItems[selectedImageIndex].alt}
                  className="w-full h-full"
                />
              ) : (
                <Image
                  src={mediaItems[selectedImageIndex]?.src || product.image}
                  alt={mediaItems[selectedImageIndex]?.alt || product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>

            {/* Media Thumbnails */}
            {mediaItems.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {mediaItems.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-amber-800' : 'border-stone-200'
                    }`}
                  >
                    <Image
                      src={media.type === 'video' ? product.image : media.src}
                      alt={media.alt}
                      fill
                      className="object-cover"
                    />
                    {media.type === 'video' && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-stone-900 mb-2">{product.name}</h1>
                  <p className="text-stone-600">{product.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleLike(product.id)}
                    className={`p-2 rounded-full transition-colors ${
                      isLiked(product.id) ? 'bg-red-50 text-red-600' : 'bg-stone-100 text-stone-400'
                    }`}
                  >
                    <Heart className="h-5 w-5" fill={isLiked(product.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
                  >
                    <Share className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm text-stone-600 ml-2">(4.8) 124 reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-stone-900">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-stone-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">Description</h3>
              <p className="text-stone-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-stone-900">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {product.size && (
                  <div>
                    <span className="font-medium text-stone-900">Size:</span>
                    <span className="text-stone-600 ml-2">{product.size}</span>
                  </div>
                )}
                {product.fragrance && (
                  <div>
                    <span className="font-medium text-stone-900">Fragrance:</span>
                    <span className="text-stone-600 ml-2">{product.fragrance}</span>
                  </div>
                )}
                {product.burnTime && (
                  <div>
                    <span className="font-medium text-stone-900">Burn Time:</span>
                    <span className="text-stone-600 ml-2">{product.burnTime}</span>
                  </div>
                )}
                {product.material && (
                  <div>
                    <span className="font-medium text-stone-900">Material:</span>
                    <span className="text-stone-600 ml-2">{product.material}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-stone-900">Quantity:</span>
                <div className="flex items-center bg-white border-2 border-stone-400 rounded-lg shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-stone-700 hover:bg-stone-100 transition-colors border-r border-stone-300"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-stone-900 bg-stone-50 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-stone-700 hover:bg-stone-100 transition-colors border-l border-stone-300"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-amber-800 text-white py-3 px-6 rounded-lg hover:bg-amber-900 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-stone-600">
                {product.inStock ? 'In Stock - Ready to Ship' : 'Currently Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
