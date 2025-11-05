import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EmailQueueEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] animate-fade-in">
      <Card className="max-w-2xl p-12 text-center border-2 border-dashed border-border">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
          <Mail className="w-10 h-10 text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4">No Email Drafts Yet</h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
          Once you have benchmark users and Pascal starts detecting similar behavior patterns, AI-generated personalized email drafts will appear here.
        </p>

        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-8 text-left">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold mb-2">How Email Drafts Work</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Pascal analyzes user behavior and identifies activation opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>AI generates personalized emails based on user context and session data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>You review, edit, and approve before sending</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Track engagement and activation success</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          onClick={() => navigate("/home")}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          Set Up Benchmarks
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>
    </div>
  );
};
