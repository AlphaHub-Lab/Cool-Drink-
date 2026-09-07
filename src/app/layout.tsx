import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NO FILTER | Raw Juice",
  description: "The Raw Truth.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SmoothScrolling from "@/components/ui/SmoothScrolling";

import LoadingScreen from "@/components/LoadingScreen";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-mango-500 selection:text-white bg-foreground">
        <SmoothScrolling />
        <CartProvider>
          <LoadingScreen />
          <CartDrawer />
          <Navbar />
          <main className="flex-grow flex flex-col relative z-10 bg-background">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
