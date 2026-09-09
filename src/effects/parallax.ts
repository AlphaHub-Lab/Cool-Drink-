import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { canAnimate } from "./accessibility";

gsap.registerPlugin(ScrollTrigger);

export function initParallax(scope: Element | Document = document): () => void {
  if (!canAnimate()) return () => {};

  const triggers: ScrollTrigger[] = [];

  scope.querySelectorAll<HTMLElement>("[data-nf-parallax]").forEach((el) => {
    const amount = Number(el.dataset.nfParallax || 30);

    const tween = gsap.to(el, {
      yPercent: -amount,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  return () => triggers.forEach((t) => t.kill());
}
