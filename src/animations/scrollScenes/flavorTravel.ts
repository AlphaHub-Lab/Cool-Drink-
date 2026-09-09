import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapOnce } from "@/animations/registry";

registerGsapOnce();

export function createFlavorTravel(options: {
  section: HTMLElement;
  subject: HTMLElement;
  reveal: HTMLElement;
  direction: "ltr" | "rtl";
  drift?: boolean;
}): () => void {
  const { section, subject, reveal, direction, drift } = options;
  const fromX = direction === "ltr" ? "-42vw" : "42vw";
  const toX = direction === "ltr" ? "8vw" : "-8vw";

  const ctx = gsap.context(() => {
    gsap.fromTo(
      subject,
      { x: fromX, y: drift ? -24 : 0 },
      {
        x: toX,
        y: drift ? 18 : 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center center",
          scrub: 1.1,
        },
      }
    );

    if (drift) {
      gsap.to(subject, {
        rotate: 3,
        yoyo: true,
        repeat: -1,
        duration: 3.2,
        ease: "sine.inOut",
      });
    }

    gsap.fromTo(
      reveal,
      { y: 24 },
      {
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 55%",
          end: "center center",
          scrub: 0.8,
        },
      }
    );
  }, section);

  return () => ctx.revert();
}

export { ScrollTrigger };
