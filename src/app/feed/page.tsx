"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FeedPage() {
  const posts = [
    { type: "image", src: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800", height: "h-[400px]", text: "Behind the scenes at our canopy harvest. #NoFilter" },
    { type: "image", src: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800", height: "h-[300px]", text: "Fresh pressed citrus. The monkeys approve. 🐒" },
    { type: "quote", height: "h-[300px]", text: "Perfection takes a nap. - The Sloth Philosophy", bg: "bg-mango-500" },
    { type: "image", src: "https://images.unsplash.com/photo-1546173159-315724a31696?w=800", height: "h-[500px]", text: "New Forest Blend dropping soon. Stay wild." },
    { type: "image", src: "https://images.unsplash.com/photo-1596700020165-2244a0441a9f?w=800", height: "h-[400px]", text: "Weekend essentials." },
    { type: "quote", height: "h-[400px]", text: "100% Real Fruit. 0% BS.", bg: "bg-raspberry-500" },
    { type: "image", src: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=800", height: "h-[500px]", text: "Morning rituals." },
    { type: "image", src: "https://images.unsplash.com/photo-1517482811403-2415d86248cc?w=800", height: "h-[300px]", text: "Stay hydrated, stay relaxed." }
  ];

  return (
    <div className="pt-32 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-6">
        
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-bold mb-6 text-foreground"
          >
            The Feed.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-foreground/70"
          >
            A visual journal of our lifestyle, behind-the-scenes, and everything wild.
          </motion.p>
        </div>

        {/* Masonry Layout using CSS columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid relative rounded-[2rem] overflow-hidden group"
            >
              {post.type === "image" ? (
                <div className={`relative ${post.height} w-full`}>
                  <Image src={post.src!} alt="Feed post" fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                    <p className="text-white font-bold text-lg text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {post.text}
                    </p>
                  </div>
                </div>
              ) : (
                <div className={`${post.bg} ${post.height} w-full p-12 flex flex-col items-center justify-center text-center`}>
                  <div className="text-6xl mb-4 text-white/50">&quot;</div>
                  <h3 className="text-3xl font-display font-bold text-white leading-tight">
                    {post.text}
                  </h3>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
