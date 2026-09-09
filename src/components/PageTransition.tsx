"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const blindsRef = useRef<HTMLDivElement>(null);

  const columns = 5;
  const columnArray = Array.from({ length: columns });

  useEffect(() => {
    // Only run transitions when navigating to a DIFFERENT route
    if (prevPathRef.current === pathname) {
      return;
    }
    prevPathRef.current = pathname;

    if (!contentRef.current || !blindsRef.current) return;
    const blinds = blindsRef.current.children;

    const tl = gsap.timeline();
    tl.fromTo(
      contentRef.current,
      { opacity: 0.6, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
    tl.fromTo(
      blinds,
      { scaleY: 1 },
      { scaleY: 0, duration: 0.4, ease: "power3.inOut", stagger: 0.03 },
      0
    );
  }, [pathname]);

  return (
    <div ref={containerRef} className="flex-grow flex flex-col w-full relative">
      {/* Page Content: ALWAYS directly visible, never hidden on re-renders */}
      <div ref={contentRef} className="flex-grow flex flex-col w-full">
        {children}
      </div>

      {/* Transition Overlay Blinds */}
      <div ref={blindsRef} className="fixed inset-0 pointer-events-none z-[100] flex">
        {columnArray.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-full bg-mango-500 origin-top"
            style={{ transform: "scaleY(0)" }}
          />
        ))}
      </div>
    </div>
  );
}
