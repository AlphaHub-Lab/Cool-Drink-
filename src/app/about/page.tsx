"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import BrandStory from "@/components/home/BrandStory";
import TextReveal from "@/components/ui/TextReveal";

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScroll, [0, 1], [0, 300]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  const processRef = useRef(null);
  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start start", "end end"],
  });

  const [activeProcess, setActiveProcess] = useState(0);

  useEffect(() => {
    return processScroll.onChange((latest) => {
      if (latest < 0.33) setActiveProcess(0);
      else if (latest < 0.66) setActiveProcess(1);
      else setActiveProcess(2);
    });
  }, [processScroll]);

  const processes = [
    { chapter: "01", title: "Ugly fruit.", subtitle: "Beautiful juice.", desc: "Nature doesn't grow in perfect spheres. We take the misshapen, the bruised, and the wildly overgrown fruit because that's where the explosive flavor hides. No cosmetic standards. Just taste.", color: "bg-mango-500", emoji: "🥭" },
    { chapter: "02", title: "Cold as ice.", subtitle: "Sharp as a knife.", desc: "Heat pasteurization kills the soul of the fruit. We extract our juice under immense pressure at freezing temperatures, locking in every single drop of natural voltage.", color: "bg-purple-500", emoji: "🧊" },
    { chapter: "03", title: "Drink the pulp.", subtitle: "Unapologetically unfiltered.", desc: "If your juice is perfectly clear, it's dead water. We leave the pulp, the fibers, and the raw textures exactly where they belong. We let the fruit do the talking.", color: "bg-forest-500", emoji: "💧" },
  ];

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      
      {/* 1. Cinematic Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-foreground">
        
        {/* Liquid Background */}
        <motion.div 
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mango-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-raspberry-500 rounded-full blur-[120px]" />
        </motion.div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-mango-500 font-bold tracking-[0.5em] uppercase mb-6"
          >
            Our Philosophy
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="text-6xl md:text-[10rem] lg:text-[14rem] font-display font-bold text-background tracking-tighter leading-[0.8]"
          >
            THE RAW<br/>TRUTH.
          </motion.h1>
        </motion.div>
      </section>

      {/* 2. Brand Story Parallax */}
      <BrandStory />

      {/* 3. The Process (Sticky Narrative) */}
      <section ref={processRef} className="relative bg-background text-foreground transition-colors duration-1000">
        <div className="h-[300vh] w-full relative">
          <div className="container mx-auto px-6 flex flex-col md:flex-row h-full">
            
            {/* Sticky Visuals */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 flex items-center justify-center p-6 md:p-12 z-10 perspective-[1000px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={processes[activeProcess].chapter}
                  initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: -90, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className={`w-full max-w-md aspect-square rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden ${processes[activeProcess].color}`}
                >
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
                  <motion.span 
                    animate={{ y: [-20, 20, -20], rotate: [-10, 10, -10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-[10rem] relative z-10 drop-shadow-2xl"
                  >
                    {processes[activeProcess].emoji}
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Scrolling Text */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-between py-[10vh] px-4 md:px-12 z-20">
              {processes.map((process, i) => (
                <div key={i} className="h-screen flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  >
                    <span className={`text-2xl font-display font-bold mb-6 block opacity-50`}>
                      CHAPTER {process.chapter}
                    </span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4 leading-tight tracking-tighter">
                      {process.title}
                    </h2>
                    <h3 className="text-3xl md:text-5xl text-foreground/40 font-display font-bold mb-8 leading-tight tracking-tighter">
                      {process.subtitle}
                    </h3>
                    <p className="text-xl md:text-2xl text-foreground/80 max-w-md leading-relaxed font-medium">
                      {process.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. THE BLACKLIST */}
      <section className="py-40 bg-foreground text-background relative z-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="mb-24">
            <h2 className="text-xl md:text-2xl text-mango-500 font-bold tracking-widest uppercase mb-4">
              The Blacklist
            </h2>
            <h3 className="text-5xl md:text-8xl font-display font-bold tracking-tighter">
              WHAT WE REFUSE<br/>TO USE.
            </h3>
          </div>
          
          <div className="flex flex-col gap-12 md:gap-20 max-w-5xl mx-auto mt-20">
            {[
              "REFINED SUGAR",
              "ARTIFICIAL COLORS",
              "PRESERVATIVES",
              "HEAT PASTEURIZATION",
              "DILUTED WATER"
            ].map((item, i) => (
              <div key={i} className="relative inline-block w-fit group">
                <motion.span 
                  className="text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter text-background/20 group-hover:text-background/40 transition-colors"
                >
                  {item}
                </motion.span>
                {/* The Strike-Through Line */}
                <motion.div 
                  initial={{ width: "0%" }}
                  whileInView={{ width: "110%" }}
                  viewport={{ once: false, margin: "0px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
                  className="absolute top-1/2 left-[-5%] h-2 md:h-4 bg-red-500 -translate-y-1/2 rotate-[-2deg]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE UNBROKEN PROMISES */}
      <section className="py-24 bg-background text-foreground relative z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 flex justify-center">
            <TextReveal 
              text="THE UNBROKEN PROMISES." 
              className="text-4xl md:text-6xl font-display font-bold tracking-tighter justify-center text-center" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "100% ORGANIC.", desc: "No chemical shortcuts. No lab-grown ingredients. Just dirt, water, and sunshine." },
              { title: "COLD PRESSED.", desc: "Extracted under immense pressure, never heat. We keep the soul of the fruit alive." },
              { title: "NEVER DILUTED.", desc: "We don't sell water. We sell raw, chaotic, unapologetic fruit juice." }
            ].map((promise, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
                className="bg-white border border-foreground/5 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow flex flex-col"
              >
                <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tighter mb-4 text-mango-500">
                  {promise.title}
                </h3>
                <p className="text-lg text-foreground/70 font-medium leading-relaxed">
                  {promise.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}