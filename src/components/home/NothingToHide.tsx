"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { registerGsapOnce } from "@/animations/registry";
import { getProductByFlavor, PRICE_INR } from "@/lib/data";
import ProductActions from "@/components/shop/ProductActions";
import FittedBottleScene from "@/components/3d/FittedBottleScene";

registerGsapOnce();

export default function NothingToHide() {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textHideRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const bottleContainerRef = useRef<HTMLDivElement>(null);
  const fruitRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const [sceneProgress, setSceneProgress] = useState(0);

  const product = getProductByFlavor("mango");

  useGSAP(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    // Mobile & small tablet (<768px)
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "+=130%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setSceneProgress(self.progress);
          },
        },
      });

      tl.to(bgRef.current, { scale: 1.06, ease: "none", duration: 1 }, 0);
      tl.to(bottleContainerRef.current, { scale: 1.06, y: "-1vh", ease: "power1.inOut", duration: 1 }, 0);
      tl.to(textHideRef.current, { opacity: 0.15, y: "-2vh", duration: 0.8 }, 0.3);
      tl.to(fruitRef.current, { y: "-2vh", opacity: 0.85, duration: 0.8 }, 0.5);
      tl.fromTo(copyRef.current, { opacity: 0.5, y: 15 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6);
    });

    // Tablet & Desktop (>=768px)
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setSceneProgress(self.progress);
          },
        },
      });

      tl.to(bgRef.current, { scale: 1.08, ease: "none", duration: 1 }, 0);
      tl.to(bottleContainerRef.current, { scale: 1.08, y: "-2vh", ease: "power1.inOut", duration: 1 }, 0);
      tl.to(textHideRef.current, { opacity: 0.2, y: "-4vh", duration: 0.8 }, 0.4);
      tl.to(fruitRef.current, { y: "-4vh", opacity: 0.9, duration: 0.8 }, 0.8);
      tl.fromTo(copyRef.current, { opacity: 0.4, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.7);
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-[#1a120c] w-full">
      <div
        ref={pinWrapperRef}
        className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden"
      >
        <div ref={bgRef} className="absolute inset-0 z-0 origin-center">
          <Image
            src="/assets/statement/premium-warm-bg.jpg"
            alt=""
            fill
            className="object-cover opacity-80"
            priority
          />
        </div>

        <h2
          ref={textHideRef}
          className="absolute z-10 text-[16vw] sm:text-[13vw] md:text-[10vw] font-display font-black text-white/25 leading-[0.8] tracking-tighter text-center uppercase pointer-events-none"
        >
          Nothing<br />To Hide.
        </h2>

        <div
          ref={fruitRef}
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center opacity-70"
        >
          <div className="relative w-[95vw] h-[65vh] sm:w-[90vw] sm:h-[80vh] max-w-[1100px]">
            <Image
              src="/assets/statement/real-mango-slices.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div
          ref={bottleContainerRef}
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center pb-16 sm:pb-0 pt-4 sm:pt-8"
        >
          <div className="relative w-[75vw] h-[50svh] max-w-[320px] max-h-[480px] sm:w-[42vh] sm:h-[70vh] md:w-[26vw] md:h-[78vh] sm:max-w-[420px] sm:max-h-[720px]">
            <FittedBottleScene
              color={product.glassTint}
              liquidColor={product.liquidColor}
              label={product.label}
              progress={sceneProgress}
              eager
            />
          </div>
        </div>

        <div
          ref={copyRef}
          className="absolute z-40 bottom-4 left-4 right-4 sm:bottom-8 sm:left-6 sm:right-auto max-w-xs md:left-16 md:max-w-sm text-white pointer-events-auto bg-black/40 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-4 sm:p-0 rounded-2xl sm:rounded-none border border-white/10 sm:border-none shadow-xl sm:shadow-none"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/70 mb-2 sm:mb-3">
            {product.label} · {PRICE_INR}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-white/85 leading-relaxed mb-3 sm:mb-5 line-clamp-3 sm:line-clamp-none">
            {product.description}
          </p>
          <div className="[&_span]:text-white [&_button]:text-xs sm:[&_button]:text-sm">
            <ProductActions productId={product.id} price={product.price} color="bg-mango-500" />
          </div>
        </div>

        <div
          ref={waveRef}
          className="absolute inset-0 z-[50] pointer-events-none flex items-center justify-center opacity-0"
        >
          <div className="relative w-[140vw] h-[120vh]">
            <Image
              src="/assets/statement/liquid-wave-transition.png"
              alt=""
              fill
              className="object-cover object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
