"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ImageReveal({
  src,
  alt,
  className = "",
  delay = 0,
  children
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}) {
  const container = useRef(null);
  
  // Create a slight parallax effect while scrolling
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={container} className={`relative overflow-hidden ${className}`}>
      {/* Wipe Reveal Mask */}
      <motion.div
        initial={{ y: "0%" }}
        whileInView={{ y: "-100%" }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-background z-20"
      />
      
      {/* Parallax Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
        />
      </motion.div>
      
      {/* Overlay Content */}
      {children && (
        <div className="absolute inset-0 z-30 pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
}
