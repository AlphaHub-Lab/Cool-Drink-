"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NothingToHide() {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  
  // Elements
  const bgRef = useRef<HTMLDivElement>(null);
  const textHideRef = useRef<HTMLHeadingElement>(null);
  const textFruitRef = useRef<HTMLHeadingElement>(null);
  const textFinalRef = useRef<HTMLHeadingElement>(null);
  
  const bottleContainerRef = useRef<HTMLDivElement>(null);
  const bottleEmptyRef = useRef<HTMLDivElement>(null);
  const bottleFillRef = useRef<HTMLDivElement>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoMaskRef = useRef<HTMLDivElement>(null);
  
  const mangoRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 1) {
      setVideoLoaded(true);
    }
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // -- INITIAL STATES --
      // Ensure EVERYTHING is visible in its base state first, then GSAP positions them for animation.
      // This guarantees no blank screens if JS fails.
      
      gsap.set(textFruitRef.current, { opacity: 0, y: 50 });
      gsap.set(textFinalRef.current, { opacity: 0, scale: 0.9, filter: "blur(10px)" });
      
      // The empty bottle is just the main bottle highly filtered to look like frosted glass
      gsap.set(bottleEmptyRef.current, { opacity: 0.7, filter: "grayscale(100%) brightness(1.3) contrast(1.2)" });
      // The filled bottle starts clipped at the bottom
      gsap.set(bottleFillRef.current, { clipPath: "inset(100% 0 0 0)" });
      
      // Video is heavily blurred and masked to simulate liquid motion inside the glass
      gsap.set(videoMaskRef.current, { opacity: 0, clipPath: "inset(100% 0 0 0)", filter: "blur(20px)" });
      
      gsap.set(mangoRef.current, { opacity: 0, scale: 0.5, y: "30vh", filter: "blur(20px)" });
      gsap.set(waveRef.current, { opacity: 0, y: "100vh", scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "+=600%", // Massive 600vh scroll distance for high precision control
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // 0 - 15%: Establish environment & Nothing To Hide
      tl.to(bgRef.current, { scale: 1.05, ease: "none", duration: 1.5 }, 0);
      tl.to(bottleContainerRef.current, { scale: 1.1, y: "-2vh", ease: "power1.inOut", duration: 1.5 }, 0);

      // 15 - 30%: Camera pushes in, text fades out
      tl.to(textHideRef.current, { opacity: 0, y: -50, filter: "blur(10px)", duration: 1 }, 1.5);
      tl.to(bottleContainerRef.current, { scale: 1.3, y: "0vh", ease: "power2.inOut", duration: 1.5 }, 1.5);

      // 30 - 45%: Bottle rotates subtly, liquid fills
      tl.to(bottleFillRef.current, { clipPath: "inset(0% 0 0 0)", ease: "power2.inOut", duration: 1.5 }, 3.0);
      tl.to(bottleEmptyRef.current, { opacity: 0, duration: 1 }, 3.5);
      tl.to(textFruitRef.current, { opacity: 1, y: 0, duration: 0.5 }, 3.5);

      // 45 - 60%: Ingredients emerge with realistic depth
      // We use the existing cartoon video but highly blurred and masked as a "liquid motion" VFX layer
      tl.to(videoMaskRef.current, { clipPath: "inset(0% 0 0 0)", opacity: 0.8, ease: "power2.inOut", duration: 1.5 }, 4.0);
      tl.to(mangoRef.current, { opacity: 1, scale: 1.2, y: "-5vh", rotation: 15, filter: "blur(2px)", duration: 1.5, ease: "power1.out" }, 4.5);
      tl.to(textFruitRef.current, { opacity: 0, y: -50, duration: 0.5 }, 5.5);

      // 60 - 75%: See inside around product
      tl.to(textFinalRef.current, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 }, 6.0);
      tl.to(bottleContainerRef.current, { scale: 1.5, y: "10vh", duration: 1.5, ease: "power2.inOut" }, 6.0);
      tl.to(mangoRef.current, { scale: 1.5, y: "-15vh", rotation: -10, filter: "blur(5px)", duration: 1.5, ease: "power2.inOut" }, 6.0);

      // 75 - 90%: Liquid movement stronger
      tl.to(bottleContainerRef.current, { filter: "blur(8px)", scale: 2, opacity: 0, duration: 1.5, ease: "power3.in" }, 7.5);
      tl.to(mangoRef.current, { opacity: 0, scale: 3, filter: "blur(30px)", duration: 1.5, ease: "power3.in" }, 7.5);
      tl.to(textFinalRef.current, { opacity: 0, scale: 1.5, filter: "blur(20px)", duration: 1 }, 8.0);

      // 90 - 100%: Transition wipe
      tl.to(waveRef.current, { opacity: 1, y: "10vh", duration: 0.5, ease: "power2.out" }, 8.5);
      tl.to(waveRef.current, { scale: 15, y: "-150vh", duration: 1.5, ease: "power3.in" }, 9.0);

      // Synchronize existing video playback with scroll
      if (videoRef.current) {
        const videoDuration = videoRef.current.duration || 10;
        tl.fromTo(videoRef.current, 
          { currentTime: 0 }, 
          { currentTime: videoDuration, ease: "none" }, 
          0
        );
      }

      return () => {};
    });

  }, { scope: containerRef, dependencies: [videoLoaded] });

  return (
    <section ref={containerRef} className="relative bg-black w-full">
      <div 
        ref={pinWrapperRef} 
        className="relative h-[100svh] w-full flex items-center justify-center perspective-[1000px] overflow-hidden"
      >
        
        {/* LAYER 0: Background Plate */}
        <div ref={bgRef} className="absolute inset-0 z-0 origin-center">
          <Image 
            src="/assets/statement/premium-warm-bg.jpg" 
            alt="Warm Studio Background" 
            fill 
            className="object-cover opacity-80" 
            priority 
          />
        </div>

        {/* LAYER 1: Typography */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none pb-20">
           <h2 ref={textHideRef} className="absolute text-[15vw] md:text-[12vw] font-display font-black text-white/20 leading-[0.8] tracking-tighter text-center uppercase mix-blend-overlay drop-shadow-2xl">
             Nothing<br/>To Hide.
           </h2>
           <h2 ref={textFruitRef} className="absolute text-[12vw] md:text-[10vw] font-display font-bold text-white/90 leading-[0.8] tracking-tighter text-center uppercase drop-shadow-2xl">
             Real<br/><span className="text-mango-500">Fruit.</span>
           </h2>
           <h2 ref={textFinalRef} className="absolute text-[12vw] md:text-[10vw] font-display font-bold text-white/90 leading-[0.8] tracking-tighter text-center uppercase drop-shadow-2xl">
             100%<br/><span className="text-mango-500">Juice.</span>
           </h2>
        </div>

        {/* LAYER 2: Foreground Fruit */}
        <div ref={mangoRef} className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center pt-10">
          <div className="relative w-[100vw] h-[100vh] max-w-[1200px]">
            <Image 
              src="/assets/statement/real-mango-slices.png" 
              alt="Floating Mango Slices" 
              fill 
              className="object-contain drop-shadow-2xl" 
            />
          </div>
        </div>

        {/* LAYER 3-6: PRODUCT BOTTLE ASSEMBLY */}
        <div ref={bottleContainerRef} className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center pt-20">
          
          {/* Base: Empty frosted glass */}
          <div ref={bottleEmptyRef} className="absolute w-[45vh] h-[75vh] md:w-[30vw] md:h-[80vh] max-w-[500px] max-h-[800px]">
            <Image src="/assets/hero/product/nf-hero-bottle-main.png" alt="Empty Glass Bottle" fill className="object-contain" priority />
          </div>

          {/* Fill: Actual bottle */}
          <div ref={bottleFillRef} className="absolute w-[45vh] h-[75vh] md:w-[30vw] md:h-[80vh] max-w-[500px] max-h-[800px]">
            <Image src="/assets/hero/product/nf-hero-bottle-main.png" alt="Filled Bottle" fill className="object-contain" priority />
            
            {/* Label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[60%] h-[40%] transform -translate-y-[5%]">
                <Image src="/assets/hero/product/nf-real-label.svg" alt="No Filter Label" fill className="object-contain drop-shadow-xl" priority />
              </div>
            </div>
            
            {/* Condensation */}
            <Image 
              src="/assets/hero/textures/nf-condensation-overlay.jpg" 
              alt="Bottle Highlights" 
              fill
              className="object-contain mix-blend-screen opacity-50"
              style={{ maskImage: "url(/assets/hero/product/nf-hero-bottle-main.png)", maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center", WebkitMaskImage: "url(/assets/hero/product/nf-hero-bottle-main.png)", WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center" }}
            />
          </div>

          {/* VFX: Internal Liquid Motion (Using the cartoon video highly blurred and masked to simulate liquid) */}
          <div ref={videoMaskRef} className="absolute w-[45vh] h-[75vh] md:w-[30vw] md:h-[80vh] max-w-[500px] max-h-[800px] mix-blend-color-dodge mix-blend-plus-lighter pointer-events-none">
            <video 
              ref={videoRef}
              src="/create_some_animated_images.mp4"
              onLoadedMetadata={() => setVideoLoaded(true)}
              preload="metadata"
              muted 
              playsInline
              className="w-full h-full object-cover opacity-80"
              style={{ maskImage: "url(/assets/hero/product/nf-hero-bottle-main.png)", maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center", WebkitMaskImage: "url(/assets/hero/product/nf-hero-bottle-main.png)", WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center" }}
            />
          </div>

        </div>

        {/* LAYER 7: Transition Liquid Wipe */}
        <div ref={waveRef} className="absolute inset-0 z-[100] pointer-events-none flex items-center justify-center transform origin-bottom">
          <div className="relative w-[150vw] h-[150vh] md:w-[100vw] md:h-[100vh]">
            <Image 
              src="/assets/statement/liquid-wave-transition.png" 
              alt="Liquid Wave Transition" 
              fill 
              className="object-cover md:object-contain object-bottom drop-shadow-2xl" 
            />
          </div>
        </div>

      </div>
    </section>
  );
}
