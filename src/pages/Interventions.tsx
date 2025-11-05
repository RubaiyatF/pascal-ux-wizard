import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  TrendingUp,
} from "lucide-react";

const Interventions = () => {
  // Mock data for email campaigns
  const campaigns = [
    {
      id: 1,
      name: "At Risk User Recovery",
      type: "guidance",
      archetype: "At Risk",
      journeyStage: "Discovery",
      status: "active",
      sent: 156,
      opened: 98,
      clicked: 45,
      actionRate: 62.8,
      lastSent: "2 hours ago",
    },
    {
      id: 2,
      name: "Onboarding Feature Guide",
      type: "education",
      archetype: "On Track",
      journeyStage: "Onboarding",
      status: "active",
      sent: 234,
      opened: 187,
      clicked: 103,
      actionRate: 72.5,
      lastSent: "5 hours ago",
    },
    {
      id: 3,
      name: "Fast Mover Celebration",
      type: "celebration",
      archetype: "Fast Mover",
      journeyStage: "Adoption",
      status: "scheduled",
      sent: 0,
      opened: 0,
      clicked: 0,
      actionRate: 0,
      lastSent: "Scheduled for tomorrow",
    },
  ];

  const stats = [
    {
      label: "Total Sent",
      value: "390",
      change: "+12%",
      icon: Send,
    },
    {
      label: "Avg Open Rate",
      value: "73.1%",
      change: "+5.2%",
      icon: Mail,
    },
    {
      label: "Avg Action Rate",
      value: "67.7%",
      change: "+8.1%",
      icon: CheckCircle2,
    },
    {
      label: "Success Impact",
      value: "+15.2%",
      change: "+3.5%",
      icon: TrendingUp,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "scheduled":
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "education":
        return "bg-info/10 text-info border-info/20";
      case "guidance":
        return "bg-warning/10 text-warning border-warning/20";
      case "celebration":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Email Interventions</h1>
          <p className="text-muted-foreground">
            AI-powered personalized campaigns to activate users
          </p>
        </div>
        <Button className="bg-gradient-hero hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-success">
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Campaigns List */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Active Campaigns</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Automatically triggered based on user behavior and success patterns
          </p>
        </div>

        <div className="divide-y divide-border">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="p-6 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{campaign.name}</h3>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(campaign.status)}
                      <span className="text-sm text-muted-foreground capitalize">
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getTypeColor(campaign.type)}`}
                    >
                      {campaign.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {campaign.archetype}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {campaign.journeyStage}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Edit Campaign
                </Button>
              </div>

              {/* Campaign Metrics */}
              <div className="grid grid-cols-5 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sent</p>
                  <p className="text-2xl font-semibold">{campaign.sent}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Opened</p>
                  <p className="text-2xl font-semibold">{campaign.opened}</p>
                  {campaign.sent > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Clicked</p>
                  <p className="text-2xl font-semibold">{campaign.clicked}</p>
                  {campaign.sent > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {((campaign.clicked / campaign.sent) * 100).toFixed(1)}%
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Action Rate
                  </p>
                  <p className="text-2xl font-semibold text-success">
                    {campaign.actionRate > 0 ? `${campaign.actionRate}%` : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Last Sent
                  </p>
                  <p className="text-sm">{campaign.lastSent}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="p-6 bg-gradient-card border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Success Learning Insights</h3>
            <div className="space-y-3">
              <div className="bg-background/50 rounded-lg p-3 border border-border">
                <p className="text-sm">
                  <span className="font-medium">Onboarding emails</span> with
                  step-by-step instructions have{" "}
                  <span className="text-success font-medium">
                    42% higher engagement
                  </span>
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-border">
                <p className="text-sm">
                  <span className="font-medium">Best send time:</span> Tuesday
                  mornings at 10:00 AM show{" "}
                  <span className="text-success font-medium">
                    25% better open rates
                  </span>
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-border">
                <p className="text-sm">
                  <span className="font-medium">At Risk users</span> respond
                  better to educational tone rather than promotional
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Interventions;
