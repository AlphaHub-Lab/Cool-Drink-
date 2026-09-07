"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Magnetic from "../ui/Magnetic";

export default function ShopCTA() {
  return (
    <section className="relative py-40 overflow-hidden bg-background text-foreground flex items-center justify-center min-h-screen">
      
      {/* Background large bottle */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute bottom-0 text-[30rem] leading-none filter drop-shadow-2xl opacity-20 pointer-events-none translate-y-1/4"
      >
        🧃
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <motion.h2 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-[8rem] font-display font-bold leading-[0.9] tracking-tighter mb-12 uppercase"
        >
          READY TO GO<br/>
          <span className="text-mango-500">NO FILTER?</span>
        </motion.h2>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Magnetic pullRange={40}>
            <Link href="/shop">
              <button className="bg-foreground text-background px-16 py-8 rounded-full font-display font-bold text-2xl md:text-3xl flex items-center gap-4 shadow-2xl hover:scale-105 transition-all relative overflow-hidden group">
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
