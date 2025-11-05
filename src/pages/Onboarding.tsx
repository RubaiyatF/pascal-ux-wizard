import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Check, Copy, Sparkles, Code, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [website, setWebsite] = useState("");
  const { toast } = useToast();

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
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-4">
      <div className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-hero mb-4 shadow-glow">
            <Sparkles className="w-8 h-8 text-white" />
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
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success" />
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
                (step === 1 && (!projectName || !website)) || step === 3
              }
              className="bg-gradient-hero hover:opacity-90 transition-opacity"
            >
              {step === 3 ? "Waiting..." : "Continue"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
