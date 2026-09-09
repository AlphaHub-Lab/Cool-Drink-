"use client";

import Link from "next/link";
import { products } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#0A0E27] text-white border-t border-white/5">
      <div className="max-w-[1800px] mx-auto px-6 md:px-16 py-20 md:py-24">
        <div className="flex flex-col md:flex-row justify-between gap-16">
          
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="font-condensed text-4xl md:text-5xl text-white block mb-6 hover:text-mango-500 transition-colors duration-300">
              NO FILTER
            </Link>
            <p className="text-white/30 text-sm font-sans leading-relaxed">
              Relaxed, natural, and refreshingly honest. We believe juice should just be juice. No artificial colors, no added sugars, no filter.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16 md:gap-24">
            <div>
              <h4 className="text-white/20 text-[10px] tracking-[0.3em] uppercase font-sans mb-6">Shop</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/shop" className="text-white/40 text-sm font-sans hover:text-white transition-colors duration-300">
                    All Products
                  </Link>
                </li>
                {products.map((p) => (
                  <li key={p.id}>
                    <Link href={`/shop/${p.id}`} className="text-white/40 text-sm font-sans hover:text-white transition-colors duration-300">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/20 text-[10px] tracking-[0.3em] uppercase font-sans mb-6">Company</h4>
              <ul className="space-y-3">
                {[
                  { label: "About", href: "/about" },
                  { label: "Gallery", href: "/gallery" },
                  { label: "The Feed", href: "/feed" },
                  { label: "Contact", href: "/contact" },
                  { label: "Feedback", href: "/feedbacks" },
                ].map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-white/40 text-sm font-sans hover:text-white transition-colors duration-300">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase font-sans">
            © {new Date().getFullYear()} No Filter Juice Co. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Instagram","Twitter","TikTok"].map(s => (
              <Link key={s} href="#" className="text-white/20 text-[10px] tracking-[0.2em] uppercase font-sans hover:text-white/60 transition-colors duration-300">
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
