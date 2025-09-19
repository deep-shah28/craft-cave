import { memo } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBasket } from 'lucide-react'
import { Product } from '@/lib/hooks/useProducts'
import Image from 'next/image'

interface BasketSelectionProps {
  baskets: Product[] | undefined
  onBasketSelect: (basket: Product) => void
}

const BasketSelection = memo(({ 
  baskets, 
  onBasketSelect 
}: BasketSelectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    <div className="text-center mb-6 lg:mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2 lg:mb-4">Choose Your Basket</h2>
      <p className="text-base lg:text-lg text-stone-600 px-4">Select the perfect container for your custom gift hamper</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {baskets?.map((basket) => (
        <motion.div
          key={basket.id}
          whileHover={{ scale: 1.02 }}
          className="bg-stone-50 rounded-lg lg:rounded-xl shadow-sm border border-stone-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow w-full"
          onClick={() => onBasketSelect(basket)}
        >
          <div className="aspect-square relative w-full">
            <Image
              src={basket.image}
              alt={basket.name}
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4 lg:p-6">
            <h3 className="text-lg lg:text-xl font-semibold mb-2 text-stone-900">{basket.name}</h3>
            <p className="text-stone-600 text-sm mb-3 lg:mb-4">{basket.description}</p>
            
            <div className="space-y-1 lg:space-y-2 text-xs lg:text-sm text-stone-600 mb-3 lg:mb-4">
              <div className="flex justify-between">
                <span>Size:</span>
                <span>{basket.size}</span>
              </div>
              <div className="flex justify-between">
                <span>Material:</span>
                <span>{basket.material}</span>
              </div>
              <div className="flex justify-between">
                <span>Capacity:</span>
                <span>{basket.capacity}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg lg:text-xl font-bold text-stone-900">₹{basket.price}</span>
                {basket.originalPrice && (
                  <span className="text-sm text-stone-500 line-through">₹{basket.originalPrice}</span>
                )}
              </div>
              <button className="bg-amber-800 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg hover:bg-amber-900 transition-colors flex items-center space-x-1 lg:space-x-2 text-sm lg:text-base">
                <ShoppingBasket className="h-4 w-4" />
                <span>Select</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
))

BasketSelection.displayName = 'BasketSelection'

export default BasketSelection
