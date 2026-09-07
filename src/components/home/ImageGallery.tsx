"use client";

import { motion } from "framer-motion";

export default function ImageGallery() {
  const images = [
    { src: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&q=80", span: "col-span-12 md:col-span-8", height: "h-[400px]" },
    { src: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800&q=80", span: "col-span-12 md:col-span-4", height: "h-[400px]" },
    { src: "https://images.unsplash.com/photo-1546173159-315724a31696?w=800&q=80", span: "col-span-12 md:col-span-4", height: "h-[600px]" },
    { src: "https://images.unsplash.com/photo-1596700020165-2244a0441a9f?w=800&q=80", span: "col-span-12 md:col-span-4", height: "h-[600px]" },
    { src: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=800&q=80", span: "col-span-12 md:col-span-4", height: "h-[600px]" },
    { src: "https://images.unsplash.com/photo-1517482811403-2415d86248cc?w=800&q=80", span: "col-span-12", height: "h-[500px]" },
  ];

  return (
    <section className="py-32 bg-background relative z-20">
      <div className="container mx-auto px-6">
        
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground"
          >
            The Juice<br/>
            <span className="text-foreground/40">Journal.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`${img.span} ${img.height} relative overflow-hidden rounded-[2rem] group cursor-none`}
            >
              {/* Custom Cursor Text (CSS implementation for simplicity) */}
              <div className="absolute inset-0 z-20 hidden group-hover:flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm tracking-widest uppercase shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-500 delay-100">
                  View
                </span>
              </div>
              
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors z-10" />
              
              <motion.img 
                src={img.src}
                alt="Brand Photography"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
