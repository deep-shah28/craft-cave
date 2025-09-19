import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for liked items
const likedItemsStore = new Map<string, Set<string>>()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    const likedItems = likedItemsStore.get(sessionId) || new Set()
    const likedItemsArray = Array.from(likedItems)
    
    return NextResponse.json({ likedItems: likedItemsArray })
  } catch (error) {
    console.error('Error fetching liked items:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { productId, sessionId } = await request.json()
    
    if (!productId || !sessionId) {
      return NextResponse.json({ error: 'Product ID and Session ID required' }, { status: 400 })
    }

    if (!likedItemsStore.has(sessionId)) {
      likedItemsStore.set(sessionId, new Set())
    }
    
    const userLikes = likedItemsStore.get(sessionId)!
    userLikes.add(productId)
    
    const likedItemsArray = Array.from(userLikes)
    
    return NextResponse.json({ 
      success: true, 
      likedItems: likedItemsArray,
      message: 'Item added to likes' 
    })
  } catch (error) {
    console.error('Error adding to likes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    const userLikes = likedItemsStore.get(sessionId)
    
    if (!userLikes) {
      return NextResponse.json({ likedItems: [] })
    }

    if (productId === 'all') {
      // Clear all likes
      userLikes.clear()
    } else if (productId) {
      // Remove specific item
      userLikes.delete(productId)
    }
    
    const likedItemsArray = Array.from(userLikes)
    
    return NextResponse.json({ 
      success: true, 
      likedItems: likedItemsArray,
      message: productId === 'all' ? 'All likes cleared' : 'Item removed from likes' 
    })
  } catch (error) {
    console.error('Error removing from likes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
