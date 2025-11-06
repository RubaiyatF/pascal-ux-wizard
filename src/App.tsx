import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ProjectProvider } from "./contexts/ProjectContext";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="pascal-theme">
      <TooltipProvider>
        <ProjectProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route
                path="/home"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/email-queue"
                element={
                  <Layout>
                    <EmailQueue />
                  </Layout>
                }
              />
              <Route
                path="/journey"
                element={
                  <Layout>
                    <Journey />
                  </Layout>
                }
              />
              <Route
                path="/benchmarks"
                element={
                  <Layout>
                    <Benchmarks />
                  </Layout>
                }
              />
              <Route
                path="/analytics"
                element={
                  <Layout>
                    <Analytics />
                  </Layout>
                }
              />
              <Route
                path="/settings"
                element={
                  <Layout>
                    <Settings />
                  </Layout>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProjectProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
