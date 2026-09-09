import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NO FILTER | Raw Juice",
  description: "The Raw Truth.",
};

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import AnimationEngine from "@/components/ui/AnimationEngine";

import LoadingScreen from "@/components/LoadingScreen";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans selection:bg-mango-500 selection:text-white bg-foreground">
        <AnimationEngine />
        <CartProvider>
          <LoadingScreen />
          <Navbar />
          <CartDrawer />
          <main className="flex-grow flex flex-col relative z-10">
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
