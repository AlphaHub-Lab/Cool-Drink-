"use client";

import { motion } from "framer-motion";
import { Product } from "@/lib/data";

export default function IngredientExplosion({ product }: { product: Product }) {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold mb-16"
        >
          What's Inside?
        </motion.h2>

        <div className="relative h-[600px] flex items-center justify-center max-w-4xl mx-auto">
          {/* Central Bottle Silhouette */}
          <div className="w-32 h-64 md:w-48 md:h-80 border-4 border-foreground/10 rounded-[40px] md:rounded-[60px] relative z-10 flex items-center justify-center">
            <span className="font-display font-bold text-foreground/20 text-xl md:text-2xl rotate-90 whitespace-nowrap">
              No Filter
            </span>
          </div>

          {/* Exploding Ingredients */}
          {product.ingredients.map((ing, i) => {
            // Calculate outward trajectory based on index
            const angle = (i / product.ingredients.length) * Math.PI * 2;
            const radius = 250; // Distance to explode outward
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                whileInView={{ x, y, scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 50, 
                  damping: 12,
                  delay: 0.1 * i 
                }}
                className="absolute text-5xl md:text-7xl z-20 flex flex-col items-center gap-4 group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  className="bg-white rounded-full p-6 shadow-xl relative"
                >
                  {ing.emoji}
                  {/* Tooltip */}
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-foreground text-background text-sm font-bold py-1 px-3 rounded-full">
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
