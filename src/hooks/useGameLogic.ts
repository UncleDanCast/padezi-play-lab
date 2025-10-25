import { useState, useEffect } from 'react';
import { cases, type CaseData } from '@/data/cases';
import { useToast } from '@/hooks/use-toast';

interface GameStats {
  correct: number;
  total: number;
  mistakes: { [key: string]: string }[];
}

interface UseGameLogicProps {
  storageKey: string;
  onCorrectAnswer?: (currentCase: CaseData) => void;
  onIncorrectAnswer?: (currentCase: CaseData, selectedAnswer: string) => void;
  onTimeUp?: (currentCase: CaseData) => void;
}

export const useGameLogic = ({ storageKey, onCorrectAnswer, onIncorrectAnswer, onTimeUp }: UseGameLogicProps) => {
  const { toast } = useToast();

  const [currentIndex, setCurrentIndex] = useState(0);
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
    try {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
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
    setCurrentIndex(randomIndex);
    setShuffledOptions(generateOptionsWithCorrectAnswer(randomIndex));
  }, []);

  // Save hints preference to localStorage
  useEffect(() => {
    if (userHasInteracted) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(hintsMode));
      } catch {
        // Fail silently if localStorage is not available
      }
    }
  }, [hintsMode, userHasInteracted, storageKey]);

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
        item: cases[currentIndex].case,
        selected: 'Vrijeme isteklo',
        correct: cases[currentIndex].questions
      }]
    }));

    const currentCase = cases[currentIndex];
    toast({
      title: "Vrijeme je isteklo!",
      description: `Točan odgovor: ${currentCase.questions}`,
      variant: "destructive",
    });

    if (onTimeUp) {
      onTimeUp(currentCase);
    }

    // Auto-advance after 5 seconds
    const timer = setTimeout(() => {
      handleNextQuestion();
    }, 5000);
    setAutoAdvanceTimer(timer);
  };

  const handleAnswerClick = (selectedCase: CaseData, isCorrect: boolean, mistakeData: { [key: string]: string }) => {
    if (showFeedback) return;

    setSelectedAnswer(selectedCase.questions);
    setShowFeedback(true);
    setTimerActive(false);

    const currentCase = cases[currentIndex];

    if (isCorrect) {
      setScore(score + 1);
      setGameStats(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
      toast({
        title: "Točno!",
        description: `${currentCase.case} odgovara na ${currentCase.questions}`,
        variant: "success",
      });
      if (onCorrectAnswer) {
        onCorrectAnswer(currentCase);
      }
    } else {
      setGameStats(prev => ({
        ...prev,
        total: prev.total + 1,
        mistakes: [...prev.mistakes, mistakeData]
      }));
      toast({
        title: "Netočno!",
        description: `${currentCase.case} odgovara na ${currentCase.questions}`,
        variant: "destructive",
      });
      if (onIncorrectAnswer) {
        onIncorrectAnswer(currentCase, selectedCase.questions);
      }
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

    // Move to next case and generate new options with correct answer
    const nextIndex = (currentIndex + 1) % cases.length;
    setCurrentIndex(nextIndex);
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
    setCurrentIndex(randomIndex);
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

  return {
    // State
    currentIndex,
    currentCase: cases[currentIndex],
    score,
    gameStats,
    shuffledOptions,
    selectedAnswer,
    showFeedback,
    gameComplete,
    timeLeft,
    hintsMode,

    // Actions
    handleAnswerClick,
    handleNextQuestion,
    resetGame,
    toggleHints,
  };
};
