"use client";

import { motion } from "framer-motion";
import { Product } from "@/lib/data";
import { useState, useEffect } from "react";

export default function IngredientExplosion({ product }: { product: Product }) {
  const [radius, setRadius] = useState(250);

  useEffect(() => {
    const updateRadius = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 480) {
        setRadius(120);
      } else if (window.innerWidth < 768) {
        setRadius(150);
      } else if (window.innerWidth < 1024) {
        setRadius(200);
      } else {
        setRadius(250);
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <section className="py-20 sm:py-28 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-10 sm:mb-16"
        >
          What&apos;s Inside?
        </motion.h2>

        <div className="relative h-[420px] sm:h-[500px] md:h-[600px] flex items-center justify-center max-w-4xl mx-auto">
          {/* Central Bottle Silhouette */}
          <div className="w-24 h-48 sm:w-32 sm:h-64 md:w-48 md:h-80 border-4 border-foreground/10 rounded-[30px] sm:rounded-[40px] md:rounded-[60px] relative z-10 flex items-center justify-center">
            <span className="font-display font-bold text-foreground/20 text-sm sm:text-xl md:text-2xl rotate-90 whitespace-nowrap">
              No Filter
            </span>
          </div>

          {/* Exploding Ingredients */}
          {product.ingredients.map((ing, i) => {
            const angle = (i / product.ingredients.length) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                whileInView={{ x, y, scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 50, 
                  damping: 12,
                  delay: 0.08 * i 
                }}
                className="absolute text-3xl sm:text-5xl md:text-7xl z-20 flex flex-col items-center gap-2 sm:gap-4 group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 12 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-full p-3.5 sm:p-5 md:p-6 shadow-xl relative"
                >
                  {ing.name}
                  {/* Tooltip */}
                  <div className="absolute -bottom-9 sm:-bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-foreground text-background text-xs sm:text-sm font-bold py-1 px-3 rounded-full pointer-events-none shadow-lg">
                    {ing.name}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
