"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; path: string }[];
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  
  const menuVariants = {
    closed: { clipPath: "circle(0% at calc(100% - 40px) 40px)", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } },
    open: { clipPath: "circle(150% at calc(100% - 40px) 40px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } }
  };

  const linkVariants = {
    closed: { y: 40, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
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
          className="fixed inset-0 z-[200] bg-[#0A0E27] text-white overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 flex justify-between items-center">
            <Link href="/" onClick={onClose} className="font-condensed text-3xl text-white">
              NO FILTER
            </Link>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Links */}
          <div className="flex-grow flex flex-col justify-center px-6 py-6 gap-2.5 sm:gap-4 overflow-y-auto">
            {navLinks.map((link, i) => (
              <motion.div custom={i} variants={linkVariants} key={link.name} className="overflow-hidden">
                <Link 
                  href={link.path} 
                  onClick={onClose}
                  className="font-condensed text-4xl sm:text-5xl md:text-6xl text-white/85 hover:text-mango-500 active:text-mango-400 transition-colors duration-300 inline-block"
                >
                  {link.name.toUpperCase()}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-6 border-t border-white/5 flex justify-between items-center"
          >
            <span className="text-white/20 text-[9px] tracking-[0.3em] uppercase font-sans">
              NF® {new Date().getFullYear()}
            </span>
            <Link href="/shop" onClick={onClose}>
              <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-sans border-b border-white/20 pb-1 hover:text-mango-500 hover:border-mango-500 transition-all">
                Shop All →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
