import { memo } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Palette, ShoppingCart } from 'lucide-react'
import { ComboBuilder, StepType } from '../types'

interface CustomizeStepProps {
  comboBuilder: ComboBuilder
  onCustomizationChange: (key: keyof ComboBuilder['customizations'], value: string) => void
  onWrappingChange: (option: string) => void
  onStepChange: (step: StepType) => void
  onFinishCombo: () => void
}

const CustomizeStep = memo(({ 
  comboBuilder,
  onCustomizationChange,
  onWrappingChange,
  onStepChange,
  onFinishCombo
}: CustomizeStepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-2xl mx-auto space-y-6"
  >
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-stone-900 mb-4">Customize Your Gift</h2>
      <p className="text-lg text-stone-600">Add personal touches to make it special</p>
    </div>

    <div className="bg-stone-50 rounded-lg shadow-sm border border-stone-200 p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center text-stone-900">
        <MessageCircle className="h-5 w-5 mr-2 text-amber-800" />
        Gift Message
      </h3>
      <textarea
        placeholder="Write your personal message here..."
        value={comboBuilder.customizations.giftMessage || ''}
        onChange={(e) => onCustomizationChange('giftMessage', e.target.value)}
        className="w-full p-4 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent resize-none text-stone-900 placeholder-stone-500"
        rows={4}
      />
    </div>

    <div className="bg-stone-50 rounded-lg shadow-sm border border-stone-200 p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center text-stone-900">
        <Palette className="h-5 w-5 mr-2 text-amber-800" />
        Gift Wrapping
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {['Standard', 'Premium', 'Luxury', 'Eco-Friendly'].map((option) => (
          <button
            key={option}
            onClick={() => onWrappingChange(option)}
            className={`p-4 border rounded-lg transition-colors text-center font-medium ${
              comboBuilder.customizations.wrapping === option
                ? 'border-amber-800 bg-amber-100 text-amber-900'
                : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>

    <div className="bg-stone-50 rounded-lg shadow-sm border border-stone-200 p-6">
      <h3 className="text-xl font-semibold mb-4 text-stone-900">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="font-medium text-stone-900">Basket: {comboBuilder.selectedBasket?.name}</span>
          </div>
          <span className="font-semibold text-amber-800">₹{comboBuilder.selectedBasket?.price}</span>
        </div>
        
        {comboBuilder.selectedItems.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-stone-700 mb-2">Selected Items:</h4>
            {comboBuilder.selectedItems.map((item, index) => (
              <div key={item.id} className="flex justify-between items-center p-2 bg-stone-100 border border-stone-200 rounded-md">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-stone-300 text-stone-700 px-2 py-1 rounded-full font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm text-stone-800">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-stone-700">₹{item.price}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="border-t-2 border-stone-200 pt-4 mt-4">
          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-lg">
            <span className="text-lg font-bold text-stone-900">Total:</span>
            <span className="text-xl font-bold text-amber-800">₹{comboBuilder.totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="flex space-x-4">
      <button
        onClick={() => onStepChange('items')}
        className="flex-1 bg-stone-200 text-stone-700 py-3 px-6 rounded-lg hover:bg-stone-300 transition-colors"
      >
        Back to Items
      </button>
      <button
        onClick={onFinishCombo}
        className="flex-1 bg-amber-800 text-white py-3 px-6 rounded-lg hover:bg-amber-900 transition-colors flex items-center justify-center space-x-2"
      >
        <ShoppingCart className="h-5 w-5" />
        <span>Add to Cart</span>
      </button>
    </div>
  </motion.div>
))

CustomizeStep.displayName = 'CustomizeStep'

export default CustomizeStep
