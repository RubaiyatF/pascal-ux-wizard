import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProjectProvider } from "./contexts/ProjectContext";
import { OnboardingProvider, useOnboarding } from "./contexts/OnboardingContext";
import { useApiClient } from "./lib/api";
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
 * Redirects based on authentication and onboarding status:
 * - Not authenticated → /auth
 * - Authenticated but no project → /onboarding
 * - Authenticated with project → /home
 */
const RootRedirect = () => {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { projectId, currentStep, setProjectData, completeOnboarding } = useOnboarding();
  const api = useApiClient();
  const [isChecking, setIsChecking] = useState(true);

  // Check if user has existing projects when they first sign in
  useEffect(() => {
    const checkExistingProjects = async () => {
      if (!isLoaded || !isSignedIn || !userId) {
        setIsChecking(false);
        return;
      }

      // If onboarding context already has a projectId, no need to check
      if (projectId) {
        setIsChecking(false);
        return;
      }

      try {
        console.log('[RootRedirect] Checking for existing projects...');
        const response = await api.get('/api/projects');

        if (response.projects && response.projects.length > 0) {
          // User has existing projects - sync with onboarding context
          const firstProject = response.projects[0];
          console.log('[RootRedirect] Found existing project:', firstProject);

          // We need to get the API key for this project
          const projectDetails = await api.get(`/api/projects/${firstProject.id}`);

          setProjectData({
            projectId: firstProject.id,
            apiKey: projectDetails.apiKey || 'existing', // API key won't be in full form
            projectName: firstProject.name,
            website: firstProject.website,
          });

          completeOnboarding();
        }
      } catch (error) {
        console.error('[RootRedirect] Error checking projects:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkExistingProjects();
  }, [isLoaded, isSignedIn, userId, projectId, api, setProjectData, completeOnboarding]);

  if (!isLoaded || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/auth" replace />;
  }

  // User is authenticated - check onboarding status
  // If no projectId and not at final step, redirect to onboarding
  if (!projectId && currentStep !== "complete") {
    console.log('[RootRedirect] No project found, redirecting to onboarding');
    return <Navigate to="/onboarding" replace />;
  }

  console.log('[RootRedirect] Project found, redirecting to home');
  return <Navigate to="/home" replace />;
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
