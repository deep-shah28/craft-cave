'use client'

import Script from 'next/script'

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
  }
}

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
  if (!GA_TRACKING_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  )
}

// Event tracking helper
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Common e-commerce tracking events
export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: 'INR',
    items: items
  })
}

export const trackAddToCart = (itemId: string, itemName: string, price: number) => {
  trackEvent('add_to_cart', {
    currency: 'INR',
    value: price,
    items: [{
      item_id: itemId,
      item_name: itemName,
      price: price,
      quantity: 1
    }]
  })
}

export const trackViewItem = (itemId: string, itemName: string, price: number, category: string) => {
  trackEvent('view_item', {
    currency: 'INR',
    value: price,
    items: [{
      item_id: itemId,
      item_name: itemName,
      item_category: category,
      price: price,
      quantity: 1
    }]
  })
}
