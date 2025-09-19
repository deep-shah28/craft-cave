import { Product } from './store'

// Session ID generation (similar to cart service)
const generateSessionId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Get or create session ID
const getSessionId = (): string => {
  if (typeof window === 'undefined') return generateSessionId()
  
  let sessionId = localStorage.getItem('likes_session_id')
  if (!sessionId) {
    sessionId = generateSessionId()
    localStorage.setItem('likes_session_id', sessionId)
  }
  return sessionId
}

export interface LikesResponse {
  likedItems: string[]
  success?: boolean
  message?: string
}

class LikesService {
  private baseUrl = '/api/likes'
  
  async getLikedItems(): Promise<string[]> {
    try {
      const sessionId = getSessionId()
      const response = await fetch(`${this.baseUrl}?sessionId=${sessionId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: LikesResponse = await response.json()
      return data.likedItems || []
    } catch (error) {
      console.error('Error fetching liked items:', error)
      return []
    }
  }
  
  async addToLikes(productId: string): Promise<LikesResponse> {
    try {
      const sessionId = getSessionId()
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, sessionId }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error adding to likes:', error)
      throw error
    }
  }
  
  async removeFromLikes(productId: string): Promise<LikesResponse> {
    try {
      const sessionId = getSessionId()
      const response = await fetch(`${this.baseUrl}?productId=${productId}&sessionId=${sessionId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error removing from likes:', error)
      throw error
    }
  }
  
  async clearAllLikes(): Promise<LikesResponse> {
    try {
      const sessionId = getSessionId()
      const response = await fetch(`${this.baseUrl}?productId=all&sessionId=${sessionId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error clearing likes:', error)
      throw error
    }
  }
}

export const likesService = new LikesService()
