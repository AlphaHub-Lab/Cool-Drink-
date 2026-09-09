"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Magnetic from "../ui/Magnetic";
import Link from "next/link";

const moods = [
  { id: "tropical", label: "🌴 TROPICAL", title: "MANGO MADNESS", desc: "Golden sunshine and pure Alphonso sweetness.", color: "bg-mango-500", text: "text-foreground", link: "/shop/mango-madness", emoji: "🥭", particles: ["🥭", "✨", "💧"] },
  { id: "bold", label: "⚡ BOLD", title: "GRAPE GALAXY", desc: "Deep, dark, and unapologetically rich.", color: "bg-purple-600", text: "text-white", link: "/shop/grape-galaxy", emoji: "🍇", particles: ["🍇", "✨", "💧"] },
  { id: "zesty", label: "🍊 ZESTY", title: "ORANGE OVERLOAD", desc: "Electric citrus energy that instantly wakes you up.", color: "bg-orange-500", text: "text-foreground", link: "/shop/orange-overload", emoji: "🍊", particles: ["🍊", "⚡", "💧"] },
  { id: "fresh", label: "🌿 FRESH", title: "APPLE AWAKENING", desc: "Crisp, clean, and perfectly balanced snap.", color: "bg-green-500", text: "text-white", link: "/shop/apple-awakening", emoji: "🍏", particles: ["🍏", "🌿", "💧"] }
];

// Helper to split text into letters
const splitText = (text: string) => text.split("").map((char, i) => (
  <motion.span
    key={i}
    initial={{ opacity: 0, y: 50, rotateX: -90 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: i * 0.05, type: "spring", stiffness: 100 }}
    className="inline-block"
  >
    {char === " " ? "\u00A0" : char}
  </motion.span>
));

export default function MoodSelector() {
  const [activeMood, setActiveMood] = useState(moods[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className={`relative py-40 transition-colors duration-[1.5s] ease-in-out ${activeMood.color} overflow-hidden`}>
      
      {/* Ambient Floating Liquid Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 mix-blend-overlay">
        {mounted && [...Array(5)].map((_, i) => (
          <motion.div
            key={`blob-${i}`}
            className="absolute rounded-full bg-white blur-3xl"
            style={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -200 - 100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-20">
        
        {/* Kinetic Header */}
        <div className="text-center mb-24 perspective-[1000px]">
          <h2 className={`text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter ${activeMood.text}`}>
            {splitText("WHAT ARE YOU FEELING?")}
          </h2>
        </div>

        {/* Liquid Mood Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-32 relative z-30">
          {moods.map((mood, i) => (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              onClick={() => setActiveMood(mood)}
              className={`relative overflow-hidden px-8 py-4 rounded-full font-bold text-lg transition-all duration-500 group border border-white/20 ${
                activeMood.id === mood.id 
                  ? "bg-foreground text-background scale-110 shadow-[0_0_40px_rgba(255,255,255,0.3)] border-transparent" 
                  : `bg-white/10 hover:bg-white/30 backdrop-blur-md ${activeMood.text}`
              }`}
            >
              <span className="relative z-10">{mood.label}</span>
              {/* Button Liquid Fill on active */}
              {activeMood.id === mood.id && (
                <motion.div
                  layoutId="activeMoodPill"
                  className="absolute inset-0 bg-foreground rounded-full z-0"
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Explosive Result Area */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 min-h-[500px] perspective-[1000px]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMood.id}
              initial={{ opacity: 0, scale: 0, rotateY: -180, z: -500 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
              exit={{ opacity: 0, scale: 1.5, rotateY: 180, z: 500, filter: "blur(20px)" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
              className="relative"
              style={{
                x: mousePos.x,
                y: mousePos.y,
              }}
            >
              {/* Burst Particles on mount */}
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={`particle-${i}`}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1.5, 0],
                    x: Math.cos(i * 60 * (Math.PI/180)) * 200,
                    y: Math.sin(i * 60 * (Math.PI/180)) * 200,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl pointer-events-none"
                >
                  {activeMood.particles[i % 3]}
                </motion.span>
              ))}

              <div className="w-64 h-64 md:w-96 md:h-96 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/40 shadow-2xl relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/30 mix-blend-overlay" />
                {/* Floating Emoji */}
                <motion.span 
                  className="text-[10rem] md:text-[14rem] filter drop-shadow-2xl inline-block origin-center"
                  animate={{ 
                    y: [-20, 20, -20], 
                    rotate: [-10, 10, -10],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {activeMood.emoji}
                </motion.span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="max-w-xl text-center md:text-left relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${activeMood.id}`}
                initial={{ opacity: 0, x: 100, skewX: 20 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                exit={{ opacity: 0, x: -100, skewX: -20 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className={`${activeMood.text}`}
              >
                <motion.h3 
                  className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-[0.9] tracking-tighter"
                  style={{
                    x: -mousePos.x * 0.5,
                    y: -mousePos.y * 0.5,
                  }}
                >
                  {activeMood.title}
                </motion.h3>
                
                <motion.p 
                  className="text-2xl md:text-3xl font-medium opacity-90 mb-10 leading-snug"
                >
                  {activeMood.desc}
                </motion.p>
                
                <Magnetic pullRange={20}>
                  <Link href={activeMood.link} className="inline-block">
                    <button className="bg-foreground text-background px-10 py-5 rounded-full font-bold text-xl transition-all shadow-2xl relative overflow-hidden group">
                      <span className="relative z-10 block group-hover:-translate-y-[150%] transition-transform duration-500 ease-out">ENTER THE FLAVOUR</span>
                      <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-out text-mango-500">LET'S GO 🧃</span>
                      <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
                    </button>
                  </Link>
                </Magnetic>
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>

      </div>
    </section>
  );
}
