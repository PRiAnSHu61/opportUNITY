import React, { useState } from "react";
import { motion } from "framer-motion";
import UploadResume from "./UploadResume";

// Create Resume Component
const CreateResume = () => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-purple-700 to-blue-600 text-transparent bg-clip-text">
        Create Your Professional Resume
      </h2>
      
      <p className="text-gray-600 text-center mb-6">
        Build a custom resume with our interactive resume builder
      </p>
      
      {/* Placeholder for resume builder (to be implemented) */}
      <div className="text-center py-6">
        <p className="text-gray-500 mb-4">Resume builder coming soon!</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          Start Building
        </motion.button>
      </div>
    </div>
  );
};

const ResumePage = () => {
  const [activeTab, setActiveTab] = useState("create");
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Pre-generate random values for bubbles to ensure they remain consistent
  const bubbleAnimations = [...Array(8)].map(() => ({
    size: Math.floor(Math.random() * 8) + 3,
    positionTop: Math.random() * 100,
    positionLeft: Math.random() * 100,
    moveY: Math.random() * 20 - 10,
    moveX: Math.random() * 20 - 10,
    duration: 5 + Math.random() * 5
  }));

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white to-blue-50 px-6 py-12">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated bubbles with pre-computed values */}
        {bubbleAnimations.map((bubble, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-20"
            style={{ 
              width: `${bubble.size}rem`,
              height: `${bubble.size}rem`,
              top: `${bubble.positionTop}%`, 
              left: `${bubble.positionLeft}%`,
              filter: "blur(1px)" 
            }}
            animate={{
              y: [0, bubble.moveY],
              x: [0, bubble.moveX],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
        
        {/* Design accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      {/* Logo/Header */}
      <motion.h1 
        className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        opport<span className="font-extrabold">UNITY</span> Resume
      </motion.h1>
      
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tabs */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center space-x-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("create")}
            className={`px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 ${
              activeTab === "create" 
                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white" 
                : "bg-white/80 text-gray-700 hover:bg-white"
            }`}
          >
            Create Resume
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("upload")}
            className={`px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 ${
              activeTab === "upload" 
                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white" 
                : "bg-white/80 text-gray-700 hover:bg-white"
            }`}
          >
            Upload Resume
          </motion.button>
        </motion.div>
        
        {/* Tab Content with Animation */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "create" && <CreateResume />}
          {activeTab === "upload" && <UploadResume />}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResumePage;