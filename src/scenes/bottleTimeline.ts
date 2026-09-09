import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { canAnimate } from "../effects/accessibility";

gsap.registerPlugin(ScrollTrigger);

export function createBottleTimeline(
  bottle: HTMLElement,
  trigger: HTMLElement,
  options: {
    x?: number;
    rotate?: number;
    scale?: number;
  } = {}
): () => void {
  if (!canAnimate()) return () => {};

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top top",
        end: "bottom top",
        scrub: 1.1,
        pin: true,
        anticipatePin: 1
      }
    });

    tl.fromTo(
      bottle,
      { y: 80, rotate: -4, scale: 0.9, x: 0 },
      {
        y: 0,
        rotate: options.rotate ?? 12,
        scale: options.scale ?? 1,
        x: options.x ?? 0,
        duration: 0.45,
        ease: "none"
      }
    )
      .to(bottle, {
        rotate: -18,
        x: options.x ?? 30,
        duration: 0.3,
        ease: "none"
      })
      .to(bottle, {
        rotate: 28,
        scale: (options.scale ?? 1) * 1.05,
        x: (options.x ?? 30) * -0.4,
        duration: 0.25,
        ease: "none"
      })
      .to(bottle, {
        rotate: 0,
        scale: (options.scale ?? 1) * 1.14,
        x: 0,
        duration: 0.35,
        ease: "power2.out"
      });
  }, trigger);

  return () => ctx.revert();
}
