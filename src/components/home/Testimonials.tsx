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
    <section className="py-20 sm:py-28 md:py-32 bg-mango-500 text-foreground overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 md:mb-20 gap-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight text-white"
          >
            What People<br/>
            Say.
          </motion.h2>

          <div className="flex items-center gap-4">
            <Magnetic>
              <button 
                onClick={prev} 
                aria-label="Previous review"
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white text-white flex items-center justify-center hover:bg-white hover:text-mango-500 active:scale-95 transition-all text-lg sm:text-xl"
              >
                ←
              </button>
            </Magnetic>
            <Magnetic>
              <button 
                onClick={next} 
                aria-label="Next review"
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white text-white flex items-center justify-center hover:bg-white hover:text-mango-500 active:scale-95 transition-all text-lg sm:text-xl"
              >
                →
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="relative min-h-[440px] sm:min-h-[380px] md:min-h-[340px] flex items-center justify-center">
          {reviews.map((review, i) => {
            const isActive = i === activeIndex;
            const isPrev = i === (activeIndex === 0 ? reviews.length - 1 : activeIndex - 1);
            const isNext = i === (activeIndex + 1) % reviews.length;

            let x = "100%";
            let opacity = 0;
            let scale = 0.85;
            let zIndex = 0;

            if (isActive) {
              x = "0%";
              opacity = 1;
              scale = 1;
              zIndex = 20;
            } else if (isPrev) {
              x = "-100%";
              opacity = 0;
              scale = 0.85;
            } else if (isNext) {
              x = "100%";
              opacity = 0;
              scale = 0.85;
            }

            return (
              <motion.div
                key={review.id}
                initial={false}
                animate={{ x, opacity, scale, zIndex }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_e, info) => {
                  if (info.offset.x < -40) next();
                  else if (info.offset.x > 40) prev();
                }}
                className={`absolute w-full sm:w-[90%] md:w-3/4 lg:w-3/5 bg-white rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 shadow-2xl origin-center select-none ${
                  isActive ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <div className="flex gap-1 mb-4 sm:mb-6 text-mango-500 text-lg sm:text-xl">
                  {Array.from({ length: review.rating }).map((_, idx) => <span key={idx}>★</span>)}
                </div>
                <p className="text-lg sm:text-2xl md:text-3xl font-display font-medium leading-snug mb-6 sm:mb-8 text-foreground">
                  &quot;{review.text}&quot;
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground/10 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-bold uppercase tracking-wider text-xs sm:text-sm">{review.name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
