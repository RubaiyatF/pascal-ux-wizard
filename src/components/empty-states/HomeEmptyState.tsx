import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, ArrowRight } from "lucide-react";
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
        
        <h2 className="text-3xl font-bold mb-4">Pascal Agent is Processing</h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
          Great! Your events are flowing in and Pascal agent is analyzing the data. This takes 5-15 minutes to populate everything. Meanwhile, record a session showcasing your best activation scenario to set the benchmark.
        </p>

        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-8 text-left">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold mb-2">What is a Benchmark Session?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Record a complete user journey from signup to key activation moment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Show the ideal path: feature discovery, engagement, and success</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Capture the "aha moment" where users realize your product&apos;s value</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Pascal AI will use this to identify and activate similar users</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
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
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Star className="w-4 h-4" />
            Record Benchmark Session
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
