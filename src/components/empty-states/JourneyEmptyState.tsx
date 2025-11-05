import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Play, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const JourneyEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] animate-fade-in">
      <Card className="max-w-2xl p-12 text-center border-2 border-dashed border-border">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
          <MessageSquare className="w-10 h-10 text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4">No User Journeys Yet</h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
          Install the Pascal tracking code to start capturing user sessions and see their complete journey through your product.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-6 rounded-lg bg-muted/50 text-left">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
              <Play className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Session Recordings</h4>
            <p className="text-sm text-muted-foreground">
              Watch how users interact with your product in real-time
            </p>
          </div>

          <div className="p-6 rounded-lg bg-muted/50 text-left">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Email Timeline</h4>
            <p className="text-sm text-muted-foreground">
              See all communications and their impact on activation
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/settings")}
            variant="outline"
            className="gap-2"
          >
            Installation Guide
          </Button>
          <Button
            size="lg"
            onClick={() => navigate("/home")}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
