import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Check, Copy, Code, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useApiClient } from "@/lib/api";

interface ProjectEvent {
  event_type: string;
  user_id?: string;
  timestamp: string;
}

const Onboarding = () => {
  const { userId } = useAuth();
  const {
    currentStep,
    projectId,
    apiKey,
    projectName: savedProjectName,
    website: savedWebsite,
    setStep,
    setProjectData,
    completeOnboarding,
  } = useOnboarding();

  const [projectName, setProjectName] = useState(savedProjectName || "");
  const [website, setWebsite] = useState(savedWebsite || "");
  const [eventsDetected, setEventsDetected] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const api = useApiClient();

  // Redirect if onboarding is already complete
  useEffect(() => {
    if (currentStep === "complete") {
      navigate("/home");
    }
  }, [currentStep, navigate]);

  // Step 1: Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: async () => {
      return api.post("/api/projects", {
        name: projectName,
        website: website,
        userId: userId,
      });
    },
    onSuccess: (data) => {
      setProjectData({
        projectId: data.projectId,
        apiKey: data.apiKey,
        projectName: data.name,
        website: data.website,
      });
      toast({
        title: "Project created!",
        description: "Your tracking code is ready",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating project",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  // Step 3: Poll for events
  const { data: eventsData } = useQuery({
    queryKey: ["project-events", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/events`),
    enabled: currentStep === "3" && !!projectId && !eventsDetected,
    refetchInterval: eventsDetected ? false : 5000,
  });

  // Check if events detected
  useEffect(() => {
    if (eventsData && eventsData.events && eventsData.events.length > 0) {
      setEventsDetected(true);
    }
  }, [eventsData]);

  const trackerCode = apiKey
    ? `<script
  src="https://tracker.pascal.cx/simple-snippet.js?v=2"
  data-project-id="${projectId}"
  data-api-key="${apiKey}"
  data-recording="true"
  async
></script>`
    : "";

  const copyToClipboard = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(trackerCode);
        toast({
          title: "Copied!",
          description: "Tracker code copied to clipboard",
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = trackerCode;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
          toast({
            title: "Copied!",
            description: "Tracker code copied to clipboard",
          });
        } catch (err) {
          console.error("Fallback copy failed:", err);
          toast({
            title: "Copy failed",
            description: "Please manually select and copy the code",
            variant: "destructive",
          });
        } finally {
          textArea.remove();
        }
      }
    } catch (error) {
      console.error("Copy to clipboard failed:", error);
      toast({
        title: "Copy failed",
        description: "Please manually select and copy the code",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentStep === "1") {
      // Create project
      createProjectMutation.mutate();
    } else if (currentStep === "2") {
      // Move to step 3
      setStep("3");
    }
  };

  const handleBack = () => {
    if (currentStep === "2") setStep("1");
    else if (currentStep === "3") setStep("2");
  };

  const handleComplete = () => {
    completeOnboarding();
    navigate("/home");
  };

  const step: number = typeof currentStep === "number" ? currentStep : (() => {
    // Convert string steps to numbers for UI rendering
    if (currentStep === "1") return 1;
    if (currentStep === "2") return 2;
    if (currentStep === "3") return 3;
    return 3;
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-4">
      <div className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full overflow-hidden">
            <AnimatedLogo />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Pascal</h1>
          <p className="text-muted-foreground">
            Get started in 3 simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  step >= i
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {step > i ? <Check className="w-5 h-5" /> : i}
              </div>
              {i < 3 && (
                <div
                  className={`w-24 h-0.5 mx-2 transition-colors ${
                    step > i ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="p-8 shadow-elevated animate-fade-in">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Create Your Project
                </h2>
                <p className="text-muted-foreground">
                  Tell us about your website or application
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="My SaaS Product"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    disabled={createProjectMutation.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://myapp.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    disabled={createProjectMutation.isPending}
                  />
                </div>
              </div>

              {createProjectMutation.isError && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive">
                  {createProjectMutation.error instanceof Error ? createProjectMutation.error.message : "Failed to create project"}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Install Tracking Code
                </h2>
                <p className="text-muted-foreground">
                  Add this code to your website's &lt;head&gt; section
                </p>
              </div>

              <div className="bg-muted rounded-lg p-4 relative">
                <pre className="text-sm overflow-x-auto">
                  <code>{trackerCode}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-4 right-4"
                  onClick={copyToClipboard}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                <div className="flex gap-3">
                  <Code className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1 text-blue-900 dark:text-blue-100">
                      Your API key is shown in full here
                    </p>
                    <p className="text-blue-700 dark:text-blue-300">
                      After you continue, it will be truncated for security in the Settings page. Make sure to copy it now if you need it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/50 border border-border rounded-lg p-4">
                <div className="flex gap-3">
                  <Code className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Need help?</p>
                    <p className="text-muted-foreground">
                      Check our documentation for framework-specific guides
                      (React, Next.js, Vue, etc.)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {!eventsDetected ? (
                <>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Waiting for First Event
                    </h2>
                    <p className="text-muted-foreground">
                      We're listening for events from your website...
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Checking every 5 seconds
                    </p>
                  </div>

                  <div className="bg-muted/50 border border-dashed border-border rounded-lg p-8 text-center">
                    <div className="inline-block animate-pulse">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Visit your website to trigger the first event
                    </p>
                  </div>

                  <div className="bg-secondary/50 border border-border rounded-lg p-4 text-sm">
                    <p className="font-medium mb-2">What happens next?</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>We'll detect user sessions and page views</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>AI will analyze user behavior patterns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>
                          You'll start receiving success intelligence insights
                        </span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">
                      🎉 Events Detected!
                    </h2>
                    <p className="text-muted-foreground">
                      Your tracking is working perfectly
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 text-center border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {eventsData?.events?.filter((e: ProjectEvent) => e.event_type === "PAGE_VIEW").length || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">Page Views</div>
                    </Card>
                    <Card className="p-4 text-center border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {new Set(eventsData?.events?.map((e: ProjectEvent) => e.user_id) || []).size}
                      </div>
                      <div className="text-xs text-muted-foreground">Users</div>
                    </Card>
                    <Card className="p-4 text-center border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {eventsData?.events?.length || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">Events</div>
                    </Card>
                  </div>

                  {eventsData?.events && eventsData.events.length > 0 && (
                    <div className="bg-muted/50 border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold">Recent Events</p>
                        <span className="text-xs text-muted-foreground">Just now</span>
                      </div>
                      <div className="space-y-2">
                        {eventsData.events.slice(0, 3).map((event: ProjectEvent, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded bg-background/50 border border-border/50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                              <div>
                                <p className="text-sm font-medium">{event.event_type}</p>
                                <p className="text-xs text-muted-foreground">User: {event.user_id?.substring(0, 8)}...</p>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(event.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold mb-1">Setup Complete!</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Pascal is now tracking user behavior and will start generating AI insights within minutes.
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-success hover:bg-success/90"
                            onClick={handleComplete}
                          >
                            Start using Pascal
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleComplete}
                          >
                            Complete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1 || createProjectMutation.isPending}
            >
              Back
            </Button>
            {step < 3 && (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && (!projectName || !website)) ||
                  createProjectMutation.isPending
                }
                className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {createProjectMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
