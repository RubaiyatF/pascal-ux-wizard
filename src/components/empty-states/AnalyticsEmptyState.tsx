import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AnalyticsEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] animate-fade-in px-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-6">
            <BarChart3 className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Your Analytics Dashboard</h1>
          
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Building comprehensive insights from your user data
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Available in 48-72 hours</span>
          </div>
        </div>

        {/* Preview Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-2 hover:border-primary/30 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <h3 className="font-semibold text-lg">Activation Metrics</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>Activation rate trends over time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>Time-to-activation distribution</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>Conversion funnel analysis</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 hover:border-primary/30 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">User Behavior</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>Feature adoption patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>Retention cohort analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>Engagement metrics</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 hover:border-primary/30 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-chart-1" />
                </div>
                <h3 className="font-semibold text-lg">Email Performance</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>Campaign conversion rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>Email engagement metrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>A/B test results</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 hover:border-primary/30 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-chart-2" />
                </div>
                <h3 className="font-semibold text-lg">Benchmark Insights</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>Success pattern comparison</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>User similarity scoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>Predictive activation models</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 text-left">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Accelerate Your Analytics</h3>
                <p className="text-muted-foreground">
                  Mark benchmark users now to start seeing insights sooner
                </p>
              </div>
            </div>
            <Button
              size="lg"
              onClick={() => navigate("/benchmarks")}
              className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 shrink-0"
            >
              Define Benchmarks
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
