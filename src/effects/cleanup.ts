import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function killNoFilterAnimations(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf("*");
}
