"use client";

import { motion } from "framer-motion";

export default function WhyNoFilter() {
  const principles = [
    { title: "REAL FRUIT", desc: "Straight from the branch to the bottle. We don't mess with nature's perfection.", color: "text-mango-500" },
    { title: "FRESH ENERGY", desc: "Cold-pressed at extreme speeds to lock in the absolute maximum amount of vibe.", color: "text-raspberry-500" },
    { title: "BOLD FLAVOUR", desc: "Taste that wakes you up. Unapologetic, wild, and incredibly refreshing.", color: "text-forest-500" },
    { title: "NO PRETENDING", desc: "What you see is what you drink. Zero hidden sugars, zero artificial anything.", color: "text-foreground" }
  ];

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-background text-foreground relative z-20">
      <div className="container mx-auto px-4 sm:px-6">
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-12 sm:mb-16 md:mb-24 border-b-4 border-foreground pb-6 md:pb-8"
        >
          WHY NO FILTER?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-x-12 md:gap-y-20">
          {principles.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <h3 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-6 ${p.color} transform origin-left transition-transform duration-300 group-hover:scale-105`}>
                {p.title}
              </h3>
              <p className="text-base sm:text-xl md:text-2xl text-foreground/70 font-medium leading-relaxed max-w-md">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
