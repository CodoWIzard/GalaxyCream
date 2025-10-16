'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration: 3, repeat: Infinity, delay }}
  >
    {children}
  </motion.div>
);

const IceCreamCone = ({ color, size = 'w-16 h-20' }: { color: string; size?: string }) => (
  <div className={`${size} relative cursor-pointer hover:scale-110 transition-transform`}>
    <div className={`w-full h-12 ${color} rounded-t-full relative overflow-hidden`}>
      <div className="absolute inset-0 bg-white/20 rounded-full transform -translate-y-2"></div>
      <div className="absolute top-2 left-2 w-2 h-2 bg-white/40 rounded-full"></div>
    </div>
    <div className="w-6 h-8 bg-amber-600 mx-auto" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
  </div>
);

const KawsCharacter = () => (
  <motion.div
    whileHover={{ scale: 1.1, rotate: 5 }}
    className="relative cursor-pointer"
  >
    <div className="w-24 h-32 bg-pink-400 rounded-3xl relative">
      <div className="absolute top-4 left-4 w-3 h-3 bg-black rounded-full"></div>
      <div className="absolute top-4 right-4 w-3 h-3 bg-black rounded-full"></div>
      <div className="absolute top-6 left-6 w-1 h-1 bg-white rounded-full"></div>
      <div className="absolute top-6 right-6 w-1 h-1 bg-white rounded-full"></div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-black rounded-full"></div>
      <div className="absolute -top-2 left-2 w-4 h-6 bg-pink-400 rounded-full transform -rotate-12"></div>
      <div className="absolute -top-2 right-2 w-4 h-6 bg-pink-400 rounded-full transform rotate-12"></div>
    </div>
  </motion.div>
);

const GraffitiText = ({ text, color }: { text: string; color: string }) => (
  <motion.div
    initial={{ scale: 0, rotate: -10 }}
    animate={{ scale: 1, rotate: 0 }}
    whileHover={{ scale: 1.05, rotate: 2 }}
    className={`text-6xl font-black ${color} transform -skew-x-12 cursor-pointer select-none`}
    style={{ textShadow: '4px 4px 0px #000, 8px 8px 0px rgba(0,0,0,0.3)' }}
  >
    {text}
  </motion.div>
);

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-yellow-400">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/30 via-transparent to-green-400/30"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/20 rounded-full"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, repeatType: 'reverse' }}
          />
        ))}
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-8 h-8 bg-white/30 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <GraffitiText text="GALAXY" color="text-cyan-300" />
          <GraffitiText text="CREAM" color="text-pink-300" />
        </motion.div>

        {/* Interactive Elements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <FloatingElement delay={0}>
            <IceCreamCone color="bg-gradient-to-b from-pink-400 to-purple-500" />
          </FloatingElement>
          <FloatingElement delay={0.5}>
            <KawsCharacter />
          </FloatingElement>
          <FloatingElement delay={1}>
            <IceCreamCone color="bg-gradient-to-b from-cyan-400 to-blue-500" />
          </FloatingElement>
          <FloatingElement delay={1.5}>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center cursor-pointer"
            >
              <Star className="w-8 h-8 text-white" fill="white" />
            </motion.div>
          </FloatingElement>
        </div>

        {/* Center Piece */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          className="relative mb-12"
        >
          <div className="w-32 h-40 bg-gradient-to-b from-pink-300 via-purple-400 to-blue-500 rounded-3xl relative overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4 border-4 border-white/30 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-12 h-12 text-white" fill="white" />
            </div>
          </div>
        </motion.div>

        {/* Bottom Row */}
        <div className="flex gap-8 items-center">
          <FloatingElement delay={2}>
            <IceCreamCone color="bg-gradient-to-b from-green-400 to-teal-500" size="w-12 h-16" />
          </FloatingElement>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center cursor-pointer"
          >
            <Sparkles className="w-10 h-10 text-white" fill="white" />
          </motion.div>
          <FloatingElement delay={2.5}>
            <IceCreamCone color="bg-gradient-to-b from-orange-400 to-red-500" size="w-12 h-16" />
          </FloatingElement>
        </div>

        {/* Floating Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute top-20 right-10 text-2xl font-bold text-white transform rotate-12"
          style={{ textShadow: '2px 2px 0px #000' }}
        >
          WOW!
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-20 left-10 text-3xl font-bold text-yellow-300 transform -rotate-12"
          style={{ textShadow: '2px 2px 0px #000' }}
        >
          COOL!
        </motion.div>
      </div>
    </div>
  );
}
