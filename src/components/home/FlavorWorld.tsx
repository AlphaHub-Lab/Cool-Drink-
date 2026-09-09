"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapOnce } from "@/animations/registry";
import { WORLD_ASSETS } from "@/lib/brand/canonical";
import type { Product } from "@/lib/data";
import ProductActions from "@/components/shop/ProductActions";

registerGsapOnce();

const ACTIVITY: Record<Product["activity"], string> = {
  paragliding: "Paragliding",
  surfing: "Surfing",
  skateboarding: "Skateboarding",
  cycling: "Cycling",
};

export default function FlavorWorld({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const world = WORLD_ASSETS[product.flavor];

  // Alternating layout:
  // index 0 (Mango): Info on LEFT, Image on RIGHT -> Image comes from RIGHT
  // index 1 (Strawberry): Info on RIGHT, Image on LEFT -> Image comes from LEFT
  // index 2 (Watermelon): Info on LEFT, Image on RIGHT -> Image comes from RIGHT
  // index 3 (Grape): Info on RIGHT, Image on LEFT -> Image comes from LEFT
  const infoOnRight = index % 2 !== 0;

  useGSAP(
    () => {
      if (!sectionRef.current || !characterRef.current || !infoCardRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // When info is on RIGHT, image is on LEFT and comes from LEFT (x: -180 -> 0)
        // When info is on LEFT, image is on RIGHT and comes from RIGHT (x: 180 -> 0)
        const imageStartX = infoOnRight ? -180 : 180;
        const infoStartX = infoOnRight ? 60 : -60;

        gsap.fromTo(
          characterRef.current,
          { x: imageStartX, opacity: 0.15 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "center center",
              scrub: 0.9,
            },
          }
        );

        gsap.fromTo(
          infoCardRef.current,
          { x: infoStartX, opacity: 0.3 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "center center",
              scrub: 0.8,
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [infoOnRight, product.id] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: product.bg }}
    >
      {/* Background world scenery */}
      <Image
        src={world.env}
        alt=""
        fill
        className="object-cover opacity-55 pointer-events-none"
        priority={index === 0}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/45 pointer-events-none" />

      {/* Grid Container for Side-by-Side Alternating Layout */}
      <div className="relative z-20 container mx-auto px-6 md:px-14 lg:px-20 min-h-[85svh] flex items-center">
        <div
          className={`w-full flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16 ${
            infoOnRight ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* 1. JUICE INFORMATION CARD */}
          <div
            ref={infoCardRef}
            className="w-full md:w-[48%] lg:w-[45%] bg-black/45 backdrop-blur-2xl border border-white/15 rounded-[2.5rem] p-7 md:p-10 lg:p-12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]"
          >
            <p className="text-white/80 text-[11px] font-bold tracking-[0.35em] uppercase mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              {ACTIVITY[product.activity]} · {product.label}
            </p>

            <h2
              className="font-condensed text-white mb-5 whitespace-pre-line tracking-wide drop-shadow-lg"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", lineHeight: 0.9 }}
            >
              {product.name.toUpperCase().replace(" ", "\n")}
            </h2>

            <p className="text-white/90 text-sm md:text-base mb-8 leading-relaxed font-sans font-normal">
              {product.description}
            </p>

            {/* Product Bottle & Price Details */}
            <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="relative w-28 h-44 shrink-0 transition-transform duration-300 hover:scale-105">
                <Image
                  src={product.bottleSrc}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-white font-condensed text-3xl md:text-4xl tracking-wider">
                  {product.price}
                </span>
                <span className="text-white/70 text-xs uppercase tracking-widest font-sans">
                  Cold Pressed · 350ml
                </span>
                <span className="text-white/90 text-xs font-semibold">
                  100% Raw · Zero Additives
                </span>
              </div>
            </div>

            <div className="mt-8 text-white [&_span]:text-white [&_a_button]:bg-white [&_a_button]:text-black [&_a_button]:font-bold [&_a_button]:px-8 [&_a_button]:py-4 [&_a_button]:rounded-full [&_a_button]:hover:bg-white/90">
              <ProductActions
                productId={product.id}
                price={product.price}
                color={product.color}
                align="start"
              />
            </div>
          </div>

          {/* 2. CHARACTER / SLOTH ARTWORK */}
          <div
            ref={characterRef}
            className="w-full md:w-[48%] lg:w-[50%] flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-[85vw] md:w-[42vw] max-w-[560px] h-[38vh] md:h-[58vh] max-h-[640px] animate-float">
              <Image
                src={world.sloth}
                alt={`${product.name} Character`}
                fill
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                priority={index === 0}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
