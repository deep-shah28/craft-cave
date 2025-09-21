import { useQuery } from '@tanstack/react-query'
import { sampleProducts } from '@/lib/data'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  description: string
  category: string
  productType: 'candle' | 'diya' | 'hamper' | 'basket' | 'accessory' | 'combo'
  inStock: boolean
  fragrance?: string
  burnTime?: string
  size: string
  dimensions?: string
  material?: string
  capacity?: string
  comboItems?: string[]
}

// Simulate API call - in real app this would be an actual API fetch
const fetchProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return sampleProducts
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useBaskets() {
  const { data: products, ...rest } = useProducts()
  
  return {
    ...rest,
    data: products?.filter(p => p.productType === 'basket') || []
  }
}

export function useComboItems() {
  const { data: products, ...rest } = useProducts()
  
  return {
    ...rest,
    data: products?.filter(p => p.productType === 'candle' || p.productType === 'accessory') || []
  }
}
