import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import LikesModal from '@/components/LikesModal';
import { QueryProvider } from '@/lib/query-client';
import { CartProvider } from '@/components/CartProvider';
import StructuredData from '@/components/StructuredData';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Craft Cave - Handmade Gifts & Decor | Made in India",
  description: "Discover handcrafted gifts and decor: hampers, wall hangings, scrapbooks, portraits, candles, handmade cards, and diyas. Premium quality, made in India. Free shipping across India on orders above ₹999.",
  keywords: "handmade gifts, gift hampers, wall hangings, scrapbooks, portraits, candles, handmade cards, diyas, home decor, Indian crafts, personalized gifts, premium, India, artisan gifts, handcrafted home decor, made in India gifts, unique gifts, custom gifts, traditional crafts, wedding gifts, festival gifts, diwali gifts, birthday gifts, anniversary gifts, housewarming gifts",
  authors: [{ name: "Craft Cave" }],
  creator: "Craft Cave",
  publisher: "Craft Cave",
  robots: "index, follow",
  verification: {
    google: "6jcHv7UW7om6WuvXGsV9kNRkVfW7WJ7Q9i3mc51jAww"
  },
  alternates: {
    canonical: 'https://craft-cave.vercel.app'
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://craft-cave.vercel.app',
    siteName: 'Craft Cave',
    title: 'Craft Cave - Handmade Gifts & Decor',
    description: 'Discover handcrafted gifts and decor: hampers, wall hangings, scrapbooks, portraits, candles, handmade cards, and diyas — made in India.',
    images: [
      {
        url: 'https://craft-cave.vercel.app/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Craft Cave - Handmade Gifts & Decor',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Craft Cave - Handmade Gifts & Decor',
    description: 'Discover handcrafted gifts and decor: hampers, wall hangings, scrapbooks, portraits, candles, handmade cards, and diyas — made in India.',
    images: ['https://craft-cave.vercel.app/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = 'https://craft-cave.vercel.app'
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="6jcHv7UW7om6WuvXGsV9kNRkVfW7WJ7Q9i3mc51jAww" />
        <StructuredData 
          type="website" 
          data={{ url: baseUrl }} 
        />
        <StructuredData 
          type="organization" 
          data={{ url: baseUrl }} 
        />
        <StructuredData 
          type="localbusiness" 
          data={{ url: baseUrl }} 
        />
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <Cart />
            <LikesModal />
            <Toaster />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
