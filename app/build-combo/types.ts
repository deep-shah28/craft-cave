import { Product } from '@/lib/hooks/useProducts'

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

export type StepType = 'basket' | 'items' | 'customize'
