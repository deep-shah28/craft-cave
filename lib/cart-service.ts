import { Product } from './store'

export interface CartItem extends Product {
  quantity: number
}

export interface CartResponse {
  success: boolean
  cart: CartItem[]
  sessionId: string
  error?: string
}

class CartService {
  private sessionId: string | null = null
  private baseUrl = '/api/cart'
  private readonly SESSION_KEY = 'craft_cave_session_id'

  // Generate a client-side session ID
  private generateSessionId(): string {
    return `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Get or create session ID with localStorage persistence
  private getSessionId(): string {
    if (!this.sessionId) {
      // Try to get from localStorage first
      if (typeof window !== 'undefined') {
        const storedSessionId = localStorage.getItem(this.SESSION_KEY)
        if (storedSessionId) {
          this.sessionId = storedSessionId
        } else {
          this.sessionId = this.generateSessionId()
          localStorage.setItem(this.SESSION_KEY, this.sessionId)
        }
      } else {
        this.sessionId = this.generateSessionId()
      }
    }
    return this.sessionId
  }

  // Set session ID and persist to localStorage
  setSessionId(sessionId: string): void {
    this.sessionId = sessionId
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.SESSION_KEY, sessionId)
    }
  }

  // Get cart items
  async getCart(): Promise<CartResponse> {
    try {
      const sessionId = this.getSessionId()
      const response = await fetch(`${this.baseUrl}?sessionId=${sessionId}`)
      const data = await response.json()
      
      if (data.sessionId) {
        this.setSessionId(data.sessionId)
      }
      
      return data
    } catch (error) {
      console.error('Failed to get cart:', error)
      return {
        success: false,
        cart: [],
        sessionId: this.getSessionId(),
        error: 'Failed to get cart'
      }
    }
  }

  // Add item to cart
  async addToCart(product: Product): Promise<CartResponse> {
    try {
      const sessionId = this.getSessionId()
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product,
          sessionId
        })
      })
      
      const data = await response.json()
      
      if (data.sessionId) {
        this.setSessionId(data.sessionId)
      }
      
      return data
    } catch (error) {
      console.error('Failed to add to cart:', error)
      return {
        success: false,
        cart: [],
        sessionId: this.getSessionId(),
        error: 'Failed to add to cart'
      }
    }
  }

  // Update item quantity
  async updateQuantity(productId: string, quantity: number): Promise<CartResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity,
          sessionId: this.getSessionId()
        })
      })
      
      const data = await response.json()
      
      if (data.sessionId) {
        this.setSessionId(data.sessionId)
      }
      
      return data
    } catch (error) {
      console.error('Failed to update quantity:', error)
      return {
        success: false,
        cart: [],
        sessionId: this.getSessionId(),
        error: 'Failed to update quantity'
      }
    }
  }

  // Remove item from cart
  async removeFromCart(productId: string): Promise<CartResponse> {
    try {
      const response = await fetch(`${this.baseUrl}?productId=${productId}&sessionId=${this.getSessionId()}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (data.sessionId) {
        this.setSessionId(data.sessionId)
      }
      
      return data
    } catch (error) {
      console.error('Failed to remove from cart:', error)
      return {
        success: false,
        cart: [],
        sessionId: this.getSessionId(),
        error: 'Failed to remove from cart'
      }
    }
  }

  // Clear cart
  async clearCart(): Promise<CartResponse> {
    try {
      const response = await fetch(`${this.baseUrl}?sessionId=${this.getSessionId()}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (data.sessionId) {
        this.setSessionId(data.sessionId)
      }
      
      return data
    } catch (error) {
      console.error('Failed to clear cart:', error)
      return {
        success: false,
        cart: [],
        sessionId: this.getSessionId(),
        error: 'Failed to clear cart'
      }
    }
  }
}

// Export singleton instance
export const cartService = new CartService()
