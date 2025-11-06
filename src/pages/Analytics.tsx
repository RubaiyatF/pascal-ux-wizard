import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Mail, Users, CheckCircle2 } from "lucide-react";
import { TrendsAreaChart } from "@/components/analytics/TrendsAreaChart";
import { AnalyticsEmptyState } from "@/components/empty-states/AnalyticsEmptyState";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const Analytics = () => {
  const location = useLocation();
  const [hasData] = useState(true); // Toggle this to show/hide empty state
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(
    location.state?.selectedMetrics || [
      "activeUsers",
      "activation",
      "retention",
      "featureAdoption"
    ]
  );

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

  if (!hasData) {
    return <AnalyticsEmptyState />;
  }

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
              className={`h-auto p-6 flex-col items-start justify-start text-left ${
                selectedMetrics.includes("activeUsers") 
                  ? "bg-[oklch(var(--chart-1))] hover:bg-[oklch(var(--chart-1))]/90" 
                  : ""
              }`}
              onClick={() => toggleMetric("activeUsers")}
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div className={`p-2 rounded-lg ${
                  selectedMetrics.includes("activeUsers") 
                    ? "bg-white/20" 
                    : "bg-primary/10"
                }`}>
                  <Users className={`w-5 h-5 ${
                    selectedMetrics.includes("activeUsers") 
                      ? "text-black" 
                      : "text-primary"
                  }`} />
                </div>
                <span className="text-sm font-medium text-black">+12%</span>
              </div>
              <p className="text-sm mb-1 text-black">Active Users</p>
              <p className="text-2xl font-bold text-black">890</p>
            </Button>

            <Button
              variant={selectedMetrics.includes("activation") ? "default" : "outline"}
              className={`h-auto p-6 flex-col items-start justify-start text-left ${
                selectedMetrics.includes("activation") 
                  ? "bg-[oklch(var(--chart-2))] hover:bg-[oklch(var(--chart-2))]/90" 
                  : ""
              }`}
              onClick={() => toggleMetric("activation")}
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div className={`p-2 rounded-lg ${
                  selectedMetrics.includes("activation") 
                    ? "bg-white/20" 
                    : "bg-primary/10"
                }`}>
                  <TrendingUp className={`w-5 h-5 ${
                    selectedMetrics.includes("activation") 
                      ? "text-black" 
                      : "text-primary"
                  }`} />
                </div>
                <span className="text-sm font-medium text-black">+5.2%</span>
              </div>
              <p className="text-sm mb-1 text-black">Avg Activation</p>
              <p className="text-2xl font-bold text-black">68%</p>
            </Button>

            <Button
              variant={selectedMetrics.includes("retention") ? "default" : "outline"}
              className={`h-auto p-6 flex-col items-start justify-start text-left ${
                selectedMetrics.includes("retention") 
                  ? "bg-[oklch(var(--chart-3))] hover:bg-[oklch(var(--chart-3))]/90" 
                  : ""
              }`}
              onClick={() => toggleMetric("retention")}
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div className={`p-2 rounded-lg ${
                  selectedMetrics.includes("retention") 
                    ? "bg-white/20" 
                    : "bg-primary/10"
                }`}>
                  <CheckCircle2 className={`w-5 h-5 ${
                    selectedMetrics.includes("retention") 
                      ? "text-black" 
                      : "text-primary"
                  }`} />
                </div>
                <span className="text-sm font-medium text-black">+3.1%</span>
              </div>
              <p className="text-sm mb-1 text-black">Retention</p>
              <p className="text-2xl font-bold text-black">82%</p>
            </Button>

            <Button
              variant={selectedMetrics.includes("featureAdoption") ? "default" : "outline"}
              className={`h-auto p-6 flex-col items-start justify-start text-left ${
                selectedMetrics.includes("featureAdoption") 
                  ? "bg-[oklch(var(--chart-4))] hover:bg-[oklch(var(--chart-4))]/90" 
                  : ""
              }`}
              onClick={() => toggleMetric("featureAdoption")}
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div className={`p-2 rounded-lg ${
                  selectedMetrics.includes("featureAdoption") 
                    ? "bg-white/20" 
                    : "bg-primary/10"
                }`}>
                  <TrendingUp className={`w-5 h-5 ${
                    selectedMetrics.includes("featureAdoption") 
                      ? "text-black" 
                      : "text-primary"
                  }`} />
                </div>
                <span className="text-sm font-medium text-black">+8%</span>
              </div>
              <p className="text-sm mb-1 text-black">Feature Adoption</p>
              <p className="text-2xl font-bold text-black">65%</p>
            </Button>
          </div>

          <TrendsAreaChart selectedMetrics={selectedMetrics} />
        </TabsContent>

        {/* Interventions Tab */}
        <TabsContent value="interventions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 shadow-lg">
              <p className="text-sm text-muted-foreground mb-1">
                Activation Rate
              </p>
              <p className="text-3xl font-bold">19.8%</p>
              <p className="text-xs text-success mt-1">+3.5% vs last month</p>
            </Card>

            <Card className="p-6 shadow-lg">
              <p className="text-sm text-muted-foreground mb-1">
                Time to Activate
              </p>
              <p className="text-3xl font-bold">5.2 days</p>
              <p className="text-xs text-success mt-1">-1.3 days improvement</p>
            </Card>

            <Card className="p-6 shadow-lg">
              <p className="text-sm text-muted-foreground mb-1">
                Emails Sent
              </p>
              <p className="text-3xl font-bold">450</p>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </Card>
          </div>
        </TabsContent>

        {/* Email Stats Tab */}
        <TabsContent value="email" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6 shadow-lg">
              <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Sent</p>
              <p className="text-2xl font-bold">450</p>
            </Card>

            <Card className="p-6 shadow-lg">
              <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Delivered</p>
              <p className="text-2xl font-bold">445</p>
              <p className="text-xs text-muted-foreground">98.9%</p>
            </Card>

            <Card className="p-6 shadow-lg">
              <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Opened</p>
              <p className="text-2xl font-bold">315</p>
              <p className="text-xs text-muted-foreground">70.8%</p>
            </Card>

            <Card className="p-6 shadow-lg">
              <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Clicked</p>
              <p className="text-2xl font-bold">180</p>
              <p className="text-xs text-muted-foreground">40.4%</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
