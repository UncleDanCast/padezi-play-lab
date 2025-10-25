import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { BrowserSupport } from "@/components/BrowserSupport";
import { LoadingProgress } from "@/components/LoadingProgress";
import Index from "./pages/Index";

// Lazy load game components for code splitting
const CaseMatchGame = lazy(() => import("./pages/CaseMatchGame"));
const QuestionToCaseGame = lazy(() => import("./pages/QuestionToCaseGame"));
const LogicGridGame = lazy(() => import("./pages/LogicGridGame"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserSupport />
      <ErrorBoundary>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingProgress />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/case-match" element={<CaseMatchGame />} />
              <Route path="/question-to-case" element={<QuestionToCaseGame />} />
              <Route path="/logic-grid" element={<LogicGridGame />} />
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
