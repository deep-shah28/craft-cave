'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Truck, Shield, Headphones, ArrowRight, Flame, Users, Heart, Award, CheckCircle } from 'lucide-react'
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
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Artistic Background Image */}
        <div 
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1757400570989-5109cba8629e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat"
          }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="flex justify-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl"
            >
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
                <span className="block">Transform Your</span>
                <span className="block drop-shadow-lg text-amber-200">Special Moments</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium px-4 sm:px-0">
                Where every creation tells a story of love, tradition, and artistry. Experience the magic of authentic Indian craftsmanship that turns ordinary moments into cherished memories.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12 px-4 sm:px-0">
                <Link
                  href="/products"
                  className="bg-amber-800 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl hover:bg-amber-900 transition-all duration-300 font-bold flex items-center justify-center group text-base sm:text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
                >
                  Start Shopping
                  <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  href="/build-combo"
                  className="border-2 border-amber-800 text-amber-800 bg-white/90 px-8 sm:px-12 py-4 sm:py-5 rounded-xl hover:bg-amber-50 backdrop-blur-md transition-all duration-300 font-bold text-base sm:text-lg shadow-2xl"
                >
                  Build Custom Gift
                </Link>
              </div>
              
              {/* Social Proof Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 p-4 sm:p-8 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl max-w-xs sm:max-w-2xl mx-auto border border-white/30">
                <div className="text-center">
                  <div className="text-xl sm:text-3xl font-black text-amber-800">50K+</div>
                  <div className="text-xs sm:text-sm font-semibold text-stone-700">Happy Customers</div>
                </div>
                <div className="text-center border-l border-r border-stone-300">
                  <div className="text-xl sm:text-3xl font-black text-amber-800">4.9★</div>
                  <div className="text-xs sm:text-sm font-semibold text-stone-700">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-3xl font-black text-amber-800">100%</div>
                  <div className="text-xs sm:text-sm font-semibold text-stone-700">Handmade</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              Loved by Thousands Across India
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Join the family of satisfied customers who've made their celebrations unforgettable with our handcrafted treasures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                text: "The personalized hamper was absolutely stunning! Every detail was perfect and the quality exceeded my expectations. My mother-in-law was so touched.",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                location: "Delhi",
                text: "Ordered a custom wall hanging for our anniversary. The craftsmanship is incredible and it's now the centerpiece of our living room!",
                rating: 5
              },
              {
                name: "Anitha Reddy",
                location: "Bangalore",
                text: "Fast delivery, beautiful packaging, and the handmade cards were so unique. Will definitely order again for all special occasions!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-stone-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-stone-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-amber-800 font-semibold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900">{testimonial.name}</div>
                    <div className="text-stone-600 text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-stone-600">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              <span>Free Shipping ₹999+</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-amber-600 mr-2" />
              <span>Premium Quality Guarantee</span>
            </div>
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              <span>5000+ Happy Customers</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-red-500 mr-2" />
              <span>Made with Love in India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-stone-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              Why Choose Craft Cave?
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              We're not just another online store. We're passionate artisans committed to bringing you authentic, high-quality handmade products.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Fast & Free Delivery",
                description: "Free delivery on orders above ₹999 across India with express shipping options"
              },
              {
                icon: Shield,
                title: "Premium Quality",
                description: "Every product is handpicked and quality-checked by our expert artisans"
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Dedicated customer support team ready to help you at every step"
              },
              {
                icon: Award,
                title: "Award Winning",
                description: "Recognized as India's leading handmade products brand with multiple awards"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-white w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-shadow">
                  <feature.icon className="h-10 w-10 text-amber-800" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-stone-900">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              Customer Favorites
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Discover our most loved products that have brought joy to thousands of families across India
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center bg-amber-800 text-white px-10 py-4 rounded-xl hover:bg-amber-900 transition-all duration-300 font-semibold text-lg group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore All Products
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
