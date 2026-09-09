"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Magnetic from "../ui/Magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  
  // Phase 1 Refs: Intro Sequence
  const introBgRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const whiteFlashRef = useRef<HTMLDivElement>(null);

  // Phase 2 Refs: Product Layers
  const studioBgRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const bottleShadowRef = useRef<HTMLDivElement>(null);
  const bottleCleanRef = useRef<HTMLDivElement>(null);
  const labelDecalRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    let mm = gsap.matchMedia();

    // -------------------------------------------------------------
    // DESKTOP: Cinematic Splash & Pinned Experience
    // -------------------------------------------------------------
    mm.add("(min-width: 768px)", () => {
      
      // -- INITIAL STATES --
      // Intro Phase
      gsap.set(introBgRef.current, { opacity: 1 });
      gsap.set(dropRef.current, { y: "-100vh", scale: 0.8, opacity: 1 });
      gsap.set(splashRef.current, { scale: 0, opacity: 0, y: "10vh" });
      gsap.set(whiteFlashRef.current, { opacity: 0 });

      // Product Phase (Hidden initially)
      gsap.set(studioBgRef.current, { opacity: 0, scale: 1.1 });
      gsap.set(smokeRef.current, { opacity: 0 });
      gsap.set(bottleShadowRef.current, { opacity: 0, scale: 0.8, y: "15vh" });
      gsap.set(bottleCleanRef.current, { opacity: 0, scale: 0.8, y: "15vh" });
      gsap.set(labelDecalRef.current, { opacity: 0, scale: 0.8, y: "15vh", zIndex: 50 });
      gsap.set(highlightsRef.current, { opacity: 0, scale: 0.8, y: "15vh" });
      gsap.set(uiRef.current, { opacity: 0, y: 50 });

      // -- PHASE 1: ENTRANCE ANIMATION --
      const entryTl = gsap.timeline();

      entryTl
        // 1. Drop falls
        .to(dropRef.current, { y: "0vh", duration: 0.8, ease: "power2.in" })
        .to(dropRef.current, { scaleY: 1.5, scaleX: 0.5, duration: 0.2, ease: "none" }, "-=0.2")
        // 2. Impact & Splash
        .to(dropRef.current, { opacity: 0, duration: 0.1 }, "+=0")
        .to(splashRef.current, { opacity: 1, scale: 1.5, duration: 0.6, ease: "expo.out" }, "-=0.1")
        .to(whiteFlashRef.current, { opacity: 0.5, duration: 0.1 }, "-=0.6")
        .to(whiteFlashRef.current, { opacity: 0, duration: 0.5 }, "-=0.5")
        // 3. Transition backgrounds & Reveal Product
        .to(introBgRef.current, { opacity: 0, duration: 1 }, "-=0.4")
        .to(studioBgRef.current, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, "-=1")
        .to(splashRef.current, { scale: 2.5, opacity: 0, filter: "blur(20px)", duration: 1.5, ease: "power2.out" }, "-=1.2")
        // Product layers rise up from the splash
        .to([bottleShadowRef.current, bottleCleanRef.current, labelDecalRef.current, highlightsRef.current], {
          opacity: 1,
          scale: 1,
          y: "0vh",
          duration: 1.5,
          ease: "back.out(1.2)",
          stagger: 0.05
        }, "-=1")
        .to(smokeRef.current, { opacity: 0.4, duration: 2 }, "-=1")
        .to(uiRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.5");

      // -- PHASE 2: SCROLL PARALLAX --
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "+=200%", 
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Independently move layers to prove compositing
      scrollTl.to(studioBgRef.current, { scale: 1.05, ease: "none" }, 0);
      scrollTl.to(smokeRef.current, { y: "-10vh", rotation: 5, ease: "none" }, 0);
      scrollTl.to([bottleCleanRef.current, highlightsRef.current], { scale: 1.15, y: "-5vh", ease: "power1.inOut" }, 0);
      scrollTl.to(bottleShadowRef.current, { scale: 1.2, y: "-2vh", opacity: 0.3, ease: "power1.inOut" }, 0);
      
      // Label translates differently to simulate 3D cylinder tracking
      scrollTl.to(labelDecalRef.current, { scale: 1.18, y: "-6vh", ease: "power1.inOut" }, 0);
      
      // Fade out UI
      scrollTl.to(uiRef.current, { opacity: 0, y: -50, ease: "power2.in" }, 0);

      // Transition to next section
      scrollTl.to([bottleCleanRef.current, highlightsRef.current, labelDecalRef.current, bottleShadowRef.current], {
        scale: 1.2, y: "5vh", opacity: 0, ease: "power2.in"
      }, 0.5);
      scrollTl.to(studioBgRef.current, { opacity: 0, ease: "power2.in" }, 0.6);

      return () => {};
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-black w-full">
      <div 
        ref={pinWrapperRef} 
        className="relative h-[100svh] w-full flex items-center justify-center bg-black perspective-[1000px]"
      >
        
        {/* =========================================
            PHASE 1: CINEMATIC INTRO VFX
        ========================================= */}
        <div ref={introBgRef} className="absolute inset-0 z-0">
          <Image src="/assets/hero/intro/orange-vfx-background.jpg" alt="Orange Cinematic VFX" fill className="object-cover" priority />
        </div>
        
        <div ref={dropRef} className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="relative w-32 h-32 md:w-48 md:h-48">
            <Image src="/assets/hero/intro/juice-drop.png" alt="Juice Drop" fill className="object-contain drop-shadow-2xl" priority />
          </div>
        </div>

        <div ref={splashRef} className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none origin-bottom">
          <div className="relative w-[150vw] h-[150vh] md:w-[80vw] md:h-[80vh] top-[20vh]">
            <Image src="/assets/hero/intro/juice-splash.png" alt="Juice Splash VFX" fill className="object-contain mix-blend-screen opacity-90" priority />
          </div>
        </div>

        <div ref={whiteFlashRef} className="absolute inset-0 z-[100] bg-white pointer-events-none mix-blend-overlay" />

        {/* =========================================
            PHASE 2: LAYERED PRODUCT PRESENTATION
        ========================================= */}
        
        {/* LAYER 0: Studio Background */}
        <div ref={studioBgRef} className="absolute inset-0 z-[5]">
          <Image src="/assets/hero/environment/atmosphere-smoke.jpg" alt="Studio Background" fill className="object-cover opacity-60" priority />
        </div>

        {/* LAYER 1: Atmosphere / Smoke */}
        <div ref={smokeRef} className="absolute inset-0 z-10 pointer-events-none mix-blend-screen opacity-40">
          <Image src="/assets/hero/environment/atmosphere-smoke.jpg" alt="Smoke Atmosphere" fill className="object-cover" />
        </div>

        {/* LAYER 3: Bottle Shadow */}
        <div ref={bottleShadowRef} className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center pt-20">
          <div className="relative w-[50vh] h-[80vh] md:w-[35vw] md:h-[90vh] max-w-[600px] max-h-[900px]">
            {/* CSS-generated drop shadow for clean alpha mapping */}
            <div className="absolute inset-0 bg-black blur-3xl opacity-50 transform translate-y-[5vh] scale-[0.8]" style={{ borderRadius: '100px 100px 30px 30px' }} />
          </div>
        </div>

        {/* LAYER 4: Canonical Clean Bottle */}
        <div ref={bottleCleanRef} className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center pt-10">
          <div className="relative w-[50vh] h-[80vh] md:w-[35vw] md:h-[90vh] max-w-[600px] max-h-[900px]">
            <Image src="/assets/hero/product/nf-hero-bottle-main.png" alt="No Filter Canonical Bottle" fill className="object-contain" priority />
          </div>
        </div>

        {/* LAYER 5: Real Label Decal (Independent SVG) */}
        <div ref={labelDecalRef} className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center pt-10">
          <div className="relative w-[50vh] h-[80vh] md:w-[35vw] md:h-[90vh] max-w-[600px] max-h-[900px] flex items-center justify-center">
             <div className="relative w-[60%] h-[40%] transform -translate-y-[5%]">
                <Image src="/assets/hero/product/nf-real-label.svg" alt="No Filter Label" fill className="object-contain drop-shadow-lg" priority />
             </div>
          </div>
        </div>

        {/* LAYER 6: Specular Highlights / Condensation */}
        <div ref={highlightsRef} className="absolute inset-0 z-60 pointer-events-none flex items-center justify-center pt-10">
          <div className="relative w-[50vh] h-[80vh] md:w-[35vw] md:h-[90vh] max-w-[600px] max-h-[900px]">
            <Image 
              src="/assets/hero/textures/nf-condensation-overlay.jpg" 
              alt="Bottle Highlights" 
              fill
              className="object-contain mix-blend-screen opacity-40"
              style={{ maskImage: "url(/assets/hero/product/nf-hero-bottle-main.png)", maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center", WebkitMaskImage: "url(/assets/hero/product/nf-hero-bottle-main.png)", WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center" }}
            />
          </div>
        </div>

        {/* LAYER 7: UI / CTA */}
        <div ref={uiRef} className="absolute bottom-12 z-[100] w-full flex justify-center px-6 pointer-events-auto">
          <Magnetic pullRange={30}>
            <Link href="/shop">
              <button
                className="bg-transparent border border-white/20 text-white/90 px-12 py-4 rounded-full font-display font-medium text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white/50 transition-all duration-500 backdrop-blur-md"
              >
                Experience Real Juice
              </button>
            </Link>
          </Magnetic>
        </div>

      </div>
    </section>
  );
}
