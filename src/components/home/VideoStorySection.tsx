"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoStorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Text overlay refs for cinematic story beats
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const text5Ref = useRef<HTMLDivElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);

  // We have to wait until the video's metadata is loaded to know its duration
  // for perfectly accurate GSAP scrubbing.
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 1) {
      setVideoLoaded(true);
    }
  }, []);

  const handleLoadedMetadata = () => {
    setVideoLoaded(true);
  };

  useGSAP(() => {
    if (!containerRef.current || !videoRef.current || !videoLoaded) return;

    // Use actual video duration, fallback to 10s
    const videoDuration = videoRef.current.duration || 10;
    
    // Pause video so ScrollTrigger exclusively controls it
    videoRef.current.pause();

    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=500%", // Pin for 500vh to give ample scroll time for the video
        scrub: 0.5,
        pin: true,
        anticipatePin: 1
      }
    });

    // 1. Scrub video playback
    // We animate the currentTime of the video element
    scrubTl.fromTo(videoRef.current, 
      { currentTime: 0 }, 
      { currentTime: videoDuration, ease: "none" }, 
      0
    );

    // 2. Cinematic Story Overlays (5 Stages fading in and out at specific scroll points)
    
    // STAGE 01: FRUIT
    scrubTl.fromTo(text1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.05);
    scrubTl.to(text1Ref.current, { opacity: 0, y: -30, duration: 0.1 }, 0.18);

    // STAGE 02: HARVEST
    scrubTl.fromTo(text2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.25);
    scrubTl.to(text2Ref.current, { opacity: 0, y: -30, duration: 0.1 }, 0.38);

    // STAGE 03: PREPARATION
    scrubTl.fromTo(text3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.45);
    scrubTl.to(text3Ref.current, { opacity: 0, y: -30, duration: 0.1 }, 0.58);

    // STAGE 04: JUICE
    scrubTl.fromTo(text4Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.65);
    scrubTl.to(text4Ref.current, { opacity: 0, y: -30, duration: 0.1 }, 0.78);

    // STAGE 05: BOTTLE
    scrubTl.fromTo(text5Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.85);
    scrubTl.to(text5Ref.current, { opacity: 0, y: -30, duration: 0.1 }, 0.98);

  }, { scope: containerRef, dependencies: [videoLoaded] });

  return (
    <section ref={containerRef} className="relative bg-black w-full h-[100svh] overflow-hidden">
      
      {/* Scroll-Scrubbed Cinematic Video */}
      <div className="absolute inset-0 z-0 w-full h-full bg-black">
        <video 
          ref={videoRef}
          src="/create_some_animated_images.mp4"
          onLoadedMetadata={handleLoadedMetadata}
          preload="metadata"
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10 opacity-60 mix-blend-screen"
        />
        {/* Contrast overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 z-20 pointer-events-none" /> 
      </div>

      {/* Cinematic Text Overlays */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center text-center p-6">
        
        <div ref={text1Ref} className="absolute opacity-0">
          <h2 className="text-4xl md:text-7xl font-display font-light text-white uppercase tracking-widest drop-shadow-2xl">
            From The<br/><span className="font-bold text-mango-500">Fruit.</span>
          </h2>
        </div>

        <div ref={text2Ref} className="absolute opacity-0">
          <h2 className="text-4xl md:text-7xl font-display font-light text-white uppercase tracking-widest drop-shadow-2xl">
            Harvested<br/><span className="font-bold">Wild.</span>
          </h2>
        </div>

        <div ref={text3Ref} className="absolute opacity-0">
          <h2 className="text-4xl md:text-7xl font-display font-light text-white uppercase tracking-widest drop-shadow-2xl">
            Cut<br/><span className="font-bold text-orange-500">Fresh.</span>
          </h2>
        </div>

        <div ref={text4Ref} className="absolute opacity-0">
          <h2 className="text-4xl md:text-7xl font-display font-light text-white uppercase tracking-widest drop-shadow-2xl">
            Nothing<br/><span className="font-bold">Hidden.</span>
          </h2>
        </div>

        <div ref={text5Ref} className="absolute opacity-0">
          <h2 className="text-4xl md:text-7xl font-display font-light text-white uppercase tracking-widest drop-shadow-2xl">
            Straight To<br/><span className="font-bold text-mango-500">The Bottle.</span>
          </h2>
        </div>

      </div>

    </section>
  );
}
