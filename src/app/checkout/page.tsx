"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Magnetic from "@/components/ui/Magnetic";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const shipping = items.length ? 40 : 0;
  const total = subtotal + shipping;
  return (
    <div className="pt-32 pb-32 bg-background min-h-screen text-foreground">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold mb-4"
          >
            Checkout
          </motion.h1>
          <p className="text-foreground/60 font-medium text-lg">Almost yours.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - Forms */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 space-y-12"
          >
            {/* Customer Info */}
            <section className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm">
              <h2 className="text-2xl font-display font-bold mb-6 text-mango-500">1. Customer Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">First Name</label>
                    <input type="text" className="w-full bg-foreground/5 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-mango-500 transition-shadow" placeholder="Jane" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Last Name</label>
                    <input type="text" className="w-full bg-foreground/5 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-mango-500 transition-shadow" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email Address</label>
                  <input type="email" className="w-full bg-foreground/5 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-mango-500 transition-shadow" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Phone Number</label>
                  <input type="tel" className="w-full bg-foreground/5 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-mango-500 transition-shadow" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </section>

            {/* Delivery */}
            <section className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm">
              <h2 className="text-2xl font-display font-bold mb-6 text-mango-500">2. Delivery Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Street Address</label>
                  <input type="text" className="w-full bg-foreground/5 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-mango-500 transition-shadow" placeholder="123 Canopy Lane" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-bold mb-2">City</label>
                    <input type="text" className="w-full bg-foreground/5 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-mango-500 transition-shadow" placeholder="Jungle City" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-bold mb-2">State</label>
                    <input type="text" className="w-full bg-foreground/5 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-mango-500 transition-shadow" placeholder="CA" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-bold mb-2">Zip Code</label>
                    <input type="text" className="w-full bg-foreground/5 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-mango-500 transition-shadow" placeholder="90210" />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Placeholder */}
            <section className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm">
              <h2 className="text-2xl font-display font-bold mb-6 text-mango-500">3. Payment</h2>
              <div className="p-8 border-2 border-dashed border-foreground/20 rounded-xl text-center text-foreground/50">
                <p>Payment gateway integration point.</p>
                <p className="text-sm mt-2">(Stripe / PayPal elements would mount here)</p>
              </div>
            </section>

          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-[400px]"
          >
            <div className="bg-foreground text-background p-8 rounded-[2rem] sticky top-32">
              <h3 className="text-2xl font-display font-bold mb-8">Order Summary</h3>
              
              <div className="space-y-6 mb-8">
                {items.length === 0 && (
                  <p className="text-background/60 text-sm">Your cart is empty. <Link href="/shop" className="underline">Shop juices</Link>.</p>
                )}
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className={`relative w-16 h-16 ${item.color} rounded-xl overflow-hidden`}>
                        <Image src={item.bottleSrc} alt={item.name} fill className="object-contain p-1" />
                      </div>
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-background/60">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <p className="font-bold">₹{item.price * item.qty}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-background/20 pt-6 space-y-4 mb-8">
                <div className="flex justify-between text-background/80">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-background/80">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-background/20">
                  <span>Total</span>
                  <span className="text-mango-500">₹{total}</span>
                </div>
              </div>

              <Magnetic pullRange={15}>
                <button className="w-full bg-mango-500 text-foreground font-bold py-5 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/30 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                  <span className="relative z-10">Place Order</span>
                </button>
              </Magnetic>
              
              <p className="text-center text-sm text-background/40 mt-4 flex items-center justify-center gap-2">
                🔒 Secure Checkout
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
