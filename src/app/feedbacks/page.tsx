"use client";

import { motion } from "framer-motion";

export default function FeedbacksPage() {
  const reviews = [
    { name: "Alex M.", rating: 5, emoji: "🤩", text: "Literally the best juice I've ever had. Mango Madness completely ruined regular juice for me. I can't go back.", color: "bg-mango-500/10", border: "border-mango-500/30" },
    { name: "Sarah K.", rating: 5, emoji: "🤩", text: "The pulp is intense but so good. You can tell they don't filter anything out.", color: "bg-forest-500/10", border: "border-forest-500/30" },
    { name: "Jordan T.", rating: 4, emoji: "🙂", text: "Really fresh. Grape Galaxy was a bit too tart for me, but my girlfriend loved it.", color: "bg-purple-500/10", border: "border-purple-500/30" },
    { name: "Mike R.", rating: 5, emoji: "🤩", text: "Finally a juice brand that isn't just sugar water. The cold press difference is real.", color: "bg-raspberry-500/10", border: "border-raspberry-500/30" },
    { name: "Elena V.", rating: 3, emoji: "😐", text: "Good juice, but the bottle is so nice I feel bad throwing it away. Wish there was a refill program.", color: "bg-foreground/5", border: "border-foreground/10" },
    { name: "David L.", rating: 5, emoji: "🤩", text: "Pineapple Punch hits different on a Monday morning. Pure electricity.", color: "bg-yellow-500/10", border: "border-yellow-500/30" },
  ];

  return (
    <div className="bg-background min-h-[calc(100vh-100px)] pt-12 pb-32 overflow-hidden">
      
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-24 relative">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-display font-bold text-foreground mb-6 tracking-tighter"
        >
          WALL OF <span className="text-mango-500">LOVE.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-foreground/70 max-w-2xl mx-auto font-medium"
        >
          No filters. No paid actors. Just raw feedback from people who drink our juice.
        </motion.p>
      </div>

      {/* Reviews Grid */}
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-[2rem] border ${review.border} ${review.color} backdrop-blur-sm relative group cursor-default shadow-sm hover:shadow-xl transition-all`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{review.name}</span>
                  <div className="flex text-mango-500 text-sm">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span key={idx} className={idx < review.rating ? "opacity-100" : "opacity-30 grayscale"}>⭐</span>
                    ))}
                  </div>
                </div>
                <motion.div 
                  className="text-5xl drop-shadow-md origin-bottom"
                  whileHover={{ rotate: [-10, 10, -10], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {review.emoji}
                </motion.div>
              </div>
              <p className="text-foreground/80 font-medium leading-relaxed">
                "{review.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
