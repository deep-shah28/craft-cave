import { Product } from './store'

export const sampleProducts: Product[] = [
  // Candles
  {
    id: '1',
    name: 'Lavender Dreams Candle',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1602874801006-47670818b8ee?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1602874801006-47670818b8ee?w=400&h=400&fit=crop'],
    videos: ['https://player.vimeo.com/progressive_redirect/playback/927016456/rendition/720p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=c8df2ba2d727f8f9b9864afc7b6871c67e2ad391395d02dc814ad10fcc5f1445'],
    description: 'A calming lavender-scented candle perfect for relaxation and meditation. Made with premium soy wax and natural lavender essential oils.',
    category: 'Aromatherapy',
    productType: 'candle',
    inStock: true,
    fragrance: 'Lavender',
    burnTime: '40-45 hours',
    size: '300g'
  },
  {
    id: '2',
    name: 'Vanilla Spice Delight',
    price: 799,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'],
    description: 'Warm and inviting vanilla with hints of cinnamon and nutmeg. Perfect for creating a cozy atmosphere in your home.',
    category: 'Home Fragrance',
    productType: 'candle',
    inStock: true,
    fragrance: 'Vanilla Spice',
    burnTime: '35-40 hours',
    size: '250g'
  },
  {
    id: '3',
    name: 'Jasmine Night Bloom',
    price: 999,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop'],
    videos: ['https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'],
    description: 'Exotic jasmine fragrance that transforms your space into a tranquil garden. Hand-poured with love in small batches.',
    category: 'Floral',
    productType: 'candle',
    inStock: true,
    fragrance: 'Jasmine',
    burnTime: '45-50 hours',
    size: '350g'
  },
  {
    id: '4',
    name: 'Sandalwood Serenity',
    price: 1199,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'],
    description: 'Premium sandalwood candle with earthy, woody notes. Ideal for meditation and spiritual practices.',
    category: 'Aromatherapy',
    productType: 'candle',
    inStock: true,
    fragrance: 'Sandalwood',
    burnTime: '50-55 hours',
    size: '400g'
  },
  {
    id: '5',
    name: 'Citrus Fresh Morning',
    price: 699,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1602874801006-47670818b8ee?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1602874801006-47670818b8ee?w=400&h=400&fit=crop'],
    description: 'Energizing blend of orange, lemon, and grapefruit. Perfect for starting your day with positive energy.',
    category: 'Energizing',
    productType: 'candle',
    inStock: true,
    fragrance: 'Citrus Blend',
    burnTime: '30-35 hours',
    size: '200g'
  },
  {
    id: '6',
    name: 'Rose Garden Romance',
    price: 1099,
    originalPrice: 1499,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'],
    description: 'Romantic rose scented candle with subtle floral undertones. Perfect for special occasions and romantic evenings.',
    category: 'Floral',
    productType: 'candle',
    inStock: false,
    fragrance: 'Rose',
    burnTime: '42-48 hours',
    size: '320g'
  },
  {
    id: '7',
    name: 'Premium Scented Candle Collection',
    price: 1299,
    originalPrice: 1699,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758385357/572be8b3-36f5-46f2-9f12-6c06a2db73a1_hhyqyi.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758385357/572be8b3-36f5-46f2-9f12-6c06a2db73a1_hhyqyi.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758385357/e1e818c3-7348-47c9-a84a-3fefed86d52d_sjdfae.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758385357/a0cce0a1-3507-437d-b34f-4911fa661aa7_vg2ceg.jpg'
    ],
    description: 'Luxurious scented candle with a rich, complex fragrance profile. Hand-poured with premium soy wax for a clean, long-lasting burn.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Signature Blend',
    burnTime: '45-50 hours',
    size: ''
  },
  {
    id: '8',
    name: 'Artisan Scented Candle',
    price: 1149,
    originalPrice: 1549,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758386324/435eeeab-2863-4ee9-bb95-e335faf7ca65_zp7ilf.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758386324/435eeeab-2863-4ee9-bb95-e335faf7ca65_zp7ilf.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758386321/337a5b16-80a4-4452-bc05-df7d6637ddd5_mvqr6d.jpg'
    ],
    videos: ['https://res.cloudinary.com/dqgprx49p/video/upload/v1758386846/_MConverter.eu_c812e8df-8af0-45f7-b8f4-ad855edf2f88_iknwsl.mp4'],
    description: 'Handcrafted artisan candle with an exquisite fragrance blend. Each candle is carefully poured and finished with attention to detail.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Artisan Blend',
    burnTime: '40-45 hours',
    size: '300g'
  },
  {
    id: '9',
    name: 'Premium Luxury Candle',
    price: 1399,
    originalPrice: 1899,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758387109/b16463a8-f5a7-488b-a4b0-43aead47460d_rx1bvd.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758387109/b16463a8-f5a7-488b-a4b0-43aead47460d_rx1bvd.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758387469/55c3bf5d-bc6a-4975-b57a-adfba6812997_clrqxn.jpg'
    ],
    videos: ['https://res.cloudinary.com/dqgprx49p/video/upload/v1758387205/_MConverter.eu_2e97c5aa-f523-4b64-8156-4d069ff6e8c8_wvjtqx.mp4'],
    description: 'Premium luxury candle featuring an elegant design and sophisticated fragrance. Perfect for creating an upscale ambiance in any space.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Luxury Blend',
    burnTime: '48-52 hours',
    size: '400g'
  },
  {
    id: '10',
    name: 'Elegant Scented Candle',
    price: 1249,
    originalPrice: 1649,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758387814/94d6b6ce-e6e7-4243-86e8-8b3ebf338694_azjx5x.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758387814/94d6b6ce-e6e7-4243-86e8-8b3ebf338694_azjx5x.jpg'
    ],
    videos: [
      'https://res.cloudinary.com/dqgprx49p/video/upload/v1758388139/86d43687-a7b0-43c5-973b-f8e26034ec6f_ywfl2o.mp4',
      'https://res.cloudinary.com/dqgprx49p/video/upload/v1758388251/1d826db1-475e-4852-b6ad-9d9a0b45219a_mlj9ct.mp4'
    ],
    description: 'Elegant scented candle with a refined fragrance and beautiful presentation. Crafted for those who appreciate sophisticated home décor.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Elegant Blend',
    burnTime: '44-48 hours',
    size: '320g'
  },

  // Baskets
  {
    id: 'basket-1',
    name: 'Rustic Bamboo Basket',
    price: 499,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'],
    description: 'Handwoven bamboo basket perfect for creating custom gift hampers. Eco-friendly and sustainable.',
    category: 'Baskets',
    productType: 'basket',
    inStock: true,
    size: 'Medium',
    dimensions: '25cm x 20cm x 15cm',
    material: 'Natural Bamboo',
    capacity: 'Holds 4-6 items'
  },
  {
    id: 'basket-2',
    name: 'Premium Wicker Hamper',
    price: 799,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'],
    description: 'Elegant wicker hamper with sturdy handles and fabric lining. Perfect for luxury gift presentations.',
    category: 'Baskets',
    productType: 'basket',
    inStock: true,
    size: 'Large',
    dimensions: '35cm x 25cm x 20cm',
    material: 'Premium Wicker',
    capacity: 'Holds 6-10 items'
  },
  {
    id: 'basket-3',
    name: 'Compact Gift Box',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop'],
    description: 'Stylish cardboard gift box with magnetic closure. Perfect for smaller gift combinations.',
    category: 'Baskets',
    productType: 'basket',
    inStock: true,
    size: 'Small',
    dimensions: '20cm x 15cm x 10cm',
    material: 'Premium Cardboard',
    capacity: 'Holds 2-4 items'
  },

  // Accessories & Gifting Materials
  {
    id: 'acc-1',
    name: 'Decorative Potpourri',
    price: 199,
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop'],
    description: 'Natural dried flowers and herbs with essential oils. Perfect addition to any gift hamper.',
    category: 'Accessories',
    productType: 'accessory',
    inStock: true,
    size: '100g',
    fragrance: 'Mixed Floral'
  },
  {
    id: 'acc-2',
    name: 'Scented Tea Lights (Set of 6)',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1602874801006-47670818b8ee?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1602874801006-47670818b8ee?w=400&h=400&fit=crop'],
    description: 'Set of 6 scented tea lights in various fragrances. Perfect for creating ambiance.',
    category: 'Accessories',
    productType: 'accessory',
    inStock: true,
    size: 'Set of 6',
    burnTime: '4-5 hours each'
  },
  {
    id: 'acc-3',
    name: 'Luxury Matches',
    price: 149,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'],
    description: 'Premium long matches in decorative packaging. Essential accessory for candle lovers.',
    category: 'Accessories',
    productType: 'accessory',
    inStock: true,
    size: '10cm matches'
  },
  {
    id: 'acc-4',
    name: 'Candle Care Kit',
    price: 399,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'],
    description: 'Complete candle care kit with wick trimmer, snuffer, and cleaning tools.',
    category: 'Accessories',
    productType: 'accessory',
    inStock: true,
    size: 'Complete Kit'
  },
  {
    id: 'acc-5',
    name: 'Aromatherapy Diffuser Oil',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop'],
    description: '100% pure essential oil blend for diffusers. Complements candle fragrances perfectly.',
    category: 'Accessories',
    productType: 'accessory',
    inStock: true,
    size: '30ml',
    fragrance: 'Lavender-Eucalyptus'
  },

  // Pre-made Hampers
  {
    id: 'hamper-1',
    name: 'Relaxation Hamper',
    price: 2499,
    originalPrice: 3299,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758361113/IMG_2703_gh2ssv.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758361113/IMG_2703_gh2ssv.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758361124/IMG_2704_os4lq0.jpg'
    ],
    videos: ['https://res.cloudinary.com/dqgprx49p/video/upload/v1758363884/025f55bd-4839-4b55-8f13-0d630740b2ac_gpwbm8.mp4'],
    description: 'Complete relaxation package with lavender candle, potpourri, tea lights, and bamboo basket.',
    category: 'Hampers',
    productType: 'hamper',
    inStock: true,
    size: 'Complete Set',
    comboItems: ['1', 'acc-1', 'acc-2', 'basket-1']
  },
  {
    id: 'hamper-2',
    name: 'Luxury Gift Hamper',
    price: 3999,
    originalPrice: 4999,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758368550/0189c538-2d88-4dac-86a6-6b684d3f1132_akj9lc.jpg',
    images: ['https://res.cloudinary.com/dqgprx49p/image/upload/v1758368550/0189c538-2d88-4dac-86a6-6b684d3f1132_akj9lc.jpg'],
    videos: ['https://res.cloudinary.com/dqgprx49p/video/upload/v1758368529/1922b9cf-e8be-4f05-a7cd-26346fe83ca6_2_nkonvx.mp4'],
    description: 'Premium gift hamper with multiple candles, accessories, and elegant wicker basket.',
    category: 'Hampers',
    productType: 'hamper',
    inStock: true,
    size: 'Premium Set',
    comboItems: ['3', '4', 'acc-2', 'acc-4', 'basket-2']
  },
  {
    id: 'hamper-3',
    name: 'Craft Cave Special Hamper',
    price: 2999,
    originalPrice: 3999,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758350556/hamper1_iuussi.jpg',
    images: ['/images/hamper1.jpeg'],
    description: 'Our signature hamper featuring a curated selection of premium candles and accessories. Perfect for gifting or treating yourself.',
    category: 'Hampers',
    productType: 'hamper',
    inStock: true,
    size: 'Special Set',
    comboItems: ['1', '2', 'acc-1', 'acc-3', 'basket-1']
  }
]

export const categories = [
  'All',
  'Aromatherapy',
  'Home Fragrance',
  'Floral',
  'Energizing',
  'Scented Candles',
  'Hampers',
  'Baskets',
  'Accessories'
]

export const productTypes = [
  { value: 'all', label: 'All Products' },
  { value: 'candle', label: 'Candles' },
  { value: 'hamper', label: 'Ready Hampers' },
  { value: 'basket', label: 'Baskets & Boxes' },
  { value: 'accessory', label: 'Accessories' }
]
