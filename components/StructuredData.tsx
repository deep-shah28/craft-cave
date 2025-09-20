import Script from 'next/script'

interface StructuredDataProps {
  type: 'website' | 'product' | 'organization'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Craft Cave",
          "url": data.url,
          "description": "Premium handcrafted candles made in India with natural wax and authentic fragrances",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${data.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }
      
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Craft Cave",
          "url": data.url,
          "logo": `${data.url}/images/logo.png`,
          "description": "Premium handcrafted candles made in India",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          },
          "sameAs": []
        }
      
      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "image": data.image,
          "description": data.description,
          "brand": {
            "@type": "Brand",
            "name": "Craft Cave"
          },
          "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          }
        }
      
      default:
        return {}
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData())
      }}
    />
  )
}
