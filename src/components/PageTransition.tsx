"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Create 5 columns for a staggered blind effect
  const columns = 5;
  const columnArray = Array.from({ length: columns });

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="flex-grow flex flex-col w-full relative">
        
        {/* The Incoming Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-grow flex flex-col w-full"
        >
          {children}
        </motion.div>

        {/* Transition Overlay Blinds */}
        <div className="fixed inset-0 pointer-events-none z-[100] flex">
          {columnArray.map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.05,
              }}
              className="flex-1 h-full bg-mango-500 origin-top"
            />
          ))}
        </div>
        
      </motion.div>
    </AnimatePresence>
  );
}
