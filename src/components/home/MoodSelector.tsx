"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "../ui/Magnetic";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";
import { CANONICAL_BOTTLE } from "@/lib/brand/canonical";

const moods = products.map((p) => ({
  id: p.flavor,
  label: p.label,
  title: p.name.toUpperCase(),
  desc: p.tagline,
  color: p.color,
  text: "text-white",
  link: `/shop/${p.id}`,
  bottle: p.bottleSrc,
  bg: p.bg,
}));

export default function MoodSelector() {
  const [activeMood, setActiveMood] = useState(moods[0]);

  return (
    <section className="relative py-40 overflow-hidden" style={{ backgroundColor: activeMood.bg }}>
      <div className="absolute inset-0">
        <Image
          src="/assets/hero/environment/atmosphere-smoke.jpg"
          alt=""
          fill
          className="object-cover opacity-25 mix-blend-overlay"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-white">
            What are you feeling?
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-24 relative z-30">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setActiveMood(mood)}
              className={`px-8 py-4 rounded-full font-medium text-sm tracking-[0.2em] uppercase transition-all duration-500 border ${
                activeMood.id === mood.id
                  ? "bg-white text-foreground border-transparent"
                  : "bg-white/10 text-white border-white/25 hover:bg-white/20"
              }`}
            >
              {mood.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMood.id}
              initial={{ opacity: 0.4, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="relative w-56 h-80 md:w-72 md:h-[420px]"
            >
              <Image
                src={activeMood.bottle}
                alt={activeMood.title}
                fill
                className="object-contain drop-shadow-2xl"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-[55%] h-[36%] -translate-y-[4%]">
                  <Image src={CANONICAL_BOTTLE.label.src} alt="No Filter" fill className="object-contain" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="max-w-xl text-center md:text-left relative z-20 text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${activeMood.id}`}
                initial={{ opacity: 0.5, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[0.9] tracking-tighter">
                  {activeMood.title}
                </h3>
                <p className="text-xl md:text-2xl font-medium text-white/85 mb-10">{activeMood.desc}</p>
                <Magnetic pullRange={20}>
                  <Link href={activeMood.link} className="inline-block">
                    <button className="bg-white text-foreground px-10 py-5 rounded-full font-bold text-lg">
                      Shop this juice
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
