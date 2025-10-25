import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, Lightbulb, Eye, CheckCircle2, Check, X, Trophy, Book } from 'lucide-react';
import { logicPuzzles, type Puzzle } from '@/data/logicPuzzles';

type CellState = 'empty' | 'yes' | 'no';
type GridState = Map<string, CellState>;

interface GameProgress {
  currentPuzzleIndex: number;
  completedPuzzles: number[];
  hintsUsedTotal: number;
  perfectSolves: number;
}

export default function LogicGridGame() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [gridState, setGridState] = useState<GridState>(new Map());
  const [hintsUsed, setHintsUsed] = useState(0);
  const [highlightedClue, setHighlightedClue] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [mistakes, setMistakes] = useState<string[]>([]);

  const currentPuzzle = logicPuzzles[currentPuzzleIndex];

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('logicGridProgress');
    if (saved) {
      const progress: GameProgress = JSON.parse(saved);
      setCurrentPuzzleIndex(progress.currentPuzzleIndex);
      setHintsUsed(0); // Reset hints for current puzzle
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (puzzleIndex: number, completed: number[] = []) => {
    const saved = localStorage.getItem('logicGridProgress');
    const current: GameProgress = saved ? JSON.parse(saved) : {
      currentPuzzleIndex: 0,
      completedPuzzles: [],
      hintsUsedTotal: 0,
      perfectSolves: 0
    };

    const progress: GameProgress = {
      currentPuzzleIndex: puzzleIndex,
      completedPuzzles: [...new Set([...current.completedPuzzles, ...completed])],
      hintsUsedTotal: current.hintsUsedTotal + hintsUsed,
      perfectSolves: current.perfectSolves + (hintsUsed === 0 && completed.length > 0 ? 1 : 0)
    };

    localStorage.setItem('logicGridProgress', JSON.stringify(progress));
  };

  // Get cell key
  const getCellKey = (noun: string, caseName: string) => `${noun}-${caseName}`;

  // Handle cell click
  const handleCellClick = (noun: string, caseName: string) => {
    const key = getCellKey(noun, caseName);
    const current = gridState.get(key) || 'empty';
    const newState = new Map(gridState);

    if (current === 'empty') {
      newState.set(key, 'yes');
    } else if (current === 'yes') {
      newState.set(key, 'no');
    } else {
      newState.delete(key);
    }

    setGridState(newState);
  };

  // Reset grid
  const handleReset = () => {
    if (gridState.size > 0) {
      if (confirm('Are you sure? Your progress will be lost.')) {
        setGridState(new Map());
        setHintsUsed(0);
        setHighlightedClue(null);
      }
    } else {
      setGridState(new Map());
      setHintsUsed(0);
      setHighlightedClue(null);
    }
  };

  // Provide hint
  const handleHint = () => {
    if (hintsUsed === 0) {
      // First hint: highlight a useful clue
      setHighlightedClue(0);
      setHintsUsed(1);
    } else if (hintsUsed === 1) {
      // Second hint: reveal one correct mark
      const firstNoun = currentPuzzle.nouns[0].croatian;
      const correctCase = currentPuzzle.solution[firstNoun];
      const key = getCellKey(firstNoun, correctCase);
      const newState = new Map(gridState);
      newState.set(key, 'yes');
      setGridState(newState);
      setHintsUsed(2);
      setHighlightedClue(null);
    } else {
      // Third hint: reveal another correct mark
      const secondNoun = currentPuzzle.nouns[1].croatian;
      const correctCase = currentPuzzle.solution[secondNoun];
      const key = getCellKey(secondNoun, correctCase);
      const newState = new Map(gridState);
      newState.set(key, 'yes');
      setGridState(newState);
      setHintsUsed(3);
    }
  };

  // Check solution
  const handleCheck = () => {
    const errors: string[] = [];

    // Check if each noun has exactly one 'yes'
    for (const noun of currentPuzzle.nouns) {
      const yesMarks = currentPuzzle.cases.filter(c =>
        gridState.get(getCellKey(noun.croatian, c.name)) === 'yes'
      );

      if (yesMarks.length !== 1) {
        errors.push(`${noun.croatian} must have exactly one case marked as yes`);
        continue;
      }

      // Check if it's the correct case
      const markedCase = yesMarks[0];
      const correctCase = currentPuzzle.solution[noun.croatian];

      if (markedCase.name !== correctCase) {
        errors.push(`${noun.croatian} is marked as ${markedCase.name} but should be ${correctCase}`);
      }
    }

    // Check if each case has exactly one 'yes'
    for (const caseObj of currentPuzzle.cases) {
      const yesMarks = currentPuzzle.nouns.filter(n =>
        gridState.get(getCellKey(n.croatian, caseObj.name)) === 'yes'
      );

      if (yesMarks.length !== 1) {
        errors.push(`${caseObj.name} must have exactly one noun marked as yes`);
      }
    }

    if (errors.length === 0) {
      setShowSuccess(true);
      saveProgress(currentPuzzleIndex, [currentPuzzle.id]);
    } else {
      setMistakes(errors);
      setShowFailure(true);
    }
  };

  // Reveal answer
  const handleReveal = () => {
    if (confirm('This will show the solution. Continue?')) {
      setShowReveal(true);
    }
  };

  // Next puzzle
  const handleNext = () => {
    if (currentPuzzleIndex < logicPuzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
      setGridState(new Map());
      setHintsUsed(0);
      setHighlightedClue(null);
      setShowSuccess(false);
      saveProgress(currentPuzzleIndex + 1);
    } else {
      setShowComplete(true);
    }
  };

  // Get cell state
  const getCellState = (noun: string, caseName: string): CellState => {
    return gridState.get(getCellKey(noun, caseName)) || 'empty';
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-beginner text-beginner-foreground';
      case 'medium': return 'bg-intermediate text-intermediate-foreground';
      case 'hard': return 'bg-advanced text-advanced-foreground';
      default: return 'bg-intermediate text-intermediate-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-brutalist-black">
      {/* Header */}
      <div className="bg-brutalist-black border-b-4 border-brutalist-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-black text-brutalist-white uppercase tracking-tight">
            LEVEL 02
          </h1>
          <Link to="/" className="text-brutalist-white hover:text-brutalist-yellow transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Game Card */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="bg-brutalist-white border-4 border-brutalist-black p-6 md:p-8">
          {/* Game Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                LOGIC GRID
              </h2>
              <span className={`px-3 py-1 text-sm font-bold uppercase ${getDifficultyColor(currentPuzzle.difficulty)}`}>
                {currentPuzzle.difficulty}
              </span>
            </div>
            <p className="text-base md:text-lg font-medium mb-2">
              Use clues to deduce which noun belongs to which Croatian case
            </p>
            <p className="text-sm text-gray-600">
              Puzzle {currentPuzzle.id} of {logicPuzzles.length} • {currentPuzzle.educationalFocus}
            </p>
          </div>

          {/* Main Content - Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
            {/* Clues Panel */}
            <div className="bg-white border-4 border-brutalist-black p-4 order-1 lg:order-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📝</span>
                <h3 className="text-xl font-black uppercase">CLUES</h3>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {currentPuzzle.clues.map((clue, index) => (
                  <div
                    key={index}
                    className={`p-3 border-b-2 border-gray-200 ${
                      highlightedClue === index ? 'bg-brutalist-yellow/20 border-brutalist-yellow' : ''
                    }`}
                  >
                    <span className="font-bold mr-2">{index + 1}.</span>
                    <span className="leading-relaxed">{clue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="order-2 lg:order-2">
              <div className="overflow-x-auto">
                <table className="w-full border-4 border-brutalist-black">
                  <thead>
                    <tr>
                      <th className="bg-brutalist-black text-brutalist-white p-2 md:p-3 border-2 border-brutalist-black font-bold text-xs md:text-sm">
                        Noun
                      </th>
                      {currentPuzzle.cases.map((caseObj) => (
                        <th
                          key={caseObj.name}
                          className="bg-brutalist-black text-brutalist-white p-2 md:p-3 border-2 border-brutalist-black font-bold text-xs md:text-sm"
                        >
                          <div>{caseObj.name}</div>
                          <div className="text-xs font-normal mt-1">({caseObj.question})</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentPuzzle.nouns.map((noun) => (
                      <tr key={noun.croatian}>
                        <td className="bg-gray-100 p-2 md:p-3 border-2 border-brutalist-black font-bold text-xs md:text-sm">
                          <div>{noun.croatian}</div>
                          <div className="text-xs font-normal text-gray-600">({noun.english})</div>
                        </td>
                        {currentPuzzle.cases.map((caseObj) => {
                          const state = getCellState(noun.croatian, caseObj.name);
                          return (
                            <td
                              key={`${noun.croatian}-${caseObj.name}`}
                              className={`p-2 md:p-4 border-2 border-brutalist-black text-center cursor-pointer hover:scale-105 transition-transform min-w-[56px] min-h-[56px] md:min-w-[80px] md:min-h-[80px] ${
                                state === 'yes' ? 'bg-brutalist-yellow' :
                                state === 'no' ? 'bg-gray-200' :
                                'bg-brutalist-white'
                              }`}
                              onClick={() => handleCellClick(noun.croatian, caseObj.name)}
                            >
                              {state === 'yes' && <Check className="w-6 h-6 md:w-8 md:h-8 mx-auto" />}
                              {state === 'no' && <X className="w-6 h-6 md:w-8 md:h-8 mx-auto text-gray-500" />}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Control Buttons */}
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02, skewX: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="bg-brutalist-black text-brutalist-white px-4 py-3 font-bold uppercase border-4 border-brutalist-black hover:bg-brutalist-yellow hover:text-brutalist-black transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden md:inline">Reset</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, skewX: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleHint}
                  disabled={hintsUsed >= 3}
                  className="bg-brutalist-black text-brutalist-white px-4 py-3 font-bold uppercase border-4 border-brutalist-black hover:bg-brutalist-yellow hover:text-brutalist-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span className="hidden md:inline">Hint</span> ({hintsUsed}/3)
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, skewX: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheck}
                  className="bg-brutalist-yellow text-brutalist-black px-4 py-3 font-bold uppercase border-4 border-brutalist-black hover:bg-brutalist-black hover:text-brutalist-white transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Check
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, skewX: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReveal}
                  className="bg-brutalist-black text-brutalist-white px-4 py-3 font-bold uppercase border-4 border-brutalist-black hover:bg-brutalist-yellow hover:text-brutalist-black transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden md:inline">Reveal</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, skewX: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowReference(true)}
                  className="bg-brutalist-black text-brutalist-white px-4 py-3 font-bold uppercase border-4 border-brutalist-black hover:bg-brutalist-yellow hover:text-brutalist-black transition-colors flex items-center justify-center gap-2 min-h-[44px] col-span-2 md:col-span-1"
                >
                  <Book className="w-4 h-4" />
                  What are cases?
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brutalist-white border-4 border-brutalist-black p-6 md:p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <Trophy className="w-16 h-16 mx-auto text-brutalist-yellow mb-4" />
              <h3 className="text-3xl font-black uppercase mb-2">Perfect!</h3>
              <p className="text-lg">You correctly matched all nouns with their cases!</p>
            </div>

            <div className="bg-gray-50 border-2 border-brutalist-black p-4 mb-4">
              <h4 className="font-bold mb-2">Solution:</h4>
              {currentPuzzle.nouns.map((noun) => (
                <div key={noun.croatian} className="mb-1">
                  ✓ {noun.croatian} → {currentPuzzle.solution[noun.croatian]} (
                  {currentPuzzle.cases.find(c => c.name === currentPuzzle.solution[noun.croatian])?.question})
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border-2 border-brutalist-black p-4 mb-6">
              <h4 className="font-bold mb-2">🎓 What you learned:</h4>
              <p className="text-sm">{currentPuzzle.educationalFocus}</p>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              <p>Hints used: {hintsUsed}</p>
            </div>

            <div className="flex gap-3">
              {currentPuzzleIndex < logicPuzzles.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.02, skewX: -2 }}
                  onClick={handleNext}
                  className="flex-1 bg-brutalist-yellow text-brutalist-black px-6 py-3 font-bold uppercase border-4 border-brutalist-black"
                >
                  Next Puzzle
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02, skewX: -2 }}
                  onClick={() => setShowComplete(true)}
                  className="flex-1 bg-brutalist-yellow text-brutalist-black px-6 py-3 font-bold uppercase border-4 border-brutalist-black"
                >
                  Complete!
                </motion.button>
              )}
              <Link to="/" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02, skewX: -2 }}
                  className="w-full bg-brutalist-black text-brutalist-white px-6 py-3 font-bold uppercase border-4 border-brutalist-black"
                >
                  Main Menu
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      {/* Failure Modal */}
      {showFailure && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brutalist-white border-4 border-brutalist-black p-6 md:p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-3xl font-black uppercase mb-2">Not Quite</h3>
              <p className="text-lg">You have {mistakes.length} mistake{mistakes.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="bg-red-50 border-2 border-brutalist-black p-4 mb-6 max-h-64 overflow-y-auto">
              {mistakes.map((mistake, index) => (
                <div key={index} className="mb-2 text-sm">
                  ❌ {mistake}
                </div>
              ))}
            </div>

            <div className="bg-brutalist-yellow/20 border-2 border-brutalist-black p-4 mb-6">
              <p className="font-bold">💡 Tip: Re-read the clues carefully</p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02, skewX: -2 }}
                onClick={() => setShowFailure(false)}
                className="flex-1 bg-brutalist-yellow text-brutalist-black px-6 py-3 font-bold uppercase border-4 border-brutalist-black"
              >
                Try Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, skewX: -2 }}
                onClick={() => {
                  setShowFailure(false);
                  handleReveal();
                }}
                className="flex-1 bg-brutalist-black text-brutalist-white px-6 py-3 font-bold uppercase border-4 border-brutalist-black"
              >
                Show Answer
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reveal Modal */}
      {showReveal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brutalist-white border-4 border-brutalist-black p-6 md:p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <Eye className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-black uppercase mb-2">Solution</h3>
            </div>

            <div className="bg-gray-50 border-2 border-brutalist-black p-4 mb-6">
              <h4 className="font-bold mb-3">Correct answers:</h4>
              {currentPuzzle.nouns.map((noun) => {
                const correctCase = currentPuzzle.solution[noun.croatian];
                const caseObj = currentPuzzle.cases.find(c => c.name === correctCase);
                return (
                  <div key={noun.croatian} className="mb-2 p-2 bg-white border border-gray-300">
                    <div className="font-bold">{noun.croatian} ({noun.english})</div>
                    <div className="text-sm">→ {correctCase}</div>
                    <div className="text-xs text-gray-600">
                      Question: {caseObj?.question} • {caseObj?.description}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              {currentPuzzleIndex < logicPuzzles.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.02, skewX: -2 }}
                  onClick={() => {
                    setShowReveal(false);
                    handleNext();
                  }}
                  className="flex-1 bg-brutalist-yellow text-brutalist-black px-6 py-3 font-bold uppercase border-4 border-brutalist-black"
                >
                  Next Puzzle
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02, skewX: -2 }}
                  onClick={() => {
                    setShowReveal(false);
                    setShowComplete(true);
                  }}
                  className="flex-1 bg-brutalist-yellow text-brutalist-black px-6 py-3 font-bold uppercase border-4 border-brutalist-black"
                >
                  Complete!
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02, skewX: -2 }}
                onClick={() => setShowReveal(false)}
                className="flex-1 bg-brutalist-black text-brutalist-white px-6 py-3 font-bold uppercase border-4 border-brutalist-black"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reference Modal */}
      {showReference && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brutalist-white border-4 border-brutalist-black p-6 md:p-8 max-w-2xl w-full my-8"
          >
            <div className="mb-6">
              <Book className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-3xl font-black uppercase text-center mb-2">Croatian Cases</h3>
              <p className="text-center text-sm text-gray-600">Quick Reference</p>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="bg-gray-50 border-2 border-brutalist-black p-4">
                <h4 className="font-bold text-lg mb-2">1️⃣ NOMINATIV (Tko?/Što?)</h4>
                <p className="text-sm mb-1"><strong>Question:</strong> Who? What?</p>
                <p className="text-sm mb-1"><strong>Use:</strong> Subject of sentence</p>
                <p className="text-sm"><strong>Example:</strong> Majka je ovdje (Mother is here)</p>
              </div>

              <div className="bg-gray-50 border-2 border-brutalist-black p-4">
                <h4 className="font-bold text-lg mb-2">2️⃣ GENITIV (Koga?/Čega?)</h4>
                <p className="text-sm mb-1"><strong>Question:</strong> Of whom? Of what?</p>
                <p className="text-sm mb-1"><strong>Use:</strong> Possession, origin</p>
                <p className="text-sm"><strong>Example:</strong> Knjiga majke (Mother's book)</p>
              </div>

              <div className="bg-gray-50 border-2 border-brutalist-black p-4">
                <h4 className="font-bold text-lg mb-2">3️⃣ AKUZATIV (Koga?/Što?)</h4>
                <p className="text-sm mb-1"><strong>Question:</strong> Whom? What?</p>
                <p className="text-sm mb-1"><strong>Use:</strong> Direct object</p>
                <p className="text-sm"><strong>Example:</strong> Vidim majku (I see mother)</p>
              </div>

              <div className="bg-gray-50 border-2 border-brutalist-black p-4">
                <h4 className="font-bold text-lg mb-2">4️⃣ DATIV (Kome?/Čemu?)</h4>
                <p className="text-sm mb-1"><strong>Question:</strong> To whom? To what?</p>
                <p className="text-sm mb-1"><strong>Use:</strong> Indirect object</p>
                <p className="text-sm"><strong>Example:</strong> Dajem majci (I give to mother)</p>
              </div>

              <div className="bg-gray-50 border-2 border-brutalist-black p-4">
                <h4 className="font-bold text-lg mb-2">5️⃣ LOKATIV (O kom?/O čem?)</h4>
                <p className="text-sm mb-1"><strong>Question:</strong> About whom? About what?</p>
                <p className="text-sm mb-1"><strong>Use:</strong> Location, topic</p>
                <p className="text-sm"><strong>Example:</strong> O majci (About mother)</p>
              </div>

              <div className="bg-gray-50 border-2 border-brutalist-black p-4">
                <h4 className="font-bold text-lg mb-2">6️⃣ INSTRUMENTAL (S kim?/S čim?)</h4>
                <p className="text-sm mb-1"><strong>Question:</strong> With whom? With what?</p>
                <p className="text-sm mb-1"><strong>Use:</strong> Means, accompaniment</p>
                <p className="text-sm"><strong>Example:</strong> S majkom (With mother)</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, skewX: -2 }}
              onClick={() => setShowReference(false)}
              className="w-full mt-6 bg-brutalist-yellow text-brutalist-black px-6 py-3 font-bold uppercase border-4 border-brutalist-black"
            >
              Close
            </motion.button>
          </motion.div>
        </div>
      )}

      {/* Complete Modal */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brutalist-white border-4 border-brutalist-black p-6 md:p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-black uppercase mb-2">Congratulations!</h3>
              <p className="text-lg">You completed all {logicPuzzles.length} puzzles!</p>
            </div>

            <div className="bg-gray-50 border-2 border-brutalist-black p-4 mb-6">
              <h4 className="font-bold mb-2">📊 Your Stats:</h4>
              <div className="space-y-1 text-sm">
                <p>• Puzzles solved: {logicPuzzles.length}/{logicPuzzles.length}</p>
                <p>• You've mastered Croatian case logic!</p>
              </div>
            </div>

            <div className="bg-brutalist-yellow/20 border-2 border-brutalist-black p-4 mb-6">
              <h4 className="font-bold mb-2">🎓 Cases Mastered:</h4>
              <div className="space-y-1 text-sm">
                <p>✓ Nominativ</p>
                <p>✓ Genitiv</p>
                <p>✓ Akuzativ</p>
                <p>✓ Dativ</p>
                <p>✓ Lokativ</p>
                <p>✓ Instrumental</p>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02, skewX: -2 }}
                onClick={() => {
                  setCurrentPuzzleIndex(0);
                  setGridState(new Map());
                  setHintsUsed(0);
                  setShowComplete(false);
                  localStorage.removeItem('logicGridProgress');
                }}
                className="flex-1 bg-brutalist-yellow text-brutalist-black px-6 py-3 font-bold uppercase border-4 border-brutalist-black"
              >
                Play Again
              </motion.button>
              <Link to="/" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02, skewX: -2 }}
                  className="w-full bg-brutalist-black text-brutalist-white px-6 py-3 font-bold uppercase border-4 border-brutalist-black"
                >
                  Main Menu
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
