"use client";

import { useRef, useState, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import Global3DScene, { FLAVORS } from "../3d/Global3DScene";
import Splash3D from "../3d/Splash3D";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicHomepage() {
  const [showSplash, setShowSplash] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  /* ===================== STATE ===================== */
  const [currentSection, setCurrentSection] = useState("hero");
  const [heroFlavorIndex, setHeroFlavorIndex] = useState(0);
  const [heroFillLevel, setHeroFillLevel] = useState(0);

  // Section Progress States
  const [mangoProgress, setMangoProgress] = useState(0);
  const [strawProgress, setStrawProgress] = useState(0);
  const [melonProgress, setMelonProgress] = useState(0);
  const [grapeProgress, setGrapeProgress] = useState(0);

  const currentFlavor = FLAVORS[heroFlavorIndex];

  /* ===================== HERO FILL ANIMATION ===================== */
  useEffect(() => {
    if (showSplash || currentSection !== "hero") return;
    
    let animationFrameId: number;
    let startTime = performance.now();
    const fillDuration = 2500; // 2.5 seconds to fill

    const animateFill = (time: number) => {
      const elapsed = time - startTime;
      let progress = elapsed / fillDuration;
      
      if (progress >= 1) {
        setHeroFillLevel(1);
        setTimeout(() => {
          setHeroFlavorIndex((prev) => (prev + 1) % FLAVORS.length);
          startTime = performance.now(); 
        }, 1000);
      } else {
        setHeroFillLevel(progress);
        animationFrameId = requestAnimationFrame(animateFill);
      }
    };

    animationFrameId = requestAnimationFrame(animateFill);
    return () => cancelAnimationFrame(animationFrameId);
  }, [showSplash, currentSection, heroFlavorIndex]);

  /* ===================== REFS ===================== */
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroPinRef = useRef<HTMLDivElement>(null);
  
  const mangoRef = useRef<HTMLElement>(null);
  const strawRef = useRef<HTMLElement>(null);
  const melonRef = useRef<HTMLElement>(null);
  const grapeRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

  /* ===================== GSAP ===================== */
  useGSAP(() => {
    if (showSplash || !mainRef.current || !heroSectionRef.current) return;

    window.scrollTo(0, 0);

    // Pin the hero section for a moment before scrolling to products
    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: "top top",
      end: "+=100%",
      pin: heroPinRef.current,
      onEnter: () => setCurrentSection("hero"),
      onEnterBack: () => setCurrentSection("hero"),
    });

    const sections = [
      { ref: mangoRef, name: "mango", setProgress: setMangoProgress },
      { ref: strawRef, name: "strawberry", setProgress: setStrawProgress },
      { ref: melonRef, name: "watermelon", setProgress: setMelonProgress },
      { ref: grapeRef, name: "grape", setProgress: setGrapeProgress },
    ];

    sections.forEach(({ ref, name, setProgress }) => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom", // Starts when top of section hits bottom of viewport
        end: "center center", // Ends when section is perfectly centered
        onUpdate: (self) => setProgress(self.progress), // 0 to 1
        onEnter: () => setCurrentSection(name),
        onEnterBack: () => setCurrentSection(name),
      });
    });

    // Gallery section trigger
    ScrollTrigger.create({
      trigger: galleryRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => setCurrentSection("gallery"),
      onEnterBack: () => setCurrentSection("gallery"),
    });

  }, { scope: mainRef, dependencies: [showSplash] });

  const PRICE = "₹159";

  return (
    <>
      {/* 1. GLOBAL 3D CANVAS */}
      <div className="fixed inset-0 z-[50] pointer-events-none bg-[#0A0E27]" style={{ backgroundColor: showSplash ? '#0A0E27' : 'transparent', transition: 'background-color 1s ease' }}>
        <Canvas shadows>
          <Suspense fallback={null}>
            {showSplash ? (
              <group>
                <ambientLight intensity={2} />
                <directionalLight position={[5, 10, 5]} intensity={3} />
                <Splash3D onComplete={() => setShowSplash(false)} />
              </group>
            ) : (
              <Global3DScene 
                currentSection={currentSection} 
                heroFlavorIndex={heroFlavorIndex} 
                heroFillLevel={heroFillLevel} 
                mangoProgress={mangoProgress}
                strawProgress={strawProgress}
                melonProgress={melonProgress}
                grapeProgress={grapeProgress}
              />
            )}
          </Suspense>
        </Canvas>
      </div>

      {/* 2. HTML CONTENT */}
      {!showSplash && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          ref={mainRef} 
          className="w-full relative"
        >
          {/* NAVIGATION */}
          <nav className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-12 py-6 pointer-events-none">
            <Link href="/" className="text-white text-xs tracking-[0.3em] uppercase font-sans font-bold pointer-events-auto filter drop-shadow-md">
              No Filter
            </Link>
            <div className="hidden md:flex items-center gap-8 pointer-events-auto bg-black/20 backdrop-blur-md px-6 py-3 rounded-full">
              {["Shop","About","Feed","Contact"].map(l => (
                <Link key={l} href={`/${l.toLowerCase()}`} className="text-white text-[11px] tracking-[0.2em] uppercase font-sans hover:text-mango-500 transition-colors duration-300">
                  {l}
                </Link>
              ))}
            </div>
            <Link href="/checkout" className="text-white text-xs tracking-[0.3em] uppercase font-sans font-bold pointer-events-auto filter drop-shadow-md hover:text-mango-500">
              Cart (0)
            </Link>
          </nav>
          
          {/* SCENE 01: HERO */}
          <section ref={heroSectionRef} className="relative w-full z-10">
            <div
              ref={heroPinRef}
              className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: currentFlavor.bg, transition: "background-color 0.8s ease" }}
            >
              <h1
                className="absolute z-10 text-center text-white font-bangers tracking-wide select-none pointer-events-none whitespace-pre-line drop-shadow-lg"
                style={{ fontSize: "clamp(4rem, 18vw, 22rem)", lineHeight: 0.85 }}
              >
                {currentFlavor.name}
              </h1>
              
              <div className="absolute z-30 bottom-28 md:bottom-24 text-center px-4">
                <p className="text-white text-[10px] md:text-xs tracking-[0.35em] uppercase font-sans drop-shadow-md">
                  Rotating · Filling · Pure 3D Juice
                </p>
              </div>

              <div className="absolute z-30 bottom-6 right-6 md:right-10 animate-bounce">
                <span className="text-white text-[10px] tracking-[0.4em] uppercase font-sans drop-shadow-md">Scroll ↓</span>
              </div>
            </div>
          </section>

          {/* SECTION 1: MANGO (Sloth on Right, Text on Left) */}
          <section ref={mangoRef} className="relative w-full min-h-screen flex items-center overflow-hidden z-30 bg-[#FF9F1C]">
            <div className="container mx-auto px-6 md:px-16 py-24 md:py-0">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2">
                  <span className="text-white/80 text-[10px] tracking-[0.4em] uppercase font-sans block mb-6 drop-shadow-sm">Skydiving Sloth</span>
                  <h2 className="font-bangers text-white tracking-wide mb-8 drop-shadow-md" style={{ fontSize: "clamp(4rem, 10vw, 10rem)", lineHeight: 0.9 }}>
                    MANGO<br/>MADNESS
                  </h2>
                  <p className="text-white/90 text-sm md:text-base max-w-md leading-relaxed font-sans mb-8">
                    Our signature mango drop. Harvested at peak ripeness and cold-pressed for maximum flavor. Plunging straight into pure natural sweetness.
                  </p>
                  <div className="flex items-center gap-8 pointer-events-auto">
                    <span className="text-white font-bangers tracking-wider drop-shadow-md" style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}>{PRICE}</span>
                    <Link href="/checkout">
                      <button className="bg-white text-[#FF9F1C] px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans font-bold hover:bg-black hover:text-white transition-all duration-400 rounded-full shadow-xl hover:shadow-2xl hover:scale-105">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full md:w-1/2 min-h-[50vh]"></div>
              </div>
            </div>
          </section>

          {/* SECTION 2: STRAWBERRY (Sloth on Left, Text on Right) */}
          <section ref={strawRef} className="relative w-full min-h-screen flex items-center overflow-hidden z-20 bg-[#E71D36]">
            <div className="container mx-auto px-6 md:px-16 py-24 md:py-0">
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="w-full md:w-1/2 md:pl-16">
                  <span className="text-white/80 text-[10px] tracking-[0.4em] uppercase font-sans block mb-6 drop-shadow-sm">Surfing Sloth</span>
                  <h2 className="font-bangers text-white tracking-wide mb-8 drop-shadow-md" style={{ fontSize: "clamp(4rem, 10vw, 10rem)", lineHeight: 0.9 }}>
                    STRAWBERRY<br/>SMASH
                  </h2>
                  <p className="text-white/90 text-sm md:text-base max-w-md leading-relaxed font-sans mb-8">
                    Catch the wave of wild strawberries. Tart, sweet, and unbelievably refreshing. Smashed perfectly without any added sugars.
                  </p>
                  <div className="flex items-center gap-8 pointer-events-auto">
                    <span className="text-white font-bangers tracking-wider drop-shadow-md" style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}>{PRICE}</span>
                    <Link href="/checkout">
                      <button className="bg-white text-[#E71D36] px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans font-bold hover:bg-black hover:text-white transition-all duration-400 rounded-full shadow-xl hover:shadow-2xl hover:scale-105">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full md:w-1/2 min-h-[50vh]"></div>
              </div>
            </div>
          </section>

          {/* SECTION 3: WATERMELON (Sloth on Right, Text on Left) */}
          <section ref={melonRef} className="relative w-full min-h-screen flex items-center overflow-hidden z-30 bg-[#2EC4B6]">
            <div className="container mx-auto px-6 md:px-16 py-24 md:py-0">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2">
                  <span className="text-white/80 text-[10px] tracking-[0.4em] uppercase font-sans block mb-6 drop-shadow-sm">Chilling Sloth</span>
                  <h2 className="font-bangers text-white tracking-wide mb-8 drop-shadow-md" style={{ fontSize: "clamp(4rem, 10vw, 10rem)", lineHeight: 0.9 }}>
                    WATERMELON<br/>WAVE
                  </h2>
                  <p className="text-white/90 text-sm md:text-base max-w-md leading-relaxed font-sans mb-8">
                    Kick back and hydrate. Pure cold-pressed watermelon with a hint of mint. The ultimate thirst quencher for lazy sunny afternoons.
                  </p>
                  <div className="flex items-center gap-8 pointer-events-auto">
                    <span className="text-white font-bangers tracking-wider drop-shadow-md" style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}>{PRICE}</span>
                    <Link href="/checkout">
                      <button className="bg-white text-[#2EC4B6] px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans font-bold hover:bg-black hover:text-white transition-all duration-400 rounded-full shadow-xl hover:shadow-2xl hover:scale-105">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full md:w-1/2 min-h-[50vh]"></div>
              </div>
            </div>
          </section>

          {/* SECTION 4: GRAPE (Sloth on Left, Text on Right) */}
          <section ref={grapeRef} className="relative w-full min-h-screen flex items-center overflow-hidden z-20 bg-[#4B0082]">
            <div className="container mx-auto px-6 md:px-16 py-24 md:py-0">
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="w-full md:w-1/2 md:pl-16">
                  <span className="text-white/80 text-[10px] tracking-[0.4em] uppercase font-sans block mb-6 drop-shadow-sm">Flying Sloth</span>
                  <h2 className="font-bangers text-white tracking-wide mb-8 drop-shadow-md" style={{ fontSize: "clamp(4rem, 10vw, 10rem)", lineHeight: 0.9 }}>
                    GRAPE<br/>GRAVITY
                  </h2>
                  <p className="text-white/90 text-sm md:text-base max-w-md leading-relaxed font-sans mb-8">
                    Defy gravity with intense, bold concord grape flavor. Rich, vibrant, and packed with antioxidants. No gravity, no limits, no filter.
                  </p>
                  <div className="flex items-center gap-8 pointer-events-auto">
                    <span className="text-white font-bangers tracking-wider drop-shadow-md" style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}>{PRICE}</span>
                    <Link href="/checkout">
                      <button className="bg-white text-[#4B0082] px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans font-bold hover:bg-black hover:text-white transition-all duration-400 rounded-full shadow-xl hover:shadow-2xl hover:scale-105">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full md:w-1/2 min-h-[50vh]"></div>
              </div>
            </div>
          </section>

          {/* GALLERY SECTION */}
          <section ref={galleryRef} className="relative w-full py-32 flex flex-col items-center justify-center overflow-hidden z-30 bg-[#0A0E27]">
            <h2 className="font-bangers text-white tracking-wide mb-6" style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>
              SEE THE SLOTH LIFE
            </h2>
            <p className="text-white/60 font-sans mb-12 max-w-md text-center">
              Check out our community gallery. Hyper-realistic photos from around the world.
            </p>
            <Link href="/gallery" className="pointer-events-auto">
               <button className="bg-mango-500 text-white px-10 py-5 text-sm tracking-[0.2em] uppercase font-sans font-bold hover:bg-white hover:text-[#0A0E27] transition-all duration-400 rounded-full shadow-[0_0_40px_rgba(255,159,28,0.4)] hover:shadow-[0_0_60px_rgba(255,159,28,0.8)] hover:-translate-y-2">
                 Visit Gallery
               </button>
            </Link>
          </section>
        </motion.div>
      )}
    </>
  );
}
