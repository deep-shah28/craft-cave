'use client'

import { useCartPersistence } from '@/lib/hooks/useCartPersistence'
import { useStore } from '@/lib/store'
import { useEffect } from 'react'

interface CartProviderProps {
  children: React.ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const { loadLikes } = useStore()
  
  // Initialize cart persistence
  useCartPersistence()
  
  // Initialize likes data
  useEffect(() => {
    loadLikes()
  }, [loadLikes])
  
  return <>{children}</>
}
