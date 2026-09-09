"use client";

import { motion } from "framer-motion";

export default function FluidSplash({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0E27] overflow-hidden pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      {/* Droplet falling */}
      <motion.div
        className="absolute w-8 h-12 bg-mango-500"
        style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
        initial={{ y: "-100vh", scale: 1 }}
        animate={{ 
          y: "0vh", 
          scale: [1, 1.2, 0.8, 150], 
        }}
        transition={{ 
          y: { duration: 0.8, ease: "easeIn" },
          scale: { delay: 0.8, duration: 1.2, ease: [0.76, 0, 0.24, 1] },
        }}
      />
      
      {/* Text reveal during drop */}
      <motion.div
        className="absolute z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 0.5, duration: 1.5, times: [0, 0.2, 1] }}
      >
        <h1 className="font-condensed text-white text-6xl tracking-widest mb-2">NO FILTER</h1>
        <p className="text-mango-500 text-xs tracking-[0.5em] uppercase font-sans">Raw 3D Experience</p>
      </motion.div>
    </motion.div>
  );
}
