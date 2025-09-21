import { NextRequest, NextResponse } from 'next/server'

export interface CartItem {
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
  comboItems?: string[]
  quantity: number
  selectedVariants?: {
    size?: {
      size: string
      price: number
      label: string
    }
    decorations?: Array<{
      name: string
      price: number
    }>
  }
}

// In-memory storage (use Redis or database in production)
const cartStorage = new Map<string, CartItem[]>()

// Generate session ID if not provided
function getSessionId(request: NextRequest): string {
  const sessionId = request.headers.get('x-session-id') || 
                   request.nextUrl.searchParams.get('sessionId') ||
                   `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  return sessionId
}

// GET /api/cart - Get cart items
export async function GET(request: NextRequest) {
  try {
    const sessionId = getSessionId(request)
    const cart = cartStorage.get(sessionId) || []
    
    return NextResponse.json({
      success: true,
      cart,
      sessionId
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get cart' },
      { status: 500 }
    )
  }
}

// Generate unique ID for product variants
function generateVariantId(product: any): string {
  let variantKey = product.id
  
  if (product.selectedVariants) {
    if (product.selectedVariants.size) {
      variantKey += `-size-${product.selectedVariants.size.size}`
    }
    if (product.selectedVariants.decorations && product.selectedVariants.decorations.length > 0) {
      const decorationNames = product.selectedVariants.decorations.map((d: any) => d.name).sort().join('-')
      variantKey += `-decorations-${decorationNames}`
    }
  }
  
  return variantKey
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product, sessionId: providedSessionId } = body
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product is required' },
        { status: 400 }
      )
    }

    const sessionId = providedSessionId || getSessionId(request)
    const cart = cartStorage.get(sessionId) || []
    
    // Generate unique ID for this variant combination
    const variantId = generateVariantId(product)
    
    // Look for existing item with same variant combination
    const existingItemIndex = cart.findIndex(item => {
      const itemVariantId = generateVariantId(item)
      return itemVariantId === variantId
    })
    
    if (existingItemIndex >= 0) {
      // Update quantity of existing variant
      cart[existingItemIndex].quantity += 1
    } else {
      // Add new variant as separate item
      const cartItem = { 
        ...product, 
        quantity: 1,
        id: variantId // Use variant ID for unique identification
      }
      cart.push(cartItem)
    }
    
    cartStorage.set(sessionId, cart)
    
    return NextResponse.json({
      success: true,
      cart,
      sessionId
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
}

// PUT /api/cart - Update item quantity
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, quantity, sessionId: providedSessionId } = body
    
    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { success: false, error: 'Product ID and quantity are required' },
        { status: 400 }
      )
    }

    const sessionId = providedSessionId || getSessionId(request)
    const cart = cartStorage.get(sessionId) || []
    
    if (quantity <= 0) {
      // Remove item
      const updatedCart = cart.filter(item => item.id !== productId)
      cartStorage.set(sessionId, updatedCart)
    } else {
      // Update quantity
      const updatedCart = cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
      cartStorage.set(sessionId, updatedCart)
    }
    
    const updatedCart = cartStorage.get(sessionId) || []
    
    return NextResponse.json({
      success: true,
      cart: updatedCart,
      sessionId
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update cart' },
      { status: 500 }
    )
  }
}

// DELETE /api/cart - Clear cart or remove specific item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const productId = searchParams.get('productId')
    const sessionId = searchParams.get('sessionId') || getSessionId(request)
    
    const cart = cartStorage.get(sessionId) || []
    
    if (productId) {
      // Remove specific item
      const updatedCart = cart.filter(item => item.id !== productId)
      cartStorage.set(sessionId, updatedCart)
      
      return NextResponse.json({
        success: true,
        cart: updatedCart,
        sessionId
      })
    } else {
      // Clear entire cart
      cartStorage.set(sessionId, [])
      
      return NextResponse.json({
        success: true,
        cart: [],
        sessionId
      })
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete from cart' },
      { status: 500 }
    )
  }
}
