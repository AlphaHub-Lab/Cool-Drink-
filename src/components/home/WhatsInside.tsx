"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TextReveal from "../ui/TextReveal";

export default function WhatsInside() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const yFruit1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yFruit2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateFruit = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scaleCenter = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1.1]);

  return (
    <section ref={container} className="relative py-40 overflow-hidden bg-[#FFF8EE] flex items-center justify-center min-h-[120vh]">
      
      {/* Background Floating Elements */}
      <motion.div 
        style={{ y: yFruit1, rotate: rotateFruit }} 
        className="absolute top-[20%] left-[10%] text-[8rem] filter drop-shadow-2xl opacity-80"
      >
        🥭
      </motion.div>
      <motion.div 
        style={{ y: yFruit2, rotate: rotateFruit }} 
        className="absolute bottom-[20%] right-[15%] text-[10rem] filter drop-shadow-2xl opacity-70"
      >
        🍊
      </motion.div>
      <motion.div 
        style={{ y: yFruit1 }} 
        className="absolute top-[60%] left-[20%] text-[6rem] filter drop-shadow-2xl opacity-60"
      >
        🍓
      </motion.div>

      {/* Center Composition */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 1, type: "spring" }}
          className="inline-block relative"
        >
          {/* Main Bottle Concept */}
          <motion.div style={{ scale: scaleCenter }} className="relative z-20">
            <div className="w-[300px] h-[450px] bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-[3rem] flex items-center justify-center flex-col p-8">
              <span className="text-[8rem] filter drop-shadow-lg mb-4">🧃</span>
              <h3 className="font-display font-bold text-3xl">Pure Extract</h3>
            </div>
          </motion.div>

          {/* Floating Labels */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-[20%] -left-[150px] bg-white px-6 py-3 rounded-full font-bold shadow-xl border border-foreground/5 z-30"
          >
            Zero Sugar
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-[20%] -right-[150px] bg-mango-500 text-white px-6 py-3 rounded-full font-bold shadow-xl z-30"
          >
            Real Fruit
          </motion.div>

        </motion.div>
        
        <TextReveal 
          text="What's Inside?" 
          className="text-5xl md:text-7xl font-display font-bold mt-24 mb-6 justify-center" 
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-foreground/60 max-w-2xl mx-auto"
        >
          We take the freshest canopy drops and cold-press them at extreme speeds. The result is a vibrant, unfiltered explosion of nature's best ingredients.
        </motion.p>
      </div>

    </section>
  );
}
