import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Trophy, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface CaseData {
  case: string;
  questions: string;
  description: string;
}

interface GameStats {
  correct: number;
  total: number;
  mistakes: { case: string; selected: string; correct: string }[];
}

const CaseMatchGame = () => {
  const { toast } = useToast();
  
  const cases: CaseData[] = [
    { case: 'Nominativ', questions: 'Tko? Što?', description: 'Who? What?' },
    { case: 'Genitiv', questions: '(od) koga? (od) čega?', description: 'From whom? From what?' },
    { case: 'Dativ', questions: 'Komu? Čemu?', description: 'To whom? To what?' },
    { case: 'Akuzativ', questions: 'Koga? Što?', description: 'Whom? What?' },
    { case: 'Vokativ', questions: '(obraćanje)', description: 'Direct address' },
    { case: 'Lokativ', questions: '(o) komu? (o) čemu?', description: 'About whom? About what?' },
    { case: 'Instrumental', questions: '(s) kim(e)? (s) čim(e)?', description: 'With whom? With what?' }
  ];

  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStats, setGameStats] = useState<GameStats>({ correct: 0, total: 0, mistakes: [] });
  const [shuffledOptions, setShuffledOptions] = useState<CaseData[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  // Shuffle array function
  const shuffleArray = (array: CaseData[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize game
  useEffect(() => {
    const shuffled = shuffleArray(cases);
    setShuffledOptions(shuffled);
    setCurrentCaseIndex(Math.floor(Math.random() * cases.length));
  }, []);

  // Timer logic
  useEffect(() => {
    if (timerActive && timeLeft > 0 && !showFeedback && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      handleTimeUp();
    }
  }, [timeLeft, timerActive, showFeedback, gameComplete]);

  const handleTimeUp = () => {
    setSelectedAnswer('timeout');
    setShowFeedback(true);
    setGameStats(prev => ({
      ...prev,
      total: prev.total + 1,
      mistakes: [...prev.mistakes, {
        case: cases[currentCaseIndex].case,
        selected: 'Vrijeme isteklo',
        correct: cases[currentCaseIndex].questions
      }]
    }));
    
    toast({
      title: "Vrijeme je isteklo!",
      description: `Točan odgovor: ${cases[currentCaseIndex].questions}`,
      variant: "destructive",
    });
  };

  const handleAnswerClick = (selectedCase: CaseData) => {
    if (showFeedback) return;
    
    setSelectedAnswer(selectedCase.questions);
    setShowFeedback(true);
    setTimerActive(false);
    
    const currentCase = cases[currentCaseIndex];
    const isCorrect = selectedCase.questions === currentCase.questions;
    
    if (isCorrect) {
      setScore(score + 1);
      setGameStats(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
      toast({
        title: "Točno!",
        description: `${currentCase.case} odgovara na ${currentCase.questions}`,
      });
    } else {
      setGameStats(prev => ({
        ...prev,
        total: prev.total + 1,
        mistakes: [...prev.mistakes, {
          case: currentCase.case,
          selected: selectedCase.questions,
          correct: currentCase.questions
        }]
      }));
      toast({
        title: "Netočno!",
        description: `${currentCase.case} odgovara na ${currentCase.questions}`,
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    if (gameStats.total >= 7) {
      setGameComplete(true);
      return;
    }
    
    // Move to next case and reshuffle options
    const nextIndex = (currentCaseIndex + 1) % cases.length;
    setCurrentCaseIndex(nextIndex);
    setShuffledOptions(shuffleArray(cases));
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeLeft(30);
    setTimerActive(true);
  };

  const resetGame = () => {
    setCurrentCaseIndex(Math.floor(Math.random() * cases.length));
    setScore(0);
    setGameStats({ correct: 0, total: 0, mistakes: [] });
    setShuffledOptions(shuffleArray(cases));
    setSelectedAnswer(null);
    setShowFeedback(false);
    setGameComplete(false);
    setTimeLeft(30);
    setTimerActive(true);
  };

  const getOptionStyle = (option: CaseData) => {
    if (!showFeedback) return 'bg-brutalist-white text-brutalist-black border-brutalist-black hover:bg-brutalist-yellow';
    
    const currentCase = cases[currentCaseIndex];
    const isCorrect = option.questions === currentCase.questions;
    const wasSelected = selectedAnswer === option.questions;
    
    if (selectedAnswer === 'timeout' && isCorrect) {
      return 'bg-beginner text-beginner-foreground border-beginner animate-pulse';
    } else if (wasSelected && isCorrect) {
      return 'bg-beginner text-beginner-foreground border-beginner';
    } else if (wasSelected && !isCorrect) {
      return 'bg-advanced text-advanced-foreground border-advanced';
    } else if (!wasSelected && isCorrect) {
      return 'bg-beginner text-beginner-foreground border-beginner animate-pulse';
    } else {
      return 'bg-brutalist-white text-brutalist-black border-brutalist-black opacity-60';
    }
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-brutalist-black text-brutalist-white flex items-center justify-center">
        <div className="container-responsive">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-brutalist-white text-brutalist-black p-fluid-xl border-8 border-brutalist-black text-center"
          >
            <Trophy className="w-16 h-16 mx-auto mb-fluid-lg text-brutalist-yellow" />
            <h1 className="text-fluid-5xl brutalist-title mb-fluid-lg">IGRA ZAVRŠENA!</h1>
            
            <div className="mb-fluid-xl">
              <div className="text-fluid-4xl brutalist-subtitle mb-fluid-md">
                Rezultat: {gameStats.correct}/7
              </div>
              <div className="text-fluid-xl brutalist-text">
                Točnost: {Math.round((gameStats.correct / 7) * 100)}%
              </div>
            </div>

            {gameStats.mistakes.length > 0 && (
              <div className="mb-fluid-xl">
                <h3 className="text-fluid-2xl brutalist-subtitle mb-fluid-md">Greške za pregled:</h3>
                <div className="space-y-fluid-sm">
                  {gameStats.mistakes.map((mistake, index) => (
                    <div key={index} className="bg-brutalist-black text-brutalist-white p-fluid-md brutalist-skew-right">
                      <div className="transform -skew-x-3">
                        <strong>{mistake.case}</strong> → Odabrano: <em>{mistake.selected}</em>
                        <br />
                        Točno: <strong>{mistake.correct}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-fluid-md justify-center">
              <motion.button
                onClick={resetGame}
                className="bg-brutalist-black text-brutalist-white px-fluid-lg py-fluid-md border-4 border-brutalist-black hover:bg-beginner hover:text-beginner-foreground transition-colors flex items-center justify-center gap-fluid-sm brutalist-subtitle touch-target"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-5 h-5" />
                IGRAJ PONOVNO
              </motion.button>
              
              <Link to="/">
                <motion.button
                  className="bg-brutalist-gray text-brutalist-white px-fluid-lg py-fluid-md border-4 border-brutalist-gray hover:bg-brutalist-white hover:text-brutalist-black transition-colors flex items-center justify-center gap-fluid-sm brutalist-subtitle touch-target"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  POVRATAK
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brutalist-black text-brutalist-white">
      {/* Header */}
      <header className="bg-brutalist-white text-brutalist-black border-b-4 sm:border-b-8 border-brutalist-black">
        <div className="container-responsive py-fluid-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-fluid-sm">
            <Link to="/">
              <motion.button
                className="bg-brutalist-black text-brutalist-white px-fluid-md py-fluid-sm border-4 border-brutalist-black hover:bg-brutalist-gray transition-colors flex items-center gap-fluid-xs brutalist-subtitle touch-target"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                POVRATAK
              </motion.button>
            </Link>
            
            <div className="flex items-center gap-fluid-lg">
              <div className="bg-brutalist-black text-brutalist-white px-fluid-md py-fluid-sm border-4 border-brutalist-black brutalist-subtitle">
                Rezultat: {score}/7
              </div>
              
              <div className={`px-fluid-md py-fluid-sm border-4 flex items-center gap-fluid-xs brutalist-subtitle ${
                timeLeft <= 10 ? 'bg-advanced text-advanced-foreground border-advanced animate-pulse' : 'bg-intermediate text-intermediate-foreground border-intermediate'
              }`}>
                <Clock className="w-4 h-4" />
                {timeLeft}s
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="container-responsive py-fluid-xl flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCaseIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-fluid-xl"
          >
            <h1 className="text-fluid-6xl sm:text-fluid-7xl brutalist-title mb-fluid-md">
              {cases[currentCaseIndex].case}
            </h1>
            <p className="text-fluid-lg brutalist-text opacity-80">
              Koji su pitanja za ovaj padež?
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Answer Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-fluid-lg max-w-4xl mx-auto mb-fluid-xl">
          {shuffledOptions.slice(0, 4).map((option, index) => (
            <motion.button
              key={`${option.case}-${currentCaseIndex}`}
              onClick={() => handleAnswerClick(option)}
              disabled={showFeedback}
              className={`p-fluid-lg border-4 transition-all duration-300 brutalist-text min-h-[120px] flex flex-col justify-center items-center touch-target ${getOptionStyle(option)}`}
              whileHover={!showFeedback ? { scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 } : {}}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-fluid-xl brutalist-subtitle mb-fluid-xs">
                {option.questions}
              </div>
              <div className="text-fluid-sm opacity-70">
                {option.description}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Next Button */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.button
                onClick={handleNextQuestion}
                className="bg-brutalist-white text-brutalist-black px-fluid-xl py-fluid-lg border-4 border-brutalist-white hover:bg-beginner hover:text-beginner-foreground transition-colors brutalist-subtitle touch-target"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {gameStats.total >= 7 ? 'ZAVRŠI IGRU' : 'SLJEDEĆE PITANJE'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CaseMatchGame;