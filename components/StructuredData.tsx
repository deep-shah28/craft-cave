import Script from 'next/script'

interface StructuredDataProps {
  type: 'website' | 'product' | 'organization' | 'localbusiness'
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
          "description": "Discover handcrafted gifts and decor: hampers, wall hangings, scrapbooks, portraits, candles, handmade cards, and diyas. Premium quality, made in India.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${data.url}/products?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Craft Cave"
          }
        }
      
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Craft Cave",
          "alternateName": "CraftCave by Jinali",
          "url": data.url,
          "logo": `${data.url}/images/logo.png`,
          "description": "Premium handcrafted gifts and decor made in India - hampers, wall hangings, scrapbooks, portraits, candles, handmade cards, and diyas",
          "foundingDate": "2024",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN",
            "addressRegion": "India"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-83205-35250",
            "email": "craftcavebyjinali@gmail.com",
            "contactType": "customer service",
            "availableLanguage": ["English", "Hindi"]
          },
          "makesOffer": {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Handmade Gifts and Home Decor",
              "category": "Handicrafts"
            }
          },
          "sameAs": []
        }
      
      case 'localbusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${data.url}/#localbusiness`,
          "name": "Craft Cave",
          "alternateName": "CraftCave by Jinali",
          "description": "Premium handcrafted gifts and decor made in India - hampers, wall hangings, scrapbooks, portraits, candles, handmade cards, and diyas",
          "url": data.url,
          "logo": `${data.url}/images/logo.png`,
          "image": `${data.url}/images/logo.png`,
          "telephone": "+91-83205-35250",
          "email": "craftcavebyjinali@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN",
            "addressRegion": "India"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "addressCountry": "IN"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
            ],
            "opens": "09:00",
            "closes": "21:00"
          },
          "priceRange": "₹₹",
          "currenciesAccepted": "INR",
          "paymentAccepted": ["Cash", "Credit Card", "UPI", "Net Banking"],
          "serviceArea": {
            "@type": "Country",
            "name": "India"
          },
          "areaServed": "India",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Handmade Gifts and Decor",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Gift Hampers",
                  "category": "Gifts"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Wall Hangings",
                  "category": "Home Decor"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Handmade Candles",
                  "category": "Home Decor"
                }
              }
            ]
          }
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
