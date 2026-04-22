import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FloatingTaxPro() {
  const [showSpeech, setShowSpeech] = useState(false);

  return (
    <div className="fixed top-1/2 left-1/2 z-50 pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}>
      <motion.div
        className="pointer-events-auto relative flex flex-col items-center justify-center"
        animate={
          showSpeech 
            ? { x: "0vw", y: "0vh", scale: 1.1 } 
            : {
                x: ["-42vw", "0vw", "42vw", "0vw", "-42vw"],
                y: ["0vh", "-42vh", "0vh", "42vh", "0vh"],
              }
        }
        transition={{
          duration: showSpeech ? 0.5 : 20,
          repeat: showSpeech ? 0 : Infinity,
          ease: showSpeech ? "easeOut" : "linear"
        }}
      >
        
        {/* The Avatar */}
        <motion.div
          animate={showSpeech ? { rotate: 0 } : { y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative cursor-pointer group"
          onClick={() => setShowSpeech(!showSpeech)}
        >
          {/* Pulsing ring */}
          <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20 group-hover:opacity-60 duration-1000"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&h=200&fit=crop&crop=faces" 
            alt="Nigerian Tax Expert" 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-[0_0_30px_rgba(16,185,129,0.5)] border-4 border-white dark:border-slate-800 relative z-10"
          />
          
          {/* Notification Badge */}
          {!showSpeech && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full z-20 shadow-lg animate-pulse"></span>
          )}

          {/* Cute & Colorful Floating Label */}
          {!showSpeech && (
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white text-[10px] md:text-xs font-extrabold px-3 py-1 rounded-full shadow-xl border-2 border-white dark:border-slate-800 whitespace-nowrap z-30 flex items-center space-x-1.5">
              <span className="text-[10px] md:text-sm">👋🏾</span>
              <span>Your Tax Assistant</span>
            </div>
          )}
        </motion.div>

        {/* The Speech Bubble Popup */}
        <AnimatePresence>
          {showSpeech && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute top-full mt-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl p-5 w-72 md:w-80 text-left"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setShowSpeech(false); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="mb-4">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">Tax Expert AI</h4>
                <p className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Online & Ready</p>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5 font-medium">
                Hello! Click below to enter the portal and chat securely about your taxes, NDPR compliance, or to generate a new TIN.
              </p>
              
              <Link 
                to="/chat" 
                onClick={() => setShowSpeech(false)}
                className="flex items-center justify-center w-full text-sm font-extrabold bg-emerald-600 text-white px-4 py-3.5 rounded-xl hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare className="w-5 h-5 mr-2" /> Start Chat
              </Link>
              
              {/* Pointer Triangle Arrow */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-t border-l border-slate-200 dark:border-slate-800 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
