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
  Loader2,
} from "lucide-react";
import { useProject } from "@/contexts/ProjectContext";
import { useApiClient } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface Insight {
  text: string;
}

const Interventions = () => {
  const { selectedProject } = useProject();
  const api = useApiClient();

  // Fetch intervention effectiveness data from API
  const { data: interventionData, isLoading } = useQuery({
    queryKey: ["intervention-effectiveness", selectedProject?.id],
    queryFn: () =>
      api.get(
        `/api/projects/${selectedProject?.id}/intervention-effectiveness?days=30`
      ),
    enabled: !!selectedProject?.id,
  });

  // Transform API data to campaigns format
  const campaigns = interventionData?.campaigns || [];
  const stats = [
    {
      label: "Total Sent",
      value: interventionData?.total_sent?.toString() || "0",
      change: interventionData?.sent_change || "0%",
      icon: Send,
    },
    {
      label: "Avg Open Rate",
      value: interventionData?.avg_open_rate
        ? `${interventionData.avg_open_rate.toFixed(1)}%`
        : "0%",
      change: interventionData?.open_rate_change || "0%",
      icon: Mail,
    },
    {
      label: "Avg Action Rate",
      value: interventionData?.avg_action_rate
        ? `${interventionData.avg_action_rate.toFixed(1)}%`
        : "0%",
      change: interventionData?.action_rate_change || "0%",
      icon: CheckCircle2,
    },
    {
      label: "Success Impact",
      value: interventionData?.success_impact || "0%",
      change: interventionData?.impact_change || "0%",
      icon: TrendingUp,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
      {interventionData?.insights && interventionData.insights.length > 0 && (
        <Card className="p-6 bg-gradient-card border-primary/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Success Learning Insights</h3>
              <div className="space-y-3">
                {interventionData.insights.map((insight: Insight, index: number) => (
                  <div
                    key={index}
                    className="bg-background/50 rounded-lg p-3 border border-border"
                  >
                    <p className="text-sm">{insight.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Interventions;
