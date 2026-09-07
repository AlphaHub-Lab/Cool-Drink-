"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Magnetic from "../ui/Magnetic";
import Link from "next/link";

const flavors = [
  {
    id: "mango",
    title: "MANGO",
    subtitle: "Tropical. Juicy. Bold.",
    description: "Cold-pressed from the sweetest Alphonso mangoes. It's sunshine in a bottle, perfectly balanced and wildly refreshing.",
    price: "$12.00",
    bgColor: "bg-[#FFF4E0]",
    emoji: "🥭",
    accentColor: "text-mango-500",
    buttonColor: "bg-mango-500",
    slug: "mango-madness"
  },
  {
    id: "grape",
    title: "GRAPE",
    subtitle: "Rich. Deep. Classic.",
    description: "Concord grapes pressed with their skins for maximum antioxidant power. A dark, sophisticated take on a childhood favorite.",
    price: "$11.50",
    bgColor: "bg-[#F3E5F5]",
    emoji: "🍇",
    accentColor: "text-purple-600",
    buttonColor: "bg-purple-600",
    slug: "grape-galaxy"
  },
  {
    id: "orange",
    title: "ORANGE",
    subtitle: "Citrus. Zesty. Bright.",
    description: "Valencia oranges squeezed at dawn. Packed with Vitamin C and an electric zest that completely wakes you up.",
    price: "$10.00",
    bgColor: "bg-[#FFF0E0]",
    emoji: "🍊",
    accentColor: "text-orange-500",
    buttonColor: "bg-orange-500",
    slug: "orange-overload"
  },
  {
    id: "apple",
    title: "APPLE",
    subtitle: "Crisp. Clean. Fresh.",
    description: "Fuji and Granny Smith apples cold-pressed to maintain that perfect balance of sweet and tart snap.",
    price: "$9.50",
    bgColor: "bg-[#E8F5E9]",
    emoji: "🍏",
    accentColor: "text-green-500",
    buttonColor: "bg-green-500",
    slug: "apple-awakening"
  },
  {
    id: "pineapple",
    title: "PINEAPPLE",
    subtitle: "Exotic. Sharp. Sweet.",
    description: "Pure Costa Rican gold. A vibrant, enzyme-rich burst of tropical energy that hits instantly.",
    price: "$12.50",
    bgColor: "bg-[#FFF9C4]",
    emoji: "🍍",
    accentColor: "text-yellow-600",
    buttonColor: "bg-yellow-500",
    slug: "pineapple-punch"
  },
  {
    id: "mixed",
    title: "MIXED FRUIT",
    subtitle: "Wild. Complex. Perfect.",
    description: "Our signature canopy blend. A chaotic, beautiful mix of seven different fruits that shouldn't work together, but absolutely do.",
    price: "$14.00",
    bgColor: "bg-[#FFEBEE]",
    emoji: "🍓",
    accentColor: "text-raspberry-500",
    buttonColor: "bg-raspberry-500",
    slug: "mixed-berry"
  }
];

export default function SplitShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Only show the top 3 bestsellers on the homepage to reduce scroll length
  const showcaseFlavors = flavors.slice(0, 3);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // 3 items total
      const step = 1 / showcaseFlavors.length;
      let newIndex = Math.floor(latest / step);
      if (newIndex >= showcaseFlavors.length) newIndex = showcaseFlavors.length - 1;
      setActiveIndex(newIndex);
    });
  }, [scrollYProgress]);

  const activeFlavor = showcaseFlavors[activeIndex] || showcaseFlavors[0];

  return (
    <section ref={containerRef} className={`relative transition-colors duration-1000 ease-in-out ${activeFlavor.bgColor}`}>
      {/* 
        Container height is 300vh (100vh per flavor)
      */}
      <div className="md:h-[300vh] w-full relative">
        <div className="container mx-auto px-6 flex flex-col md:flex-row h-full">
          
          {/* Left Column - Sticky Visuals */}
          <div className="w-full md:w-1/2 h-[45vh] md:h-screen sticky top-0 flex items-center justify-center p-6 md:p-12 overflow-hidden z-10 perspective-[1000px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFlavor.id}
                initial={{ opacity: 0, scale: 0.5, rotateY: 180, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.2, rotateY: -180, filter: "blur(20px)" }}
                transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                className="relative w-full aspect-[3/4] max-h-[40vh] md:max-h-[80vh] rounded-[2rem] md:rounded-[3rem] bg-white/20 flex items-center justify-center shadow-2xl border border-white/40 backdrop-blur-md overflow-hidden"
              >
                {/* Abstract Liquid Shape behind the fruit */}
                <motion.div 
                  className={`absolute w-full h-full ${activeFlavor.accentColor.replace('text-', 'bg-')}/30 mix-blend-multiply blur-2xl`}
                  animate={{
                    borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "40% 60% 70% 30%"],
                    rotate: [0, 90, 180, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                {/* Continuous Bobbing Mascot/Bottle */}
                <motion.div
                  animate={{ 
                    y: [-15, 15, -15],
                    rotate: [-5, 5, -5],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[8rem] md:text-[14rem] relative z-10 filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] origin-center"
                >
                  {activeFlavor.emoji}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Scrolling Storytelling */}
          <div className="w-full md:w-1/2 h-full flex flex-col justify-between py-[5vh] md:py-[10vh] px-4 md:px-12 z-20 -mt-[45vh] md:mt-0">
            {showcaseFlavors.map((flavor, i) => (
              <div key={flavor.id} className="h-screen flex flex-col justify-center pt-[45vh] md:pt-0">
                <motion.div
                  initial={{ opacity: 0, x: 100, skewX: -10 }}
                  whileInView={{ opacity: 1, x: 0, skewX: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`${flavor.accentColor} font-bold uppercase tracking-widest text-sm mb-4 block`}
                  >
                    Flavour 0{i + 1}
                  </motion.span>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4 leading-[0.9] tracking-tighter"
                  >
                    {flavor.title}
                  </motion.h2>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-3xl font-bold mb-4 text-foreground/80 uppercase tracking-wide"
                  >
                    {flavor.subtitle}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-foreground/70 max-w-md leading-relaxed font-medium mb-10 hidden sm:block"
                  >
                    {flavor.description}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                  >
                    <span className="text-4xl font-bold">{flavor.price}</span>
                    <Magnetic pullRange={15}>
                      <Link href={`/shop/${flavor.slug}`} className="inline-block">
                        <button className={`${flavor.buttonColor} text-white px-10 py-5 rounded-full font-bold text-xl uppercase shadow-2xl relative overflow-hidden group w-full sm:w-auto`}>
                          <span className="relative z-10 block group-hover:-translate-y-[150%] transition-transform duration-500 ease-out">Enter World</span>
                          <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-out text-foreground">Sip It 🧃</span>
                          <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
                        </button>
                      </Link>
                    </Magnetic>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
