/** Progressive enhancement: content stays visible if motion never starts. */
export const VISIBLE_BASE = {
  opacity: 1,
  visibility: "visible" as const,
  transform: "none",
};

export function ensureVisible(el: HTMLElement | null) {
  if (!el) return;
  el.style.opacity = "1";
  el.style.visibility = "visible";
  el.style.transform = "none";
  el.style.filter = "none";
  el.style.clipPath = "none";
}
