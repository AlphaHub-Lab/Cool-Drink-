"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Search, User } from "lucide-react";
import Magnetic from "./ui/Magnetic";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; path: string }[];
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  
  const menuVariants = {
    closed: { y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } },
    open: { y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } }
  };

  const linkVariants = {
    closed: { y: 50, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: "easeOut" as const }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-[200] bg-mango-500 text-white overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 flex justify-between items-center border-b border-white/10">
            <Link href="/" onClick={onClose} className="font-display font-bold text-2xl tracking-tighter">
              No Filter
            </Link>
            <button 
              onClick={onClose}
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-mango-500 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links */}
          <div className="flex-grow flex flex-col justify-center px-6 gap-6">
            {navLinks.map((link, i) => (
              <motion.div custom={i} variants={linkVariants} key={link.name} className="overflow-hidden">
                <Link 
                  href={link.path} 
                  onClick={onClose}
                  className="text-6xl sm:text-7xl font-display font-bold hover:text-foreground transition-colors inline-block tracking-tighter uppercase"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-6 border-t border-white/10 flex justify-between items-center"
          >
            <div className="flex gap-4">
              <Link href="/search" onClick={onClose} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-mango-500 transition-colors">
                <Search size={20} />
              </Link>
              <Link href="/profile" onClick={onClose} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-mango-500 transition-colors">
                <User size={20} />
              </Link>
            </div>
            
            <Magnetic pullRange={15}>
              <Link href="/shop" onClick={onClose}>
                <button className="bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase shadow-xl hover:scale-105 transition-transform">
                  Shop All
                </button>
              </Link>
            </Magnetic>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
