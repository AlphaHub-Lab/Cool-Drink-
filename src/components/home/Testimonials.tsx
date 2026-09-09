"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Magnetic from "../ui/Magnetic";

const reviews = [
  { id: 1, text: "The Citrus blend literally woke me up from a 3-year slump. I'm basically a monkey now.", name: "Alex P.", rating: 5 },
  { id: 2, text: "Finally, a juice brand that doesn't pretend to be medicine. It just tastes incredibly fresh and natural.", name: "Sarah M.", rating: 5 },
  { id: 3, text: "I bought this for the sloth on the bottle, but stayed for the crazy good mango flavor.", name: "Jason K.", rating: 4 },
  { id: 4, text: "Zero added sugar? Honestly couldn't tell. It's wildly tart and ridiculously fresh.", name: "Emily R.", rating: 5 },
  { id: 5, text: "Forest blend is the ultimate life hack for anyone moving slower than a Monday morning.", name: "Chris T.", rating: 5 }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

  return (
    <section className="py-32 bg-mango-500 text-foreground overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white"
          >
            What People<br/>
            Say.
          </motion.h2>

          <div className="flex gap-4 mt-8 md:mt-0">
            <Magnetic>
              <button onClick={prev} className="w-16 h-16 rounded-full border-2 border-white text-white flex items-center justify-center hover:bg-white hover:text-mango-500 transition-colors">
                ←
              </button>
            </Magnetic>
            <Magnetic>
              <button onClick={next} className="w-16 h-16 rounded-full border-2 border-white text-white flex items-center justify-center hover:bg-white hover:text-mango-500 transition-colors">
                →
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="relative h-[300px] flex items-center">
          {reviews.map((review, i) => {
            // Calculate positioning logic
            const isActive = i === activeIndex;
            const isPrev = i === (activeIndex === 0 ? reviews.length - 1 : activeIndex - 1);
            const isNext = i === (activeIndex + 1) % reviews.length;

            let x = "100%";
            let opacity = 0;
            let scale = 0.8;
            let zIndex = 0;

            if (isActive) {
              x = "0%";
              opacity = 1;
              scale = 1;
              zIndex = 20;
            } else if (isPrev) {
              x = "-100%";
              opacity = 0;
              scale = 0.8;
            } else if (isNext) {
              x = "100%";
              opacity = 0;
              scale = 0.8;
            }

            return (
              <motion.div
                key={review.id}
                initial={false}
                animate={{ x, opacity, scale, zIndex }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full md:w-2/3 lg:w-1/2 bg-white rounded-[3rem] p-12 shadow-2xl origin-center"
                style={{ left: isActive ? "0" : (isNext ? "20%" : "-20%") }}
              >
                <div className="flex gap-1 mb-8 text-mango-500 text-xl">
                  {Array.from({ length: review.rating }).map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-2xl md:text-4xl font-display font-medium leading-tight mb-8 text-foreground">
                  &quot;{review.text}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-bold uppercase tracking-wider text-sm">{review.name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
