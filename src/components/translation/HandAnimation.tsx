import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './HandAnimation.css';

interface HandAnimationProps {
  letter: string;
  playing: boolean;
  onComplete?: () => void;
}

const HandAnimation: React.FC<HandAnimationProps> = ({ letter, playing, onComplete }) => {
  const [position, setPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Map of letters to hand positions (this would be more comprehensive in a real app)
  const handPositions: Record<string, string[]> = {
    'A': ['fist', 'thumb-out'],
    'B': ['palm-forward', 'fingers-up', 'thumb-in'],
    'C': ['curved-palm'],
    // Add more letters with their unique hand positions
  };

  useEffect(() => {
    if (playing) {
      const positions = handPositions[letter.toUpperCase()] || ['unknown'];
      let currentPos = 0;
      setIsAnimating(true);
      
      const interval = setInterval(() => {
        if (currentPos < positions.length) {
          setPosition(currentPos);
          currentPos++;
        } else {
          clearInterval(interval);
          setIsAnimating(false);
          if (onComplete) onComplete();
        }
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [letter, playing, onComplete]);

  return (
    <div className="hand-animation-container">
      <motion.div
        className="hand"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isAnimating ? 1 : 0.7,
          scale: isAnimating ? 1 : 0.9,
          rotate: isAnimating ? [0, 10, 0, -10, 0] : 0
        }}
        transition={{ 
          duration: 2,
          repeat: isAnimating ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        {/* This would be a hand SVG or image that changes based on the letter */}
        <div className="hand-placeholder">
          <div className="finger thumb"></div>
          <div className="finger index"></div>
          <div className="finger middle"></div>
          <div className="finger ring"></div>
          <div className="finger pinky"></div>
          <div className="palm"></div>
        </div>
        <motion.div 
          className="letter-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {letter.toUpperCase()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HandAnimation;