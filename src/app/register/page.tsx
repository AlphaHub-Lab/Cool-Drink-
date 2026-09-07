"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Check, X } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [step, setStep] = useState(1);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (step === 1 && formData.name && formData.email) setStep(2);
  };

  const isPasswordValid = formData.password.length >= 8;

  return (
    <div className="bg-background min-h-[calc(100vh-100px)] flex flex-col md:flex-row-reverse">
      
      {/* Right Side - Brand / Animation */}
      <div className="hidden md:flex w-1/2 bg-forest-500 text-white p-12 flex-col justify-between relative overflow-hidden rounded-l-[3rem]">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mango-500/30 blur-[100px] rounded-full z-0" />

        <div className="relative z-10 text-right">
          <Link href="/" className="font-display font-bold text-3xl">No Filter</Link>
        </div>

        <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-[12rem] relative"
          >
            🐒
            <motion.div 
              animate={{ rotate: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-8 text-6xl"
            >
              🍌
            </motion.div>
          </motion.div>
          
          <h2 className="text-4xl font-display font-bold mt-12 text-center">
            Join the <br/><span className="text-mango-500">troop.</span>
          </h2>
        </div>

      </div>

      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center bg-background">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full mx-auto"
        >
          <h1 className="text-4xl font-display font-bold mb-2">Sign Up</h1>
          <p className="text-foreground/60 mb-8">Already have an account? <Link href="/login" className="text-forest-500 font-bold hover:underline">Log in</Link></p>

          {/* Progress Indicators */}
          <div className="flex gap-2 mb-8">
            <div className={`h-2 rounded-full flex-1 transition-colors ${step >= 1 ? 'bg-forest-500' : 'bg-foreground/10'}`} />
            <div className={`h-2 rounded-full flex-1 transition-colors ${step >= 2 ? 'bg-forest-500' : 'bg-foreground/10'}`} />
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {step === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Input Group */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border-2 border-foreground/10 rounded-2xl px-6 py-4 outline-none focus:border-forest-500 transition-colors peer"
                    required
                  />
                  <label 
                    htmlFor="name" 
                    className={`absolute left-6 transition-all duration-200 pointer-events-none ${
                      formData.name ? "-top-2.5 text-xs bg-background px-2 text-forest-500 font-bold" : "top-4 text-foreground/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-background peer-focus:px-2 peer-focus:text-forest-500 peer-focus:font-bold"
                    }`}
                  >
                    Full Name
                  </label>
                </div>

                {/* Input Group */}
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white border-2 border-foreground/10 rounded-2xl px-6 py-4 outline-none focus:border-forest-500 transition-colors peer"
                    required
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute left-6 transition-all duration-200 pointer-events-none ${
                      formData.email ? "-top-2.5 text-xs bg-background px-2 text-forest-500 font-bold" : "top-4 text-foreground/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-background peer-focus:px-2 peer-focus:text-forest-500 peer-focus:font-bold"
                    }`}
                  >
                    Email Address
                  </label>
                </div>

                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-foreground text-background font-bold py-4 rounded-2xl text-lg hover:bg-foreground/90 transition-colors"
                >
                  Continue
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Input Group */}
                <div className="relative group">
                  <input 
                    type="password" 
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className={`w-full bg-white border-2 rounded-2xl px-6 py-4 outline-none transition-colors peer ${
                      formData.password ? (isPasswordValid ? 'border-forest-500' : 'border-raspberry-500') : 'border-foreground/10 focus:border-forest-500'
                    }`}
                    required
                  />
                  <label 
                    htmlFor="password" 
                    className={`absolute left-6 transition-all duration-200 pointer-events-none ${
                      formData.password ? "-top-2.5 text-xs bg-background px-2 text-forest-500 font-bold" : "top-4 text-foreground/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-background peer-focus:px-2 peer-focus:text-forest-500 peer-focus:font-bold"
                    }`}
                  >
                    Password
                  </label>
                  
                  {/* Validation Feedback */}
                  {formData.password && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                      {isPasswordValid ? <Check className="text-forest-500" /> : <X className="text-raspberry-500" />}
                    </div>
                  )}
                </div>
                <p className={`text-sm ${formData.password && !isPasswordValid ? 'text-raspberry-500' : 'text-foreground/50'}`}>
                  Must be at least 8 characters long.
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/3 border-2 border-foreground/10 text-foreground font-bold py-4 rounded-2xl hover:bg-white transition-colors"
                  >
                    Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!isPasswordValid}
                    className="w-2/3 bg-forest-500 text-white font-bold py-4 rounded-2xl text-lg hover:bg-forest-500/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Account
                  </motion.button>
                </div>
              </motion.div>
            )}

          </form>

        </motion.div>
      </div>
    </div>
  );
}