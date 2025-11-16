import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatedLogo } from "../AnimatedLogo";

interface BenchmarksEmptyStateProps {
  onAddBenchmark: () => void;
}

export const BenchmarksEmptyState = ({ onAddBenchmark }: BenchmarksEmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] animate-fade-in px-4">
      <div className="max-w-2xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full overflow-hidden mb-6 bg-card p-4">
            <AnimatedLogo />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            Welcome to Pascal
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Your AI-powered activation agent is processing events from your app
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Processing data • 5-15 minutes</span>
          </div>
        </div>

        {/* Main Info Card */}
        <Card className="p-8 border-border bg-gradient-subtle mb-6">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">
                What's a Benchmark?
              </h2>
              <p className="text-muted-foreground mb-4 text-base leading-relaxed">
                Record your ideal activation path—from signup to "aha moment"
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>Show feature discovery & engagement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>Capture the moment of value realization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>AI learns to activate similar users</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate("/journey")}
                  variant="outline"
                  className="gap-2"
                >
                  View Sessions
                </Button>
                <Button
                  size="lg"
                  onClick={onAddBenchmark}
                  className="gap-2 bg-gradient-hero hover:opacity-90"
                >
                  Record Benchmark
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Next Steps Card */}
        <Card className="p-8 border-border bg-gradient-subtle">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <ArrowRight className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Next Steps</h3>
              <p className="text-muted-foreground text-base">
                While Pascal processes your data, set up your success benchmark
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">1</div>
              <div className="flex-1 pt-2">
                <span className="text-base font-medium">Browse recorded sessions</span>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">2</div>
              <div className="flex-1 pt-2">
                <span className="text-base font-medium">Record ideal user journey</span>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border opacity-60">
              <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold shrink-0">3</div>
              <div className="flex-1 pt-2">
                <span className="text-base font-medium text-muted-foreground">AI starts activating users</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
