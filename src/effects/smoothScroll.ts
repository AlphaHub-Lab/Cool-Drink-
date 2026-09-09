import { destroySharedScroll, getLenis as sharedGetLenis, initSharedScroll } from "@/animations/registry";
import type Lenis from "lenis";

export function initSmoothScroll(): () => void {
  initSharedScroll();
  return destroySharedScroll;
}

export function getLenis(): Lenis | null {
  return sharedGetLenis();
}
