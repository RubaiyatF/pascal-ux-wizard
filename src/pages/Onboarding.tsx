import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Check, Copy, Code, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedLogo } from "@/components/AnimatedLogo";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [website, setWebsite] = useState("");
  const [eventsDetected, setEventsDetected] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const projectId = "proj_demo_" + Math.random().toString(36).substr(2, 9);
  const apiKey = "pk_" + Math.random().toString(36).substr(2, 24);

  const trackerCode = `<script>
  !function(p,a,s,c,a,l){
    p.PascalTracker=p.PascalTracker||function(){
      (p.PascalTracker.q=p.PascalTracker.q||[]).push(arguments)
    };
    l=a.createElement(s);l.async=1;l.src='https://tracker.pascal.cx/simple-snippet.js';
    a.head.appendChild(l);
  }(window,document,'script');
  
  PascalTracker('init', {
    projectId: '${projectId}',
    apiKey: '${apiKey}',
    recording: { enabled: true }
  });
</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackerCode);
    toast({
      title: "Copied!",
      description: "Tracker code copied to clipboard",
    });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    // Simulate event detection after 3 seconds on step 3
    if (step === 2) {
      setTimeout(() => {
        setEventsDetected(true);
      }, 3000);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-4">
      <div className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-4">
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
                  />
                </div>
              </div>
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
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Waiting for First Event
                    </h2>
                    <p className="text-muted-foreground">
                      We're listening for events from your website...
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
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
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
                      <div className="text-3xl font-bold text-primary mb-1">3</div>
                      <div className="text-xs text-muted-foreground">Page Views</div>
                    </Card>
                    <Card className="p-4 text-center border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                      <div className="text-3xl font-bold text-primary mb-1">1</div>
                      <div className="text-xs text-muted-foreground">Active User</div>
                    </Card>
                    <Card className="p-4 text-center border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                      <div className="text-3xl font-bold text-primary mb-1">5</div>
                      <div className="text-xs text-muted-foreground">Events</div>
                    </Card>
                  </div>

                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold">Recent Events</p>
                      <span className="text-xs text-muted-foreground">Just now</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { event: "page_view", page: "/home", time: "2s ago" },
                        { event: "click", page: "/pricing", time: "5s ago" },
                        { event: "session_start", page: "/", time: "8s ago" },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded bg-background/50 border border-border/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <div>
                              <p className="text-sm font-medium">{item.event}</p>
                              <p className="text-xs text-muted-foreground">{item.page}</p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold mb-1">Setup Complete!</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Pascal is now tracking user behavior and will start generating AI insights within minutes.
                        </p>
                        <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => navigate("/home")}>
                          Go to Dashboard
                        </Button>
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
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && (!projectName || !website)) || (step === 3 && !eventsDetected)
              }
              className="bg-gradient-hero hover:opacity-90 transition-opacity"
            >
              {step === 3 && !eventsDetected ? "Waiting..." : step === 3 ? "Complete" : "Continue"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
