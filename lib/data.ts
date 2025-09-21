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
    size: ''
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
    size: ''
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
    size: ''
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
    size: ''
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
    size: ''
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
    size: ''
  },
  {
    id: '7',
    name: 'Premium Scented Candle Collection',
    price: 150,
    originalPrice: 280,
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
    price: 140,
    originalPrice: 0,
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
    size: ''
  },
  {
    id: '9',
    name: 'Premium Luxury Candle',
    price: 140,
    originalPrice: 0,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758387109/b16463a8-f5a7-488b-a4b0-43aead47460d_rx1bvd.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758387109/b16463a8-f5a7-488b-a4b0-43aead47460d_rx1bvd.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758387469/55c3bf5d-bc6a-4975-b57a-adfba6812997_clrqxn.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758404874/WhatsApp_Image_2025-09-21_at_3.16.56_AM_jo1jtq.jpg'
    ],
    videos: ['https://res.cloudinary.com/dqgprx49p/video/upload/v1758387205/_MConverter.eu_2e97c5aa-f523-4b64-8156-4d069ff6e8c8_wvjtqx.mp4',
      'https://res.cloudinary.com/dqgprx49p/video/upload/v1758404878/WhatsApp_Video_2025-09-21_at_3.17.05_AM_xsarr3.mp4'
    ],
    description: 'Premium luxury candle featuring an elegant design and sophisticated fragrance. Perfect for creating an upscale ambiance in any space.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Luxury Blend',
    burnTime: '48-52 hours',
    size: ''
  },
  {
    id: '10',
    name: 'Elegant Scented Candle',
    price: 150,
    originalPrice: 175,
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
    size: ''
  },
  {
    id: '11',
    name: 'Classic Scented Candle',
    price: 150,
    originalPrice: 0,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758403916/WhatsApp_Image_2025-09-21_at_3.00.02_AM_o9cfgv.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758403916/WhatsApp_Image_2025-09-21_at_3.00.02_AM_o9cfgv.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758400799/05213b3f-e14d-4160-a6ef-3948230f0fbd_uwtkvz.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758402233/candle1_ws6cux.jpg'
    ],
    videos: ['https://res.cloudinary.com/dqgprx49p/video/upload/v1758400872/cdf8e3c4-3ee0-445e-8053-cfcaf964da41_gbiz84.mp4'],
    description: 'Classic scented candle with timeless appeal and exceptional fragrance quality. A perfect addition to any home collection.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Classic Blend',
    burnTime: '42-46 hours',
    size: '',
    variants: {
      sizes: [
        { size: '3.5 inch', price: 150, label: 'Small' },
        { size: '4.5 inch', price: 370, label: 'Medium' },
        { size: '5.5 inch', price: 570, label: 'Large' }
      ],
      decorations: [
        { name: 'Daisy Flower Decoration', price: 25 }
      ]
    }
  },
  {
    id: '12',
    name: 'Premium Artisan Candle',
    price: 160,
    originalPrice: 200,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758401638/IMG_2771_chmjef.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758401638/IMG_2771_chmjef.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758401636/IMG_2770_ne1ow1.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758401412/1c1e431c-de9a-4292-8e81-11307c9c8b30_m1cm4h.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758401413/a8a47bbb-3cae-4268-b4ec-709c00499a5d_qwbczs.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758401413/11a11d01-c3ba-43af-9e91-f683b47623c5_asbheg.jpg'
    ],
    videos: [],
    description: 'Premium artisan candle handcrafted with the finest ingredients. Features an exquisite design and long-lasting fragrance that transforms any space into a sanctuary of relaxation.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Artisan Blend',
    burnTime: '45-50 hours',
    size: ''
  },
  {
    id: '13',
    name: 'Luxury Designer Candle',
    price: 40,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758401987/2b56c48b-1c69-4479-b531-983fc92ce938_grbxbp.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758401987/2b56c48b-1c69-4479-b531-983fc92ce938_grbxbp.jpg'
    ],
    videos: [
      'https://res.cloudinary.com/dqgprx49p/video/upload/v1758401989/bb129d48-90d7-4ba3-b4f6-ac928d64144e_idujr5.mp4'
    ],
    description: 'Luxury designer candle with sophisticated aesthetics and premium fragrance. Perfect for creating an ambiance of elegance and refinement in any setting.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Designer Blend',
    burnTime: '50-55 hours',
    size: '',
    variants: {
      decorations: [
        {
          name: 'Flower Decoration',
          price: 10
        }
      ]
    }
  },
  {
    id: '14',
    name: 'Handcrafted Specialty Candle',
    price: 150,
    originalPrice: 200,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758402406/WhatsApp_Image_2025-09-21_at_2.36.01_AM_kzj03i.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758402406/WhatsApp_Image_2025-09-21_at_2.36.01_AM_kzj03i.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758402405/WhatsApp_Image_2025-09-21_at_2.36.01_AM_1_lupaf3.jpg'
    ],
    videos: [
      'https://res.cloudinary.com/dqgprx49p/video/upload/v1758402566/WhatsApp_Video_2025-09-21_at_2.38.56_AM_csvd6a.mp4'
    ],
    description: 'Handcrafted specialty candle with unique design and premium fragrance blend. Perfect for creating a warm and inviting atmosphere in any space.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Specialty Blend',
    burnTime: '40-45 hours',
    size: ''
  },
  {
    id: '15',
    name: 'Contemporary Artisan Candle',
    price: 350,
    originalPrice: 500,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758402790/WhatsApp_Image_2025-09-21_at_2.41.08_AM_1_cwb6gf.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758402790/WhatsApp_Image_2025-09-21_at_2.41.08_AM_1_cwb6gf.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758402793/WhatsApp_Image_2025-09-21_at_2.41.08_AM_jixujp.jpg'
    ],
    videos: [
      'https://res.cloudinary.com/dqgprx49p/video/upload/v1758402829/WhatsApp_Video_2025-09-21_at_2.42.56_AM_npbdof.mp4'
    ],
    description: 'Contemporary artisan candle featuring modern design elements and carefully curated fragrance. Ideal for contemporary home settings and sophisticated décor.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Contemporary Blend',
    burnTime: '48-52 hours',
    size: ''
  },
  {
    id: '16',
    name: 'Elegant Signature Candle',
    price: 380,
    originalPrice: 450,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758403029/WhatsApp_Image_2025-09-21_at_2.45.50_AM_sehxvl.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758403029/WhatsApp_Image_2025-09-21_at_2.45.50_AM_sehxvl.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758403031/WhatsApp_Image_2025-09-21_at_2.45.53_AM_hhhaov.jpg'
    ],
    videos: [
      'https://res.cloudinary.com/dqgprx49p/video/upload/v1758403034/WhatsApp_Video_2025-09-21_at_2.45.56_AM_ymzbnl.mp4'
    ],
    description: 'Elegant signature candle with distinctive design and premium fragrance composition. Crafted with attention to detail for discerning customers who appreciate quality.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Signature Blend',
    burnTime: '46-50 hours',
    size: ''
  },
  {
    id: '17',
    name: 'Refined Artisan Candle',
    price: 150,
    originalPrice: 175,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758403205/WhatsApp_Image_2025-09-21_at_2.48.39_AM_ymiem2.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758403205/WhatsApp_Image_2025-09-21_at_2.48.39_AM_ymiem2.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758403202/WhatsApp_Image_2025-09-21_at_2.48.17_AM_1_x82fhk.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758403202/WhatsApp_Image_2025-09-21_at_2.48.17_AM_i4dqpq.jpg'
    ],
    videos: [],
    description: 'Refined artisan candle with exquisite craftsmanship and sophisticated fragrance profile. Perfect for creating an atmosphere of luxury and tranquility in any space.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Refined Blend',
    burnTime: '44-48 hours',
    size: ''
  },
  {
    id: '18',
    name: 'Premium Luxury Candle',
    price: 1399,
    originalPrice: 1799,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758403408/WhatsApp_Image_2025-09-21_at_2.50.21_AM_shsjse.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758403408/WhatsApp_Image_2025-09-21_at_2.50.21_AM_shsjse.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758403410/WhatsApp_Image_2025-09-21_at_2.52.11_AM_koaq9z.jpg'
    ],
    videos: [],
    description: 'Premium luxury candle with superior quality ingredients and elegant presentation. Designed for those who demand the finest in home fragrance and ambiance.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Luxury Blend',
    burnTime: '50-55 hours',
    size: ''
  },
  {
    id: '19',
    name: 'Exquisite Handmade Candle',
    price: 350,
    originalPrice: 450,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758404082/WhatsApp_Image_2025-09-21_at_3.02.03_AM_e6g9ft.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758404082/WhatsApp_Image_2025-09-21_at_3.02.03_AM_e6g9ft.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758403881/WhatsApp_Image_2025-09-21_at_2.59.17_AM_dln9wx.jpg'
    ],
    videos: [
      'https://res.cloudinary.com/dqgprx49p/video/upload/v1758403893/WhatsApp_Video_2025-09-21_at_2.59.27_AM_wyn43f.mp4'
    ],
    description: 'Exquisite handmade candle crafted with premium materials and exceptional attention to detail. Perfect for creating a luxurious and warm atmosphere in any refined setting.',
    category: 'Scented Candles',
    productType: 'candle',
    inStock: true,
    fragrance: 'Exquisite Blend',
    burnTime: '52-56 hours',
    size: ''
  },
  {
    id: '20',
    name: 'Traditional Decorative Diya',
    price: 120,
    originalPrice: 160,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758438819/b2aedf73-ec19-422d-ae55-9eb8528899e3_p3ob3w.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758438819/b2aedf73-ec19-422d-ae55-9eb8528899e3_p3ob3w.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758438820/IMG_2778_tfncbr.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758438819/IMG_2777_mvgnrn.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758438818/IMG_2776_q7ayh6.jpg'
    ],
    videos: [],
    description: 'Beautiful traditional decorative diya handcrafted with intricate designs. Perfect for festivals, celebrations, and creating a warm, spiritual ambiance in your home.',
    category: 'Diyas',
    productType: 'diya',
    inStock: true,
    material: 'Clay',
    burnTime: '2-3 hours',
    size: ''
  },
  {
    id: '21',
    name: 'Elegant Festive Diya',
    price: 110,
    originalPrice: 150,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758439327/1dec794a-7a8f-4e0d-9601-b49113777a53_tgnsnl.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758439327/1dec794a-7a8f-4e0d-9601-b49113777a53_tgnsnl.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758439328/IMG_2781_a7dydr.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758439329/IMG_2782_tfhjaz.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758439327/IMG_2780_oyy5wv.jpg'
    ],
    videos: [],
    description: 'Elegant festive diya with beautiful craftsmanship and traditional appeal. Ideal for Diwali, religious ceremonies, and special occasions to bring divine light and positive energy.',
    category: 'Diyas',
    productType: 'diya',
    inStock: true,
    material: 'Clay',
    burnTime: '2-3 hours',
    size: ''
  },
  {
    id: '22',
    name: 'Handcrafted Artistic Diya',
    price: 100,
    originalPrice: 135,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758439494/ada89c91-c517-4efb-bf2c-bcc9e88af2c3_rwn2hx.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758439494/ada89c91-c517-4efb-bf2c-bcc9e88af2c3_rwn2hx.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758439496/IMG_2784_dmyyh1.jpg'
    ],
    videos: [],
    description: 'Handcrafted artistic diya with unique design and traditional craftsmanship. Perfect for creating a serene atmosphere during festivals and special occasions.',
    category: 'Diyas',
    productType: 'diya',
    inStock: true,
    material: 'Clay',
    burnTime: '2-3 hours',
    size: ''
  },
  {
    id: '23',
    name: 'Classic Traditional Diya',
    price: 95,
    originalPrice: 125,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758439761/2ca86213-e7a3-4a04-98ce-068ea20250ea_ctjb4k.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758439761/2ca86213-e7a3-4a04-98ce-068ea20250ea_ctjb4k.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758439762/IMG_2788_aki1d3.jpg'
    ],
    videos: [],
    description: 'Classic traditional diya with timeless design and authentic craftsmanship. Perfect for daily prayers, meditation, and bringing peace and prosperity to your home.',
    category: 'Diyas',
    productType: 'diya',
    inStock: true,
    material: 'Clay',
    burnTime: '2-3 hours',
    size: ''
  },
  {
    id: '24',
    name: 'Ornate Decorative Diya',
    price: 130,
    originalPrice: 170,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758440088/a1678ca2-1b47-4509-953d-82d9f37ad09c_kpluaa.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758440088/a1678ca2-1b47-4509-953d-82d9f37ad09c_kpluaa.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758440088/IMG_2790_bd0lno.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758440449/IMG_2792_fqrmjb.jpg'
    ],
    videos: [],
    description: 'Ornate decorative diya featuring intricate patterns and elegant design. Perfect for special celebrations and creating a divine atmosphere in your sacred space.',
    category: 'Diyas',
    productType: 'diya',
    inStock: true,
    material: 'Clay',
    burnTime: '2-3 hours',
    size: ''
  },
  {
    id: '25',
    name: 'Premium Festive Diya',
    price: 140,
    originalPrice: 180,
    image: 'https://res.cloudinary.com/dqgprx49p/image/upload/v1758440802/IMG_2796_nelrcx.jpg',
    images: [
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758440802/IMG_2796_nelrcx.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758440800/db949cf3-9428-4161-8ba7-74e4cd0c66e0_z0024o.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758440799/d0859145-8d0e-4a7c-855a-ea725d9e0ee5_d2wa9e.jpg',
      'https://res.cloudinary.com/dqgprx49p/image/upload/v1758440797/19e3204b-4938-47c1-986a-e2f4b2615418_i1mljl.jpg'
    ],
    videos: [],
    description: 'Premium festive diya with exquisite detailing and superior craftsmanship. Ideal for grand celebrations, puja ceremonies, and adding elegance to your festive decorations.',
    category: 'Diyas',
    productType: 'diya',
    inStock: true,
    material: 'Clay',
    burnTime: '2-3 hours',
    size: ''
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
    images: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop',],
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
  'Diyas',
  'Hampers',
  'Baskets',
  'Accessories'
]

export const productTypes = [
  { value: 'all', label: 'All Products' },
  { value: 'candle', label: 'Candles' },
  { value: 'diya', label: 'Diyas' },
  { value: 'hamper', label: 'Ready Hampers' },
  { value: 'basket', label: 'Baskets & Boxes' },
  { value: 'accessory', label: 'Accessories' }
]
