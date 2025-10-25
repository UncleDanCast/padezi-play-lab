import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";

// Lazy load game components for code splitting
const CaseMatchGame = lazy(() => import("./pages/CaseMatchGame"));
const QuestionToCaseGame = lazy(() => import("./pages/QuestionToCaseGame"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen bg-brutalist-black text-brutalist-white flex items-center justify-center">
    <div className="text-center">
      <div className="text-4xl brutalist-title mb-4">UČITAVANJE...</div>
      <div className="text-lg opacity-60">Loading...</div>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ErrorBoundary>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/case-match" element={<CaseMatchGame />} />
              <Route path="/question-to-case" element={<QuestionToCaseGame />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
