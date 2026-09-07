"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Product } from "@/lib/data";

export default function ProductShowcase({ product }: { product: Product }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Bottle rotation and movement
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);

  return (
    <div ref={containerRef} className={`h-[150vh] w-full relative ${product.color}/10`}>
      {/* Sticky Container for the Bottle */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background ambient glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full blur-[100px] ${product.color} opacity-20`} />

        {/* The "Bottle" (Simulated with CSS/Framer for now) */}
        <motion.div 
          style={{ rotate, y, scale }}
          className="relative z-10 w-48 h-96 md:w-64 md:h-[500px] drop-shadow-2xl flex flex-col items-center justify-center"
        >
          {/* Bottle Body */}
          <div className={`absolute inset-0 rounded-[40px] md:rounded-[60px] ${product.color} opacity-90 shadow-inner border border-white/20 backdrop-blur-sm overflow-hidden`}>
            {/* Liquid Effect */}
            <motion.div 
              animate={{ 
                y: ["0%", "5%", "0%"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-overlay"
            />
          </div>
          
          {/* Bottle Cap */}
          <div className="absolute -top-6 w-16 h-8 bg-foreground rounded-t-lg shadow-md" />
          <div className="absolute -top-1 w-20 h-4 bg-foreground rounded-full shadow-lg" />

          {/* Label */}
          <div className="relative z-20 bg-[#FFFDF7] w-[90%] h-[50%] rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground leading-none mb-2">
              {product.name}
            </h2>
            <p className="text-xs text-foreground/60 font-bold uppercase tracking-widest mb-4">
              Cold Pressed
            </p>
            <div className="text-5xl">{product.emoji}</div>
          </div>
        </motion.div>

        {/* Floating Ingredients Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {product.ingredients.map((ing, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl opacity-30"
              style={{
                top: `${20 + (i * 30)}%`,
                left: `${10 + (i % 2 === 0 ? 70 : 10)}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 20, -20, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              {ing.emoji}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
