"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const blindsRef = useRef<HTMLDivElement>(null);

  const columns = 5;
  const columnArray = Array.from({ length: columns });

  useGSAP(() => {
    if (!contentRef.current || !blindsRef.current) return;
    const blinds = blindsRef.current.children;

    if (children !== displayChildren) {
      // Exit Animation
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayChildren(children);
        }
      });

      tl.to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power3.inOut"
      }, 0);

      tl.fromTo(blinds, 
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.6,
          ease: "power3.inOut",
          stagger: 0.05
        }, 0
      );
    } else {
      // Enter Animation
      const tl = gsap.timeline();
      
      tl.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.inOut",
          delay: 0.2
        }, 0
      );

      tl.fromTo(blinds,
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 0.6,
          ease: "power3.inOut",
          stagger: 0.05
        }, 0
      );
    }
  }, { dependencies: [pathname, children, displayChildren], scope: containerRef });

  return (
    <div ref={containerRef} className="flex-grow flex flex-col w-full relative">
      {/* The Page Content */}
      <div ref={contentRef} className="flex-grow flex flex-col w-full opacity-0">
        {displayChildren}
      </div>

      {/* Transition Overlay Blinds */}
      <div ref={blindsRef} className="fixed inset-0 pointer-events-none z-[100] flex">
        {columnArray.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-full bg-mango-500 origin-top"
            style={{ transform: "scaleY(1)" }}
          />
        ))}
      </div>
    </div>
  );
}
