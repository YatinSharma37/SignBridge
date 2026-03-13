import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import HandAnimation from './HandAnimation';

interface TranslationInterfaceProps {
  initialText?: string;
}

const TranslationInterface: React.FC<TranslationInterfaceProps> = ({ initialText = '' }) => {
  const [inputText, setInputText] = useState(initialText);
  const [translating, setTranslating] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  const handleTranslate = () => {
    if (inputText.trim() === '') return;
    
    setTranslating(true);
    setCurrentLetterIndex(0);
    setDisplayText(inputText.replace(/\s+/g, ' ').trim());
  };

  const handleReset = () => {
    setTranslating(false);
    setCurrentLetterIndex(0);
  };

  const handleLetterComplete = () => {
    if (currentLetterIndex < displayText.length - 1) {
      setCurrentLetterIndex(currentLetterIndex + 1);
    } else {
      // Finished translating the entire text
      setTimeout(() => {
        setTranslating(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!translating) {
      setCurrentLetterIndex(0);
    }
  }, [translating]);

  // Get current letter to animate
  const currentLetter = displayText[currentLetterIndex] || '';
  const progress = displayText ? Math.round((currentLetterIndex / displayText.length) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Language Translator</h2>
      
      <div className="mb-6">
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter text to translate to sign language
        </label>
        <textarea
          id="text-input"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
          placeholder="Type something to translate..."
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={translating}
        ></textarea>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTranslate}
          disabled={translating || !inputText.trim()}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            translating || !inputText.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {translating ? (
            <>
              <Pause className="w-5 h-5" />
              <span>Translating...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>Translate</span>
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          disabled={!translating}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            !translating
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          <Volume2 className="w-5 h-5" />
          <span>Speak</span>
        </motion.button>
      </div>

      {displayText && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Translation Progress</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div
              className="bg-blue-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center min-h-[400px]">
        {!displayText && !translating ? (
          <div className="text-center text-gray-500">
            <p className="mb-2">Enter text above and click "Translate" to see sign language translation</p>
            <p className="text-sm">The animation will demonstrate how to sign each letter</p>
          </div>
        ) : (
          <>
            <HandAnimation 
              letter={currentLetter} 
              playing={translating} 
              onComplete={handleLetterComplete} 
            />
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="mt-8 text-center"
            >
              <p className="font-medium text-gray-800">
                {displayText.split('').map((letter, index) => (
                  <span 
                    key={index} 
                    className={`inline-block px-1 ${
                      index === currentLetterIndex 
                        ? 'text-blue-600 font-bold text-lg underline' 
                        : index < currentLetterIndex 
                        ? 'text-green-600' 
                        : 'text-gray-400'
                    }`}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </span>
                ))}
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default TranslationInterface;