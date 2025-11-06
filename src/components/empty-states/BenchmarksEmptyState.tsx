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
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-32 h-32 mb-8">
            <AnimatedLogo />
          </div>
          
          <div className="space-y-4 mb-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Welcome to Pascal
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your AI-powered activation agent is processing events from your app
            </p>
          </div>

          <Card className="inline-flex items-center gap-3 px-6 py-3 bg-primary/5 border-primary/20 shadow-sm">
            <div className="relative flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="absolute w-3 h-3 rounded-full bg-primary/30 animate-ping" />
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-sm font-semibold text-primary">Processing Data</span>
              <span className="text-xs text-muted-foreground">Estimated time: 5-15 minutes</span>
            </div>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-2 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">What's a Benchmark?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Record your ideal activation path—from signup to "aha moment"
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
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
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Next Steps</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  While Pascal processes your data, set up your success benchmark
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                    <span className="text-sm">Browse recorded sessions</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-sm">Record ideal user journey</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-6 h-6 rounded-full bg-muted-foreground/20 text-muted-foreground flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-sm text-muted-foreground">AI starts activating users</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Ready to Set Your Benchmark?</h3>
              <p className="text-muted-foreground">
                Record a session now or explore existing user sessions
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={() => navigate("/journey")}
                variant="outline"
                className="gap-2 bg-background"
              >
                View Sessions
              </Button>
              <Button
                size="lg"
                onClick={onAddBenchmark}
                className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:opacity-90"
              >
                Record Benchmark
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
