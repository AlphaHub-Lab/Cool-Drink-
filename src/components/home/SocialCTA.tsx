"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SocialCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
    )
    .fromTo(textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(inputRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-40 bg-black text-white overflow-hidden">
      
      {/* Ambient Dark Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute w-[800px] h-[800px] bg-mango-500/10 rounded-full blur-[120px] mix-blend-screen opacity-50 transform -translate-y-1/4" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        
        <h2 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 tracking-tighter leading-[0.9]">
          JOIN THE<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-mango-400 to-orange-500">
            RAW TRUTH.
          </span>
        </h2>

        <p ref={textRef} className="text-xl md:text-2xl text-white/60 font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
          No spam. Just early access to new harvests, exclusive drops, and the unfiltered story behind every bottle.
        </p>

        <div ref={inputRef} className="relative max-w-xl mx-auto group">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 text-lg text-white placeholder-white/40 focus:outline-none focus:border-mango-500/50 transition-colors backdrop-blur-md"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-white text-black px-8 rounded-full font-bold hover:bg-mango-500 hover:text-white transition-all flex items-center gap-2 group-hover:pr-6 group-hover:pl-10">
            JOIN <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
