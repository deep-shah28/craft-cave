import { useEffect } from 'react'
import { useStore } from '../store'

export const useCartPersistence = () => {
  const { loadCart, isCartLoading } = useStore()

  useEffect(() => {
    // Load cart on app initialization
    loadCart()
  }, [loadCart])

  return { isCartLoading }
}
