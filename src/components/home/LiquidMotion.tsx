"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicMoment() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Full bleed parallax scrub
    gsap.to(bgRef.current, {
      y: "20%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Bottle comes up faster than the background (parallax)
    gsap.fromTo(bottleRef.current, 
      { y: "30vh", scale: 0.9 },
      {
        y: "-10vh",
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    // Text parallax
    gsap.fromTo(textRef.current,
      { y: "15vh" },
      {
        y: "-15vh",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-black flex items-center justify-center">
      
      {/* Background Plate */}
      <div ref={bgRef} className="absolute inset-[-20%] z-0 h-[140%] w-full">
        <Image 
          src="/assets/statement/premium-warm-bg.jpg" 
          alt="Cinematic Background" 
          fill 
          className="object-cover opacity-60" 
        />
        {/* Abstract Glow */}
        <div className="absolute inset-0 bg-mango-500/20 mix-blend-overlay blur-3xl" />
      </div>

      {/* Minimal Typography Behind Product */}
      <div ref={textRef} className="absolute z-10 w-full text-center pointer-events-none mix-blend-overlay">
        <h2 className="text-[20vw] font-display font-black text-white/40 leading-none tracking-tighter uppercase drop-shadow-2xl">
          PURE.
        </h2>
      </div>

      {/* Massive Product Moment */}
      <div ref={bottleRef} className="absolute z-20 w-[60vh] h-[100vh] md:w-[40vw] md:h-[120vh] max-w-[800px] max-h-[1200px] pointer-events-none drop-shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        <Image 
          src="/assets/hero/product/nf-hero-bottle-main.png" 
          alt="No Filter Product Detail" 
          fill 
          className="object-contain" 
        />
        {/* Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[60%] h-[40%] transform -translate-y-[5%]">
            <Image src="/assets/hero/product/nf-real-label.svg" alt="No Filter Label" fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* Vignette Overlay for Depth */}
      <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />

    </section>
  );
}
