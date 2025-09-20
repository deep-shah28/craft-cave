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
  title: "Craft Cave - Premium Handcrafted Candles | Made in India",
  description: "Discover our exclusive collection of handcrafted candles. Premium quality, natural fragrances, and beautiful designs. Free shipping across India on orders above ₹999.",
  keywords: "candles, handcrafted, premium, India, aromatherapy, home fragrance, natural wax, soy candles, scented candles",
  authors: [{ name: "Craft Cave" }],
  creator: "Craft Cave",
  publisher: "Craft Cave",
  robots: "index, follow",
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://craft-cave.vercel.app',
    siteName: 'Craft Cave',
    title: 'Craft Cave - Premium Handcrafted Candles',
    description: 'Discover our exclusive collection of handcrafted candles made in India',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Craft Cave - Premium Handcrafted Candles',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Craft Cave - Premium Handcrafted Candles',
    description: 'Discover our exclusive collection of handcrafted candles made in India',
    images: ['/images/logo.png'],
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
