import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { canAnimate } from "./accessibility";

gsap.registerPlugin(ScrollTrigger);

export function initVideoScrub(scope: Element | Document = document): () => void {
  const videos = Array.from(
    scope.querySelectorAll<HTMLVideoElement>("[data-nf-video-scrub]")
  );

  if (!videos.length) return () => {};
  if (!canAnimate()) {
    videos.forEach((v) => {
      v.currentTime = 0;
      void v.play().catch(() => {});
    });
    return () => {};
  }

  const triggers: ScrollTrigger[] = [];

  videos.forEach((video) => {
    const setup = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      video.pause();

      const holder = video.closest<HTMLElement>("[data-nf-video-scrub-holder]") ?? video;

      const trigger = ScrollTrigger.create({
        trigger: holder,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const target = duration * self.progress;
          if (Math.abs(video.currentTime - target) > 0.03) {
            video.currentTime = target;
          }
        }
      });

      triggers.push(trigger);
    };

    if (video.readyState >= 1) setup();
    else video.addEventListener("loadedmetadata", setup, { once: true });
  });

  return () => triggers.forEach((t) => t.kill());
}
