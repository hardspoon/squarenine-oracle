import React, { useState } from 'react';
import { useInputValue, useFirstRender, Show } from './hooks/customHooks';
import { Layout } from './components/layout/Layout';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Spinner } from './components/ui/Spinner';
import { FadeIn } from './components/ui/FadeIn';
import { GridDisplay } from './components/GridDisplay';
import { ReadingDisplay } from './components/ReadingDisplay';
import { calculateGridFrequencies, calculateLifePath } from './utils/numerology';
import { generateReading } from './services/geminiService';
import { AppState, GridFrequencies, NumerologyReading } from './types/numerology';

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

  // Validation functions
  const validateInitialForm = (): boolean => {
    if (!name.value.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!birthdate.value) {
      setError('Please enter your birthdate');
      return false;
    }
    setError('');
    return true;
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
      <FadeIn delay={isFirstRender ? 0 : 0}>
        <div className="text-center space-y-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-mystic-purple-700 mb-4">
              SquareNine Oracle
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-light">
              Discover your energetic signature through sacred numerology
            </p>
          </div>

          {/* Error Display */}
          <Show when={!!error}>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
              {error}
            </div>
          </Show>

          {/* Initial Form */}
          <Show when={appState === 'initial'}>
            <FadeIn>
              <form onSubmit={handleInitialSubmit} className="space-y-6">
                <Input
                  label="Your Name"
                  value={name.value}
                  onChange={name.onChange}
                  placeholder="Enter your full name"
                  required
                />
                <Input
                  label="Birth Date"
                  type="date"
                  value={birthdate.value}
                  onChange={birthdate.onChange}
                  required
                />
                <Button type="submit" withShine>
                  Reveal My Grid
                </Button>
              </form>
            </FadeIn>
          </Show>
          {/* Grid Display */}
          <Show when={appState === 'grid_displayed'}>
            <div className="space-y-8">
              <GridDisplay frequencies={gridFrequencies} />
              
              <div className="text-center">
                <p className="text-lg text-mystic-purple-600 mb-2">
                  Life Path Number: <span className="font-semibold text-2xl">{lifePath}</span>
                </p>
                <p className="text-slate-600 mb-6">
                  Your sacred numbers have been revealed. Enter your email to receive your personalized reading.
                </p>
                
                <form onSubmit={handleReadingSubmit} className="space-y-6">
                  <Input
                    label="Email Address"
                    type="email"
                    value={email.value}
                    onChange={email.onChange}
                    placeholder="your@email.com"
                    required
                  />
                  <div className="flex gap-4 justify-center">
                    <Button type="submit" withShine>
                      Generate Reading
                    </Button>
                    <Button variant="secondary" onClick={resetApp}>
                      Start Over
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Show>

          {/* Loading State */}
          <Show when={appState === 'loading_reading'}>
            <div className="text-center space-y-6">
              <Spinner size="lg" className="mx-auto" />
              <div>
                <h3 className="text-xl text-mystic-purple-700 mb-2">
                  Consulting the Oracle...
                </h3>
                <p className="text-slate-600">
                  Your personalized reading is being channeled through the cosmic frequencies
                </p>
              </div>
            </div>
          </Show>
          {/* Reading Display */}
          <Show when={appState === 'reading_complete'}>
            <div className="space-y-8">
              <ReadingDisplay reading={readingResult} />
              
              <div className="text-center">
                <Button variant="secondary" onClick={resetApp}>
                  Create Another Reading
                </Button>
              </div>
            </div>
          </Show>
        </div>
      </FadeIn>
    </Layout>
  );
}

export default App;
