"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Magnetic from "../ui/Magnetic";

export default function ShopCTA() {
  return (
    <section className="relative py-24 sm:py-32 md:py-40 overflow-hidden bg-background text-foreground flex items-center justify-center min-h-[70vh] md:min-h-screen">
      
      {/* Background large bottle */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute bottom-0 text-[12rem] sm:text-[20rem] md:text-[30rem] leading-none filter drop-shadow-2xl opacity-15 pointer-events-none translate-y-1/4 select-none"
      >
        🧃
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
        
        <motion.h2 
          initial={{ scale: 0.92, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-[6rem] lg:text-[8rem] font-display font-bold leading-[0.9] tracking-tighter mb-8 sm:mb-12 uppercase"
        >
          READY TO GO<br/>
          <span className="text-mango-500">NO FILTER?</span>
        </motion.h2>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Magnetic pullRange={25}>
            <Link href="/shop">
              <button className="bg-foreground text-background px-8 py-4 sm:px-12 sm:py-6 md:px-16 md:py-8 rounded-full font-display font-bold text-base sm:text-xl md:text-3xl flex items-center justify-center gap-3 sm:gap-4 shadow-2xl hover:scale-105 active:scale-95 transition-all relative overflow-hidden group">
                <div className="absolute inset-0 bg-mango-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                <span className="relative z-10 group-hover:text-white transition-colors">SHOP ALL JUICES</span> 
              </button>
            </Link>
          </Magnetic>
        </motion.div>

      </div>
    </section>
  );
}
