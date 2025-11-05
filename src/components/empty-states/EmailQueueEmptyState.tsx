import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Sparkles, ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EmailQueueEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] animate-fade-in">
      <Card className="max-w-2xl p-12 text-center border-2 border-dashed border-border">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
          <Mail className="w-10 h-10 text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4">AI Email Drafts Coming Soon</h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
          Your events are flowing in! Pascal AI is analyzing behavior patterns. Mark your benchmark users, and AI will generate personalized email drafts to help activate similar users.
        </p>

        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 text-left">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">How It Works</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">1.</span>
                    <span>Mark your successful users as benchmarks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">2.</span>
                    <span>AI identifies users with similar behavior patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">3.</span>
                    <span>Personalized emails are drafted based on their journey</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">4.</span>
                    <span>Review, edit, and approve before sending</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 text-left">
            <Clock className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Tip:</span> Email drafts typically appear within 24 hours after marking your first benchmark users.
            </p>
          </div>
        </div>

        <Button
          size="lg"
          onClick={() => navigate("/home")}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          Mark Benchmark Users
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>
    </div>
  );
};
