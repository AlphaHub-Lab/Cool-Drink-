"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function BrandStory() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={container} className="py-32 bg-foreground text-background overflow-hidden relative">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Story Text */}
          <div className="order-2 md:order-1">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight"
            >
              Born in the<br/>
              <span className="text-mango-500">wild canopy.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-background/80 mb-8 max-w-lg leading-relaxed"
            >
              We didn&apos;t start No Filter in a corporate boardroom. We started it because we were tired of drinking flavored water masquerading as juice.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-background/80 max-w-lg leading-relaxed"
            >
              Every bottle is a testament to natural chaos. Unfiltered, slightly pulp-heavy, and violently fresh. We just let the fruit do the talking.
            </motion.p>
          </div>

          {/* Composition */}
          <div className="order-1 md:order-2 relative h-[600px] flex items-center justify-center">
            <motion.div style={{ y: y1 }} className="absolute z-10 w-64 h-80 bg-mango-500 rounded-[2rem] overflow-hidden rotate-6 shadow-2xl left-[10%]">
              <Image src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800" alt="Canopy" fill unoptimized className="object-cover opacity-80 mix-blend-multiply" />
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute z-20 w-72 h-96 bg-white rounded-[2rem] overflow-hidden -rotate-3 shadow-2xl right-[10%]">
              <Image src="https://images.unsplash.com/photo-1596700020165-2244a0441a9f?w=800" alt="Fruit" fill unoptimized className="object-cover" />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
