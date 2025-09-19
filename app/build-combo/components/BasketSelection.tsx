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
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-stone-900 mb-4">Choose Your Basket</h2>
      <p className="text-lg text-stone-600">Select the perfect container for your custom gift hamper</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {baskets?.map((basket) => (
        <motion.div
          key={basket.id}
          whileHover={{ scale: 1.02 }}
          className="bg-stone-50 rounded-xl shadow-sm border border-stone-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onBasketSelect(basket)}
        >
          <div className="aspect-square relative">
            <Image
              src={basket.image}
              alt={basket.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-stone-900">{basket.name}</h3>
            <p className="text-stone-600 text-sm mb-4">{basket.description}</p>
            
            <div className="space-y-2 text-sm text-stone-600 mb-4">
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
                <span className="text-xl font-bold text-stone-900">₹{basket.price}</span>
                {basket.originalPrice && (
                  <span className="text-sm text-stone-500 line-through">₹{basket.originalPrice}</span>
                )}
              </div>
              <button className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-900 transition-colors flex items-center space-x-2">
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
