import React from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Calculator, Target, Brain, Puzzle, Gamepad2, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InstallPrompt } from './InstallPrompt';

interface GameData {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: 'book-open' | 'calculator' | 'target' | 'brain' | 'puzzle' | 'gamepad2';
}

export const PadeziLandingPage = () => {
  const games: GameData[] = [
    {
      id: 'case-match',
      title: 'Padež Povezivanje',
      description: 'Test your speed matching Croatian case names to their questions. Fast-paced, timed challenges with immediate feedback - no grammar tables, just pure case recognition practice',
      difficulty: 'Beginner',
      icon: 'book-open'
    },
    {
      id: 'question-to-case',
      title: 'Case Detective',
      description: 'See the questions, identify the case! Flip the challenge - given Croatian question words, select which grammatical case they belong to',
      difficulty: 'Beginner',
      icon: 'calculator'
    },
    {
      id: 'logic-grid',
      title: 'Logic Grid',
      description: 'Use deductive reasoning to solve complex grid puzzles',
      difficulty: 'Intermediate',
      icon: 'target'
    },
    {
      id: 'pattern-master',
      title: 'Pattern Master',
      description: 'Identify and complete intricate visual patterns',
      difficulty: 'Intermediate',
      icon: 'brain'
    },
    {
      id: 'strategy-quest',
      title: 'Strategy Quest',
      description: 'Plan your moves carefully in this strategic adventure',
      difficulty: 'Advanced',
      icon: 'gamepad2'
    },
    {
      id: 'mind-maze',
      title: 'Mind Maze',
      description: 'Navigate through complex mental challenges and puzzles',
      difficulty: 'Advanced',
      icon: 'brain'
    }
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'book-open':
        return <BookOpen className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={3} />;
      case 'calculator':
        return <Calculator className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={3} />;
      case 'target':
        return <Target className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={3} />;
      case 'brain':
        return <Brain className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={3} />;
      case 'puzzle':
        return <Puzzle className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={3} />;
      case 'gamepad2':
        return <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={3} />;
      default:
        return <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={3} />;
    }
  };

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-beginner text-beginner-foreground';
      case 'Intermediate':
        return 'bg-intermediate text-intermediate-foreground';
      case 'Advanced':
        return 'bg-advanced text-advanced-foreground';
      default:
        return 'bg-brutalist-gray text-brutalist-black';
    }
  };

  const groupedGames = {
    Beginner: games.filter(game => game.difficulty === 'Beginner'),
    Intermediate: games.filter(game => game.difficulty === 'Intermediate'),
    Advanced: games.filter(game => game.difficulty === 'Advanced')
  };

  return (
    <div className="min-h-screen bg-brutalist-black text-brutalist-white overflow-x-hidden">
      {/* Brutalist Header */}
      <header className="relative bg-brutalist-white text-brutalist-black py-fluid-xl sm:py-fluid-2xl lg:py-fluid-3xl border-b-4 sm:border-b-8 border-brutalist-black">
        {/* Geometric Background Elements - Responsive */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-brutalist-red transform rotate-45 -translate-x-8 -translate-y-8 sm:-translate-x-12 sm:-translate-y-12 lg:-translate-x-16 lg:-translate-y-16"></div>
          <div className="absolute top-10 right-5 w-12 h-12 sm:top-20 sm:right-10 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-brutalist-yellow"></div>
          <div className="absolute bottom-5 left-10 w-10 h-10 sm:bottom-10 sm:left-20 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-brutalist-gray transform rotate-12"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-brutalist-blue transform rotate-45 translate-x-10 translate-y-10 sm:translate-x-16 sm:translate-y-16 lg:translate-x-20 lg:translate-y-20"></div>
        </div>

        <div className="container-responsive relative z-10 text-center">
          {/* Mobile-optimized header layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-fluid-lg sm:mb-fluid-xl">
            <div className="bg-brutalist-black p-3 sm:p-4 lg:p-6 transform -rotate-6 sm:-rotate-12 touch-target">
              <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-brutalist-white" strokeWidth={3} />
            </div>
            <h1 className="brutalist-title text-center">
              PADEŽI
            </h1>
          </div>
          
          <div className="bg-brutalist-black text-brutalist-white p-fluid-md sm:p-fluid-lg lg:p-fluid-xl brutalist-skew-right max-w-full sm:max-w-4xl mx-auto">
            <p className="brutalist-subtitle leading-tight transform -skew-x-3">
              MASTER CROATIAN GRAMMAR
            </p>
            <div className="w-full h-1 sm:h-2 bg-brutalist-yellow mt-fluid-sm"></div>
          </div>
        </div>
      </header>

      {/* Brutalist Game Sections */}
      <main className="container-responsive py-fluid-xl sm:py-fluid-2xl lg:py-fluid-3xl">
        {Object.entries(groupedGames).map(([difficulty, difficultyGames]) => (
          <section key={difficulty} className="mb-fluid-2xl sm:mb-fluid-3xl">
            <div className="mb-fluid-xl sm:mb-fluid-2xl">
              {/* Mobile-first difficulty indicator */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-8 mb-fluid-md sm:mb-fluid-lg">
                <div className={`px-fluid-md py-fluid-sm sm:px-fluid-lg sm:py-fluid-md ${getDifficultyStyles(difficulty)} brutalist-skew-left touch-target`}>
                  <span className="text-fluid-sm sm:text-fluid-lg lg:text-fluid-xl brutalist-subtitle transform skew-x-6 sm:skew-x-12 inline-block">
                    {difficulty}
                  </span>
                </div>
                <div className="flex-1 h-0.5 sm:h-1 bg-brutalist-white"></div>
              </div>
              
              <h2 className="brutalist-section-title text-brutalist-white mb-fluid-sm sm:mb-fluid-md">
                LEVEL {difficulty === 'Beginner' ? '01' : difficulty === 'Intermediate' ? '02' : '03'}
              </h2>
            </div>

            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16">
              {difficultyGames.map((game, index) => (
                <motion.article
                  key={game.id}
                  className="bg-brutalist-white text-brutalist-black border-2 xs:border-3 sm:border-4 md:border-5 lg:border-6 xl:border-8 border-brutalist-black relative overflow-hidden group brutalist-hover hover:scale-105 md:hover:rotate-1 md:odd:hover:-rotate-1 transition-transform duration-300"
                  whileHover={{
                    scale: 1.02,
                    rotate: index % 2 === 0 ? 1 : -1
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut'
                  }}
                >
                  {/* Geometric Corner Elements - Responsive */}
                  <div className="absolute top-0 right-0 w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-brutalist-black transform rotate-45 translate-x-3 -translate-y-3 xs:translate-x-4 xs:-translate-y-4 sm:translate-x-5 sm:-translate-y-5 md:translate-x-6 md:-translate-y-6 lg:translate-x-8 lg:-translate-y-8 group-hover:bg-brutalist-red transition-colors duration-300"></div>
                  
                  <div className="p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10 2xl:p-12 relative z-10">
                      <header className="mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8">
                        <div className="flex items-start justify-between mb-3 xs:mb-4 sm:mb-5 md:mb-6">
                          <div className="bg-brutalist-black text-brutalist-white p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 brutalist-rotate-left touch-target">
                            {getIcon(game.icon)}
                          </div>
                          <div className={`px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 ${getDifficultyStyles(game.difficulty)} brutalist-skew-right text-xs sm:text-sm md:text-base brutalist-subtitle touch-target`}>
                            <span className="transform -skew-x-3 xs:-skew-x-6 sm:-skew-x-9 md:-skew-x-12 inline-block">{game.difficulty}</span>
                          </div>
                        </div>
                      
                        <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl brutalist-subtitle leading-tight mb-2 xs:mb-3 sm:mb-4 transform -skew-x-1 sm:-skew-x-2">
                          {game.id === 'case-match' ? 'Case Match' : game.id === 'question-to-case' ? 'Case Detective' : game.title}
                        </h3>
                        
                        <div className="w-full h-0.5 sm:h-1 md:h-1.5 lg:h-2 bg-brutalist-black"></div>
                    </header>

                      <main className="mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8">
                        <p className="text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed brutalist-text">
                          {game.description}
                        </p>
                      </main>

                    <footer>
                      <Link to={game.id === 'case-match' ? '/case-match' : game.id === 'question-to-case' ? '/question-to-case' : '#'}>
                        <motion.button
                          className="w-full bg-brutalist-black text-brutalist-white brutalist-subtitle py-3 xs:py-4 sm:py-5 md:py-6 px-4 xs:px-5 sm:px-6 md:px-7 border-2 xs:border-3 sm:border-4 md:border-5 border-brutalist-black hover:bg-brutalist-white hover:text-brutalist-black hover:border-brutalist-black transition-all duration-200 flex items-center justify-center gap-2 xs:gap-3 sm:gap-4 text-sm xs:text-base sm:text-lg md:text-xl brutalist-skew-right group touch-target min-h-[44px] xs:min-h-[48px] sm:min-h-[52px] md:min-h-[56px]"
                          whileHover={{
                            scale: 1.02,
                            skewX: -2
                          }}
                          whileTap={{
                            scale: 0.98
                          }}
                        >
                          <Play className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:rotate-90 transition-transform duration-300" strokeWidth={3} />
                          <span className="transform -skew-x-1 xs:-skew-x-2 sm:-skew-x-3 font-semibold">START GAME</span>
                          <ArrowRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:translate-x-1 xs:group-hover:translate-x-1.5 sm:group-hover:translate-x-2 transition-transform duration-300" strokeWidth={3} />
                        </motion.button>
                      </Link>
                    </footer>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Brutalist Footer */}
      <footer className="bg-brutalist-white text-brutalist-black py-fluid-xl sm:py-fluid-2xl border-t-4 sm:border-t-8 border-brutalist-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-brutalist-yellow"></div>
          <div className="absolute bottom-0 right-0 w-full h-1 sm:h-2 bg-brutalist-red"></div>
          <div className="absolute top-1/2 left-0 w-1 sm:w-2 h-full bg-brutalist-gray transform -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-0 w-1 sm:w-2 h-full bg-brutalist-blue transform -translate-y-1/2"></div>
        </div>
        
        <div className="container-responsive relative z-10 text-center">
          <h2 className="text-fluid-4xl sm:text-fluid-6xl lg:text-fluid-7xl brutalist-title leading-none mb-fluid-md sm:mb-fluid-lg">
            READY TO LEARN?
          </h2>
          <div className="bg-brutalist-black text-brutalist-white p-fluid-md sm:p-fluid-lg brutalist-skew-right max-w-full sm:max-w-2xl mx-auto">
            <p className="text-fluid-lg sm:text-fluid-xl brutalist-subtitle transform -skew-x-1 sm:-skew-x-3">
              Choose your level and start mastering Croatian grammar today
            </p>
          </div>
        </div>
      </footer>

      {/* Install Prompt for PWA */}
      <InstallPrompt />
    </div>
  );
};