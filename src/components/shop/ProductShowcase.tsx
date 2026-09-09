"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Product } from "@/lib/data";

export default function ProductShowcase({ product }: { product: Product }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 12]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.06, 0.96]);

  return (
    <div ref={containerRef} className="h-[120vh] w-full relative bg-[#0A0E27]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className={`absolute w-[40vw] h-[40vw] rounded-full blur-[120px] ${product.color} opacity-30`} />
        <motion.div style={{ rotate, y, scale }} className="relative z-10 w-56 h-[28rem] md:w-72 md:h-[34rem]">
          <Image src={product.bottleSrc} alt={product.name} fill className="object-contain drop-shadow-2xl" priority />
        </motion.div>
      </div>
    </div>
  );
}
