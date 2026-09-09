"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // On homepage, the hero has its own tiny nav overlay — hide the global nav
  if (pathname === "/") return (
    <>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navLinks={[
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "About", path: "/about" },
        { name: "Feedbacks", path: "/feedbacks" },
        { name: "Feed", path: "/feed" },
        { name: "Contact", path: "/contact" },
      ]} />
      {/* Floating mobile menu button only on homepage */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-5 right-5 z-[60] w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <Menu size={18} />
      </button>
    </>
  );

  // On other pages, use a minimal dark nav
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

      <header className="sticky top-0 left-0 right-0 z-50 py-5 px-6 md:px-12 bg-[#0A0E27]/95 backdrop-blur-md text-white">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <Link href="/" className="text-xs tracking-[0.3em] uppercase font-sans font-light text-white/80 hover:text-white transition-colors">
            No Filter
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-300 ${
                  pathname === link.path ? "text-mango-500" : "text-white/50 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={openCart} className="text-white/60 hover:text-white transition-colors">
              <ShoppingCart size={16} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white/60 hover:text-white transition-colors"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
