import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Trophy, Clock, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cases, type CaseData } from '@/data/cases';

interface GameStats {
  correct: number;
  total: number;
  mistakes: { questions: string; selected: string; correct: string }[];
}

const QuestionToCaseGame = () => {
  const { toast } = useToast();

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
  const [hintsMode, setHintsMode] = useState(() => {
    const saved = localStorage.getItem('questionToCaseHints');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [showDemonstration, setShowDemonstration] = useState(() => {
    const demonstrated = localStorage.getItem('questionToCaseHintsDemonstrated');
    return demonstrated !== 'true';
  });
  const [userHasInteracted, setUserHasInteracted] = useState(false);

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

  // Save hints preference to localStorage
  useEffect(() => {
    if (userHasInteracted) {
      localStorage.setItem('questionToCaseHints', JSON.stringify(hintsMode));
    }
  }, [hintsMode, userHasInteracted]);

  // Demonstration effect
  useEffect(() => {
    if (showDemonstration) {
      const demonstrateHints = async () => {
        // Wait 2 seconds before starting demonstration
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Toggle 3 times with 1.2 second intervals
        for (let i = 0; i < 3; i++) {
          setHintsMode(prev => !prev);
          await new Promise(resolve => setTimeout(resolve, 1200));
        }

        // End with hints off
        setHintsMode(false);

        // Wait a bit more before completing
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mark demonstration as completed
        localStorage.setItem('questionToCaseHintsDemonstrated', 'true');
        setShowDemonstration(false);
      };

      demonstrateHints();
    }
  }, [showDemonstration]);

  const toggleHints = () => {
    setUserHasInteracted(true);
    setHintsMode(!hintsMode);
  };

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
      description: `Točan odgovor: ${currentQuestion.case}`,
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
      description: `${currentQuestion.questions} pripada ${currentQuestion.case}u`,
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
        description: `${currentQuestion.questions} pripada ${currentQuestion.case}u`,
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
      <header className="bg-brutalist-white text-brutalist-black border-b border-b-2 sm:border-b-3 md:border-b-4 lg:border-b-6 xl:border-b-8 border-brutalist-black">
        <div className="container-responsive py-1.5 xs:py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6">
          {/* Mobile Layout - Ultra Compact (up to md) */}
          <div className="flex items-center justify-between md:hidden">
            <Link to="/">
              <motion.button
                className="bg-brutalist-black text-brutalist-white p-1.5 sm:p-2 border border-brutalist-black hover:bg-brutalist-gray transition-colors touch-target min-w-[44px] min-h-[44px] flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </motion.button>
            </Link>
            
            <div className="bg-brutalist-black text-brutalist-white px-2.5 sm:px-3 py-1 sm:py-1.5 border border-brutalist-black text-xs sm:text-sm font-bold">
              {score}/7
            </div>
            
            <div className={`px-2.5 sm:px-3 py-1 sm:py-1.5 border flex items-center gap-1 text-xs sm:text-sm font-bold ${
              timeLeft <= 10 ? 'bg-advanced text-advanced-foreground border-advanced animate-pulse' : 'bg-intermediate text-intermediate-foreground border-intermediate'
            }`}>
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {timeLeft}
            </div>
          </div>

          {/* Tablet & Desktop Layout (md and up) */}
          <div className="hidden md:flex items-center justify-between">
            <Link to="/">
              <motion.button
                className="bg-brutalist-black text-brutalist-white px-4 md:px-5 lg:px-6 xl:px-8 py-2 md:py-3 lg:py-4 border-3 md:border-4 lg:border-6 border-brutalist-black hover:bg-brutalist-gray transition-colors flex items-center gap-2 md:gap-3 brutalist-subtitle touch-target text-sm md:text-base lg:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                <span className="hidden lg:inline xl:inline">POVRATAK</span>
              </motion.button>
            </Link>
            
            <div className="flex items-center gap-4 md:gap-6 lg:gap-8 xl:gap-10">
              <div className="bg-brutalist-black text-brutalist-white px-4 md:px-5 lg:px-6 xl:px-8 py-2 md:py-3 lg:py-4 border-3 md:border-4 lg:border-6 border-brutalist-black brutalist-subtitle text-sm md:text-base lg:text-lg">
                Rezultat: {score}/7
              </div>
              
              <div className={`px-4 md:px-5 lg:px-6 xl:px-8 py-2 md:py-3 lg:py-4 border-3 md:border-4 lg:border-6 flex items-center gap-2 md:gap-3 brutalist-subtitle text-sm md:text-base lg:text-lg ${
                timeLeft <= 10 ? 'bg-advanced text-advanced-foreground border-advanced animate-pulse' : 'bg-intermediate text-intermediate-foreground border-intermediate'
              }`}>
                <Clock className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                {timeLeft}s
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="container-responsive py-4 xs:py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 flex-1 flex flex-col justify-center min-h-[calc(100vh-120px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20"
          >
            {/* Question Box - Responsive and optimized */}
            <div className="bg-intermediate text-intermediate-foreground p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border-3 sm:border-4 md:border-6 lg:border-8 border-intermediate w-full max-w-sm xs:max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto mb-4 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-12 brutalist-skew-right">
              <div className="transform -skew-x-12">
                <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl brutalist-title mb-2 xs:mb-3 sm:mb-4 md:mb-6 break-words leading-tight">
                  {cases[currentQuestionIndex].questions}
                </h1>
                {hintsMode && (
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold tracking-wide opacity-90 leading-snug">
                    {cases[currentQuestionIndex].description}
                  </p>
                )}
              </div>
            </div>
            
            {/* Instructions - Responsive typography */}
            <div className="space-y-1 xs:space-y-2">
              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl brutalist-text opacity-80">
                Koji padež odgovara na ova pitanja?
              </p>
              <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl brutalist-text opacity-50">
                Which case corresponds to these questions?
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Answer Options Grid - Comprehensive responsive grid */}
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-8 2xl:gap-10 w-full max-w-sm xs:max-w-md sm:max-w-3xl md:max-w-5xl lg:max-w-7xl xl:max-w-screen-2xl mx-auto mb-6 xs:mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          {shuffledOptions.slice(0, 4).map((option, index) => (
            <motion.button
              key={`${option.case}-${currentQuestionIndex}`}
              onClick={() => handleAnswerClick(option)}
              disabled={showFeedback}
              className={`p-3 xs:p-4 sm:p-6 md:p-8 lg:p-6 xl:p-8 2xl:p-10 border-2 sm:border-3 md:border-4 lg:border-5 xl:border-6 transition-all duration-300 brutalist-text min-h-[80px] xs:min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px] flex flex-col justify-center items-center touch-target rounded-md sm:rounded-lg md:rounded-xl text-center ${getOptionStyle(option)}`}
              whileHover={!showFeedback ? { scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 } : {}}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl brutalist-subtitle mb-1 xs:mb-2 sm:mb-3 md:mb-4 leading-tight">
                {option.case}
              </div>
              {hintsMode && (
                <>
                  <div className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl opacity-70 mb-1 xs:mb-2 sm:mb-3 text-center leading-tight px-1">
                    {option.questions}
                  </div>
                  <div className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg opacity-50 text-center leading-tight px-1">
                    {option.description}
                  </div>
                </>
              )}
            </motion.button>
          ))}
        </div>

        {/* Next Button - Responsive positioning and sizing */}
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
                className="bg-brutalist-white text-brutalist-black px-6 xs:px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-3 xs:py-4 sm:py-6 md:py-8 lg:py-10 border-2 sm:border-3 md:border-4 lg:border-6 border-brutalist-white hover:bg-beginner hover:text-beginner-foreground transition-colors brutalist-subtitle touch-target flex flex-col items-center mx-auto text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mb-1 xs:mb-2 sm:mb-3">
                  {gameStats.total >= 7 ? 'ZAVRŠI IGRU' : 'SLJEDEĆE PITANJE'}
                </span>
                <span className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg opacity-50">
                  {gameStats.total >= 7 ? 'Finish Game' : 'Next Question'}
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Hints Button - Multi-resolution responsive */}
        <motion.button
          onClick={toggleHints}
          className={`fixed bottom-3 xs:bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-3 xs:right-4 sm:right-6 md:right-8 lg:right-10 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full border-3 sm:border-4 md:border-5 lg:border-6 shadow-2xl z-50 flex flex-col items-center justify-center transition-all duration-300 ${
            hintsMode
              ? 'bg-beginner text-beginner-foreground border-beginner hover:bg-beginner/90'
              : 'bg-brutalist-white text-brutalist-black border-brutalist-black hover:bg-brutalist-yellow'
          } ${showDemonstration ? 'animate-pulse' : ''}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={hintsMode ? "Sakrij savjete / Hide hints" : "Prikaži savjete / Show hints"}
          disabled={showDemonstration}
        >
          <Lightbulb className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 mb-0.5 xs:mb-1 ${showDemonstration ? 'animate-bounce' : ''}`} />
          <div className="text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs font-bold leading-none text-center">
            <div>{hintsMode ? 'SAKRIJ' : 'SAVJETI'}</div>
            <div className="opacity-60">{hintsMode ? 'HIDE' : 'HINTS'}</div>
          </div>
        </motion.button>
      </main>
    </div>
  );
};

export default QuestionToCaseGame;