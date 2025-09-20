'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Initialize EmailJS
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)

      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_CUSTOMER_TEMPLATE_ID!,
        {
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_email: formData.email,
          customer_phone: formData.phone || 'Not provided',
          subject: formData.subject,
          message: formData.message,
          to_email: 'craftcavebyjinali@gmail.com'
        }
      )

      toast.success('Message sent successfully! We\'ll get back to you soon.')
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Failed to send message:', error)
      toast.error('Failed to send message. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page Header */}
      <div className="bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Contact Us</h1>
          <p className="text-stone-600">We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-stone-50 rounded-lg shadow-sm border border-stone-200 p-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Send us a Message</h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-stone-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-stone-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white placeholder-stone-500"
                  placeholder="+91 98765 43210"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Related</option>
                  <option value="product">Product Question</option>
                  <option value="custom">Custom Order</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-900 bg-white placeholder-stone-500"
                  placeholder="Tell us how we can help you..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-800 text-white py-3 px-6 rounded-lg hover:bg-amber-900 disabled:bg-amber-600 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Send className={`h-5 w-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-stone-50 rounded-lg shadow-sm border border-stone-200 p-8">
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-amber-800" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">Phone</h3>
                    <a 
                      href="tel:+918320535250"
                      className="text-stone-600 mt-1 hover:text-amber-800 transition-colors cursor-pointer block"
                    >
                      +91 83205 535250
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-amber-800" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">Email</h3>
                    <a 
                      href="mailto:craftcavebyjinali@gmail.com"
                      className="text-stone-600 mt-1 hover:text-amber-800 transition-colors cursor-pointer block"
                    >
                      craftcavebyjinali@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>        
          </div>
        </div>
      </div>
    </div>
  )
}
