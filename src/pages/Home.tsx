import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ChevronRight,
  Copy,
  Mail,
  Users,
  Activity,
  BarChart3,
  Settings,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useApiClient } from "@/lib/api";
import { TrackerVerificationModal } from "@/components/home/TrackerVerificationModal";
import { CompletionCelebrationModal } from "@/components/home/CompletionCelebrationModal";
import { HelpModal } from "@/components/home/HelpModal";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projectId, apiKey, projectName, website } = useOnboarding();
  const api = useApiClient();

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [isCelebrationModalOpen, setIsCelebrationModalOpen] = useState(false);
  const [helpModalType, setHelpModalType] = useState<'support' | 'docs' | 'documentation' | null>(null);

  // Generate tracker snippet with real project data
  const trackerSnippet = projectId && apiKey
    ? `<script
  src="https://tracker.pascal.cx/simple-snippet.js"
  data-project-id="${projectId}"
  data-api-key="${apiKey}"
  data-recording="true"
  async
></script>`
    : `<!-- Complete onboarding to get your tracking snippet -->`;

  const handleCopySnippet = () => {
    if (!projectId || !apiKey) {
      toast({
        title: "Not ready yet",
        description: "Please complete onboarding first",
        variant: "destructive",
      });
      return;
    }

    navigator.clipboard.writeText(trackerSnippet);
    toast({
      title: "Copied to clipboard",
      description: "Paste this snippet into your website's <head> tag",
    });
  };

  // Poll for events to auto-complete step 1
  const { data: eventsData } = useQuery({
    queryKey: ["project-events", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/events`),
    enabled: !!projectId && !completedSteps.includes(1),
    refetchInterval: 5000, // Poll every 5 seconds
  });

  // Poll for benchmark users to auto-complete step 2
  const { data: benchmarkData } = useQuery({
    queryKey: ["benchmark-users", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/benchmark-users`),
    enabled: !!projectId && !completedSteps.includes(2),
    refetchInterval: 3000, // Poll every 3 seconds
  });

  // Auto-complete step 1 when events are detected
  useEffect(() => {
    if (eventsData && eventsData.events && eventsData.events.length > 0) {
      markStepComplete(1);
    }
  }, [eventsData]);

  // Auto-complete step 2 when benchmark users are added
  useEffect(() => {
    if (benchmarkData && benchmarkData.benchmarks && benchmarkData.benchmarks.length > 0) {
      markStepComplete(2);
    }
  }, [benchmarkData]);

  const toggleStep = (step: number) => {
    setExpandedStep(expandedStep === step ? null : step);
  };

  const markStepComplete = (step: number) => {
    setCompletedSteps(prev => {
      if (prev.includes(step)) return prev;

      const newCompleted = [...prev, step].sort((a, b) => a - b);

      // Auto-expand next step after a short delay
      setTimeout(() => {
        if (step < 8) {
          setExpandedStep(step + 1);
        }
      }, 300);

      // Show celebration modal if this is the last required step (step 7)
      if (step === 7 && newCompleted.length === 7) {
        setTimeout(() => {
          setIsCelebrationModalOpen(true);
        }, 500);
      }

      return newCompleted;
    });
  };

  const handleTrackerVerified = () => {
    markStepComplete(1);
  };

  const handleNavigateToPage = (step: number, path: string) => {
    // Don't mark complete here - let the actual page mark it when action is performed
    navigate(path);
  };

  const openHelpModal = (type: 'support' | 'docs' | 'documentation') => {
    setHelpModalType(type);
  };

  // Load initial completed steps from localStorage
  useEffect(() => {
    // Always reset state first when project changes to prevent state leakage
    setCompletedSteps([]);
    setExpandedStep(1);

    if (!projectId) return;

    const saved = localStorage.getItem(`pascal-homepage-steps-${projectId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.completedSteps && Array.isArray(parsed.completedSteps)) {
          setCompletedSteps(parsed.completedSteps);

          // Find first incomplete step to expand
          if (parsed.completedSteps.length < 7) {
            for (let i = 1; i <= 7; i++) {
              if (!parsed.completedSteps.includes(i)) {
                setExpandedStep(i);
                break;
              }
            }
          } else {
            // All steps complete, expand the final "You're all set" step
            setExpandedStep(8);
          }
        }
      } catch (e) {
        console.error('Error loading homepage progress:', e);
      }
    }
  }, [projectId]);

  // Check for step completions from other pages via localStorage flags
  useEffect(() => {
    if (!projectId) return;

    const checkCompletions = () => {
      const journeyVisited = localStorage.getItem(`pascal-journey-visited-${projectId}`);
      const emailProviderConfigured = localStorage.getItem(`pascal-email-provider-${projectId}`);
      const emailQueueVisited = localStorage.getItem(`pascal-email-queue-visited-${projectId}`);
      const analyticsVisited = localStorage.getItem(`pascal-analytics-visited-${projectId}`);
      const settingsVisited = localStorage.getItem(`pascal-settings-visited-${projectId}`);

      setCompletedSteps(prev => {
        const newSteps = [...prev];
        let hasChanges = false;

        if (journeyVisited && !prev.includes(3)) {
          newSteps.push(3);
          hasChanges = true;
        }
        if (emailProviderConfigured && !prev.includes(4)) {
          newSteps.push(4);
          hasChanges = true;
        }
        if (emailQueueVisited && !prev.includes(5)) {
          newSteps.push(5);
          hasChanges = true;
        }
        if (analyticsVisited && !prev.includes(6)) {
          newSteps.push(6);
          hasChanges = true;
        }
        if (settingsVisited && !prev.includes(7)) {
          newSteps.push(7);
          hasChanges = true;
        }

        // If steps changed, update expanded step to next incomplete one
        if (hasChanges) {
          const sortedSteps = newSteps.sort((a, b) => a - b);

          // Find first incomplete step
          let nextStep = 8; // Default to final step
          for (let i = 1; i <= 7; i++) {
            if (!sortedSteps.includes(i)) {
              nextStep = i;
              break;
            }
          }

          setExpandedStep(nextStep);
        }

        return hasChanges ? newSteps : prev;
      });
    };

    // Check immediately on mount
    checkCompletions();

    // Poll for updates every 1 second
    const interval = setInterval(checkCompletions, 1000);

    // Also check when window gains focus (user returns from another page)
    window.addEventListener('focus', checkCompletions);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', checkCompletions);
    };
  }, [projectId]);

  // Show toast when steps are completed
  useEffect(() => {
    if (!projectId) return;

    const prevCompleted = JSON.parse(
      localStorage.getItem(`pascal-homepage-prev-${projectId}`) || '[]'
    );

    // Find newly completed steps
    const newlyCompleted = completedSteps.filter(
      step => !prevCompleted.includes(step)
    );

    // Show toast for each newly completed step
    if (newlyCompleted.length > 0 && prevCompleted.length > 0) {
      const stepNames = ['', 'Tracker', 'Benchmarks', 'Journey', 'Email Provider', 'Email Queue', 'Analytics', 'Settings'];
      newlyCompleted.forEach(step => {
        if (step >= 1 && step <= 7) {
          toast({
            title: "Step completed! ✓",
            description: `${stepNames[step]} step is now complete`,
          });
        }
      });
    }

    // Save current state
    localStorage.setItem(
      `pascal-homepage-prev-${projectId}`,
      JSON.stringify(completedSteps)
    );
  }, [completedSteps, projectId, toast]);

  // Save completed steps to localStorage
  useEffect(() => {
    if (!projectId) return;

    if (completedSteps.length > 0) {
      localStorage.setItem(
        `pascal-homepage-steps-${projectId}`,
        JSON.stringify({ completedSteps })
      );
    }
  }, [completedSteps, projectId]);

  const steps = [
    {
      id: 1,
      title: "Connect Pascal tracker",
      description: "Add the tracking snippet to your website to start collecting events",
      icon: Activity,
      estimatedTime: "5 min",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Copy and paste this snippet into your website's <code className="px-2 py-1 bg-muted rounded text-xs">&lt;head&gt;</code> tag to start tracking user events.
          </p>
          {projectId && apiKey ? (
            <>
              <div className="relative">
                <pre className="bg-muted p-4 rounded border border-border overflow-x-auto text-xs">
                  <code>{trackerSnippet}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={handleCopySnippet}
                >
                  <Copy className="w-3 h-3 mr-2" />
                  Copy
                </Button>
              </div>
              {eventsData && eventsData.events && eventsData.events.length > 0 ? (
                <div className="bg-success/10 border border-success/30 rounded p-3 text-sm text-success">
                  ✓ Tracker is working! Detected {eventsData.events.length} event(s).
                </div>
              ) : (
                <div className="bg-muted/50 border border-border rounded p-3 text-sm text-muted-foreground">
                  Waiting for events... Checking every 5 seconds.
                </div>
              )}
              <Button onClick={() => setIsTrackerModalOpen(true)} className="w-full">
                Verify Connection
              </Button>
            </>
          ) : (
            <div className="bg-destructive/10 border border-destructive/30 rounded p-3 text-sm text-destructive">
              Please complete onboarding first to get your tracking snippet.
            </div>
          )}
        </div>
      )
    },
    {
      id: 2,
      title: "Add benchmark customers",
      description: "Identify your successfully activated users to help Pascal learn ideal journeys",
      icon: Users,
      estimatedTime: "3 min",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add emails of customers who successfully activated or your own email to record ideal activation journeys. Pascal will learn from these patterns.
          </p>
          {benchmarkData && benchmarkData.benchmarks && benchmarkData.benchmarks.length > 0 && (
            <div className="bg-success/10 border border-success/30 rounded p-3 text-sm text-success">
              ✓ {benchmarkData.benchmarks.length} benchmark user(s) added!
            </div>
          )}
          <Button
            onClick={() => handleNavigateToPage(2, '/benchmarks')}
            className="w-full"
          >
            Go to Benchmarks
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )
    },
    {
      id: 3,
      title: "View tracked users",
      description: "See users being tracked and manually trigger Pascal email generation",
      icon: Sparkles,
      estimatedTime: "2 min",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Monitor user journeys in real-time. You can manually trigger Pascal's AI to generate personalized emails for specific users.
          </p>
          <Button
            onClick={() => handleNavigateToPage(3, '/journey')}
            className="w-full"
          >
            Go to Journey
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )
    },
    {
      id: 4,
      title: "Integrate email provider",
      description: "Connect your email service to start sending emails from Pascal",
      icon: Mail,
      estimatedTime: "5 min",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Configure your email provider settings to enable Pascal to send personalized activation emails on your behalf.
          </p>
          <Button
            onClick={() => handleNavigateToPage(4, '/settings?tab=email')}
            className="w-full"
          >
            Go to Email Config
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )
    },
    {
      id: 5,
      title: "Review email queue",
      description: "Accept or reject Pascal's suggested emails to activate users",
      icon: Sparkles,
      estimatedTime: "5 min",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Pascal generates personalized emails based on user behavior. Review, edit, and approve emails before they're sent to help users reach activation.
          </p>
          <Button
            onClick={() => handleNavigateToPage(5, '/email-queue')}
            className="w-full"
          >
            Go to Email Queue
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )
    },
    {
      id: 6,
      title: "Explore analytics",
      description: "View detailed metrics and insights about user engagement",
      icon: BarChart3,
      estimatedTime: "3 min",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Track key metrics like active users, engagement rates, feature adoption, and email performance to measure your success.
          </p>
          <Button
            onClick={() => handleNavigateToPage(6, '/analytics')}
            className="w-full"
          >
            Go to Analytics
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )
    },
    {
      id: 7,
      title: "Configure reply email",
      description: "Add your reply email address to track responses in user journeys",
      icon: Settings,
      estimatedTime: "2 min",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Set up your reply email address so Pascal can track customer responses and stitch them into the user journey timeline.
          </p>
          <Button
            onClick={() => handleNavigateToPage(7, '/settings')}
            className="w-full"
          >
            Go to Settings
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )
    },
    {
      id: 8,
      title: "You're all set!",
      description: "Pascal is ready to help you build the most engaged user base",
      icon: Check,
      estimatedTime: "Done",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            🎉 Congratulations! You've completed the setup. Pascal will now automatically track users, generate personalized emails, and help you maximize user engagement and activation.
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/email-queue')}
              className="flex-1"
            >
              Start Using Pascal
            </Button>
          </div>
        </div>
      )
    }
  ];

  const completedCount = completedSteps.length;
  const totalSteps = steps.length - 1; // Excluding the final "You're all set" step
  const progressPercentage = (completedCount / totalSteps) * 100;

  // Show project info if available
  const displayProjectName = projectName || "Your Project";

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Your quick start guide
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Get set up and start engaging with your customers in minutes
            </p>
            {website && (
              <p className="text-xs text-muted-foreground">
                Project: <span className="font-medium">{displayProjectName}</span> • Website: <span className="font-medium">{website}</span>
              </p>
            )}
          </div>
          <Card className="flex flex-col sm:flex-row items-start gap-4 p-4 md:p-6 bg-gradient-subtle border-border shadow-card">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-hero flex items-center justify-center shrink-0">
              <AnimatedLogo />
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-medium">Pascal AI</p>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                Hi! I'm Pascal, your AI revenue activation agent. I analyze every user session to help convert free users to paid, boost engagement, and drive upgrades. Let's activate your revenue together!
              </p>
            </div>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {completedCount} of {totalSteps} steps completed
            </span>
            <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-success transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step) => {
            const StepIcon = step.icon;
            const isCompleted = completedSteps.includes(step.id);
            const isExpanded = expandedStep === step.id;

            return (
              <Card
                key={step.id}
                className={`border transition-all duration-300 ${
                  isCompleted
                    ? 'bg-success/5 border-success/30'
                    : isExpanded
                      ? 'bg-card border-primary/50 shadow-lg'
                      : 'bg-card border-border'
                }`}
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full p-6 flex items-center gap-4 text-left hover:bg-accent/5 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-success text-success-foreground scale-110'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-5 h-5 animate-scale-in" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold mb-1 transition-colors ${
                      isCompleted ? 'text-success' : 'text-foreground'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {isCompleted ? (
                      <Badge variant="outline" className="text-xs bg-success/10 border-success/30 text-success">
                        Complete
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        {step.estimatedTime}
                      </Badge>
                    )}
                    <ChevronRight
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ease-in-out ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    {step.content}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-subtle border-border">
          <h3 className="font-semibold text-foreground mb-4">Need help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => openHelpModal('support')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => openHelpModal('docs')}
            >
              <Activity className="w-4 h-4 mr-2" />
              Quick Guides
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => openHelpModal('documentation')}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Pascal 101
            </Button>
          </div>
        </Card>
      </div>

      {/* Modals */}
      <TrackerVerificationModal
        open={isTrackerModalOpen}
        onOpenChange={setIsTrackerModalOpen}
        onVerified={handleTrackerVerified}
      />

      <CompletionCelebrationModal
        open={isCelebrationModalOpen}
        onOpenChange={setIsCelebrationModalOpen}
      />

      {helpModalType && (
        <HelpModal
          open={!!helpModalType}
          onOpenChange={() => setHelpModalType(null)}
          type={helpModalType}
        />
      )}
    </div>
  );
};

export default Home;
