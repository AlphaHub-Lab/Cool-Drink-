"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { products } from "@/lib/data";
import Magnetic from "../ui/Magnetic";

export default function FeaturedCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragLimit, setDragLimit] = useState(0);
  
  // Custom Cursor for dragging on desktop
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateLimit = () => {
      if (!carouselRef.current) return;
      const scrollW = carouselRef.current.scrollWidth;
      const clientW = carouselRef.current.clientWidth;
      setDragLimit(Math.min(0, -(scrollW - clientW + 24)));
    };

    updateLimit();
    const timer = setTimeout(updateLimit, 300);
    window.addEventListener("resize", updateLimit);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateLimit);
    };
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 40);
      cursorY.set(e.clientY - 40);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section 
      className="py-20 sm:py-28 md:py-32 bg-foreground text-background overflow-hidden relative"
      onMouseEnter={() => setIsHoveringCarousel(true)}
      onMouseLeave={() => setIsHoveringCarousel(false)}
    >
      
      {/* Custom Drag Cursor - only visible on devices with hover/pointer */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 bg-mango-500 rounded-full pointer-events-none z-50 hidden md:flex items-center justify-center text-foreground font-bold tracking-widest text-xs uppercase"
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight"
          >
            Fresh off<br/>the press.
          </motion.h2>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <Magnetic>
              <Link href="/shop" className="text-mango-500 font-bold hover:underline text-base sm:text-xl flex items-center gap-2 group">
                View all flavors 
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </Link>
            </Magnetic>

            {/* Quick slide buttons for mobile & tablet */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={scrollLeft}
                aria-label="Previous Flavor"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white active:bg-white/10"
              >
                ←
              </button>
              <button
                onClick={scrollRight}
                aria-label="Next Flavor"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white active:bg-white/10"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Draggable Carousel */}
        <motion.div 
          ref={carouselRef}
          className="flex gap-5 sm:gap-8 cursor-grab active:cursor-grabbing pb-8 overflow-x-auto no-scrollbar snap-x md:overflow-visible"
          whileTap={{ cursor: "grabbing" }}
          onPanStart={() => setIsDragging(true)}
          onPanEnd={() => setIsDragging(false)}
          drag="x"
          dragConstraints={{ right: 0, left: dragLimit }}
        >
          {products.map((product, index) => (
            <Link href={`/shop/${product.id}`} key={product.id} className="shrink-0 w-[82vw] sm:w-[350px] md:w-[380px] lg:w-[400px] snap-center">
              <motion.div
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative h-[480px] sm:h-[540px] md:h-[600px] rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-8 flex flex-col justify-between overflow-hidden group shadow-lg"
              >
                {/* Background morphing shape */}
                <motion.div 
                  className={`absolute inset-0 ${product.color} z-0 origin-center`}
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                    borderRadius: hoveredIndex === index 
                      ? ["40px", "52px 36px 44px 60px", "40px"] 
                      : "40px"
                  }}
                  transition={{ duration: 3, repeat: hoveredIndex === index ? Infinity : 0, ease: "easeInOut" }}
                />
                
                {/* Content */}
                <div className="relative z-10 flex justify-between items-start pointer-events-none">
                  <div className="bg-white/20 backdrop-blur-md rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white border border-white/30">
                    {product.price}
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold tracking-wider text-white border border-white/30">
                    {product.category}
                  </div>
                </div>

                <div className="relative z-10 flex justify-center items-center flex-grow py-3 pointer-events-none">
                  <motion.div
                    animate={{ 
                      y: hoveredIndex === index ? -18 : [-8, 8, -8],
                      rotate: hoveredIndex === index ? -4 : 0,
                      scale: hoveredIndex === index ? 1.08 : 1
                    }}
                    transition={{ 
                      y: { duration: hoveredIndex === index ? 0.4 : 4, repeat: hoveredIndex === index ? 0 : Infinity, ease: "easeInOut" },
                      rotate: { type: "spring", stiffness: 300, damping: 15 },
                      scale: { type: "spring", stiffness: 300, damping: 15 }
                    }}
                    className="relative w-36 h-56 sm:w-44 sm:h-64 md:w-48 md:h-72 filter drop-shadow-2xl"
                  >
                    <Image src={product.bottleSrc} alt={product.name} fill className="object-contain" priority={index < 2} />
                  </motion.div>
                </div>

                <div className="relative z-10 text-white pointer-events-none">
                  <h3 className="text-3xl sm:text-4xl font-display font-bold mb-1.5 sm:mb-2">{product.name}</h3>
                  <div className="overflow-hidden">
                    <p className="text-white/95 font-bold text-sm sm:text-base md:text-lg flex items-center gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      Add to Cart →
                    </p>
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


