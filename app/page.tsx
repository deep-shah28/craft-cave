'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Truck, Shield, Headphones, ArrowRight, Flame } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { sampleProducts } from '@/lib/data'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const featuredProducts = sampleProducts.slice(0, 4)

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="bg-gray-200 h-96 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-50 to-amber-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Flame className="h-8 w-8 text-amber-800 mr-2" />
                <span className="text-sm font-semibold text-amber-800 uppercase tracking-wide">
                  Premium Handmade Gifts & Decor
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-6 leading-tight">
                Illuminate Your Space with 
                <span className="text-amber-800"> Natural Beauty</span>
              </h1>
              
              <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Explore our handcrafted gifts and decor — hampers, wall hangings, scrapbooks, portraits, candles, handmade cards, and diyas — made with love in India. Thoughtful pieces to celebrate every occasion and elevate your space.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="bg-amber-800 text-white px-8 py-4 rounded-lg hover:bg-amber-900 transition-colors font-semibold flex items-center justify-center group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="border border-amber-800 text-amber-800 px-8 py-4 rounded-lg hover:bg-stone-50 transition-colors font-semibold"
                >
                  Our Story
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 mt-8 text-sm text-stone-600">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
                <div>🇮🇳 Made in India</div>
                <div>🚚 Free Shipping ₹999+</div>
              </div>
            </motion.div>
            
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                <Image
                  src="https://images.unsplash.com/photo-1602874801006-47670818b8ee?w=500&h=400&fit=crop"
                  alt="Beautiful handcrafted gifts and decor"
                  width={500}
                  height={400}
                  className="rounded-xl object-cover w-full h-80"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-72 h-72 bg-amber-100 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute bottom-4 left-4 w-48 h-48 bg-stone-200 rounded-full opacity-30 blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-amber-800" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-stone-900">Free Shipping</h3>
              <p className="text-stone-600 text-sm">Free delivery on orders above ₹999 across India</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-amber-800" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-stone-900">Premium Quality</h3>
              <p className="text-stone-600 text-sm">Premium materials and authentic craftsmanship</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-amber-800" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-stone-900">24/7 Support</h3>
              <p className="text-stone-600 text-sm">Dedicated customer support always ready to help</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flame className="h-8 w-8 text-amber-800" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-stone-900">Handcrafted</h3>
              <p className="text-stone-600 text-sm">Each product is carefully crafted by skilled artisans</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Discover our most loved gifts and decor that bring joy and warmth to thousands of homes across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center bg-amber-800 text-white px-8 py-3 rounded-lg hover:bg-amber-900 transition-colors font-medium group"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
