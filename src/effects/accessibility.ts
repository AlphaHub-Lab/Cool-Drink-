export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function canAnimate(): boolean {
  return typeof window !== "undefined" && !prefersReducedMotion();
}
