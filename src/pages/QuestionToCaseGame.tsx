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
  mistakes: { questions: string; selected: string; correct: string }[];
}

const QuestionToCaseGame = () => {
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

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStats, setGameStats] = useState<GameStats>({ correct: 0, total: 0, mistakes: [] });
  const [shuffledOptions, setShuffledOptions] = useState<CaseData[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<NodeJS.Timeout | null>(null);

  // Shuffle array function
  const shuffleArray = (array: CaseData[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Generate options that always include the correct answer
  const generateOptionsWithCorrectAnswer = (correctIndex: number) => {
    const correctCase = cases[correctIndex];
    const otherCases = cases.filter((_, index) => index !== correctIndex);
    const shuffledOthers = shuffleArray(otherCases);
    const selectedOthers = shuffledOthers.slice(0, 3);
    const allOptions = [correctCase, ...selectedOthers];
    return shuffleArray(allOptions);
  };

  // Initialize game
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * cases.length);
    setCurrentQuestionIndex(randomIndex);
    setShuffledOptions(generateOptionsWithCorrectAnswer(randomIndex));
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
        questions: cases[currentQuestionIndex].questions,
        selected: 'Vrijeme isteklo',
        correct: cases[currentQuestionIndex].case
      }]
    }));
    
    const currentQuestion = cases[currentQuestionIndex];
    toast({
      title: "Vrijeme je isteklo!",
      description: `Točan odgovor: ${currentQuestion.case}\n\nTime's up! Correct answer: ${currentQuestion.case}`,
      variant: "destructive",
    });

    // Auto-advance after 5 seconds
    const timer = setTimeout(() => {
      handleNextQuestion();
    }, 5000);
    setAutoAdvanceTimer(timer);
  };

  const handleAnswerClick = (selectedCase: CaseData) => {
    if (showFeedback) return;
    
    setSelectedAnswer(selectedCase.case);
    setShowFeedback(true);
    setTimerActive(false);
    
    const currentQuestion = cases[currentQuestionIndex];
    const isCorrect = selectedCase.case === currentQuestion.case;
    
    if (isCorrect) {
      setScore(score + 1);
      setGameStats(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    toast({
      title: "Točno!",
      description: `${currentQuestion.questions} pripada ${currentQuestion.case}u\n\nCorrect! ${currentQuestion.questions} belongs to ${currentQuestion.case}`,
      variant: "success",
    });
    } else {
      setGameStats(prev => ({
        ...prev,
        total: prev.total + 1,
        mistakes: [...prev.mistakes, {
          questions: currentQuestion.questions,
          selected: selectedCase.case,
          correct: currentQuestion.case
        }]
      }));
      toast({
        title: "Netočno!",
        description: `${currentQuestion.questions} pripada ${currentQuestion.case}u\n\nIncorrect! ${currentQuestion.questions} belongs to ${currentQuestion.case}`,
        variant: "destructive",
      });
    }

    // Auto-advance after 5 seconds
    const timer = setTimeout(() => {
      handleNextQuestion();
    }, 5000);
    setAutoAdvanceTimer(timer);
  };

  const handleNextQuestion = () => {
    // Clear auto-advance timer if it exists
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
    
    if (gameStats.total >= 7) {
      setGameComplete(true);
      return;
    }
    
    // Move to next question and generate new options with correct answer
    const nextIndex = (currentQuestionIndex + 1) % cases.length;
    setCurrentQuestionIndex(nextIndex);
    setShuffledOptions(generateOptionsWithCorrectAnswer(nextIndex));
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeLeft(30);
    setTimerActive(true);
  };

  const resetGame = () => {
    // Clear auto-advance timer if it exists
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
    
    const randomIndex = Math.floor(Math.random() * cases.length);
    setCurrentQuestionIndex(randomIndex);
    setScore(0);
    setGameStats({ correct: 0, total: 0, mistakes: [] });
    setShuffledOptions(generateOptionsWithCorrectAnswer(randomIndex));
    setSelectedAnswer(null);
    setShowFeedback(false);
    setGameComplete(false);
    setTimeLeft(30);
    setTimerActive(true);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
      }
    };
  }, [autoAdvanceTimer]);

  const getOptionStyle = (option: CaseData) => {
    if (!showFeedback) return 'bg-brutalist-white text-brutalist-black border-brutalist-black hover:bg-brutalist-yellow';
    
    const currentQuestion = cases[currentQuestionIndex];
    const isCorrect = option.case === currentQuestion.case;
    const wasSelected = selectedAnswer === option.case;
    
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
            className="bg-brutalist-white text-brutalist-black p-fluid-md sm:p-fluid-xl border-4 sm:border-8 border-brutalist-black text-center"
          >
            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-fluid-md sm:mb-fluid-lg text-brutalist-yellow" />
            <h1 className="text-fluid-3xl sm:text-fluid-5xl brutalist-title mb-fluid-sm sm:mb-fluid-lg">IGRA ZAVRŠENA!</h1>
            <p className="text-fluid-sm sm:text-fluid-base brutalist-text opacity-60 mb-fluid-md sm:mb-fluid-lg">
              Game Complete!
            </p>
            
            {/* Results Summary */}
            <div className="mb-fluid-lg sm:mb-fluid-xl">
              <div className="text-fluid-2xl sm:text-fluid-4xl brutalist-subtitle mb-fluid-xs sm:mb-fluid-md">
                Rezultat: {gameStats.correct}/7
              </div>
              <div className="text-fluid-sm sm:text-fluid-base brutalist-text opacity-70 mb-fluid-sm">
                Result: {gameStats.correct}/7
              </div>
              <div className="text-fluid-lg sm:text-fluid-xl brutalist-text">
                Točnost: {Math.round((gameStats.correct / 7) * 100)}%
              </div>
              <div className="text-fluid-xs sm:text-fluid-sm brutalist-text opacity-60">
                Accuracy: {Math.round((gameStats.correct / 7) * 100)}%
              </div>
            </div>

            {/* Performance Badge */}
            <div className="mb-fluid-lg sm:mb-fluid-xl">
              {gameStats.correct >= 6 ? (
                <div className="bg-beginner text-beginner-foreground px-fluid-md py-fluid-sm border-2 sm:border-4 border-beginner brutalist-skew-right inline-block">
                  <div className="transform -skew-x-3 brutalist-subtitle text-fluid-sm sm:text-fluid-base">
                    ODLIČAN RAD! • EXCELLENT WORK!
                  </div>
                </div>
              ) : gameStats.correct >= 4 ? (
                <div className="bg-intermediate text-intermediate-foreground px-fluid-md py-fluid-sm border-2 sm:border-4 border-intermediate brutalist-skew-right inline-block">
                  <div className="transform -skew-x-3 brutalist-subtitle text-fluid-sm sm:text-fluid-base">
                    DOBRO! • GOOD JOB!
                  </div>
                </div>
              ) : (
                <div className="bg-advanced text-advanced-foreground px-fluid-md py-fluid-sm border-2 sm:border-4 border-advanced brutalist-skew-right inline-block">
                  <div className="transform -skew-x-3 brutalist-subtitle text-fluid-sm sm:text-fluid-base">
                    NASTAVI VJEŽBATI! • KEEP PRACTICING!
                  </div>
                </div>
              )}
            </div>

            {/* Mistakes Review */}
            {gameStats.mistakes.length > 0 && (
              <div className="mb-fluid-lg sm:mb-fluid-xl">
                <h3 className="text-fluid-lg sm:text-fluid-2xl brutalist-subtitle mb-fluid-xs sm:mb-fluid-md">Greške za pregled:</h3>
                <p className="text-fluid-xs sm:text-fluid-sm brutalist-text opacity-60 mb-fluid-sm sm:mb-fluid-md">
                  Mistakes to Review:
                </p>
                <div className="space-y-fluid-xs sm:space-y-fluid-sm max-h-64 sm:max-h-80 overflow-y-auto">
                  {gameStats.mistakes.map((mistake, index) => (
                    <div key={index} className="bg-advanced text-advanced-foreground p-fluid-sm sm:p-fluid-md border-2 sm:border-4 border-advanced brutalist-skew-right">
                      <div className="transform -skew-x-3 text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <div className="text-fluid-sm sm:text-fluid-base brutalist-subtitle">{mistake.questions}</div>
                          <div className="text-fluid-xs sm:text-fluid-sm opacity-70">→</div>
                        </div>
                        <div className="text-fluid-xs sm:text-fluid-sm space-y-0.5">
                          <div>Odabran odgovor: <span className="brutalist-subtitle">{mistake.selected}</span></div>
                          <div>Točan odgovor: <span className="brutalist-subtitle text-beginner">{mistake.correct}</span></div>
                        </div>
                        <div className="text-[10px] sm:text-fluid-xs opacity-50 mt-1">
                          Selected answer: {mistake.selected} • Correct answer: {mistake.correct}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-fluid-sm sm:gap-fluid-md justify-center">
              <motion.button
                onClick={resetGame}
                className="bg-brutalist-black text-brutalist-white px-fluid-md sm:px-fluid-lg py-fluid-sm sm:py-fluid-md border-2 sm:border-4 border-brutalist-black hover:bg-beginner hover:text-beginner-foreground transition-colors flex items-center justify-center gap-fluid-xs sm:gap-fluid-sm brutalist-subtitle touch-target text-fluid-sm sm:text-fluid-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>
                  <span className="block sm:inline">IGRAJ PONOVNO</span>
                  <span className="text-[10px] sm:text-fluid-xs opacity-60 block sm:hidden">Play Again</span>
                </span>
              </motion.button>
              
              <Link to="/">
                <motion.button
                  className="bg-brutalist-gray text-brutalist-white px-fluid-md sm:px-fluid-lg py-fluid-sm sm:py-fluid-md border-2 sm:border-4 border-brutalist-gray hover:bg-brutalist-white hover:text-brutalist-black transition-colors flex items-center justify-center gap-fluid-xs sm:gap-fluid-sm brutalist-subtitle touch-target text-fluid-sm sm:text-fluid-base w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>
                    <span className="block sm:inline">POVRATAK</span>
                    <span className="text-[10px] sm:text-fluid-xs opacity-60 block sm:hidden">Return</span>
                  </span>
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
      <header className="bg-brutalist-white text-brutalist-black border-b border-b-2 sm:border-b-8 border-brutalist-black">
        <div className="container-responsive py-1 sm:py-fluid-md">
          {/* Mobile Layout - Ultra Compact Single Row */}
          <div className="flex items-center justify-between sm:hidden">
            <Link to="/">
              <motion.button
                className="bg-brutalist-black text-brutalist-white p-1.5 border border-brutalist-black hover:bg-brutalist-gray transition-colors touch-target"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </motion.button>
            </Link>
            
            <div className="bg-brutalist-black text-brutalist-white px-2.5 py-1 border border-brutalist-black text-sm font-bold">
              {score}/7
            </div>
            
            <div className={`px-2.5 py-1 border flex items-center gap-1 text-sm font-bold ${
              timeLeft <= 10 ? 'bg-advanced text-advanced-foreground border-advanced animate-pulse' : 'bg-intermediate text-intermediate-foreground border-intermediate'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              {timeLeft}
            </div>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden sm:flex items-center justify-between">
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
      <main className="container-responsive py-fluid-lg sm:py-fluid-xl flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-fluid-lg sm:mb-fluid-xl"
          >
            {/* Question Box - Highlighted */}
            <div className="bg-intermediate text-intermediate-foreground p-fluid-md sm:p-fluid-lg border-4 sm:border-8 border-intermediate max-w-3xl mx-auto mb-fluid-md sm:mb-fluid-lg">
              <div>
                <h1 className="text-fluid-2xl sm:text-fluid-4xl lg:text-fluid-5xl brutalist-title mb-fluid-xs sm:mb-fluid-sm break-words leading-tight">
                  {cases[currentQuestionIndex].questions}
                </h1>
                <p className="text-fluid-sm sm:text-fluid-lg font-bold tracking-wide opacity-90">
                  {cases[currentQuestionIndex].description}
                </p>
              </div>
            </div>
            <p className="text-fluid-base sm:text-fluid-lg brutalist-text opacity-80 mb-1">
              Koji padež odgovara na ova pitanja?
            </p>
            <p className="text-fluid-xs sm:text-fluid-sm brutalist-text opacity-50">
              Which case corresponds to these questions?
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Answer Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-fluid-sm sm:gap-fluid-lg max-w-4xl mx-auto mb-fluid-lg sm:mb-fluid-xl">
          {shuffledOptions.slice(0, 4).map((option, index) => (
            <motion.button
              key={`${option.case}-${currentQuestionIndex}`}
              onClick={() => handleAnswerClick(option)}
              disabled={showFeedback}
              className={`p-fluid-sm sm:p-fluid-lg border-2 sm:border-4 transition-all duration-300 brutalist-text min-h-[70px] sm:min-h-[120px] flex flex-col justify-center items-center touch-target rounded-lg ${getOptionStyle(option)}`}
              whileHover={!showFeedback ? { scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 } : {}}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-fluid-lg sm:text-fluid-2xl brutalist-subtitle mb-1 sm:mb-fluid-xs leading-tight">
                {option.case}
              </div>
              <div className="text-[11px] sm:text-fluid-sm opacity-70 mb-0.5 sm:mb-fluid-xs text-center leading-tight">
                {option.questions}
              </div>
              <div className="text-[9px] sm:text-fluid-xs opacity-50 text-center leading-tight">
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
                className="bg-brutalist-white text-brutalist-black px-fluid-lg sm:px-fluid-xl py-fluid-md sm:py-fluid-lg border-2 sm:border-4 border-brutalist-white hover:bg-beginner hover:text-beginner-foreground transition-colors brutalist-subtitle touch-target flex flex-col items-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mb-1 sm:mb-fluid-xs text-fluid-base sm:text-fluid-lg">
                  {gameStats.total >= 7 ? 'ZAVRŠI IGRU' : 'SLJEDEĆE PITANJE'}
                </span>
                <span className="text-[10px] sm:text-fluid-xs opacity-50">
                  {gameStats.total >= 7 ? 'Finish Game' : 'Next Question'}
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default QuestionToCaseGame;