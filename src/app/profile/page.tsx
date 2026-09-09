"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Settings, LogOut, ChevronRight, MessageSquareHeart } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");

  // Feedback state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const tabs = [
    { id: "orders", label: "Order History", icon: Package },
    { id: "settings", label: "Account Settings", icon: Settings },
    { id: "feedback", label: "Leave Feedback", icon: MessageSquareHeart },
  ];

  const orders = [
    { id: "ORD-1234", date: "Oct 12, 2026", status: "Delivered", total: "$24.50", items: ["Mango Madness (x2)", "Forest Blend (x1)"] },
    { id: "ORD-1192", date: "Sep 28, 2026", status: "Delivered", total: "$17.00", items: ["Raspberry Rush (x2)"] },
  ];

  // Determine sloth expression based on rating
  const currentRating = hoverRating || rating;
  let slothEmoji = "🦥";
  let slothColor = "bg-foreground/10";
  let message = "How was it?";

  if (currentRating === 1) {
    slothEmoji = "😠";
    slothColor = "bg-raspberry-500/20";
    message = "Oh no, what happened?";
  } else if (currentRating === 2) {
    slothEmoji = "🙁";
    slothColor = "bg-raspberry-500/10";
    message = "Not great, huh?";
  } else if (currentRating === 3) {
    slothEmoji = "😐";
    slothColor = "bg-mango-500/20";
    message = "It was alright.";
  } else if (currentRating === 4) {
    slothEmoji = "🙂";
    slothColor = "bg-forest-500/20";
    message = "Pretty good!";
  } else if (currentRating === 5) {
    slothEmoji = "🤩";
    slothColor = "bg-forest-500/40";
    message = "Absolutely incredible!";
  }

  return (
    <div className="bg-background min-h-[calc(100vh-100px)] pt-12 pb-32">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3 space-y-8">
            {/* User Info */}
            <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col items-center text-center border border-foreground/5">
              <div className="w-24 h-24 bg-mango-500 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner">
                🐒
              </div>
              <h2 className="text-2xl font-display font-bold">Jane Doe</h2>
              <p className="text-foreground/60">jane.doe@example.com</p>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex flex-col gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-colors relative w-full text-left ${
                      isActive ? "text-white" : "text-foreground hover:bg-white/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-forest-500 rounded-2xl z-0"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <Icon className="relative z-10" size={20} />
                    <span className="font-bold relative z-10">{tab.label}</span>
                  </button>
                );
              })}
              
              <button className="flex items-center gap-4 px-6 py-4 rounded-2xl transition-colors w-full text-left text-raspberry-500 hover:bg-raspberry-500/10 mt-8">
                <LogOut size={20} />
                <span className="font-bold">Log Out</span>
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="w-full md:w-2/3">
            <AnimatePresence mode="wait">
              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-foreground/5"
                >
                  <h3 className="text-3xl font-display font-bold mb-8">Order History</h3>
                  
                  <div className="space-y-6">
                    {orders.map((order, i) => (
                      <motion.div 
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border-2 border-foreground/5 rounded-2xl p-6 hover:border-forest-500/30 transition-colors group cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-bold text-lg">{order.id}</p>
                            <p className="text-foreground/60 text-sm">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{order.total}</p>
                            <p className="text-forest-500 font-bold text-sm bg-forest-500/10 px-2 py-1 rounded-full">{order.status}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm text-foreground/70">
                          <p>{order.items.join(", ")}</p>
                          <ChevronRight className="text-foreground/30 group-hover:text-forest-500 transition-colors" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-foreground/5"
                >
                  <h3 className="text-3xl font-display font-bold mb-8">Account Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-foreground/70 mb-2">Full Name</label>
                      <input type="text" defaultValue="Jane Doe" className="w-full bg-background border-2 border-foreground/10 rounded-xl px-4 py-3 outline-none focus:border-forest-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-foreground/70 mb-2">Email Address</label>
                      <input type="email" defaultValue="jane.doe@example.com" className="w-full bg-background border-2 border-foreground/10 rounded-xl px-4 py-3 outline-none focus:border-forest-500" />
                    </div>
                    <button className="bg-forest-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-forest-500/90 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === "feedback" && (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-foreground/5 flex flex-col items-center text-center"
                >
                  <h3 className="text-3xl font-display font-bold mb-4">Leave Feedback</h3>
                  <p className="text-foreground/60 mb-8 max-w-sm">
                    Tell us what you think. Your raw feedback helps us keep the juice fresh.
                  </p>

                  {/* Animated Mascot Feedback */}
                  <motion.div 
                    layout
                    className={`w-32 h-32 md:w-48 md:h-48 rounded-full ${slothColor} flex items-center justify-center text-5xl md:text-7xl mb-8 transition-colors duration-300 shadow-inner`}
                  >
                    <motion.div
                      key={slothEmoji}
                      initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {slothEmoji}
                    </motion.div>
                  </motion.div>

                  <h2 className="text-2xl font-bold mb-8 h-8">{message}</h2>

                  {/* Interactive Rating System */}
                  <div className="flex gap-4 mb-12">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`text-4xl md:text-5xl transition-colors duration-200 ${
                          (hoverRating || rating) >= star ? "text-mango-500 filter drop-shadow-md" : "text-foreground/20 grayscale"
                        }`}
                      >
                        ⭐
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: rating > 0 ? 1 : 0, height: rating > 0 ? "auto" : 0 }}
                    className="w-full overflow-hidden"
                  >
                    <textarea 
                      rows={4}
                      placeholder="Tell us more about your experience..."
                      className="w-full bg-background border-2 border-foreground/10 rounded-2xl px-6 py-4 outline-none focus:border-forest-500 transition-colors resize-none mb-6"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-forest-500 text-white font-bold py-4 rounded-2xl text-lg hover:bg-forest-500/90 transition-colors shadow-lg"
                    >
                      Submit Feedback
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}