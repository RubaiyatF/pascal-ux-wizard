import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Code, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HomeEmptyStateProps {
  onAddBenchmark: () => void;
}

export const HomeEmptyState = ({ onAddBenchmark }: HomeEmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] animate-fade-in">
      <Card className="max-w-2xl p-12 text-center border-2 border-dashed border-border">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
          <Star className="w-10 h-10 text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Welcome to Pascal! 🎉</h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
          Start by defining your success benchmarks. Mark users who represent success, and Pascal will help you find similar users to activate.
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4 text-left p-4 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0 mt-1">
              <span className="text-sm font-bold text-primary">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Install Tracking Code</h4>
              <p className="text-sm text-muted-foreground">
                Add Pascal tracking to your app to start collecting user behavior data
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left p-4 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0 mt-1">
              <span className="text-sm font-bold text-primary">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Mark Benchmark Users</h4>
              <p className="text-sm text-muted-foreground">
                Identify and mark users who represent success in your product
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left p-4 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0 mt-1">
              <span className="text-sm font-bold text-primary">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Find Similar Users</h4>
              <p className="text-sm text-muted-foreground">
                Pascal AI will identify users with similar behavior patterns
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/settings")}
            variant="outline"
            className="gap-2"
          >
            <Code className="w-4 h-4" />
            View Setup Guide
          </Button>
          <Button
            size="lg"
            onClick={onAddBenchmark}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Star className="w-4 h-4" />
            Add First Benchmark
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
