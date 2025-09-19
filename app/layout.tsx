import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import LikesModal from '@/components/LikesModal';
import { QueryProvider } from '@/lib/query-client';
import { CartProvider } from '@/components/CartProvider';
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
  keywords: "candles, handcrafted, premium, India, aromatherapy, home fragrance, natural wax",
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
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
  return (
    <html lang="en" suppressHydrationWarning>
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
