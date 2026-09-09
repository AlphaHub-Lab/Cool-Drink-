"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ENGINE_TRIGGER,
  initSharedScroll,
  killEngineTriggers,
  registerGsapOnce,
} from "@/animations/registry";

export default function AnimationEngine() {
  const pathname = usePathname();

  useEffect(() => {
    registerGsapOnce();
    const stop = initSharedScroll();
    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    registerGsapOnce();
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();

      document.querySelectorAll<HTMLElement>("[data-nf-reveal]").forEach((el) => {
        const direction = el.getAttribute("data-nf-reveal");
        let y = 0;
        let x = 0;
        if (direction === "up") y = 50;
        if (direction === "left") x = -50;
        if (direction === "right") x = 50;

        gsap.fromTo(
          el,
          { opacity: 1, x, y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              id: `${ENGINE_TRIGGER}-reveal`,
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      document.querySelectorAll<HTMLElement>("[data-nf-parallax]").forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-nf-parallax") || "20");
        gsap.to(el, {
          y: -speed,
          ease: "none",
          scrollTrigger: {
            id: `${ENGINE_TRIGGER}-parallax`,
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      document.querySelectorAll("[data-nf-video-scrub-holder]").forEach((holder) => {
        const video = holder.querySelector("video[data-nf-video-scrub]") as HTMLVideoElement | null;
        if (!video) return;
        const setupScrub = () => {
          gsap.fromTo(
            video,
            { currentTime: 0 },
            {
              currentTime: video.duration || 1,
              ease: "none",
              scrollTrigger: {
                id: `${ENGINE_TRIGGER}-scrub`,
                trigger: holder,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );
        };
        if (video.readyState >= 1) setupScrub();
        else video.addEventListener("loadedmetadata", setupScrub, { once: true });
      });
    }, 100);

    return () => {
      window.clearTimeout(timer);
      killEngineTriggers();
    };
  }, [pathname]);

  useEffect(() => {
    const magnetics = document.querySelectorAll("[data-nf-magnetic]");
    const cleanups: (() => void)[] = [];

    magnetics.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const strength = parseFloat(el.getAttribute("data-nf-magnetic") || "0.25");
      const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

      const onMouseMove = (e: MouseEvent) => {
        const rect = htmlEl.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const onMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      htmlEl.addEventListener("mousemove", onMouseMove);
      htmlEl.addEventListener("mouseleave", onMouseLeave);
      cleanups.push(() => {
        htmlEl.removeEventListener("mousemove", onMouseMove);
        htmlEl.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, [pathname]);

  return null;
}
