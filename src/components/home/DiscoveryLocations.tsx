"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const locations = [
  { city: "LOS ANGELES", address: "123 Abbot Kinney Blvd", status: "Flagship" },
  { city: "NEW YORK", address: "456 Soho Street", status: "Opening Soon" },
  { city: "MIAMI", address: "789 Wynwood Walls", status: "Pop-up" },
];

export default function DiscoveryLocations() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      tl.fromTo(item,
        { opacity: 0, y: 30, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        `-=${0.6 - (i * 0.1)}`
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-background text-foreground border-b border-foreground/10">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
          <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-none mb-6 md:mb-0">
            FIND US IN<br/>THE WILD
          </h2>
          <button className="text-lg font-bold border-b-2 border-foreground hover:text-mango-500 hover:border-mango-500 transition-colors pb-1">
            VIEW ALL LOCATIONS
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {locations.map((loc, i) => (
            <div 
              key={i} 
              ref={el => { itemsRef.current[i] = el; }}
              className="group cursor-pointer border-t border-foreground/20 pt-8"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-display font-bold group-hover:text-mango-500 transition-colors">{loc.city}</h3>
                <span className="text-sm font-bold uppercase tracking-wider opacity-60 bg-foreground/5 px-3 py-1 rounded-full">{loc.status}</span>
              </div>
              <p className="text-xl text-foreground/70 font-medium">{loc.address}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
