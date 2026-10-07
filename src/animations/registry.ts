import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { canAnimate } from "@/effects/accessibility";

let pluginsReady = false;
let lenis: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;

let windowScrollHandler: (() => void) | null = null;

export function registerGsapOnce() {
  if (pluginsReady || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
  });
  pluginsReady = true;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function initSharedScroll(): () => void {
  registerGsapOnce();
  if (typeof window === "undefined") return () => {};
  if (lenis) return () => {};

  if (!canAnimate()) {
    return () => {};
  }

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  const onScroll = () => {
    ScrollTrigger.update();
  };

  lenis.on("scroll", onScroll);

  windowScrollHandler = () => {
    ScrollTrigger.update();
  };
  window.addEventListener("scroll", windowScrollHandler, { passive: true });

  tickerFn = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(500, 33);

  return destroySharedScroll;
}

export function destroySharedScroll() {
  if (windowScrollHandler) {
    window.removeEventListener("scroll", windowScrollHandler);
    windowScrollHandler = null;
  }
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  lenis?.destroy();
  lenis = null;
}

export const ENGINE_TRIGGER = "nf-engine";

export function killEngineTriggers() {
  ScrollTrigger.getAll().forEach((t) => {
    if (t.vars.id?.toString().startsWith(ENGINE_TRIGGER)) t.kill();
  });
}

