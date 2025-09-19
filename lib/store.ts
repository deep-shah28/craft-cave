import { create } from 'zustand'
import { cartService, CartItem as ApiCartItem } from './cart-service'
import { likesService } from './likes-service'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  description: string
  category: string
  productType: 'candle' | 'hamper' | 'basket' | 'accessory' | 'combo'
  inStock: boolean
  fragrance?: string
  burnTime?: string
  size: string
  dimensions?: string
  material?: string
  capacity?: string
  comboItems?: string[] // For pre-made combos
  // Detailed combo information for custom combos
  comboDetails?: {
    basket: {
      id: string
      name: string
      price: number
      image: string
      size: string
      capacity?: string
    }
    items: Array<{
      id: string
      name: string
      price: number
      image: string
      category: string
    }>
    customizations: {
      giftMessage?: string
      wrapping?: string
      ribbon?: string
    }
  }
}

export interface ComboBuilder {
  selectedBasket?: Product
  selectedItems: Product[]
  totalPrice: number
  customizations: {
    giftMessage?: string
    wrapping?: string
    ribbon?: string
  }
}

export interface CartItem extends Product {
  quantity: number
}

interface Store {
  products: Product[]
  cart: CartItem[]
  isCartOpen: boolean
  isCartLoading: boolean
  likedItems: string[]
  isLikesOpen: boolean
  isLikesLoading: boolean
  comboBuilder: ComboBuilder
  addToCart: (product: Product) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  loadCart: () => Promise<void>
  toggleCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
  // Likes actions
  addToLikes: (productId: string) => Promise<void>
  removeFromLikes: (productId: string) => Promise<void>
  toggleLike: (productId: string) => Promise<void>
  loadLikes: () => Promise<void>
  toggleLikes: () => void
  isLiked: (productId: string) => boolean
  getLikesCount: () => number
  // Combo builder actions
  setComboBasket: (basket: Product) => void
  addToCombo: (item: Product) => void
  removeFromCombo: (itemId: string) => void
  updateComboCustomization: (key: keyof ComboBuilder['customizations'], value: string) => void
  addComboToCart: () => Promise<void>
  clearCombo: () => void
}

export const useStore = create<Store>((set, get) => ({
  products: [],
  cart: [],
  isCartOpen: false,
  isCartLoading: false,
  likedItems: [],
  isLikesOpen: false,
  isLikesLoading: false,
  comboBuilder: {
    selectedBasket: undefined,
    selectedItems: [],
    totalPrice: 0,
    customizations: {}
  },
  
  addToCart: async (product) => {
    set({ isCartLoading: true })
    const response = await cartService.addToCart(product)
    if (response.success) {
      set({ cart: response.cart })
    }
    set({ isCartLoading: false })
  },
  
  removeFromCart: async (productId) => {
    set({ isCartLoading: true })
    const response = await cartService.removeFromCart(productId)
    if (response.success) {
      set({ cart: response.cart })
    }
    set({ isCartLoading: false })
  },
  
  updateQuantity: async (productId, quantity) => {
    set({ isCartLoading: true })
    const response = await cartService.updateQuantity(productId, quantity)
    if (response.success) {
      set({ cart: response.cart })
    }
    set({ isCartLoading: false })
  },
  
  clearCart: async () => {
    set({ isCartLoading: true })
    const response = await cartService.clearCart()
    if (response.success) {
      set({ cart: response.cart })
    }
    set({ isCartLoading: false })
  },

  loadCart: async () => {
    set({ isCartLoading: true })
    const response = await cartService.getCart()
    if (response.success) {
      set({ cart: response.cart })
    }
    set({ isCartLoading: false })
  },
  
  toggleCart: () => {
    set({ isCartOpen: !get().isCartOpen })
  },
  
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  
  getCartCount: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0)
  },

  // Likes methods
  addToLikes: async (productId) => {
    set({ isLikesLoading: true })
    try {
      const response = await likesService.addToLikes(productId)
      set({ likedItems: response.likedItems })
    } catch (error) {
      console.error('Error adding to likes:', error)
    }
    set({ isLikesLoading: false })
  },

  removeFromLikes: async (productId) => {
    set({ isLikesLoading: true })
    try {
      const response = await likesService.removeFromLikes(productId)
      set({ likedItems: response.likedItems })
    } catch (error) {
      console.error('Error removing from likes:', error)
    }
    set({ isLikesLoading: false })
  },

  toggleLike: async (productId) => {
    const isCurrentlyLiked = get().isLiked(productId)
    if (isCurrentlyLiked) {
      await get().removeFromLikes(productId)
    } else {
      await get().addToLikes(productId)
    }
  },

  loadLikes: async () => {
    set({ isLikesLoading: true })
    try {
      const likedItems = await likesService.getLikedItems()
      set({ likedItems })
    } catch (error) {
      console.error('Error loading likes:', error)
    }
    set({ isLikesLoading: false })
  },

  toggleLikes: () => {
    set({ isLikesOpen: !get().isLikesOpen })
  },

  isLiked: (productId) => {
    return get().likedItems.includes(productId)
  },

  getLikesCount: () => {
    return get().likedItems.length
  },

  // Combo builder methods
  setComboBasket: (basket) => {
    const combo = get().comboBuilder
    const newTotal = basket.price + combo.selectedItems.reduce((sum, item) => sum + item.price, 0)
    set({
      comboBuilder: {
        ...combo,
        selectedBasket: basket,
        totalPrice: newTotal
      }
    })
  },

  addToCombo: (item) => {
    const combo = get().comboBuilder
    const newItems = [...combo.selectedItems, item]
    const basketPrice = combo.selectedBasket?.price || 0
    const newTotal = basketPrice + newItems.reduce((sum, item) => sum + item.price, 0)
    
    set({
      comboBuilder: {
        ...combo,
        selectedItems: newItems,
        totalPrice: newTotal
      }
    })
  },

  removeFromCombo: (itemId) => {
    const combo = get().comboBuilder
    const newItems = combo.selectedItems.filter(item => item.id !== itemId)
    const basketPrice = combo.selectedBasket?.price || 0
    const newTotal = basketPrice + newItems.reduce((sum, item) => sum + item.price, 0)
    
    set({
      comboBuilder: {
        ...combo,
        selectedItems: newItems,
        totalPrice: newTotal
      }
    })
  },

  updateComboCustomization: (key, value) => {
    const combo = get().comboBuilder
    set({
      comboBuilder: {
        ...combo,
        customizations: {
          ...combo.customizations,
          [key]: value
        }
      }
    })
  },

  addComboToCart: async () => {
    const combo = get().comboBuilder
    if (!combo.selectedBasket || combo.selectedItems.length === 0) return

    const comboProduct: Product = {
      id: `combo-${Date.now()}`,
      name: `Custom Hamper - ${combo.selectedBasket.name}`,
      price: combo.totalPrice,
      image: combo.selectedBasket.image,
      images: [combo.selectedBasket.image],
      description: `Custom hamper with ${combo.selectedItems.length} items`,
      category: 'Custom Hamper',
      productType: 'combo',
      inStock: true,
      size: combo.selectedBasket.size,
      comboItems: combo.selectedItems.map(item => item.id),
      comboDetails: {
        basket: {
          id: combo.selectedBasket.id,
          name: combo.selectedBasket.name,
          price: combo.selectedBasket.price,
          image: combo.selectedBasket.image,
          size: combo.selectedBasket.size,
          capacity: combo.selectedBasket.capacity
        },
        items: combo.selectedItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category
        })),
        customizations: combo.customizations
      }
    }

    await get().addToCart(comboProduct)
    get().clearCombo()
  },

  clearCombo: () => {
    set({
      comboBuilder: {
        selectedBasket: undefined,
        selectedItems: [],
        totalPrice: 0,
        customizations: {}
      }
    })
  }
}))
