import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, MousePointer, Eye, Sparkles } from "lucide-react";

const Sessions = () => {
  // Mock data
  const sessions = [
    {
      id: "sess_1",
      user: "john@acme.com",
      duration: "12m 34s",
      pages: 8,
      events: 156,
      heartScore: 85,
      timestamp: "2 hours ago",
      hasRecording: true,
      aiSummary: "User explored dashboard features extensively, high engagement with session replays.",
      journeyStage: "Adoption",
    },
    {
      id: "sess_2",
      user: "sarah@startup.io",
      duration: "8m 15s",
      pages: 5,
      events: 89,
      heartScore: 72,
      timestamp: "5 hours ago",
      hasRecording: true,
      aiSummary: "First-time user completed onboarding flow successfully.",
      journeyStage: "Onboarding",
    },
    {
      id: "sess_3",
      user: "mike@company.com",
      duration: "3m 20s",
      pages: 2,
      events: 24,
      heartScore: 45,
      timestamp: "1 day ago",
      hasRecording: true,
      aiSummary: "User showed confusion navigating settings, left after brief exploration.",
      journeyStage: "Discovery",
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-info";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Sessions</h1>
          <p className="text-muted-foreground">
            View session replays with AI-powered analysis
          </p>
        </div>
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Watch Live Sessions
        </Button>
      </div>

      {/* HEART Framework Legend */}
      <Card className="p-4 bg-gradient-card border-primary/20">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-2">HEART Framework Scoring</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Each session is analyzed using Google's HEART framework for user experience
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-background/50">
                Happiness
              </Badge>
              <Badge variant="outline" className="bg-background/50">
                Engagement
              </Badge>
              <Badge variant="outline" className="bg-background/50">
                Adoption
              </Badge>
              <Badge variant="outline" className="bg-background/50">
                Retention
              </Badge>
              <Badge variant="outline" className="bg-background/50">
                Task Success
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <Card
            key={session.id}
            className="p-6 hover:shadow-elevated transition-all cursor-pointer"
          >
            <div className="space-y-4">
              {/* Header Row */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Score Badge */}
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-xl bg-muted ${getScoreColor(
                      session.heartScore
                    )}`}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {session.heartScore}
                      </div>
                      <div className="text-[10px] uppercase tracking-wide opacity-70">
                        Score
                      </div>
                    </div>
                  </div>

                  {/* Session Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{session.user}</h3>
                      <Badge variant="outline" className="text-xs">
                        {session.journeyStage}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {session.timestamp}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {session.pages} pages
                      </div>
                      <div className="flex items-center gap-1">
                        <MousePointer className="w-4 h-4" />
                        {session.events} events
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="bg-gradient-hero hover:opacity-90 transition-opacity">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Replay
                </Button>
              </div>

              {/* AI Summary */}
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">AI Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      {session.aiSummary}
                    </p>
                  </div>
                </div>
              </div>

              {/* HEART Breakdown (collapsed by default, shown on hover) */}
              <div className="grid grid-cols-5 gap-2 pt-2 border-t border-border">
                {[
                  { label: "Happiness", score: 88 },
                  { label: "Engagement", score: 85 },
                  { label: "Adoption", score: 90 },
                  { label: "Retention", score: 75 },
                  { label: "Task Success", score: 87 },
                ].map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">
                      {metric.label}
                    </div>
                    <div className="text-lg font-semibold">
                      {metric.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sessions;
