import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Activity,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";

const Dashboard = () => {
  // Mock data
  const stats = [
    {
      label: "Active Users",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      label: "Activation Rate",
      value: "68.2%",
      change: "+8.3%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      label: "Avg. HEART Score",
      value: "72/100",
      change: "+5.1%",
      trend: "up",
      icon: Activity,
    },
    {
      label: "Interventions Sent",
      value: "156",
      change: "-3.2%",
      trend: "down",
      icon: Mail,
    },
  ];

  const archetypes = [
    { name: "Fast Mover", count: 287, percentage: 10, color: "success" },
    { name: "On Track", count: 1423, percentage: 50, color: "info" },
    { name: "Slow Adopter", count: 712, percentage: 25, color: "warning" },
    { name: "At Risk", count: 285, percentage: 10, color: "destructive" },
    { name: "Different Path", count: 140, percentage: 5, color: "muted" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          AI-powered insights into your customer success
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="p-6 hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-2 rounded-lg ${
                  stat.trend === "up" ? "bg-success/10" : "bg-muted"
                }`}
              >
                <stat.icon
                  className={`w-5 h-5 ${
                    stat.trend === "up" ? "text-success" : "text-muted-foreground"
                  }`}
                />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-success" : "text-destructive"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Archetypes */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">User Archetypes</h2>
              <p className="text-sm text-muted-foreground">
                Distribution across success patterns
              </p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {archetypes.map((archetype) => (
              <div key={archetype.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{archetype.name}</span>
                  <span className="text-muted-foreground">
                    {archetype.count} users ({archetype.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${archetype.color} transition-all`}
                    style={{ width: `${archetype.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="p-6 bg-gradient-card border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">AI Insights</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <p className="text-sm font-medium mb-2">🎯 Top Opportunity</p>
              <p className="text-sm text-muted-foreground">
                285 users are at risk of churning. Send targeted email
                interventions to re-engage them.
              </p>
              <Button size="sm" variant="outline" className="mt-3 w-full">
                Create Campaign
              </Button>
            </div>

            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <p className="text-sm font-medium mb-2">📈 Success Pattern</p>
              <p className="text-sm text-muted-foreground">
                Fast Movers typically view 3+ session replays in their first
                week. Encourage this behavior.
              </p>
            </div>

            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <p className="text-sm font-medium mb-2">⚡ Quick Win</p>
              <p className="text-sm text-muted-foreground">
                Users who complete email setup have 85% higher activation
                rates. Push this feature.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Recent Sessions</h2>
            <p className="text-sm text-muted-foreground">
              Latest user activity with AI analysis
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All Sessions
          </Button>
        </div>

        <div className="space-y-3">
          {[
            {
              user: "john@acme.com",
              score: 85,
              duration: "12m 34s",
              pages: 8,
              archetype: "Fast Mover",
            },
            {
              user: "sarah@startup.io",
              score: 72,
              duration: "8m 15s",
              pages: 5,
              archetype: "On Track",
            },
            {
              user: "mike@company.com",
              score: 45,
              duration: "3m 20s",
              pages: 2,
              archetype: "At Risk",
            },
          ].map((session, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {session.score}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{session.user}</p>
                  <p className="text-sm text-muted-foreground">
                    {session.duration} • {session.pages} pages
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    session.archetype === "Fast Mover"
                      ? "bg-success/10 text-success"
                      : session.archetype === "On Track"
                      ? "bg-info/10 text-info"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {session.archetype}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
