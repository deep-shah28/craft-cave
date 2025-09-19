import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()
    
    // Format order details for email
    const cartItems = orderData.cart.map((item: any) => 
      `• ${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}`
    ).join('\n')
    
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

    // For now, we'll return success. In production, you would integrate with:
    // 1. EmailJS for client-side email sending
    // 2. Nodemailer with Gmail SMTP
    // 3. SendGrid, Mailgun, or other email service
    
    console.log('Order Email Content:', emailContent)
    
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
