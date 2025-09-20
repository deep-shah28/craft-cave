import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://your-vercel-domain.vercel.app' // Replace with your actual Vercel domain
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/checkout/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
