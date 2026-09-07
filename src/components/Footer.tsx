"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Magnetic from "./ui/Magnetic";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  
  // Create the "unroll" effect by mapping the scroll progress of the footer container
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-150, 0]);

  return (
    <footer 
      ref={footerRef} 
      className="bg-foreground text-background relative h-[600px] md:h-[400px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-[600px] md:h-[400px] pt-20 pb-8 flex flex-col justify-between -z-10 bg-foreground"
        style={{ y }}
      >
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="col-span-1 md:col-span-5">
            <Magnetic>
              <Link href="/" className="font-display font-bold text-4xl tracking-tighter mb-6 inline-block hover:text-mango-500 transition-colors">
                No Filter
              </Link>
            </Magnetic>
            <p className="max-w-md text-background/80 mt-4 leading-relaxed text-lg mb-8">
              Relaxed, natural, and refreshingly honest. We believe juice should just be juice. No artificial colors, no added sugars, no filter.
            </p>
            
            <form className="flex gap-2 max-w-md">
              <input type="email" placeholder="Join our newsletter" className="flex-grow bg-background/10 border-none rounded-full px-6 py-3 text-white outline-none focus:ring-2 focus:ring-mango-500 transition-shadow" />
              <button type="submit" className="bg-mango-500 text-foreground px-6 py-3 rounded-full font-bold hover:bg-white transition-colors">
                Subscribe
              </button>
            </form>
          </div>
          
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-display font-semibold text-xl mb-6 text-mango-500">Shop</h4>
            <ul className="space-y-4 text-background/80">
              <li><Magnetic><Link href="/shop" className="hover:text-white transition-colors inline-block">All Products</Link></Magnetic></li>
              <li><Magnetic><Link href="/shop/mango-madness" className="hover:text-white transition-colors inline-block">Mango Madness</Link></Magnetic></li>
              <li><Magnetic><Link href="/shop/raspberry-rush" className="hover:text-white transition-colors inline-block">Raspberry Rush</Link></Magnetic></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display font-semibold text-xl mb-6 text-forest-500">Company</h4>
            <ul className="space-y-4 text-background/80">
              <li><Magnetic><Link href="/about" className="hover:text-white transition-colors inline-block">About Us</Link></Magnetic></li>
              <li><Magnetic><Link href="/feed" className="hover:text-white transition-colors inline-block">The Feed</Link></Magnetic></li>
              <li><Magnetic><Link href="/contact" className="hover:text-white transition-colors inline-block">Contact</Link></Magnetic></li>
            </ul>
          </div>

        </div>
        
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between text-background/60 text-sm">
          <p>&copy; {new Date().getFullYear()} No Filter Juice Co. All rights reserved.</p>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <Magnetic><Link href="#" className="hover:text-white transition-colors">Instagram</Link></Magnetic>
            <Magnetic><Link href="#" className="hover:text-white transition-colors">Twitter</Link></Magnetic>
            <Magnetic><Link href="#" className="hover:text-white transition-colors">TikTok</Link></Magnetic>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
