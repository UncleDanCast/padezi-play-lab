"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Calculator, Target, Brain, Puzzle, Gamepad2, MessageCircle, ArrowRight } from 'lucide-react';

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
      id: 'case-explorer',
      title: 'Case Explorer',
      description: 'Discover Croatian grammatical cases through interactive word exploration and contextual learning',
      difficulty: 'Beginner',
      icon: 'book-open'
    },
    {
      id: 'declension-master',
      title: 'Declension Master',
      description: 'Master noun declensions with guided practice and instant feedback on case transformations',
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
      <header className="relative bg-brutalist-white text-brutalist-black py-16 sm:py-24 lg:py-32 border-b-8 border-brutalist-black">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-brutalist-red transform rotate-45 -translate-x-16 -translate-y-16"></div>
          <div className="absolute top-20 right-10 w-24 h-24 bg-brutalist-yellow"></div>
          <div className="absolute bottom-10 left-20 w-20 h-20 bg-brutalist-gray transform rotate-12"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-brutalist-blue transform rotate-45 translate-x-20 translate-y-20"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-brutalist-black p-4 sm:p-6 transform -rotate-12">
              <MessageCircle className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-brutalist-white" strokeWidth={3} />
            </div>
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] brutalist-title">
              PADEŽI
            </h1>
          </div>
          
          <div className="bg-brutalist-black text-brutalist-white p-6 sm:p-8 lg:p-12 brutalist-skew-right max-w-4xl mx-auto">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl brutalist-subtitle leading-tight transform -skew-x-3">
              MASTER CROATIAN GRAMMAR
            </p>
            <div className="w-full h-2 bg-brutalist-yellow mt-4 sm:mt-6"></div>
          </div>
        </div>
      </header>

      {/* Brutalist Game Sections */}
      <main className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {Object.entries(groupedGames).map(([difficulty, difficultyGames]) => (
          <section key={difficulty} className="mb-20 sm:mb-28 lg:mb-32">
            <div className="mb-12 sm:mb-16 lg:mb-20">
              <div className="flex items-center gap-6 sm:gap-8 mb-6 sm:mb-8">
                <div className={`px-6 py-3 sm:px-8 sm:py-4 ${getDifficultyStyles(difficulty)} brutalist-skew-left`}>
                  <span className="text-lg sm:text-xl lg:text-2xl brutalist-subtitle transform skew-x-12">
                    {difficulty}
                  </span>
                </div>
                <div className="flex-1 h-1 bg-brutalist-white"></div>
              </div>
              
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl brutalist-title text-brutalist-white mb-4 sm:mb-6">
                LEVEL {difficulty === 'Beginner' ? '01' : difficulty === 'Intermediate' ? '02' : '03'}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              {difficultyGames.map((game, index) => (
                <motion.article
                  key={game.id}
                  className="bg-brutalist-white text-brutalist-black border-8 border-brutalist-black relative overflow-hidden group brutalist-hover"
                  whileHover={{
                    scale: 1.02,
                    rotate: index % 2 === 0 ? 1 : -1
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut'
                  }}
                >
                  {/* Geometric Corner Elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-brutalist-black transform rotate-45 translate-x-8 -translate-y-8 group-hover:bg-brutalist-red transition-colors duration-300"></div>
                  
                  <div className="p-8 sm:p-10 lg:p-12 relative z-10">
                    <header className="mb-8 sm:mb-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="bg-brutalist-black text-brutalist-white p-3 sm:p-4 brutalist-rotate-left">
                          {getIcon(game.icon)}
                        </div>
                        <div className={`px-4 py-2 ${getDifficultyStyles(game.difficulty)} brutalist-skew-right text-sm brutalist-subtitle`}>
                          <span className="transform -skew-x-12 inline-block">{game.difficulty}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl brutalist-subtitle leading-tight mb-4 transform -skew-x-2">
                        {game.title}
                      </h3>
                      
                      <div className="w-full h-1 bg-brutalist-black"></div>
                    </header>

                    <main className="mb-8 sm:mb-10">
                      <p className="text-base sm:text-lg brutalist-text leading-tight">
                        {game.description}
                      </p>
                    </main>

                    <footer>
                      <motion.button
                        className="w-full bg-brutalist-black text-brutalist-white brutalist-subtitle py-4 sm:py-5 px-6 sm:px-8 border-4 border-brutalist-black hover:bg-brutalist-white hover:text-brutalist-black hover:border-brutalist-black transition-all duration-200 flex items-center justify-center gap-3 sm:gap-4 text-lg sm:text-xl brutalist-skew-right group"
                        whileHover={{
                          scale: 1.05,
                          skewX: -3
                        }}
                        whileTap={{
                          scale: 0.95
                        }}
                      >
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" strokeWidth={3} />
                        <span className="transform -skew-x-3">START GAME</span>
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={3} />
                      </motion.button>
                    </footer>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Brutalist Footer */}
      <footer className="bg-brutalist-white text-brutalist-black py-16 sm:py-20 border-t-8 border-brutalist-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-2 bg-brutalist-yellow"></div>
          <div className="absolute bottom-0 right-0 w-full h-2 bg-brutalist-red"></div>
          <div className="absolute top-1/2 left-0 w-2 h-full bg-brutalist-gray transform -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-0 w-2 h-full bg-brutalist-blue transform -translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-6xl md:text-7xl brutalist-title leading-none mb-6 sm:mb-8">
            READY TO LEARN?
          </h2>
          <div className="bg-brutalist-black text-brutalist-white p-6 sm:p-8 brutalist-skew-right max-w-2xl mx-auto">
            <p className="text-xl sm:text-2xl brutalist-subtitle transform -skew-x-3">
              Choose your level and start mastering Croatian grammar today
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};