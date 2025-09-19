'use client'

import { useState, useEffect } from 'react'
import { MapPin, Truck, Shield, Mail } from 'lucide-react'
import { useStore } from '@/lib/store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false)
  const { cart, getCartTotal, clearCart } = useStore()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    // Customer Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    
    // Payment & Delivery
    shippingMethod: 'standard',
    
    // Special Instructions
    giftMessage: '',
    specialInstructions: ''
  })

  useEffect(() => {
    setMounted(true)
    if (cart.length === 0) {
      router.push('/products')
    }
  }, [cart.length, router])

  if (!mounted || cart.length === 0) {
    return null
  }

  const total = getCartTotal()
  const shippingCost = total >= 999 ? 0 : 99
  const finalTotal = total + shippingCost

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Chandigarh', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep',
    'Puducherry', 'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli and Daman and Diu'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const sendOrderEmails = async () => {
    try {
      // Format cart items for email with detailed combo information
      const cartItems = cart.map(item => {
        if (item.productType === 'combo' && item.comboDetails) {
          // Format detailed combo information
          const combo = item.comboDetails
          let comboText = `• ${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}\n`
          
          // Add basket details
          comboText += `  🧺 Basket: ${combo.basket.name} (${combo.basket.size}) - ₹${combo.basket.price.toLocaleString()}\n`
          
          // Add items details
          comboText += `  📦 Items (${combo.items.length}):\n`
          combo.items.forEach(comboItem => {
            comboText += `    - ${comboItem.name} (${comboItem.category}) - ₹${comboItem.price.toLocaleString()}\n`
          })
          
          // Add customizations if any
          if (combo.customizations.giftMessage || combo.customizations.wrapping || combo.customizations.ribbon) {
            comboText += `  🎁 Customizations:\n`
            if (combo.customizations.giftMessage) {
              comboText += `    - Gift Message: ${combo.customizations.giftMessage}\n`
            }
            if (combo.customizations.wrapping) {
              comboText += `    - Wrapping: ${combo.customizations.wrapping}\n`
            }
            if (combo.customizations.ribbon) {
              comboText += `    - Ribbon: ${combo.customizations.ribbon}\n`
            }
          }
          
          return comboText.trim()
        } else {
          // Regular item formatting
          return `• ${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}`
        }
      }).join('\n\n')

      // Initialize EmailJS
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)

      // Common template parameters
      const baseParams = {
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        landmark: formData.landmark || 'Not provided',
        shipping_method: formData.shippingMethod === 'standard' ? 'Standard Delivery (3-5 days)' : 'Store Pickup (2-3 hours)',
        gift_message: formData.giftMessage || 'No gift message',
        special_instructions: formData.specialInstructions || 'None',
        cart_items: cartItems,
        subtotal: `₹${total.toLocaleString()}`,
        shipping_cost: shippingCost === 0 ? 'FREE' : `₹${shippingCost}`,
        final_total: `₹${finalTotal.toLocaleString()}`,
        order_date: new Date().toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      // 1. Send business notification email
      const businessParams = {
        ...baseParams,
        to_name: 'Craft Cave Team',
        to_email: 'craftcavebyjinali@gmail.com',
        from_name: `${formData.firstName} ${formData.lastName}`,
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        businessParams
      )

      // 2. Send customer confirmation email
      const customerParams = {
        ...baseParams,
        to_name: `${formData.firstName} ${formData.lastName}`,
        to_email: formData.email,
        from_name: 'Craft Cave Team',
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_CUSTOMER_TEMPLATE_ID!,
        customerParams
      )
      
      console.log(`✅ Business notification sent to craftcavebyjinali@gmail.com`)
      console.log(`✅ Customer confirmation sent to ${formData.email}`)
      
    } catch (error) {
      console.error('Failed to send order emails:', error)
      // Don't block the order if email fails
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
        !formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast.error('Please fill in all required fields')
      return
    }

    // Phone validation for Indian numbers
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit Indian mobile number')
      return
    }

    // PIN code validation
    const pincodeRegex = /^\d{6}$/
    if (!pincodeRegex.test(formData.pincode)) {
      toast.error('Please enter a valid 6-digit PIN code')
      return
    }

    toast.success('Order placed successfully! Sending order details...')
    
    // Send order email automatically
    await sendOrderEmails()
    
    // Process order
    setTimeout(() => {
      clearCart()
      router.push('/order-confirmation')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-stone-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Checkout</h1>
          <p className="text-stone-600">Complete your order for premium handcrafted candles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center text-stone-800 border-b border-stone-200 pb-2">
                  <Mail className="h-5 w-5 mr-2 text-amber-800" />
                  Customer Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white placeholder-stone-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center text-stone-800 border-b border-stone-200 pb-2">
                  <MapPin className="h-5 w-5 mr-2 text-amber-800" />
                  Shipping Address
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House/Flat No., Building Name, Street"
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white placeholder-stone-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white"
                        required
                      >
                        <option value="">Select State</option>
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit PIN code"
                        maxLength={6}
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white placeholder-stone-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        placeholder="Nearby landmark"
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white placeholder-stone-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center text-stone-800 border-b border-stone-200 pb-2">
                  <Truck className="h-5 w-5 mr-2 text-amber-800" />
                  Delivery Options
                </h2>
                
                <div className="space-y-3">
                  <label className={`flex items-start p-4 rounded-lg cursor-pointer transition-all ${
                    formData.shippingMethod === 'standard' 
                      ? 'border border-amber-800 bg-amber-50' 
                      : 'border border-stone-300 hover:border-amber-600 bg-stone-50'
                  }`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleInputChange}
                      className="mt-1 text-amber-800"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-stone-900">Standard Delivery (3-5 business days)</div>
                      <div className="text-sm text-stone-600">
                        {total >= 999 ? 'FREE shipping on orders above ₹999' : '₹99 shipping charge'}
                      </div>
                    </div>
                  </label>
                  
                  <label className={`flex items-start p-4 rounded-lg cursor-pointer transition-all ${
                    formData.shippingMethod === 'pickup' 
                      ? 'border border-amber-800 bg-amber-50' 
                      : 'border border-stone-300 hover:border-amber-600 bg-stone-50'
                  }`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="pickup"
                      checked={formData.shippingMethod === 'pickup'}
                      onChange={handleInputChange}
                      className="mt-1 text-amber-800"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-stone-900">Store Pickup (Ready in 2-3 hours)</div>
                      <div className="text-sm text-stone-600">
                        FREE pickup from our Craft Cave store
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4 text-stone-800 border-b border-stone-200 pb-2">Special Instructions</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Gift Message (Optional)
                    </label>
                    <textarea
                      name="giftMessage"
                      value={formData.giftMessage}
                      onChange={handleInputChange}
                      placeholder="Add a personal message for the recipient"
                      rows={3}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent resize-none text-stone-900 placeholder-stone-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      placeholder="Any special delivery instructions"
                      rows={3}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent resize-none text-stone-900 placeholder-stone-500"
                    />
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full bg-amber-800 text-white py-4 px-6 rounded-lg hover:bg-amber-900 transition-colors font-semibold text-lg flex items-center justify-center space-x-2"
              >
                <Shield className="h-5 w-5" />
                <span>Place Order - ₹{finalTotal.toLocaleString()}</span>
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4 text-stone-800 border-b border-amber-200 pb-2">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold truncate text-stone-800">{item.name}</h3>
                      <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Pricing Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-900">Subtotal:</span>
                  <span className="text-stone-900">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-900">Shipping:</span>
                  <span className={shippingCost === 0 ? 'text-green-600 font-medium' : 'text-stone-900'}>
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span className="text-stone-900">Total:</span>
                  <span className="text-amber-800">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t">
                <div className="text-center text-xs text-stone-600 space-y-1">
                  <div>🇮🇳 Made in India • 🚚 Pan-India Delivery</div>
                  <div>💯 100% Authentic Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
