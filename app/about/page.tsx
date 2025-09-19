import Image from 'next/image'
import { Heart, Award, Users, Leaf } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-stone-100 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              Our Story
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Crafting premium candles with love, passion, and traditional techniques passed down through generations
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-6">
                Born from Passion, Crafted with Love
              </h2>
              <div className="space-y-4 text-stone-600">
                <p>
                  Craft Cave began in 2020 with a simple vision: to bring the warmth and beauty of handcrafted candles to every Indian home. What started as a small workshop in Mumbai has grown into a beloved brand known for quality and authenticity.
                </p>
                <p>
                  Each candle in our collection tells a story. From the careful selection of natural soy wax to the precise blending of essential oils, every step is handled with meticulous attention to detail by our skilled artisans.
                </p>
                <p>
                  We believe that a candle is more than just light – it's an experience that transforms spaces, elevates moods, and creates lasting memories. That's why we're committed to using only the finest natural ingredients and traditional techniques.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1602874801006-47670818b8ee?w=500&h=400&fit=crop"
                alt="Artisan crafting candles"
                width={500}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Our Values</h2>
            <p className="text-lg text-stone-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-amber-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-stone-900">Crafted with Love</h3>
              <p className="text-stone-600">
                Every candle is hand-poured with care and attention to detail
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-amber-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-stone-900">Natural Ingredients</h3>
              <p className="text-stone-600">
                100% natural soy wax and essential oils for a pure experience
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-amber-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-stone-900">Premium Quality</h3>
              <p className="text-stone-600">
                Rigorous quality standards ensure the finest products
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-amber-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-stone-900">Community First</h3>
              <p className="text-stone-600">
                Supporting local artisans and giving back to our community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-stone-600">
              The passionate people behind Craft Cave
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-800">AR</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-stone-900">Arihant Sharma</h3>
              <p className="text-amber-800 mb-2">Founder & CEO</p>
              <p className="text-stone-600 text-sm">
                Passionate about bringing authentic fragrances to Indian homes
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-800">PK</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-stone-900">Priya Kapoor</h3>
              <p className="text-amber-800 mb-2">Master Chandler</p>
              <p className="text-stone-600 text-sm">
                20+ years of experience in traditional candle making
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-800">RS</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-stone-900">Raj Singh</h3>
              <p className="text-amber-800 mb-2">Quality Manager</p>
              <p className="text-stone-600 text-sm">
                Ensures every candle meets our high standards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Our Candles?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Join thousands of satisfied customers across India
          </p>
          <a
            href="/products"
            className="bg-white text-amber-800 px-8 py-3 rounded-lg hover:bg-stone-100 transition-colors font-semibold inline-block"
          >
            Shop Our Collection
          </a>
        </div>
      </section>
    </div>
  )
}
