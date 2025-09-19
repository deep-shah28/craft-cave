import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className=" from-stone-900 via-stone-800 to-amber-900 text-white relative overflow-hidden">
      {/* Modern geometric background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl transform -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl transform translate-x-48 translate-y-48"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="CraftCave by Jinali"
                width={450}
                height={120}
                className="h-20 w-auto object-contain filter brightness-125"
              />
            </Link>
            <p className="text-stone-200 text-base leading-relaxed max-w-sm">
              Premium handcrafted candles made with love in India. Transform your space with our aromatic collection.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-stone-300 text-sm font-medium">Follow us</span>
              <div className="w-px h-6 bg-stone-600"></div>
              <a href="#" className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-stone-800 p-3 rounded-lg group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-orange-400 transition-all duration-300">
                  <Instagram className="h-5 w-5 text-stone-300 group-hover:text-white" />
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-6">
            <div className="relative">
              <h4 className="text-xl font-bold text-white mb-2">Quick Links</h4>
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
            </div>
            <nav className="space-y-3">
              <Link href="/products" className="group flex items-center text-stone-300 hover:text-white transition-all duration-300">
                <div className="w-0 group-hover:w-2 h-px bg-amber-400 transition-all duration-300 mr-0 group-hover:mr-3"></div>
                <span className="text-sm font-medium">All Products</span>
              </Link>
              <Link href="/about" className="group flex items-center text-stone-300 hover:text-white transition-all duration-300">
                <div className="w-0 group-hover:w-2 h-px bg-amber-400 transition-all duration-300 mr-0 group-hover:mr-3"></div>
                <span className="text-sm font-medium">About Us</span>
              </Link>
              <Link href="/contact" className="group flex items-center text-stone-300 hover:text-white transition-all duration-300">
                <div className="w-0 group-hover:w-2 h-px bg-amber-400 transition-all duration-300 mr-0 group-hover:mr-3"></div>
                <span className="text-sm font-medium">Contact</span>
              </Link>
            </nav>
          </div>
          
          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative">
              <h4 className="text-xl font-bold text-white mb-2">Contact Us</h4>
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
            </div>
            <div className="space-y-4">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-stone-800 to-stone-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-4 p-4 rounded-xl border border-stone-700/50 backdrop-blur-sm">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <span className="text-white text-sm font-medium block">+91 83205 35250</span>
                    <span className="text-stone-400 text-xs">Call us anytime</span>
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-stone-800 to-stone-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-4 p-4 rounded-xl border border-stone-700/50 backdrop-blur-sm">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <span className="text-white text-sm font-medium block">hello@craftcave.in</span>
                    <span className="text-stone-400 text-xs">24/7 support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-stone-700/50">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-stone-300 text-sm font-medium">
                © 2024 Craft Cave. All rights reserved.
              </p>
              <p className="text-stone-400 text-xs mt-1">
                Handcrafted with ❤️ in India
              </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-4">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2 px-4 py-2 rounded-full bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 group-hover:border-amber-400/50 transition-all duration-300">
                  <span className="text-lg">🇮🇳</span>
                  <span className="text-stone-200 text-xs font-medium">Made in India</span>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2 px-4 py-2 rounded-full bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 group-hover:border-amber-400/50 transition-all duration-300">
                  <span className="text-lg">💳</span>
                  <span className="text-stone-200 text-xs font-medium">Secure Payments</span>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2 px-4 py-2 rounded-full bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 group-hover:border-amber-400/50 transition-all duration-300">
                  <span className="text-lg">🚚</span>
                  <span className="text-stone-200 text-xs font-medium">Free Shipping ₹999+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
