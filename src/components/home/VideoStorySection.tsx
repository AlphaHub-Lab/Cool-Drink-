"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { registerGsapOnce } from "@/animations/registry";

registerGsapOnce();

export default function VideoStorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const text5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=220%",
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });

    if (videoRef.current) {
      scrubTl.fromTo(videoRef.current, { scale: 1 }, { scale: 1.1, ease: "none" }, 0);
    }

    // Direct crossfades: as one fades out, the next fades in immediately so the screen is NEVER blank
    // Transition 1 -> 2
    scrubTl.to(text1Ref.current, { opacity: 0, y: -25, duration: 0.12 }, 0.20);
    scrubTl.fromTo(text2Ref.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.12 }, 0.20);

    // Transition 2 -> 3
    scrubTl.to(text2Ref.current, { opacity: 0, y: -25, duration: 0.12 }, 0.40);
    scrubTl.fromTo(text3Ref.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.12 }, 0.40);

    // Transition 3 -> 4
    scrubTl.to(text3Ref.current, { opacity: 0, y: -25, duration: 0.12 }, 0.60);
    scrubTl.fromTo(text4Ref.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.12 }, 0.60);

    // Transition 4 -> 5
    scrubTl.to(text4Ref.current, { opacity: 0, y: -25, duration: 0.12 }, 0.80);
    scrubTl.fromTo(text5Ref.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.12 }, 0.80);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-black w-full min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full bg-black">
        <video
          ref={videoRef}
          src="/create_some_animated_images.mp4"
          poster="/assets/statement/premium-warm-bg.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-black/85 z-20 pointer-events-none" />
      </div>

      {/* Top persistent story badge so screen is always anchored */}
      <div className="absolute top-8 md:top-12 inset-x-0 z-30 pointer-events-none flex justify-center">
        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white/80 px-5 py-2 rounded-full text-[10px] tracking-[0.35em] uppercase font-bold">
          The Raw Story · Pure Fruit
        </span>
      </div>

      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center text-center p-6">
        <div ref={text1Ref} className="absolute">
          <h2 className="text-4xl md:text-8xl font-display font-light text-white uppercase tracking-widest drop-shadow-2xl">
            From The<br /><span className="font-bold text-mango-500">Fruit.</span>
          </h2>
        </div>
        <div ref={text2Ref} className="absolute opacity-0">
          <h2 className="text-4xl md:text-8xl font-display font-light text-white uppercase tracking-widest drop-shadow-2xl">
            Harvested<br /><span className="font-bold">Wild.</span>
          </h2>
        </div>
        <div ref={text3Ref} className="absolute opacity-0">
          <h2 className="text-4xl md:text-8xl font-display font-light text-white uppercase tracking-widest drop-shadow-2xl">
            Cut<br /><span className="font-bold text-forest-500">Fresh.</span>
          </h2>
        </div>
        <div ref={text4Ref} className="absolute opacity-0">
          <h2 className="text-4xl md:text-8xl font-display font-light text-white uppercase tracking-widest drop-shadow-2xl">
            Nothing<br /><span className="font-bold">Hidden.</span>
          </h2>
        </div>
        <div ref={text5Ref} className="absolute opacity-0">
          <h2 className="text-4xl md:text-8xl font-display font-light text-white uppercase tracking-widest drop-shadow-2xl">
            Straight To<br /><span className="font-bold text-mango-500">The Bottle.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
