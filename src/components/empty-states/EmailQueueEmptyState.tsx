import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Users, Activity, BarChart3, Settings, Sparkles, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatedLogo } from "../AnimatedLogo";
import { useProject } from "@/contexts/ProjectContext";
import { useState, useEffect } from "react";

export const EmailQueueEmptyState = () => {
  const navigate = useNavigate();
  const { currentProject } = useProject();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  // Load completed steps from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`pascal-onboarding-${currentProject}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.completedSteps && Array.isArray(parsed.completedSteps)) {
          setCompletedSteps(parsed.completedSteps);
          
          // Determine the current step to show (first incomplete step)
          let nextStep = 7; // Default to completed
          for (let i = 1; i <= 6; i++) {
            if (!parsed.completedSteps.includes(i)) {
              nextStep = i;
              break;
            }
          }
          setCurrentStep(nextStep);
        }
      } catch (e) {
        console.error('Error loading onboarding progress:', e);
      }
    }

    // Poll for updates every 2 seconds
    const interval = setInterval(() => {
      const updated = localStorage.getItem(`pascal-onboarding-${currentProject}`);
      if (updated) {
        try {
          const parsed = JSON.parse(updated);
          if (parsed.completedSteps && Array.isArray(parsed.completedSteps)) {
            setCompletedSteps(parsed.completedSteps);
            
            let nextStep = 7;
            for (let i = 1; i <= 6; i++) {
              if (!parsed.completedSteps.includes(i)) {
                nextStep = i;
                break;
              }
            }
            setCurrentStep(nextStep);
          }
        } catch (e) {
          console.error('Error loading onboarding progress:', e);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentProject]);

  const stepContent = {
    1: {
      icon: Activity,
      title: "Step 1: Connect Pascal Tracker",
      description: "Add the tracking snippet to your website to start collecting user events",
      action: "Set Up Tracking",
      path: "/home"
    },
    2: {
      icon: Users,
      title: "Step 2: Add Benchmark Users",
      description: "Mark successfully activated users so Pascal can learn ideal activation patterns",
      action: "Add Benchmarks",
      path: "/benchmarks"
    },
    3: {
      icon: Sparkles,
      title: "Step 3: Review User Journeys",
      description: "Monitor tracked users and trigger Pascal's AI to generate personalized emails",
      action: "View Journeys",
      path: "/journey"
    },
    4: {
      icon: Mail,
      title: "You're on Step 4!",
      description: "This is the Email Queue page. Once you complete the previous steps, Pascal will start generating emails here automatically.",
      action: "Continue Setup",
      path: "/home"
    },
    5: {
      icon: BarChart3,
      title: "Step 5: Explore Analytics",
      description: "View detailed metrics and insights about user engagement and email performance",
      action: "View Analytics",
      path: "/analytics"
    },
    6: {
      icon: Settings,
      title: "Step 6: Configure Reply Email",
      description: "Set up your reply email address to track customer responses in user journeys",
      action: "Go to Settings",
      path: "/settings"
    },
    7: {
      icon: CheckCircle2,
      title: "Setup Complete! Waiting for AI Emails",
      description: "Great job! You've completed all setup steps. Pascal is now analyzing user behavior and will generate personalized emails automatically. Check back soon!",
      action: "Review Setup",
      path: "/home"
    }
  };

  const content = stepContent[currentStep as keyof typeof stepContent] || stepContent[1];
  const StepIcon = content.icon;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] animate-fade-in px-4">
      <div className="max-w-2xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full overflow-hidden mb-6 bg-white p-4">
            <AnimatedLogo />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            {currentStep === 7 ? 'All Set!' : 'Complete Your Setup'}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            {currentStep === 7 
              ? "Pascal will automatically generate personalized emails once user activity is detected"
              : "Follow the steps to start receiving AI-generated emails for user activation"
            }
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                className={`h-2 w-12 rounded-full transition-all duration-300 ${
                  completedSteps.includes(step)
                    ? 'bg-success'
                    : step === currentStep
                    ? 'bg-primary'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current Step Card */}
        <Card className="p-8 border-border bg-gradient-subtle">
          <div className="flex items-start gap-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 ${
              currentStep === 7 ? 'bg-success/10' : 'bg-primary/10'
            }`}>
              <StepIcon className={`w-8 h-8 ${
                currentStep === 7 ? 'text-success' : 'text-primary'
              }`} />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">
                {content.title}
              </h2>
              <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                {content.description}
              </p>
              
              <Button 
                onClick={() => navigate(content.path)}
                className="bg-gradient-hero hover:opacity-90"
                size="lg"
              >
                {content.action}
              </Button>
            </div>
          </div>
        </Card>

        {/* Completed Steps Summary */}
        {completedSteps.length > 0 && currentStep < 7 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {completedSteps.length} of 6 setup steps completed
            </p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/home')}
            className="gap-2"
          >
            <Activity className="w-4 h-4" />
            View All Setup Steps
          </Button>
        </div>
      </div>
    </div>
  );
};
