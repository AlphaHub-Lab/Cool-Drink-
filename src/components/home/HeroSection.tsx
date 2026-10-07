"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Magnetic from "../ui/Magnetic";
import { registerGsapOnce } from "@/animations/registry";
import { products } from "@/lib/data";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FittedBottleScene from "@/components/3d/FittedBottleScene";

registerGsapOnce();

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const [flavorIndex, setFlavorIndex] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const flavor = products[flavorIndex];

  // Product Layers
  const bottleCleanRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFlavorIndex((i) => (i + 1) % products.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;
    const mm = gsap.matchMedia();

    // Universal entrance animation for all screens
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      bottleCleanRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 0.3 }
    );

    gsap.fromTo(
      uiRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
    );

    // Mobile & small tablet scroll animation (<768px)
    mm.add("(max-width: 767px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setSceneProgress(self.progress);
          },
        },
      });

      scrollTl.to(bottleCleanRef.current, { scale: 1.05, y: "-1.5vh", ease: "power1.inOut" }, 0);
      scrollTl.to(titleRef.current, { y: -20, opacity: 0.4, ease: "power2.in" }, 0);
      scrollTl.to(uiRef.current, { y: -10, ease: "power2.in" }, 0);
    });

    // Tablet & Desktop scroll animation (>=768px)
    mm.add("(min-width: 768px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "+=160%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setSceneProgress(self.progress);
          },
        },
      });

      scrollTl.to(bottleCleanRef.current, { scale: 1.06, y: "-2vh", ease: "power1.inOut" }, 0);
      scrollTl.to(uiRef.current, { y: -15, ease: "power2.in" }, 0);
      scrollTl.to(titleRef.current, { y: -30, opacity: 0.3, ease: "power2.in" }, 0);
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-black w-full overflow-hidden">
      <div
        ref={pinWrapperRef}
        className="relative h-[100svh] w-full flex items-center justify-center bg-black perspective-[1000px] overflow-hidden"
      >
        {/* Background Atmospheric Lighting */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero/intro/orange-vfx-background.jpg"
            alt="Orange Cinematic VFX"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        </div>

        {/* Real-time 3D bottle, liquid, lighting and camera framing */}
        <div
          ref={bottleCleanRef}
          className="absolute inset-0 z-40 pointer-events-none flex items-end justify-center px-4 pb-14 pt-20 md:items-center md:justify-end md:px-[9vw] md:py-0"
        >
          <div className="h-[60svh] w-[90vw] max-w-[440px] sm:h-[65svh] md:h-[76svh] md:w-[43vw] md:min-w-[480px] lg:w-[41vw]">
            <FittedBottleScene
              color={flavor.glassTint}
              liquidColor={flavor.liquidColor}
              label={flavor.label}
              progress={sceneProgress}
              eager
            />
          </div>
        </div>

        {/* Hero Title and Subtitle */}
        <div className="absolute z-[45] left-4 right-4 top-[10%] text-center pointer-events-none sm:top-[12%] sm:left-6 sm:right-6 md:left-[8vw] md:right-auto md:top-[22%] md:max-w-[40vw] md:text-left">
          <h1
            ref={titleRef}
            className="text-white font-condensed tracking-wide drop-shadow-2xl"
            style={{ fontSize: "clamp(2.75rem, 9.5vw, 7.5rem)", lineHeight: 0.88 }}
          >
            NO FILTER
            <span className="mt-2.5 sm:mt-3 block text-[0.34em] font-sans font-bold tracking-[0.28em] text-mango-400 drop-shadow">
              {flavor.name.toUpperCase()}
            </span>
          </h1>

          <p className="mt-3 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-white/80 font-medium sm:mt-4 md:max-w-[24rem] md:text-sm">
            Cold pressed. 100% Raw fruit. No fake stuff.
          </p>
        </div>

        {/* UI / CTA */}
        <div
          ref={uiRef}
          className="absolute bottom-6 z-[100] w-full flex justify-center px-4 pointer-events-auto sm:bottom-8 md:bottom-12 md:justify-start md:px-[8vw]"
        >
          <Magnetic pullRange={25}>
            <Link href="/shop">
              <button className="bg-white/10 border border-white/30 text-white px-7 py-3.5 sm:px-10 sm:py-4 rounded-full font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-md shadow-2xl active:scale-95">
                Experience Real Juice →
              </button>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

