import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, CheckCircle2, Mail } from "lucide-react";

const Learning = () => {
  const pendingInsights = [
    {
      id: "insight_1",
      insight: "Emails within 48h of high activation get 2.3x conversion",
      confidence: 89,
      sample: 450,
      impact: "+12%",
    },
    {
      id: "insight_2",
      insight: "Technical users prefer detailed responses",
      confidence: 85,
      sample: 230,
      impact: "+8%",
    },
  ];

  const activeInsights = [
    {
      id: "active_1",
      insight: "Feature tutorials work best in 'exploring' stage",
      appliedDate: "Nov 3",
      impact: "+15% activation",
    },
    {
      id: "active_2",
      insight: "Personalized subject lines get 1.8x replies",
      appliedDate: "Nov 1",
      impact: "+45% reply rate",
    },
  ];

  const interventionStats = [
    { type: "Activation nudge", conversion: "25%", scoreChange: "+12.5" },
    { type: "Feature tutorial", conversion: "18%", scoreChange: "+8.2" },
    { type: "Re-engagement", conversion: "15%", scoreChange: "+6.1" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Learning Insights</h1>
        <p className="text-muted-foreground">
          245 feedback events · 34 insights · +8.5% lift from AI learning
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Last 30 Days</p>
          <p className="text-3xl font-bold">450</p>
          <p className="text-xs text-muted-foreground">emails sent</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Open Rate</p>
          <p className="text-3xl font-bold">70%</p>
          <p className="text-xs text-success">+5.2% from learning</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Reply Rate</p>
          <p className="text-3xl font-bold">40%</p>
          <p className="text-xs text-success">+8.1% from learning</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Activation Rate</p>
          <p className="text-3xl font-bold">19.8%</p>
          <p className="text-xs text-success">+3.5% from learning</p>
        </Card>
      </div>

      {/* Pending Insights */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Pending Insights</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          New patterns discovered from your feedback. Review and apply:
        </p>

        <div className="space-y-4">
          {pendingInsights.map((insight) => (
            <div
              key={insight.id}
              className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium mb-2">🔍 "{insight.insight}"</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Confidence: {insight.confidence}%</span>
                    <span>Sample: {insight.sample} emails</span>
                    <Badge
                      variant="outline"
                      className="bg-success/10 text-success border-success/20"
                    >
                      Impact: {insight.impact}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Apply to 10%
                  </Button>
                  <Button size="sm" className="bg-gradient-hero hover:opacity-90">
                    Apply to All
                  </Button>
                  <Button size="sm" variant="ghost">
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Active Insights */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle2 className="w-5 h-5 text-success" />
          <h2 className="text-xl font-semibold">Active Insights</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Currently applied learnings:
        </p>

        <div className="space-y-4">
          {activeInsights.map((insight) => (
            <div
              key={insight.id}
              className="p-4 border border-success/20 bg-success/5 rounded-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium mb-2">✅ "{insight.insight}"</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Applied: {insight.appliedDate}</span>
                    <Badge
                      variant="outline"
                      className="bg-success/10 text-success border-success/20"
                    >
                      {insight.impact}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  Rollback
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Intervention Effectiveness */}
      <Card className="p-6 bg-gradient-card border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-4">Intervention Effectiveness</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Avg Time to Activate
                </p>
                <p className="text-2xl font-bold">5.2 days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Click Rate
                </p>
                <p className="text-2xl font-bold">40%</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">By Intervention Type:</p>
              {interventionStats.map((stat) => (
                <div
                  key={stat.type}
                  className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{stat.type}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span>{stat.conversion} conversion</span>
                    <Badge variant="outline" className="text-success">
                      {stat.scoreChange} score
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Learning;
