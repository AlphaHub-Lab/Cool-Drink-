"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            style={{ y: textY }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight text-foreground">
              We monkeyed around,<br/>
              <span className="text-forest-500">so you don&apos;t have to.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-foreground/80 font-medium max-w-lg">
              <p>
                In a world obsessed with artificial flavors, we went back to the roots. Our juices are cold-pressed at a pace that would make a sloth proud.
              </p>
              <p>
                Why? Because good things take time. Heat destroys nutrients, and speed creates heat. We keep it chill, literally.
              </p>
              <p className="font-bold text-mango-500 text-xl">
                100% Organic. 0% Rush.
              </p>
            </div>
          </motion.div>

          {/* Image/Visual Content */}
          <div className="order-1 lg:order-2 relative h-[60vh] w-full rounded-[3rem] overflow-hidden bg-[#F2E8DA]">
            <motion.div 
              style={{ y: imageY }}
              className="absolute inset-0 w-full h-[120%] -top-[10%] flex items-center justify-center text-[10rem] md:text-[15rem]"
            >
              🐒
            </motion.div>
            
            {/* Glassmorphism overlay for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent backdrop-blur-[2px]" />
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-xs"
            >
              <p className="font-display font-bold text-xl mb-1 text-charcoal">Cold Pressed</p>
              <p className="text-sm text-foreground/70">Never heated, always fresh.</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
