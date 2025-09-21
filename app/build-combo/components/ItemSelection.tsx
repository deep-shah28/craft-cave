import { memo } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, Gift, ArrowRight } from 'lucide-react'
import { Product } from '@/lib/hooks/useProducts'
import { ComboBuilder } from '@/lib/store'
import { StepType } from '../types'
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
      <div className="bg-stone-50 rounded-lg shadow-sm border border-stone-200 p-4 lg:p-6 mb-4 lg:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <Image
              src={comboBuilder.selectedBasket.image}
              alt={comboBuilder.selectedBasket.name}
              width={60}
              height={60}
              className="rounded-lg object-cover lg:w-20 lg:h-20"
            />
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-stone-900">{comboBuilder.selectedBasket.name}</h3>
              <p className="text-sm text-stone-600">{comboBuilder.selectedBasket.capacity}</p>
              <p className="text-sm lg:text-base text-amber-800 font-semibold">₹{comboBuilder.selectedBasket.price}</p>
            </div>
          </div>
          <button
            onClick={() => onStepChange('basket')}
            className="text-sm lg:text-base text-amber-800 hover:text-amber-900 transition-colors whitespace-nowrap self-start sm:self-center"
          >
            Change Basket
          </button>
        </div>
      </div>

      <div className="text-center mb-4 lg:mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-stone-900 mb-2 lg:mb-4">Add Your Items</h2>
        <div className="text-sm lg:text-lg text-stone-600 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>Selected: {comboBuilder.selectedItems.length} items</span>
          <span className="hidden sm:inline">|</span>
          <span>Total: ₹{comboBuilder.totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {comboBuilder.selectedItems.length > 0 && (
        <div className="bg-stone-100 rounded-lg p-4 lg:p-6 mb-4 lg:mb-6">
          <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4 text-stone-900">Selected Items</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {comboBuilder.selectedItems.map((item) => (
              <div key={item.id} className="bg-stone-50 rounded-lg p-3 lg:p-4 relative">
                <button
                  onClick={() => onRemoveFromCombo(item.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-md object-cover mx-auto mb-2 lg:w-15 lg:h-15"
                />
                <h4 className="text-xs lg:text-sm font-medium text-center truncate text-stone-900">{item.name}</h4>
                <p className="text-xs text-amber-800 font-semibold text-center">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 px-4 sm:px-0">
        {items?.map((item) => (
          <div key={item.id} className="bg-stone-50 rounded-lg lg:rounded-xl shadow-sm border border-stone-200 overflow-hidden w-full">
            <div className="aspect-square relative w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-3 lg:p-4">
              <h3 className="text-base lg:text-lg font-semibold mb-2 truncate text-stone-900">{item.name}</h3>
              <p className="text-stone-600 text-sm mb-2 lg:mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-base lg:text-lg font-bold text-stone-900">₹{item.price}</span>
                <button
                  onClick={() => onAddItem(item)}
                  disabled={!item.inStock}
                  className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg transition-colors flex items-center space-x-1 lg:space-x-2 text-sm lg:text-base ${
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
        <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6">
          <button
            onClick={() => onStepChange('customize')}
            className="bg-amber-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-amber-900 transition-colors shadow-lg flex items-center space-x-1 lg:space-x-2 text-sm lg:text-base"
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
