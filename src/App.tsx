import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useAuth } from "@clerk/clerk-react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProjectProvider } from "./contexts/ProjectContext";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import EmailQueue from "./pages/EmailQueue";
import Journey from "./pages/Journey";
import Benchmarks from "./pages/Benchmarks";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Root Redirect Component
 * Redirects to /home if authenticated, /auth if not
 */
const RootRedirect = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <Navigate to={isSignedIn ? "/home" : "/auth"} replace />;
};

/**
 * Auth Page Wrapper
 * Shows loading state while Clerk initializes
 * Auth component itself handles already-signed-in state
 */
const AuthPage = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <Auth />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="pascal-theme">
      <TooltipProvider>
        <ProjectProvider>
          <OnboardingProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<RootRedirect />} />
                <Route path="/auth" element={<AuthPage />} />

                {/* Protected Routes - All require authentication */}
                <Route
                  path="/onboarding"
                  element={
                    <ProtectedRoute>
                      <Onboarding />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Home />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/email-queue"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <EmailQueue />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/journey"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Journey />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/benchmarks"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Benchmarks />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Analytics />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Settings />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* 404 Page - Also protected (redirects to auth if not signed in) */}
                <Route
                  path="*"
                  element={
                    <ProtectedRoute>
                      <NotFound />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </OnboardingProvider>
        </ProjectProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
