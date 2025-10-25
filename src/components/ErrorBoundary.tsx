import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brutalist-black text-brutalist-white flex items-center justify-center p-4">
          <div className="container-responsive max-w-2xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-brutalist-white text-brutalist-black p-fluid-md sm:p-fluid-xl border-4 sm:border-8 border-brutalist-black text-center"
            >
              <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-fluid-md sm:mb-fluid-lg text-brutalist-red" />

              <h1 className="text-fluid-3xl sm:text-fluid-5xl brutalist-title mb-fluid-sm sm:mb-fluid-lg">
                GREŠKA!
              </h1>

              <p className="text-fluid-sm sm:text-fluid-base brutalist-text opacity-60 mb-fluid-md sm:mb-fluid-lg">
                Something went wrong
              </p>

              <div className="bg-brutalist-gray text-brutalist-white p-fluid-sm sm:p-fluid-md mb-fluid-lg border-2 sm:border-4 border-brutalist-black">
                <p className="text-fluid-xs sm:text-fluid-sm font-mono break-all">
                  {this.state.error?.message || 'Unknown error occurred'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-fluid-sm sm:gap-fluid-md justify-center">
                <motion.button
                  onClick={this.handleReset}
                  className="bg-brutalist-black text-brutalist-white px-fluid-md sm:px-fluid-lg py-fluid-sm sm:py-fluid-md border-2 sm:border-4 border-brutalist-black hover:bg-beginner hover:text-beginner-foreground transition-colors flex items-center justify-center gap-fluid-xs sm:gap-fluid-sm brutalist-subtitle touch-target text-fluid-sm sm:text-fluid-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>POKUŠAJ PONOVNO</span>
                </motion.button>

                <Link to="/">
                  <motion.button
                    className="bg-brutalist-gray text-brutalist-white px-fluid-md sm:px-fluid-lg py-fluid-sm sm:py-fluid-md border-2 sm:border-4 border-brutalist-gray hover:bg-brutalist-white hover:text-brutalist-black transition-colors flex items-center justify-center gap-fluid-xs sm:gap-fluid-sm brutalist-subtitle touch-target text-fluid-sm sm:text-fluid-base w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>POČETNA</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
