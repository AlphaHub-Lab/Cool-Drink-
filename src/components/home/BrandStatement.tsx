"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BrandStatement() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end center"]
  });

  return (
    <section ref={container} className="py-40 bg-background text-foreground flex items-center justify-center relative z-20">
      <div className="container mx-auto px-6 text-center max-w-5xl">
        <div className="flex flex-col items-center gap-2 md:gap-4 overflow-hidden">
          <motion.div
            style={{ x: useTransform(scrollYProgress, [0, 1], [-50, 0]), opacity: useTransform(scrollYProgress, [0, 0.4], [0, 1]) }}
            className="text-6xl md:text-[10rem] font-display font-bold tracking-tighter"
          >
            NOTHING
          </motion.div>
          
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.2, 0.6], [0, 1]) }}
            className="text-6xl md:text-[10rem] font-display font-bold tracking-tighter"
          >
            TO
          </motion.div>
          
          <motion.div
            style={{ x: useTransform(scrollYProgress, [0, 1], [50, 0]), opacity: useTransform(scrollYProgress, [0.4, 0.8], [0, 1]) }}
            className="text-6xl md:text-[10rem] font-display font-bold tracking-tighter text-mango-500"
          >
            HIDE.
          </motion.div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 text-xl md:text-3xl text-foreground/70 font-medium max-w-3xl mx-auto leading-relaxed"
        >
          We believe juice should just be juice. No artificial colors, no hidden syrups, no pretending. Just real fruit pressed perfectly.
        </motion.p>
      </div>
    </section>
  );
}
