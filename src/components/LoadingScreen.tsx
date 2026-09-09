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

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasLoadedBefore", "true");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[300] bg-[#0A0E27] flex items-center justify-center overflow-hidden"
        >
          {/* Brand Typography Reveal */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="font-condensed text-white text-7xl md:text-9xl leading-none"
              >
                NO
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="font-condensed text-white text-7xl md:text-9xl leading-none"
              >
                FILTER
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="h-px bg-white/20 mt-6 mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="text-white/30 text-[9px] tracking-[0.5em] uppercase font-sans"
            >
              Raw Juice
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
