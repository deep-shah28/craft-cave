'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useStore, Product } from '@/lib/store'
import { useBaskets, useComboItems } from '@/lib/hooks/useProducts'
import toast from 'react-hot-toast'

// Import components
import StepIndicator from './components/StepIndicator'
import BasketSelection from './components/BasketSelection'
import ItemSelection from './components/ItemSelection'
import CustomizeStep from './components/CustomizeStep'

// Import types
import { ComboBuilder, StepType } from './types'


export default function BuildComboPage() {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<StepType>('basket')
  
  // Local state for combo builder - no more global store
  const [comboBuilder, setComboBuilder] = useState<ComboBuilder>({
    selectedBasket: undefined,
    selectedItems: [],
    totalPrice: 0,
    customizations: {}
  })
  
  const { addToCart } = useStore() // Only use store for cart operations
  const { data: baskets, isLoading: basketsLoading } = useBaskets()
  const { data: items, isLoading: itemsLoading } = useComboItems()

  const setComboBasket = useCallback((basket: Product) => {
    setComboBuilder(prev => {
      const totalPrice = basket.price + prev.selectedItems.reduce((sum, item) => sum + item.price, 0)
      return {
        ...prev,
        selectedBasket: basket,
        totalPrice
      }
    })
  }, [])

  const addToCombo = useCallback((item: Product) => {
    setComboBuilder(prev => {
      const newItems = [...prev.selectedItems, item]
      const basketPrice = prev.selectedBasket?.price || 0
      const totalPrice = basketPrice + newItems.reduce((sum, item) => sum + item.price, 0)
      
      return {
        ...prev,
        selectedItems: newItems,
        totalPrice
      }
    })
  }, [])

  const removeFromCombo = useCallback((itemId: string) => {
    setComboBuilder(prev => {
      const newItems = prev.selectedItems.filter(item => item.id !== itemId)
      const basketPrice = prev.selectedBasket?.price || 0
      const totalPrice = basketPrice + newItems.reduce((sum, item) => sum + item.price, 0)
      
      return {
        ...prev,
        selectedItems: newItems,
        totalPrice
      }
    })
  }, [])

  const updateComboCustomization = useCallback((key: keyof ComboBuilder['customizations'], value: string) => {
    setComboBuilder(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        [key]: value
      }
    }))
  }, [])

  const clearCombo = useCallback(() => {
    setComboBuilder({
      selectedBasket: undefined,
      selectedItems: [],
      totalPrice: 0,
      customizations: {}
    })
  }, [])

  const handleFinishCombo = useCallback(() => {
    if (!comboBuilder.selectedBasket || comboBuilder.selectedItems.length === 0) {
      toast.error('Please select a basket and at least one item.')
      return
    }
    
    // Add to cart using store with detailed combo information
    const comboProduct: Product = {
      id: `combo-${Date.now()}`,
      name: `Custom Hamper - ${comboBuilder.selectedBasket.name}`,
      price: comboBuilder.totalPrice,
      image: comboBuilder.selectedBasket.image,
      images: [comboBuilder.selectedBasket.image],
      description: `Custom hamper with ${comboBuilder.selectedItems.length} items`,
      category: 'Custom Hamper',
      productType: 'combo',
      inStock: true,
      size: comboBuilder.selectedBasket.size,
      comboItems: comboBuilder.selectedItems.map(item => item.id),
      comboDetails: {
        basket: {
          id: comboBuilder.selectedBasket.id,
          name: comboBuilder.selectedBasket.name,
          price: comboBuilder.selectedBasket.price,
          image: comboBuilder.selectedBasket.image,
          size: comboBuilder.selectedBasket.size,
          capacity: comboBuilder.selectedBasket.capacity
        },
        items: comboBuilder.selectedItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category
        })),
        customizations: comboBuilder.customizations
      }
    }
    
    addToCart(comboProduct)
    clearCombo()
    toast.success('Custom combo added to cart!')
    setStep('basket')
  }, [comboBuilder, addToCart, clearCombo])

  const handleWrappingChange = useCallback((option: string) => {
    updateComboCustomization('wrapping', option)
  }, [updateComboCustomization])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoized callbacks for child components to prevent re-renders
  const handleBasketSelect = useCallback((basket: Product) => {
    setComboBasket(basket)
    setStep('items')
    toast.success('Basket selected! Now choose your items.')
  }, [setComboBasket])

  const maxItems = useMemo(() => {
    if (!comboBuilder.selectedBasket?.capacity) return 6
    if (comboBuilder.selectedBasket.capacity.includes('4-6')) return 6
    if (comboBuilder.selectedBasket.capacity.includes('6-10')) return 10
    if (comboBuilder.selectedBasket.capacity.includes('2-4')) return 4
    return 6
  }, [comboBuilder.selectedBasket?.capacity])

  const handleAddItem = useCallback((item: Product) => {
    if (comboBuilder.selectedItems.length >= maxItems) {
      toast.error(`This basket can hold maximum ${maxItems} items.`)
      return
    }
    
    addToCombo(item)
    toast.success('Item added to your combo!')
  }, [comboBuilder.selectedItems.length, maxItems, addToCombo])

  const handleStepChange = useCallback((newStep: StepType) => {
    setStep(newStep)
  }, [])

  if (!mounted || basketsLoading || itemsLoading) {
    return (
      <div className="min-h-screen bg-stone-50 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="bg-stone-200 h-96 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 lg:mb-8 px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 mb-2 lg:mb-4">Build Your Own Combo</h1>
          <p className="text-base sm:text-lg lg:text-xl text-stone-700">Create the perfect personalized gift hamper</p>
        </div>

        <StepIndicator currentStep={step} />

        <AnimatePresence mode="wait">
          {step === 'basket' && (
            <BasketSelection 
              baskets={baskets} 
              onBasketSelect={handleBasketSelect} 
            />
          )}
          {step === 'items' && (
            <ItemSelection 
              comboBuilder={comboBuilder}
              items={items}
              onAddItem={handleAddItem}
              onRemoveFromCombo={removeFromCombo}
              onStepChange={handleStepChange}
              maxItems={maxItems}
            />
          )}
          {step === 'customize' && (
            <CustomizeStep 
              comboBuilder={comboBuilder}
              onCustomizationChange={updateComboCustomization}
              onWrappingChange={handleWrappingChange}
              onStepChange={handleStepChange}
              onFinishCombo={handleFinishCombo}
            />
          )}
        </AnimatePresence>

        {comboBuilder.selectedBasket && step !== 'customize' && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                clearCombo()
                setStep('basket')
              }}
              className="text-stone-500 hover:text-stone-700 transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
