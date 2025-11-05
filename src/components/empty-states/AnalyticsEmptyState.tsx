import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AnalyticsEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] animate-fade-in">
      <Card className="max-w-2xl p-12 text-center border-2 border-dashed border-border">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
          <BarChart3 className="w-10 h-10 text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4">No Analytics Data Yet</h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
          Once you have tracking installed and users engaging with your product, you will see powerful analytics and insights here.
        </p>

        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-8 text-left">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold mb-2">What You will See</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Activation rates and time-to-activation trends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>User retention and engagement metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Email campaign performance and conversion rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Feature adoption and success benchmarks</span>
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
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>
    </div>
  );
};
