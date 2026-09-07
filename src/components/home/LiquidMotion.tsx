"use client";

import { motion } from "framer-motion";

export default function LiquidMotion() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden bg-background flex items-center justify-center">
      
      {/* Abstract Liquid Shapes */}
      <motion.div 
        animate={{ 
          borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] bg-mango-500/80 mix-blend-multiply filter blur-3xl opacity-60"
      />

      <motion.div 
        animate={{ 
          borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] bg-raspberry-500/80 mix-blend-multiply filter blur-3xl opacity-50 translate-x-[200px]"
      />

      {/* Massive Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-overlay z-20">
        <motion.h2 
          className="text-[6rem] sm:text-[10rem] md:text-[15rem] font-display font-bold text-white tracking-tighter"
        >
          FLOW
        </motion.h2>
      </div>

    </section>
  );
}
