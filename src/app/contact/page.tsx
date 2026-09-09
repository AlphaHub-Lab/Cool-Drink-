"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <div className="bg-background min-h-[calc(100vh-100px)] pt-12 pb-32">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6"
          >
            Say <span className="text-mango-500">Hello</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-foreground/70 max-w-2xl mx-auto font-medium"
          >
            Whether you want to talk about juice, sloths, or just need someone to listen. We&apos;re here.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
          
          {/* Contact Info & Map */}
          <div className="w-full lg:w-1/2 space-y-12">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-foreground/5">
                <div className="w-12 h-12 bg-mango-500/10 text-mango-500 rounded-full flex items-center justify-center mb-4">
                  <Mail />
                </div>
                <h3 className="font-bold text-lg mb-1">Email Us</h3>
                <p className="text-foreground/60 text-sm">hello@nofilter.juice</p>
              </div>
              
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-foreground/5">
                <div className="w-12 h-12 bg-forest-500/10 text-forest-500 rounded-full flex items-center justify-center mb-4">
                  <MapPin />
                </div>
                <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                <p className="text-foreground/60 text-sm">123 Canopy Lane, Jungle City</p>
              </div>
            </div>

            {/* Stylized Animated Map Graphic */}
            <div className="w-full h-[300px] bg-forest-500 rounded-[3rem] relative overflow-hidden flex items-center justify-center shadow-inner">
              {/* Abstract Map Roads */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 150 Q 100 50, 200 150 T 400 150 T 600 150" stroke="white" strokeWidth="8" fill="transparent" />
                <path d="M150 0 L 150 300" stroke="white" strokeWidth="6" fill="transparent" strokeDasharray="10 10" />
              </svg>
              
              {/* Map Pin */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-6xl relative z-10"
              >
                📍
                <motion.div 
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full blur-sm -z-10"
                  animate={{ scale: [1, 0.6, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-foreground/5">
              <h2 className="text-3xl font-display font-bold mb-8">Send a message</h2>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                
                {/* Input Group */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-background border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-mango-500 transition-colors peer"
                    required
                  />
                  <label 
                    htmlFor="name" 
                    className={`absolute left-6 transition-all duration-200 pointer-events-none ${
                      formData.name ? "-top-2.5 text-xs bg-white px-2 text-mango-500 font-bold" : "top-4 text-foreground/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-mango-500 peer-focus:font-bold"
                    }`}
                  >
                    Your Name
                  </label>
                </div>

                {/* Input Group */}
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-background border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-mango-500 transition-colors peer"
                    required
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute left-6 transition-all duration-200 pointer-events-none ${
                      formData.email ? "-top-2.5 text-xs bg-white px-2 text-mango-500 font-bold" : "top-4 text-foreground/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-mango-500 peer-focus:font-bold"
                    }`}
                  >
                    Email Address
                  </label>
                </div>

                {/* Input Group (Textarea) */}
                <div className="relative group">
                  <textarea 
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-background border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-mango-500 transition-colors peer resize-none"
                    required
                  />
                  <label 
                    htmlFor="message" 
                    className={`absolute left-6 transition-all duration-200 pointer-events-none ${
                      formData.message ? "-top-2.5 text-xs bg-white px-2 text-mango-500 font-bold" : "top-4 text-foreground/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-mango-500 peer-focus:font-bold"
                    }`}
                  >
                    Your Message
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-mango-500 text-foreground font-bold py-4 rounded-2xl text-lg hover:bg-mango-500/90 transition-colors shadow-lg"
                >
                  Send Message
                </motion.button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}