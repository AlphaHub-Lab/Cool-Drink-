import { gsap } from "gsap";
import { canAnimate } from "./accessibility";

export interface LiquidWipeOptions {
  color?: string;
  duration?: number;
}

export function initLiquidWipe(
  selector = "[data-nf-liquid-wipe]",
  options: LiquidWipeOptions = {}
): () => void {
  const overlays = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!overlays.length) return () => {};

  const color = options.color ?? "currentColor";
  const duration = options.duration ?? 0.9;

  overlays.forEach((el) => {
    el.style.pointerEvents = "none";
    el.style.background = color;
    el.style.clipPath = "ellipse(0% 0% at 50% 100%)";
    el.style.opacity = "0";
  });

  if (!canAnimate()) return () => {};

  const handlers: Array<() => void> = [];

  overlays.forEach((el) => {
    const reveal = () => {
      el.style.opacity = "1";
      gsap.fromTo(
        el,
        { clipPath: "ellipse(0% 0% at 50% 100%)" },
        {
          clipPath: "ellipse(150% 150% at 50% 100%)",
          duration,
          ease: "power4.inOut"
        }
      );
    };

    const reset = () => {
      gsap.to(el, {
        clipPath: "ellipse(0% 0% at 50% 100%)",
        duration: duration * 0.7,
        ease: "power3.inOut",
        onComplete: () => (el.style.opacity = "0")
      });
    };

    el.addEventListener("mouseenter", reveal);
    el.addEventListener("mouseleave", reset);
    handlers.push(() => {
      el.removeEventListener("mouseenter", reveal);
      el.removeEventListener("mouseleave", reset);
    });
  });

  return () => handlers.forEach((fn) => fn());
}
