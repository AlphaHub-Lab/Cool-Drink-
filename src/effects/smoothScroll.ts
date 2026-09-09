import Lenis from "lenis";
import { gsap } from "gsap";
import { canAnimate } from "./accessibility";

let lenis: Lenis | null = null;
let rafId: number | null = null;

export function initSmoothScroll(): () => void {
  if (!canAnimate()) return () => {};

  lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    syncTouch: false
  });

  const update = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(update);
  };

  rafId = requestAnimationFrame(update);
  gsap.ticker.lagSmoothing(1000, 16);

  return () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
    lenis?.destroy();
    lenis = null;
  };
}

export function getLenis(): Lenis | null {
  return lenis;
}
