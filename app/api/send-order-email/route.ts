import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()
    
    // Format order details for email with variant information
    const cartItems = orderData.cart.map((item: any) => {
      let itemDetails = `• ${item.name} (Qty: ${item.quantity})`
      
      // Add variant information if available
      if (item.selectedVariants) {
        const variantDetails = []
        
        if (item.selectedVariants.size) {
          variantDetails.push(`Size: ${item.selectedVariants.size.label} (${item.selectedVariants.size.size})`)
        }
        
        if (item.selectedVariants.decorations && item.selectedVariants.decorations.length > 0) {
          const decorations = item.selectedVariants.decorations.map((d: any) => d.name).join(', ')
          variantDetails.push(`Decorations: ${decorations}`)
        }
        
        if (variantDetails.length > 0) {
          itemDetails += `\n    ${variantDetails.join(' | ')}`
        }
      }
      
      itemDetails += ` - ₹${(item.price * item.quantity).toLocaleString()}`
      return itemDetails
    }).join('\n')
    
    const emailContent = {
      to_name: 'Craft Cave Team',
      to_email: 'craftcavebyjinali@gmail.com',
      from_name: `${orderData.formData.firstName} ${orderData.formData.lastName}`,
      customer_name: `${orderData.formData.firstName} ${orderData.formData.lastName}`,
      customer_email: orderData.formData.email,
      customer_phone: orderData.formData.phone,
      shipping_address: `${orderData.formData.address}, ${orderData.formData.city}, ${orderData.formData.state} - ${orderData.formData.pincode}`,
      landmark: orderData.formData.landmark || 'Not provided',
      payment_method: orderData.formData.paymentMethod,
      shipping_method: orderData.formData.shippingMethod,
      gift_message: orderData.formData.giftMessage || 'No gift message',
      special_instructions: orderData.formData.specialInstructions || 'None',
      cart_items: cartItems,
      subtotal: orderData.total.toLocaleString(),
      shipping_cost: orderData.shippingCost === 0 ? 'FREE' : `₹${orderData.shippingCost}`,
      final_total: orderData.finalTotal.toLocaleString(),
      order_date: new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
        
    return NextResponse.json({ 
      success: true, 
      message: 'Order notification prepared successfully',
      emailData: emailContent 
    })
    
  } catch (error) {
    console.error('Error preparing order email:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to prepare order notification' },
      { status: 500 }
    )
  }
}
