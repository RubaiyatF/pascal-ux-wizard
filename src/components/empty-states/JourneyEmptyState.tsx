import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Activity, ArrowRight, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const JourneyEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] animate-fade-in px-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-6">
            <MessageSquare className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">User Journey Timelines</h1>
          
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Complete visual history of every user's path to activation
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-success">Tracking active • Sessions recording</span>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-2 hover:border-primary/30 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Session Replays</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Watch exactly what users do in your app
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span>Pixel-perfect recordings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span>Event timeline overlay</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span>AI-generated insights</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 hover:border-primary/30 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-chart-1/10 mb-4">
              <MessageSquare className="w-6 h-6 text-chart-1" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email History</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Track all communications and responses
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span>Sent email log</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span>Open & click tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span>Response correlation</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 hover:border-primary/30 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-chart-2/10 mb-4">
              <Users className="w-6 h-6 text-chart-2" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Behavior Insights</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Understand patterns and blockers
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span>Feature engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span>Drop-off points</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span>Success indicators</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Preview Section */}
        <Card className="p-8 mb-8 border-2">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">Timeline Preview</h3>
                <p className="text-sm text-muted-foreground">
                  Here's what a user journey will look like
                </p>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Coming Soon
              </Badge>
            </div>

            <div className="space-y-6">
              {/* Timeline Item 1 */}
              <div className="flex items-start gap-4">
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center border-2 border-card shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-success" />
                  </div>
                  <div className="w-0.5 h-full bg-border absolute top-10" />
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-sm font-semibold text-foreground">User signed up</p>
                  <p className="text-xs text-muted-foreground mt-1">Session recording available</p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="flex items-start gap-4">
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-card shrink-0">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div className="w-0.5 h-full bg-border absolute top-10" />
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-sm font-semibold text-foreground">Completed onboarding flow</p>
                  <p className="text-xs text-muted-foreground mt-1">5 minutes after signup</p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="flex items-start gap-4">
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-chart-1/10 flex items-center justify-center border-2 border-card shrink-0">
                    <Mail className="w-5 h-5 text-chart-1" />
                  </div>
                  <div className="w-0.5 h-full bg-border absolute top-10" />
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-sm font-semibold text-foreground">AI email sent</p>
                  <p className="text-xs text-muted-foreground mt-1">Personalized activation tip • Opened</p>
                </div>
              </div>

              {/* Timeline Item 4 (Last - no line) */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-chart-2/10 flex items-center justify-center border-2 border-card shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-chart-2" />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-sm font-semibold text-foreground">Exploring features</p>
                  <p className="text-xs text-muted-foreground mt-1">Active session in progress</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 text-left">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Start Tracking User Journeys</h3>
                <p className="text-muted-foreground">
                  Define benchmarks to see which users are on the path to activation
                </p>
              </div>
            </div>
            <Button
              size="lg"
              onClick={() => navigate("/benchmarks")}
              className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 shrink-0"
            >
              Set Benchmarks
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
