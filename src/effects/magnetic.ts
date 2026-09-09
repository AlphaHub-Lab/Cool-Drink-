import { gsap } from "gsap";
import { canAnimate } from "./accessibility";

export function initMagnetic(scope: Element | Document = document): () => void {
  if (!canAnimate() || !window.matchMedia("(pointer:fine)").matches) return () => {};

  const cleanups: Array<() => void> = [];

  scope.querySelectorAll<HTMLElement>("[data-nf-magnetic]").forEach((el) => {
    const strength = Number(el.dataset.nfMagnetic || 0.25);

    const move = (event: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((event.clientX - r.left) / r.width - 0.5) * r.width;
      const y = ((event.clientY - r.top) / r.height - 0.5) * r.height;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.35,
        ease: "power3.out",
        overwrite: true
      });
    };

    const leave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)"
      });
    };

    el.addEventListener("mousemove", move, { passive: true });
    el.addEventListener("mouseleave", leave);

    cleanups.push(() => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      gsap.killTweensOf(el);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
