"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import Magnetic from "./ui/Magnetic";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const { openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Feedbacks", path: "/feedbacks" },
    { name: "Feed", path: "/feed" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navLinks={navLinks} />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-forest-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 left-0 right-0 z-50 py-4 bg-background/90 backdrop-blur-md border-b border-foreground/5 text-foreground"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Brand */}
          <Magnetic>
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-10 h-10 bg-mango-500 rounded-full flex items-center justify-center text-white text-xl overflow-hidden shadow-sm"
              >
                🦥
              </motion.div>
              <span className="font-display font-bold text-2xl tracking-tighter">No Filter</span>
            </Link>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Magnetic key={link.name}>
                <Link
                  href={link.path}
                  className="font-medium relative group px-2 py-1"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all group-hover:w-full"></span>
                </Link>
              </Magnetic>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Magnetic>
                <button className="p-2 hover:bg-foreground/5 rounded-full transition-colors flex items-center justify-center">
                  <Search size={20} />
                </button>
              </Magnetic>

              <Magnetic>
                <Link href="/profile" className="p-2 hover:bg-foreground/5 rounded-full transition-colors flex items-center justify-center">
                  <User size={20} />
                </Link>
              </Magnetic>
            </div>
            
            <Magnetic>
              <button onClick={openCart} className="relative p-2 hover:bg-foreground/5 rounded-full transition-colors flex items-center justify-center">
                <ShoppingCart size={20} />
                <span className="absolute top-0 right-0 w-4 h-4 bg-mango-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  2
                </span>
              </button>
            </Magnetic>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="md:hidden p-2 hover:bg-foreground/5 rounded-full transition-colors flex items-center justify-center"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>
      </motion.header>
    </>
  );
}
