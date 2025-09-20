'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { sampleProducts, categories } from '@/lib/data'

function ProductsPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get category from URL params if available
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [searchParams])

  if (!mounted) {
    return null
  }

  const filteredProducts = sampleProducts
    .filter(product => {
      if (selectedCategory === 'All') return true
      return product.category === selectedCategory
    })
    .filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Collection</h1>
          <p className="text-gray-600">Discover premium handcrafted candles for every mood and occasion</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 lg:sticky lg:top-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 lg:mb-3">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded text-gray-700"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </button>
              </div>

              <div className={`space-y-4 lg:space-y-6 ${showFilters || 'hidden lg:block'}`}>
                {/* Categories */}
                <div>
                  <div className="space-y-1 lg:space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category)
                          // Update URL with selected category
                          const params = new URLSearchParams(searchParams.toString())
                          if (category === 'All') {
                            params.delete('category')
                          } else {
                            params.set('category', category)
                          }
                          router.push(`/products?${params.toString()}`)
                        }}
                        className={`block w-full text-left px-2 py-1.5 lg:px-3 lg:py-2 text-sm rounded-md transition-colors ${
                          selectedCategory === category
                            ? 'bg-amber-100 text-amber-800'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2 lg:mb-3">Price Range</h3>
                  <div className="space-y-2 lg:space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('All')
                    setPriceRange([0, 5000])
                    // Clear URL params
                    router.push('/products')
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-1.5 lg:py-2 px-3 lg:px-4 rounded-md hover:bg-gray-200 transition-colors text-sm"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Showing {filteredProducts.length} products
                </span>
              </div>

              <div className="flex items-center space-x-4 w-full lg:w-auto">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full lg:w-auto bg-white text-gray-900 relative z-10"
                >
                  <option value="name" className="bg-white text-gray-900">Sort by Name</option>
                  <option value="price-low" className="bg-white text-gray-900">Price: Low to High</option>
                  <option value="price-high" className="bg-white text-gray-900">Price: High to Low</option>
                </select>

                {/* View Mode */}
                <div className="hidden md:flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'text-gray-400'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-amber-100 text-amber-600' : 'text-gray-400'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <motion.div
                layout
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-lg">Loading...</div></div>}>
      <ProductsPageContent />
    </Suspense>
  )
}
