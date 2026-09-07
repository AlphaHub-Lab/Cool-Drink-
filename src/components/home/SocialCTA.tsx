"use client";

import { motion } from "framer-motion";
import Magnetic from "../ui/Magnetic";
import ImageReveal from "../ui/ImageReveal";

export default function SocialCTA() {
  const images = [
    "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400",
    "https://images.unsplash.com/photo-1596700020165-2244a0441a9f?w=400",
    "https://images.unsplash.com/photo-1546173159-315724a31696?w=400",
    "https://images.unsplash.com/photo-1517482811403-2415d86248cc?w=400"
  ];

  return (
    <section className="py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-bold mb-16"
        >
          SEE WHAT WE'RE POURING
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {images.map((src, i) => (
            <ImageReveal
              key={i}
              src={src}
              alt="Social Feed"
              delay={i * 0.15}
              className="w-48 h-48 md:w-64 md:h-64 rounded-3xl group"
            >
              <div className="absolute inset-0 bg-mango-500/0 group-hover:bg-mango-500/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">@nofilter</span>
              </div>
            </ImageReveal>
          ))}
        </div>

        <Magnetic pullRange={20}>
          <button className="bg-foreground text-background px-12 py-5 rounded-full font-bold text-lg hover:bg-mango-500 hover:text-white transition-colors shadow-lg">
            FOLLOW NO FILTER
          </button>
        </Magnetic>

      </div>
    </section>
  );
}
