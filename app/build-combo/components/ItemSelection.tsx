import { memo } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, Gift, ArrowRight } from 'lucide-react'
import { Product } from '@/lib/hooks/useProducts'
import { ComboBuilder, StepType } from '../types'
import Image from 'next/image'

interface ItemSelectionProps {
  comboBuilder: ComboBuilder
  items: Product[] | undefined
  onAddItem: (item: Product) => void
  onRemoveFromCombo: (itemId: string) => void
  onStepChange: (step: StepType) => void
  maxItems: number
}

const ItemSelection = memo(({ 
  comboBuilder,
  items,
  onAddItem,
  onRemoveFromCombo,
  onStepChange,
  maxItems
}: ItemSelectionProps) => {
  if (!comboBuilder.selectedBasket) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-stone-50 rounded-lg shadow-sm border border-stone-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={comboBuilder.selectedBasket.image}
              alt={comboBuilder.selectedBasket.name}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-stone-900">{comboBuilder.selectedBasket.name}</h3>
              <p className="text-stone-600">{comboBuilder.selectedBasket.capacity}</p>
              <p className="text-amber-800 font-semibold">₹{comboBuilder.selectedBasket.price}</p>
            </div>
          </div>
          <button
            onClick={() => onStepChange('basket')}
            className="text-amber-800 hover:text-amber-900 transition-colors"
          >
            Change Basket
          </button>
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Add Your Items</h2>
        <p className="text-lg text-stone-600">
          Selected: {comboBuilder.selectedItems.length} items | 
          Total: ₹{comboBuilder.totalPrice.toLocaleString()}
        </p>
      </div>

      {comboBuilder.selectedItems.length > 0 && (
        <div className="bg-stone-100 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-stone-900">Selected Items</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {comboBuilder.selectedItems.map((item) => (
              <div key={item.id} className="bg-stone-50 rounded-lg p-4 relative">
                <button
                  onClick={() => onRemoveFromCombo(item.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-md object-cover mx-auto mb-2"
                />
                <h4 className="text-sm font-medium text-center truncate text-stone-900">{item.name}</h4>
                <p className="text-xs text-amber-800 font-semibold text-center">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items?.map((item) => (
          <div key={item.id} className="bg-stone-50 rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 truncate text-stone-900">{item.name}</h3>
              <p className="text-stone-600 text-sm mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-stone-900">₹{item.price}</span>
                <button
                  onClick={() => onAddItem(item)}
                  disabled={!item.inStock}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    item.inStock
                      ? 'bg-amber-800 text-white hover:bg-amber-900'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {comboBuilder.selectedItems.length > 0 && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => onStepChange('customize')}
            className="bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-900 transition-colors shadow-lg flex items-center space-x-2"
          >
            <Gift className="h-5 w-5" />
            <span>Customize & Finish</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </motion.div>
  )
})

ItemSelection.displayName = 'ItemSelection'

export default ItemSelection
