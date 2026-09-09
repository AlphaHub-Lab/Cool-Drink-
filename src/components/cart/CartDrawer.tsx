"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { X, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Magnetic from "../ui/Magnetic";

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, setQty, removeFromCart, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[90]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-background shadow-2xl z-[100] flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-foreground/5">
              <h2 className="text-3xl font-display font-bold">Your Cart</h2>
              <button
                onClick={closeCart}
                className="w-12 h-12 bg-foreground/5 hover:bg-foreground/10 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow p-8 overflow-y-auto">
              {items.length > 0 ? (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-6 items-center">
                      <div className={`relative w-24 h-24 ${item.color} rounded-[1.5rem] overflow-hidden`}>
                        <Image src={item.bottleSrc} alt={item.name} fill className="object-contain p-2" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className="text-foreground/60">₹{item.price}</p>

                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-3 bg-foreground/5 rounded-full px-3 py-1">
                            <button
                              onClick={() => setQty(item.id, item.qty - 1)}
                              className="w-6 h-6 flex items-center justify-center font-bold text-xl hover:text-mango-500"
                            >
                              -
                            </button>
                            <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                            <button
                              onClick={() => setQty(item.id, item.qty + 1)}
                              className="w-6 h-6 flex items-center justify-center font-bold text-xl hover:text-mango-500"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-foreground/40 hover:text-raspberry-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <h3 className="text-2xl font-display font-bold mb-2">Your cart is empty.</h3>
                  <p className="text-foreground/60 mb-8">Looks like you need some fresh juice.</p>
                  <Magnetic pullRange={15}>
                    <Link href="/shop" onClick={closeCart}>
                      <button className="bg-mango-500 text-foreground font-bold px-8 py-4 rounded-full shadow-lg">
                        EXPLORE JUICES
                      </button>
                    </Link>
                  </Magnetic>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-foreground/5 bg-white">
                <div className="flex justify-between items-center mb-6 text-xl">
                  <span className="font-bold">Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>

                <Magnetic pullRange={10}>
                  <Link href="/checkout" onClick={closeCart} className="block w-full">
                    <button className="w-full bg-foreground text-background font-bold py-5 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group">
                      <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                      <span className="relative z-10">Proceed to Checkout</span>
                    </button>
                  </Link>
                </Magnetic>
                <p className="text-center text-xs text-foreground/40 mt-4">Shipping & taxes calculated at checkout</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
