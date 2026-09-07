"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Magnetic from "../ui/Magnetic";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scaleTitle = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const titleText = "Juice that hits different.".split(" ");

  return (
    <section ref={ref} className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-foreground">
      
      {/* Background Video */}
      <motion.div 
        className="absolute inset-0 z-0 w-full h-full"
        style={{ y: yBg }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay for text readability */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        >
          {/* Using the user's provided local video */}
          <source src="/create_some_animated_images.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center pointer-events-none"
        style={{ opacity }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="mb-8 inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-bold text-white shadow-sm uppercase tracking-[0.2em] text-xs border border-white/20"
        >
          100% Natural • No Added Sugar
        </motion.div>
        
        {/* Staggered Text Masking */}
        <motion.h1 
          style={{ scale: scaleTitle }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-display font-bold tracking-tighter text-white mb-8 leading-[0.9] max-w-6xl flex flex-wrap justify-center gap-x-6 gap-y-2 drop-shadow-2xl"
        >
          {titleText.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block ${word.includes('different') ? 'text-mango-500' : ''}`}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl text-white/90 max-w-2xl mb-12 font-medium drop-shadow-md"
        >
          Dropped fresh from the canopy. Refreshingly honest, wildy organic fruit juice.
        </motion.p>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 1 }}
          className="pointer-events-auto"
        >
          <Magnetic pullRange={30}>
            <Link href="/shop">
              <button
                className="bg-mango-500 text-foreground px-12 py-6 rounded-full font-display font-bold text-xl flex items-center gap-4 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/30 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                <span className="relative z-10">Shop Flavors</span> 
                <span className="relative z-10 text-2xl group-hover:rotate-12 transition-transform">🍹</span>
              </button>
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
