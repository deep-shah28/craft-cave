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
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
  const [selectedDecorations, setSelectedDecorations] = useState<string[]>([])
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isSwipeTransition, setIsSwipeTransition] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
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

  // Calculate dynamic price based on selections
  const getCurrentPrice = () => {
    let basePrice = product.price
    
    // If there are size variants, use the selected size price
    if (product.variants?.sizes) {
      const selectedSize = product.variants.sizes[selectedSizeIndex]
      basePrice = selectedSize.price
    }
    
    // Add decoration prices
    const decorationPrice = selectedDecorations.reduce((total, decorationName) => {
      const decoration = product.variants?.decorations?.find(d => d.name === decorationName)
      return total + (decoration?.price || 0)
    }, 0)
    
    return basePrice + decorationPrice
  }

  const toggleDecoration = (decorationName: string) => {
    setSelectedDecorations(prev => 
      prev.includes(decorationName) 
        ? prev.filter(name => name !== decorationName)
        : [...prev, decorationName]
    )
  }

  // Swipe detection functions
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && selectedImageIndex < mediaItems.length - 1) {
      setIsSwipeTransition(true)
      setSelectedImageIndex(selectedImageIndex + 1)
      setTimeout(() => setIsSwipeTransition(false), 300)
    }
    if (isRightSwipe && selectedImageIndex > 0) {
      setIsSwipeTransition(true)
      setSelectedImageIndex(selectedImageIndex - 1)
      setTimeout(() => setIsSwipeTransition(false), 300)
    }
  }

  const handleAddToCart = () => {
    const currentPrice = getCurrentPrice()
    const productVariant = {
      ...product,
      price: currentPrice,
      selectedVariants: {
        size: product.variants?.sizes?.[selectedSizeIndex],
        decorations: selectedDecorations.map(name => 
          product.variants?.decorations?.find(d => d.name === name)
        ).filter(Boolean)
      }
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(productVariant)
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
            onClick={() => router.push('/products')}
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
            <div 
              className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {mediaItems[selectedImageIndex]?.type === 'video' ? (
                <HoverVideo
                  src={mediaItems[selectedImageIndex].src}
                  poster={product.image}
                  alt={mediaItems[selectedImageIndex].alt}
                  className={`w-full h-full transition-opacity duration-300 ${isSwipeTransition ? 'opacity-75' : 'opacity-100'}`}
                />
              ) : (
                <Image
                  src={mediaItems[selectedImageIndex]?.src || product.image}
                  alt={mediaItems[selectedImageIndex]?.alt || product.name}
                  fill
                  className={`object-cover hover:scale-105 transition-all duration-300 ${isSwipeTransition ? 'opacity-75 scale-95' : 'opacity-100 scale-100'}`}
                />
              )}
              
              {/* Navigation Dots for Mobile */}
              {mediaItems.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 md:hidden">
                  {mediaItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        selectedImageIndex === index 
                          ? 'bg-white shadow-lg' 
                          : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              {/* Swipe Hint for Mobile */}
              {mediaItems.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full md:hidden">
                  {selectedImageIndex + 1}/{mediaItems.length}
                </div>
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
                    {media.type === 'video' ? (
                      <video
                        src={media.src}
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                    ) : (
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        className="object-cover"
                      />
                    )}
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

            {/* Variants Section */}
            {product.variants && (
              <div className="space-y-6">
                {/* Size Selection */}
                {product.variants.sizes && (
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900 mb-3">Choose Size</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {product.variants.sizes.map((sizeOption, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedSizeIndex(index)}
                          className={`relative p-4 border-2 rounded-lg transition-all duration-200 ${
                            selectedSizeIndex === index
                              ? 'border-amber-800 bg-amber-50 ring-2 ring-amber-200'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div className="text-center">
                            <div className="font-semibold text-stone-900">{sizeOption.label}</div>
                            <div className="text-sm text-stone-600 mt-1">{sizeOption.size}</div>
                            <div className="text-lg font-bold text-amber-800 mt-2">₹{sizeOption.price}</div>
                          </div>
                          {selectedSizeIndex === index && (
                            <div className="absolute -top-2 -right-2 bg-amber-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                              ✓
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Decoration Options */}
                {product.variants.decorations && (
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900 mb-3">Add Decorations</h3>
                    <div className="space-y-3">
                      {product.variants.decorations.map((decoration, index) => (
                        <label
                          key={index}
                          className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-stone-50"
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedDecorations.includes(decoration.name)}
                              onChange={() => toggleDecoration(decoration.name)}
                              className="w-5 h-5 text-amber-800 border-stone-300 rounded focus:ring-amber-500"
                            />
                            <div>
                              <div className="font-medium text-stone-900">{decoration.name}</div>
                              <div className="text-sm text-stone-600">🌼 Beautiful hand-placed decoration</div>
                            </div>
                          </div>
                          <div className="text-lg font-semibold text-amber-800">+₹{decoration.price}</div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-stone-900">₹{getCurrentPrice().toLocaleString()}</span>
                {product.originalPrice && product.originalPrice > getCurrentPrice() && (
                  <>
                    <span className="text-xl text-stone-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                      {Math.round(((product.originalPrice - getCurrentPrice()) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              {product.variants?.sizes && selectedDecorations.length > 0 && (
                <div className="text-sm text-stone-600">
                  <div>Base: ₹{product.variants.sizes[selectedSizeIndex].price}</div>
                  <div>Decorations: +₹{selectedDecorations.reduce((total, name) => {
                    const decoration = product.variants?.decorations?.find(d => d.name === name)
                    return total + (decoration?.price || 0)
                  }, 0)}</div>
                </div>
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
