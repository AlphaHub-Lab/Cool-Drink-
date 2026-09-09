"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-background min-h-[calc(100vh-100px)] flex flex-col md:flex-row">
      
      {/* Left Side - Brand / Animation */}
      <div className="hidden md:flex w-1/2 bg-foreground text-background p-12 flex-col justify-between relative overflow-hidden rounded-r-[3rem]">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mango-500/20 blur-[100px] rounded-full z-0" />

        <div className="relative z-10">
          <Link href="/" className="font-display font-bold text-3xl">No Filter</Link>
        </div>

        <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-[12rem] relative"
          >
            🦥
            <motion.div 
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 text-6xl"
            >
              🍹
            </motion.div>
          </motion.div>
          
          <h2 className="text-4xl font-display font-bold mt-12 text-center">
            Welcome back to <br/><span className="text-mango-500">the jungle.</span>
          </h2>
        </div>

      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center bg-background">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full mx-auto"
        >
          <h1 className="text-4xl font-display font-bold mb-2">Sign In</h1>
          <p className="text-foreground/60 mb-8">Don&apos;t have an account? <Link href="/register" className="text-forest-500 font-bold hover:underline">Sign up</Link></p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Input Group */}
            <div className="relative group">
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border-2 border-foreground/10 rounded-2xl px-6 py-4 outline-none focus:border-forest-500 transition-colors peer"
                required
              />
              <label 
                htmlFor="email" 
                className={`absolute left-6 transition-all duration-200 pointer-events-none ${
                  email ? "-top-2.5 text-xs bg-background px-2 text-forest-500 font-bold" : "top-4 text-foreground/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-background peer-focus:px-2 peer-focus:text-forest-500 peer-focus:font-bold"
                }`}
              >
                Email Address
              </label>
            </div>

            {/* Input Group */}
            <div className="relative group">
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border-2 border-foreground/10 rounded-2xl px-6 py-4 outline-none focus:border-forest-500 transition-colors peer"
                required
              />
              <label 
                htmlFor="password" 
                className={`absolute left-6 transition-all duration-200 pointer-events-none ${
                  password ? "-top-2.5 text-xs bg-background px-2 text-forest-500 font-bold" : "top-4 text-foreground/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-background peer-focus:px-2 peer-focus:text-forest-500 peer-focus:font-bold"
                }`}
              >
                Password
              </label>
            </div>

            <div className="flex justify-end">
              <Link href="#" className="text-sm text-foreground/60 hover:text-foreground">Forgot password?</Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-foreground text-background font-bold py-4 rounded-2xl text-lg hover:bg-foreground/90 transition-colors"
            >
              Log In
            </motion.button>
          </form>

        </motion.div>
      </div>
    </div>
  );
}