"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoadedBefore");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Extended timer to allow the full cinematic sequence to play
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasLoadedBefore", "true");
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          
          {/* Phase 1: The Droplet */}
          <motion.div
            initial={{ y: "-100vh", opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            className="absolute z-10 text-4xl text-mango-500"
          >
            💧
          </motion.div>

          {/* Phase 2: The Splash / Liquid Expansion */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 50, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
            className="absolute z-20 w-32 h-32 bg-mango-500 rounded-full"
          />

          {/* Phase 3: The Bottle Emerges */}
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
            className="absolute z-30 text-[10rem] filter drop-shadow-2xl"
          >
            🧃
          </motion.div>

          {/* Phase 4: Typography Reveals */}
          <div className="absolute z-40 flex flex-col items-center justify-center pointer-events-none mt-64">
            <div className="flex gap-4 md:gap-8 overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="text-6xl md:text-8xl font-display font-bold text-foreground tracking-tighter"
              >
                NO
              </motion.h1>
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="text-6xl md:text-8xl font-display font-bold text-foreground tracking-tighter"
              >
                FILTER
              </motion.h1>
            </div>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.8 }}
              className="text-xl md:text-2xl font-bold tracking-widest uppercase text-white/90 mix-blend-difference"
            >
              Enter the juice
            </motion.h2>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
