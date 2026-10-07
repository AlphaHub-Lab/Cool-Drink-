"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { openCart, itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Feed", path: "/feed" },
    { name: "Feedbacks", path: "/feedbacks" },
    { name: "Contact", path: "/contact" },
  ];

  const homeOverlay = pathname === "/";

  return (
    <>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navLinks={navLinks} />

      <header className={`fixed top-0 left-0 right-0 z-[70] py-4 sm:py-5 px-4 sm:px-6 md:px-12 text-white ${homeOverlay ? "bg-black/25 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none" : "bg-[#0A0E27]/95 backdrop-blur-md"}`}>
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <Link href="/" className="text-xs tracking-[0.3em] uppercase font-sans font-light text-white/90 hover:text-white transition-colors">
            No Filter
          </Link>
          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-[10px] lg:text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-300 ${
                  pathname === link.path ? "text-mango-500 font-bold" : "text-white/60 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={openCart} 
              aria-label="Open Shopping Cart"
              className="relative w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <ShoppingCart size={18} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-mango-500 text-[9px] text-white flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
              className="md:hidden w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
