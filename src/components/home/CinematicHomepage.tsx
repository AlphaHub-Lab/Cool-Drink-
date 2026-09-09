"use client";

import Link from "next/link";
import { products } from "@/lib/data";
import FlavorWorld from "./FlavorWorld";

export default function CinematicHomepage() {
  return (
    <div className="w-full relative">
      {products.map((product, index) => (
        <FlavorWorld key={product.id} product={product} index={index} />
      ))}

      <section className="relative w-full py-32 flex flex-col items-center justify-center z-10 bg-[#0A0E27]">
        <h2 className="font-condensed text-white tracking-wide mb-6" style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>
          THE JOURNAL
        </h2>
        <p className="text-white/60 font-sans mb-12 max-w-md text-center">
          A cinematic look at fruit, juice, and the bottle.
        </p>
        <Link href="/gallery">
          <button className="bg-mango-500 text-white px-10 py-5 text-sm tracking-[0.2em] uppercase font-sans font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl">
            Visit Gallery
          </button>
        </Link>
      </section>
    </div>
  );
}
