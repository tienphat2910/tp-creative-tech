'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import enContent from '../content/en/404.json';
import viContent from '../content/vi/404.json';
import { useLocale } from '../contexts/LocaleContext';

export default function NotFound() {
  const { locale } = useLocale();
  const content = locale === 'vi' ? viContent : enContent;

  return (
    
    <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden relative pt-3">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src="/images/404-background.png"
          alt="404 Background"
          fill
          className="object-contain opacity-20 md:opacity-50"
          style={{ objectPosition: 'center top' }}
          priority
        />
      </div>

      {/* Background Floating Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1, rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-32 left-10 w-32 h-32 border border-blue-300 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.1, x: 0, rotate: [0, 45, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-52 right-20 w-24 h-24 border-2 border-purple-300 rounded-lg"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.05, scale: 1, y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-1/4 w-40 h-40 border border-gray-300 rounded-full"
      />

      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Main Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-600 leading-none"
              animate={{ 
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {content.title}
            </motion.h1>
          </motion.div>

          {/* Interactive Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4"
          >
            <motion.h2 
              className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {content.subtitle}
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {content.description}
            </motion.p>
          </motion.div>

          {/* 404 Illustration */}
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="relative mx-auto w-[300px] md:w-[500px] lg:w-[600px] h-[200px] md:h-[350px] lg:h-[400px]"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 1, -1, 0] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/404.png"
                alt="404 Error Illustration"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Interactive Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-row sm:flex-row gap-6 justify-center items-center pt-4"
          >
            
            {/* Primary Go Home Button */}
            <Link href="/">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-4 py-2 md:px-8 md:py-4 bg-blue-600 text-white font-semibold rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-white/20"
                />
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                  {content.buttons.home}
                </span>
              </motion.button>
            </Link>

            {/* Secondary Contact Button */}
            <Link href="/contact">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "#3b82f6"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-4 py-2 md:px-8 md:py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                <motion.div
                  initial={{ 
                    background: "conic-gradient(from 0deg, transparent, transparent, transparent, transparent)" 
                  }}
                  whileHover={{ 
                    background: [
                      "conic-gradient(from 0deg, #3b82f6, transparent, transparent, transparent)",
                      "conic-gradient(from 90deg, #3b82f6, transparent, transparent, transparent)", 
                      "conic-gradient(from 180deg, #3b82f6, transparent, transparent, transparent)",
                      "conic-gradient(from 270deg, #3b82f6, transparent, transparent, transparent)",
                      "conic-gradient(from 360deg, #3b82f6, transparent, transparent, transparent)"
                    ]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 rounded-xl p-[2px] opacity-0 group-hover:opacity-100"
                >
                  <div className="w-full h-full bg-white rounded-[10px]" />
                </motion.div>
                
                <div className="relative z-10 flex items-center gap-2 md:gap-3">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-base md:text-lg">{content.buttons.contact}</span>
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}