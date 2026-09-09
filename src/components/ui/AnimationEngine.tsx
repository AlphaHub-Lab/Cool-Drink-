"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AnimationEngine() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis and GSAP ticker sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP ticker
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    
    // Disable GSAP's lag smoothing to prevent conflicts with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Data attribute animations on route change
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    // Wait for DOM to paint
    timers.push(setTimeout(() => {
      ScrollTrigger.refresh();

      // data-nf-reveal="up|left|right"
      const reveals = document.querySelectorAll('[data-nf-reveal]');
      reveals.forEach((el) => {
        const direction = el.getAttribute('data-nf-reveal');
        let y = 0;
        let x = 0;
        if (direction === 'up') y = 50;
        if (direction === 'left') x = -50;
        if (direction === 'right') x = 50;
        
        gsap.fromTo(el, 
          { opacity: 0, x, y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // data-nf-parallax="20"
      const parallaxes = document.querySelectorAll('[data-nf-parallax]');
      parallaxes.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-nf-parallax') || '20');
        gsap.to(el, {
          y: -speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // data-nf-video-scrub
      const scrubHolders = document.querySelectorAll('[data-nf-video-scrub-holder]');
      scrubHolders.forEach((holder) => {
        const video = holder.querySelector('video[data-nf-video-scrub]') as HTMLVideoElement;
        if (video) {
          const setupScrub = () => {
            gsap.fromTo(video, 
              { currentTime: 0 },
              {
                currentTime: video.duration || 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: holder,
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: true,
                }
              }
            );
          };
          if (video.readyState >= 1) {
            setupScrub();
          } else {
            video.addEventListener('loadedmetadata', setupScrub);
          }
        }
      });
      
    }, 100));

    return () => {
      timers.forEach(clearTimeout);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [pathname]);

  // Magnetic effect logic
  useEffect(() => {
    const magnetics = document.querySelectorAll('[data-nf-magnetic]');
    const cleanups: (() => void)[] = [];

    magnetics.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const strength = parseFloat(el.getAttribute('data-nf-magnetic') || '0.25');
      
      const xTo = gsap.quickTo(el, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
      const yTo = gsap.quickTo(el, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

      const onMouseMove = (e: MouseEvent) => {
        const rect = htmlEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        
        xTo(deltaX);
        yTo(deltaY);
      };

      const onMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      htmlEl.addEventListener('mousemove', onMouseMove);
      htmlEl.addEventListener('mouseleave', onMouseLeave);

      cleanups.push(() => {
        htmlEl.removeEventListener('mousemove', onMouseMove);
        htmlEl.removeEventListener('mouseleave', onMouseLeave);
      });
    });

    return () => {
      cleanups.forEach(c => c());
    };
  }, [pathname]);

  return null;
}
