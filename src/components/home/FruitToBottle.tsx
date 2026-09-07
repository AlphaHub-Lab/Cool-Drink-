"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FruitToBottle() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end center"]
  });

  const steps = ["FRUIT", "FLAVOUR", "JUICE", "NO FILTER", "BOTTLE"];

  return (
    <section ref={container} className="py-32 bg-foreground text-background flex flex-col items-center justify-center min-h-[150vh] relative z-20">
      
      <div className="sticky top-1/2 -translate-y-1/2 flex flex-col items-center">
        {steps.map((step, i) => {
          const stepSize = 1 / steps.length;
          const start = i * stepSize;
          const end = start + stepSize;

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(
            scrollYProgress,
            [start - 0.1, start, end, end + 0.1],
            [0, 1, 1, 0]
          );

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const scale = useTransform(
            scrollYProgress,
            [start, end],
            [0.8, 1.2]
          );

          return (
            <motion.h2
              key={step}
              style={{ opacity, scale }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-9xl font-display font-bold tracking-tighter w-full text-center ${i === 3 ? "text-mango-500" : ""}`}
            >
              {step}
            </motion.h2>
          );
        })}

        {/* Down Arrow / Connector */}
        <motion.div 
          className="absolute top-[100px] left-1/2 -translate-x-1/2 w-[2px] bg-background/20 h-64 origin-top"
          style={{ scaleY: scrollYProgress }}
        />
      </div>

    </section>
  );
}
