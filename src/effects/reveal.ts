import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { canAnimate } from "./accessibility";

gsap.registerPlugin(ScrollTrigger);

export function initReveal(scope: Element | Document = document): () => void {
  if (!canAnimate()) {
    scope.querySelectorAll("[data-nf-reveal]").forEach((el) => {
      (el as HTMLElement).style.opacity = "1";
      (el as HTMLElement).style.transform = "none";
    });
    return () => {};
  }

  const triggers: ScrollTrigger[] = [];

  scope.querySelectorAll<HTMLElement>("[data-nf-reveal]").forEach((el) => {
    const mode = el.dataset.nfReveal ?? "up";
    const from = mode === "left"
      ? { x: -60, opacity: 0 }
      : mode === "right"
        ? { x: 60, opacity: 0 }
        : { y: 70, opacity: 0 };

    const tween = gsap.fromTo(el, from, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1.0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        once: true
      }
    });

    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  return () => triggers.forEach((t) => t.kill());
}
