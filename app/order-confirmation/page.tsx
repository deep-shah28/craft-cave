'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function OrderConfirmationPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-stone-100 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Order Confirmed!</h1>
            <p className="text-stone-600">Thank you for your order. We've received it successfully.</p>
          </div>

          {/* Order Details */}
          <div className="bg-amber-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-amber-800 mb-2">What happens next?</h2>
            <div className="space-y-2 text-sm text-stone-700">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4 text-amber-600" />
                <span>Order details have been sent to our team</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-4 w-4 text-amber-600" />
                <span>We'll contact you shortly to confirm delivery details</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t pt-6 space-y-4">
            <p className="text-stone-600">
              If you have any questions, feel free to contact us:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
              <a 
                href="mailto:craftcavebyjinali@gmail.com" 
                className="text-amber-800 hover:text-amber-900 font-medium"
              >
                craftcavebyjinali@gmail.com
              </a>
              <span className="hidden sm:block text-stone-400">|</span>
              <span className="text-stone-600">We'll respond within 24 hours</span>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="mt-8">
            <Link 
              href="/products"
              className="inline-block bg-amber-800 text-white px-8 py-3 rounded-lg hover:bg-amber-900 transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
