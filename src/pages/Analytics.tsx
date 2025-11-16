import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Mail, Users, CheckCircle2 } from "lucide-react";
import { TrendsAreaChart } from "@/components/analytics/TrendsAreaChart";
import { AnalyticsEmptyState } from "@/components/empty-states/AnalyticsEmptyState";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useApiClient } from "@/lib/api";

interface InterventionType {
  intervention_type: string;
  sent: number;
  activation_rate: number;
  avg_score_improvement: number;
}

const Analytics = () => {
  const location = useLocation();
  const { projectId } = useOnboarding();
  const api = useApiClient();

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(
    location.state?.selectedMetrics || [
      "activeUsers",
      "activation",
      "retention",
      "featureAdoption"
    ]
  );

  // Mark onboarding step 6 as complete when Analytics is visited
  useEffect(() => {
    if (projectId) {
      localStorage.setItem(`pascal-analytics-visited-${projectId}`, 'true');
    }
  }, [projectId]);

  // Fetch success metrics (polls every 30 seconds)
  const { data: metricsData, isLoading: metricsLoading } = useQuery({
    queryKey: ["success-metrics", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/success-metrics?days=30`),
    enabled: !!projectId,
    refetchInterval: 30000, // Poll every 30 seconds
  });

  // Fetch intervention effectiveness (polls every 60 seconds)
  const { data: interventionData, isLoading: interventionLoading } = useQuery({
    queryKey: ["intervention-effectiveness", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/intervention-effectiveness?days=30`),
    enabled: !!projectId,
    refetchInterval: 60000, // Poll every 60 seconds
  });

  // Fetch success trends for charts (polls every 30 seconds)
  const { data: trendsData } = useQuery({
    queryKey: ["success-trends", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/success-trends?days=90`),
    enabled: !!projectId,
    refetchInterval: 30000, // Poll every 30 seconds
  });

  useEffect(() => {
    if (location.state?.selectedMetrics) {
      setSelectedMetrics(location.state.selectedMetrics);
    }
  }, [location.state]);

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  // Show empty state if no data and not loading
  if (!metricsLoading && !metricsData?.metrics) {
    return <AnalyticsEmptyState />;
  }

  // Loading state
  if (metricsLoading && !metricsData) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Success metrics, interventions, and email performance
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  const metrics = metricsData?.metrics || {};
  const trends = metricsData?.trends || {};
  const interventions = interventionData?.interventions || {};
  const outcomes = interventionData?.outcomes || {};

  // Calculate email stats
  const emailsSent = interventions.emails_sent || 0;
  const emailsDelivered = emailsSent; // Assume 100% delivery for now
  const emailsOpened = interventions.emails_opened || 0;
  const emailsClicked = interventions.emails_clicked || 0;
  const openRate = interventions.open_rate || 0;
  const clickRate = interventions.click_rate || 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Success metrics, interventions, and email performance
        </p>
      </div>

      <Tabs defaultValue="success" className="space-y-6">
        <TabsList>
          <TabsTrigger value="success">Success Metrics</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="email">Email Stats</TabsTrigger>
        </TabsList>

        {/* Success Metrics Tab */}
        <TabsContent value="success" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              variant={selectedMetrics.includes("activeUsers") ? "default" : "outline"}
              className={`h-auto p-6 flex-col items-start justify-start text-left transition-transform hover:scale-105 ${
                selectedMetrics.includes("activeUsers")
                  ? "bg-[oklch(var(--chart-1))] hover:bg-[oklch(var(--chart-1))]/90"
                  : ""
              }`}
              onClick={() => toggleMetric("activeUsers")}
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div className={`p-2 rounded-lg ${
                  selectedMetrics.includes("activeUsers")
                    ? "bg-card/20"
                    : "bg-primary/10"
                }`}>
                  <Users className={`w-5 h-5 ${
                    selectedMetrics.includes("activeUsers")
                      ? "text-foreground"
                      : "text-primary"
                  }`} />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {metrics.total_users ? `+${metrics.total_users}` : '+0'}
                </span>
              </div>
              <p className="text-sm mb-1 text-foreground">Active Users</p>
              <p className="text-2xl font-bold text-foreground">{metrics.active_users || 0}</p>
            </Button>

            <Button
              variant={selectedMetrics.includes("activation") ? "default" : "outline"}
              className={`h-auto p-6 flex-col items-start justify-start text-left transition-transform hover:scale-105 ${
                selectedMetrics.includes("activation")
                  ? "bg-[oklch(var(--chart-2))] hover:bg-[oklch(var(--chart-2))]/90"
                  : ""
              }`}
              onClick={() => toggleMetric("activation")}
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div className={`p-2 rounded-lg ${
                  selectedMetrics.includes("activation")
                    ? "bg-card/20"
                    : "bg-primary/10"
                }`}>
                  <TrendingUp className={`w-5 h-5 ${
                    selectedMetrics.includes("activation")
                      ? "text-foreground"
                      : "text-primary"
                  }`} />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {trends.activation_score_change || '+0%'}
                </span>
              </div>
              <p className="text-sm mb-1 text-foreground">Avg Activation</p>
              <p className="text-2xl font-bold text-foreground">{metrics.avg_activation_score || 0}%</p>
            </Button>

            <Button
              variant={selectedMetrics.includes("retention") ? "default" : "outline"}
              className={`h-auto p-6 flex-col items-start justify-start text-left transition-transform hover:scale-105 ${
                selectedMetrics.includes("retention")
                  ? "bg-[oklch(var(--chart-3))] hover:bg-[oklch(var(--chart-3))]/90"
                  : ""
              }`}
              onClick={() => toggleMetric("retention")}
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div className={`p-2 rounded-lg ${
                  selectedMetrics.includes("retention")
                    ? "bg-card/20"
                    : "bg-primary/10"
                }`}>
                  <CheckCircle2 className={`w-5 h-5 ${
                    selectedMetrics.includes("retention")
                      ? "text-foreground"
                      : "text-primary"
                  }`} />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {trends.retention_change || '+0%'}
                </span>
              </div>
              <p className="text-sm mb-1 text-foreground">Retention</p>
              <p className="text-2xl font-bold text-foreground">
                {Math.round((metrics.retention_rate || 0) * 100)}%
              </p>
            </Button>

            <Button
              variant={selectedMetrics.includes("featureAdoption") ? "default" : "outline"}
              className={`h-auto p-6 flex-col items-start justify-start text-left transition-transform hover:scale-105 ${
                selectedMetrics.includes("featureAdoption")
                  ? "bg-[oklch(var(--chart-4))] hover:bg-[oklch(var(--chart-4))]/90"
                  : ""
              }`}
              onClick={() => toggleMetric("featureAdoption")}
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div className={`p-2 rounded-lg ${
                  selectedMetrics.includes("featureAdoption")
                    ? "bg-card/20"
                    : "bg-primary/10"
                }`}>
                  <TrendingUp className={`w-5 h-5 ${
                    selectedMetrics.includes("featureAdoption")
                      ? "text-foreground"
                      : "text-primary"
                  }`} />
                </div>
                <span className="text-sm font-medium text-foreground">+8%</span>
              </div>
              <p className="text-sm mb-1 text-foreground">Feature Adoption</p>
              <p className="text-2xl font-bold text-foreground">
                {Math.round((metrics.feature_adoption_rate || 0) * 100)}%
              </p>
            </Button>
          </div>

          <TrendsAreaChart selectedMetrics={selectedMetrics} metricsData={trendsData?.trends || []} />
        </TabsContent>

        {/* Interventions Tab */}
        <TabsContent value="interventions" className="space-y-6">
          {interventionLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-4 text-muted-foreground">Loading intervention data...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">
                    Activation Rate
                  </p>
                  <p className="text-3xl font-bold">
                    {((outcomes.activation_rate || 0) * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-success mt-1">
                    {outcomes.retention_improvement || '+0%'} vs baseline
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">
                    Time to Activate
                  </p>
                  <p className="text-3xl font-bold">
                    {(outcomes.avg_time_to_activation_days || 0).toFixed(1)} days
                  </p>
                  <p className="text-xs text-success mt-1">
                    {outcomes.activated_users || 0} users activated
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">
                    Emails Sent
                  </p>
                  <p className="text-3xl font-bold">{emailsSent}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </Card>
              </div>

              {/* Learning Insights */}
              {interventionData?.learning_insights && interventionData.learning_insights.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">AI Learning Insights</h3>
                  <div className="space-y-3">
                    {interventionData.learning_insights.map((insight: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                        <p className="text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Intervention Effectiveness by Type */}
              {interventionData?.effectiveness_by_type && interventionData.effectiveness_by_type.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Intervention Types Performance</h3>
                  <div className="space-y-3">
                    {interventionData.effectiveness_by_type.map((type: InterventionType, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-lg border border-border"
                      >
                        <div>
                          <p className="font-medium capitalize">
                            {type.intervention_type.replace(/_/g, ' ')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {type.sent} emails sent
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">
                            {(type.activation_rate * 100).toFixed(1)}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            +{type.avg_score_improvement} avg score
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        {/* Email Stats Tab */}
        <TabsContent value="email" className="space-y-6">
          {interventionLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-4 text-muted-foreground">Loading email stats...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Sent</p>
                <p className="text-2xl font-bold">{emailsSent}</p>
              </Card>

              <Card className="p-6">
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Delivered</p>
                <p className="text-2xl font-bold">{emailsDelivered}</p>
                <p className="text-xs text-muted-foreground">
                  {emailsSent > 0 ? '100%' : '0%'}
                </p>
              </Card>

              <Card className="p-6">
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Opened</p>
                <p className="text-2xl font-bold">{emailsOpened}</p>
                <p className="text-xs text-muted-foreground">
                  {(openRate * 100).toFixed(1)}%
                </p>
              </Card>

              <Card className="p-6">
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Clicked</p>
                <p className="text-2xl font-bold">{emailsClicked}</p>
                <p className="text-xs text-muted-foreground">
                  {(clickRate * 100).toFixed(1)}%
                </p>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
