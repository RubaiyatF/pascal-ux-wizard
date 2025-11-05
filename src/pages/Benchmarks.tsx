import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, TrendingUp } from "lucide-react";

const Benchmarks = () => {
  const benchmarkUsers = [
    {
      email: "john@company.com",
      markedDate: "Nov 1",
      sessionsAnalyzed: 45,
    },
    {
      email: "lisa@tech.com",
      markedDate: "Oct 28",
      sessionsAnalyzed: 67,
    },
    {
      email: "mike@startup.com",
      markedDate: "Oct 25",
      sessionsAnalyzed: 89,
    },
  ];

  const similarUsers = [
    {
      email: "sarah@example.com",
      similarity: 85,
      reason: "Similar usage pattern",
    },
    {
      email: "alex@corp.com",
      similarity: 82,
      reason: "Comparable engagement",
    },
    {
      email: "emma@agency.co",
      similarity: 78,
      reason: "Matching feature use",
    },
  ];

  const metrics = [
    { label: "Active Users", value: "890", change: "+12" },
    { label: "Avg Activation", value: "68%", change: "+5.2%" },
    { label: "Retention", value: "82%", change: "+3.1%" },
    { label: "Feature Adoption", value: "65%", change: "+8%" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Success Benchmarks</h1>
          <p className="text-muted-foreground">
            12 benchmark users · 47 similar users found
          </p>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-6">
            <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{metric.value}</p>
              <span className="text-sm font-medium text-success">
                {metric.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Benchmark Users */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Benchmark Users</h2>
            <p className="text-sm text-muted-foreground">
              Your Success Templates (Mark users who represent success)
            </p>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add benchmark user by email..."
              className="w-64"
            />
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {benchmarkUsers.map((user) => (
            <div
              key={user.email}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-warning fill-warning" />
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Marked: {user.markedDate} · {user.sessionsAnalyzed} sessions
                    analyzed
                  </p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                View Journey
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Similar Users */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Similar Users</h2>
            <p className="text-sm text-muted-foreground">
              Users behaving like your benchmarks (opportunity list)
            </p>
          </div>
          <Button className="bg-gradient-hero hover:opacity-90">
            Queue Activation Campaign
          </Button>
        </div>

        <div className="space-y-3">
          {similarUsers.map((user) => (
            <div
              key={user.email}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-muted-foreground">
                    "{user.reason}"
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="bg-success/10 text-success border-success/20"
                >
                  {user.similarity}% similarity
                </Badge>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Showing 3 of 47 similar users
          </p>
        </div>
      </Card>

      {/* Trends */}
      <Card className="p-6 bg-gradient-card border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Success Trends - Last 30 Days</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Activation</p>
                <p className="text-2xl font-bold">+5.2%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Retention</p>
                <p className="text-2xl font-bold">+3.1%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Benchmarks Added</p>
                <p className="text-2xl font-bold">+8</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Benchmarks;
