"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { products } from "@/lib/data";
import Magnetic from "../ui/Magnetic";

export default function FeaturedCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Custom Cursor for dragging
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 40); // 40 is half the cursor width
      cursorY.set(e.clientY - 40);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <section 
      className="py-32 bg-foreground text-background overflow-hidden relative"
      onMouseEnter={() => setIsHoveringCarousel(true)}
      onMouseLeave={() => setIsHoveringCarousel(false)}
    >
      
      {/* Custom Drag Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 bg-mango-500 rounded-full pointer-events-none z-50 flex items-center justify-center text-foreground font-bold tracking-widest text-xs uppercase"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHoveringCarousel ? 1 : 0,
          opacity: isHoveringCarousel ? 1 : 0,
        }}
      >
        {isDragging ? "Drag" : "Slide"}
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight"
          >
            Fresh off<br/>the press.
          </motion.h2>
          
          <Magnetic>
            <Link href="/shop" className="text-mango-500 font-bold hover:underline mt-4 md:mt-0 text-xl flex items-center gap-2 group">
              View all flavors 
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </Link>
          </Magnetic>
        </div>

        {/* Draggable Carousel */}
        <motion.div 
          ref={carouselRef}
          className="flex gap-8 cursor-grab active:cursor-grabbing pb-12"
          whileTap={{ cursor: "grabbing" }}
          onPanStart={() => setIsDragging(true)}
          onPanEnd={() => setIsDragging(false)}
          drag="x"
          dragConstraints={{ right: 0, left: -((products.length * 400) + ((products.length - 1) * 32) - (typeof window !== 'undefined' ? window.innerWidth : 1200) + 48) }}
        >
          {products.map((product, index) => (
            <Link href={`/shop/${product.id}`} key={product.id} className="shrink-0 w-[85vw] sm:w-[400px]">
              <motion.div
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative h-[600px] rounded-[3rem] p-8 flex flex-col justify-between overflow-hidden group"
              >
                {/* Background morphing shape */}
                <motion.div 
                  className={`absolute inset-0 ${product.color} z-0 origin-center`}
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                    borderRadius: hoveredIndex === index 
                      ? ["48px", "60px 40px 50px 70px", "48px"] 
                      : "48px"
                  }}
                  transition={{ duration: 3, repeat: hoveredIndex === index ? Infinity : 0, ease: "easeInOut" }}
                />
                
                {/* Content */}
                <div className="relative z-10 flex justify-between items-start pointer-events-none">
                  <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wider text-white border border-white/30">
                    {product.price}
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-sm font-bold tracking-wider text-white border border-white/30">
                    {product.category}
                  </div>
                </div>

                <div className="relative z-10 flex justify-center items-center flex-grow text-[10rem] pointer-events-none">
                  <motion.div
                    animate={{ 
                      y: hoveredIndex === index ? -20 : [-10, 10, -10],
                      rotate: hoveredIndex === index ? -5 : 0,
                      scale: hoveredIndex === index ? 1.1 : 1
                    }}
                    transition={{ 
                      y: { duration: hoveredIndex === index ? 0.5 : 4, repeat: hoveredIndex === index ? 0 : Infinity, ease: "easeInOut" },
                      rotate: { type: "spring", stiffness: 300, damping: 15 },
                      scale: { type: "spring", stiffness: 300, damping: 15 }
                    }}
                    className="filter drop-shadow-2xl"
                  >
                    {product.emoji}
                  </motion.div>
                </div>

                <div className="relative z-10 text-white pointer-events-none">
                  <h3 className="text-4xl font-display font-bold mb-2">{product.name}</h3>
                  <div className="overflow-hidden">
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: hoveredIndex === index ? 0 : 20, opacity: hoveredIndex === index ? 1 : 0 }}
                      className="text-white/90 font-bold text-lg"
                    >
                      Add to Cart →
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
