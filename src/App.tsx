import React, { useState } from 'react';
import { useInputValue, useFirstRender, Show } from './hooks/customHooks';
import { Layout } from './components/layout/Layout';
import { useSwipeDetection, useLocalStorage } from 'react-haiku';
import { CursorEffect } from './components/ui/CursorEffect';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Spinner } from './components/ui/Spinner';
import { FadeIn } from './components/ui/FadeIn';
import Spotlight from './components/Spotlight';
import { EnhancedGridDisplay } from './components/EnhancedGridDisplay';
import { ReadingDisplay } from './components/ReadingDisplay';
import { calculateGridFrequencies, calculateLifePath } from './utils/numerology';
import { generateReading } from './services/geminiService';
import type { AppState, GridFrequencies, NumerologyReading } from './types/numerology';
import { motion } from 'framer-motion';

export default App;

function App() {
  // State management
  const [appState, setAppState] = useState<AppState>('initial');
  const [gridFrequencies, setGridFrequencies] = useState<GridFrequencies>({});
  const [lifePath, setLifePath] = useState<number>(0);
  const [readingResult, setReadingResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Form inputs using react-haiku hooks
  const name = useInputValue('');
  const birthdate = useInputValue('1990-01-01');
  const email = useInputValue('');

  // Animation control
  const isFirstRender = useFirstRender();

  // Swipe detection using react-haiku hook
  useSwipeDetection({
 onSwipeLeft: () => {
      if (appState === 'initial') setAppState('grid_displayed');
      else if (appState === 'grid_displayed') setAppState('reading_complete');
      // Add logic to request reading if swiping left from grid_displayed
      // and email is valid. For now, just change state.
    },
 onSwipeRight: () => {
      if (appState === 'reading_complete') resetApp(); // Swipe right from complete resets to initial
      else if (appState === 'grid_displayed') setAppState('initial');
      // No swipe right from initial
    },
    // Optional: Prevent default touch events to avoid conflicts with scrolling if needed
    // passive: false,
  });

  // Local storage hook for saving readings
  const [savedReadings, setSavedReadings] = useLocalStorage('oracle-readings', []);

  // Validation functions
  const validateInitialForm = (): boolean => {
    if (!name.value.trim()) {
      setError('Please enter your name');
      return false;
    }
    // Remove email validation from name field
    if (!birthdate.value) {
      setError('Please enter your birthdate');
      return false;
    }
  };

  const validateEmail = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      setError('Please enter your email');
      return false;
    }
    if (!emailRegex.test(email.value)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  // Event handlers
  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInitialForm()) return;

    try {
      const frequencies = calculateGridFrequencies(birthdate.value);
      const lifePathNumber = calculateLifePath(birthdate.value);
      
      setGridFrequencies(frequencies);
      setLifePath(lifePathNumber);
      setAppState('grid_displayed');
    } catch (err) {
      setError('Error calculating numerology. Please check your birthdate.');
    }
  };

  const handleReadingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) return;

    setAppState('loading_reading');
    
    try {
      const reading: NumerologyReading = {
        name: name.value,
        birthdate: birthdate.value,
        email: email.value,
        gridFrequencies,
        lifePath
      };
      
      const result = await generateReading(reading);
      setReadingResult(result);
      setSavedReadings([...savedReadings, { ...reading, readingResult: result }]);
      setAppState('reading_complete');
    } catch (err) {
      setError('Error generating reading. Please try again.');
      setAppState('grid_displayed');
    }
  };

  const resetApp = () => {
    setAppState('initial');
    setError('');
    name.reset();
    birthdate.setValue('1990-01-01');
    email.reset();
  };

  return (
    <Layout>
      <CursorEffect />
      <FadeIn delay={isFirstRender ? 0 : 0}>
        <div className="text-center space-y-8">
          {/* Header */}
          <div className="mb-12">
            <motion.h1 
              className="mystical-title text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              SquareNine Oracle
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl font-light text-primary-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Discover your personal numerology profile and insights
            </motion.p>
          </div>

          {/* Error Display */}
          <Show when={!!error}>
            <motion.div 
              className="bg-red-900/50 border border-red-400/50 rounded-xl p-4 text-red-200 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.div>
          </Show>

          {/* Initial Form */}
          <Show when={appState === 'initial'}>
            <FadeIn>
              <form onSubmit={handleInitialSubmit} className="space-y-8 max-w-md mx-auto">
                <div className="space-y-6">
                  <Input
                    label="Your Name"
                    value={name.value}
                    onChange={name.onChange}
                    placeholder=""
                    required
                  />
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={birthdate.value}
                    onChange={birthdate.onChange}
                    required
                  />
                </div>
                <Button type="submit" withShine className="w-full">
                  Generate My Profile
                </Button>
              </form>
            </FadeIn>
          </Show>

          {/* Grid Display */}
          <Show when={appState === 'grid_displayed'}>
            <div className="space-y-10">
              <Spotlight highlightedCells={[gridFrequencies[3], gridFrequencies[6], gridFrequencies[9]]}>
                <EnhancedGridDisplay frequencies={gridFrequencies} />
              </Spotlight>
              
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className="text-amber-300 text-lg mb-2">Life Path Number</p>
                  <div className="life-path-number">{lifePath}</div>
                </motion.div>
                
                <motion.p 
                  className="text-primary-200 text-lg leading-relaxed max-w-lg mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  Your numbers have been revealed through the cosmic frequencies. 
                  Enter your email to receive your personalized reading.
                </motion.p>
                
                <form onSubmit={handleReadingSubmit} className="space-y-6 max-w-md mx-auto mt-8">
                  <Input
                    label="Email Address"
                    type="email"
                    value={email.value}
                    onChange={email.onChange}
                    placeholder=""
                    required
                  />
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button type="submit" withShine>
                      Generate Reading
                    </Button>
                    <Button variant="secondary" onClick={resetApp}>
                      Start New Journey
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Show>

          {/* Loading State */}
          <Show when={appState === 'loading_reading'}>
            <div className="text-center space-y-8 py-12">
              <Spinner size="lg" className="mx-auto" />
              <div className="space-y-4">
                <motion.h3 
                  className="text-2xl text-amber-300 font-semibold"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Consulting the Oracle...
                </motion.h3>
                <motion.p 
                  className="text-purple-200 text-lg leading-relaxed max-w-lg mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Your personalized reading is being channeled through the cosmic frequencies. 
                  The ancient wisdom is awakening...
                </motion.p>
              </div>
            </div>
          </Show>

          {/* Reading Display */}
          <Show when={appState === 'reading_complete'}>
            <div className="space-y-8">
              <ReadingDisplay reading={readingResult} />
              
              <div className="text-center">
                <Button variant="secondary" onClick={resetApp}>
                  Begin Another Journey
                </Button>
              </div>
            </div>
          </Show>
        </div>
      </FadeIn>
    </Layout>
  );
}