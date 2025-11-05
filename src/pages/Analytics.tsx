import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Mail, Users, CheckCircle2 } from "lucide-react";
import { TrendsAreaChart } from "@/components/analytics/TrendsAreaChart";

const Analytics = () => {
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
            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-success">+12%</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Active Users</p>
              <p className="text-2xl font-bold">890</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <span className="text-sm font-medium text-success">+5.2%</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                Avg Activation
              </p>
              <p className="text-2xl font-bold">68%</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <CheckCircle2 className="w-5 h-5 text-info" />
                </div>
                <span className="text-sm font-medium text-success">+3.1%</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Retention</p>
              <p className="text-2xl font-bold">82%</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <TrendingUp className="w-5 h-5 text-warning" />
                </div>
                <span className="text-sm font-medium text-success">+8%</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                Feature Adoption
              </p>
              <p className="text-2xl font-bold">65%</p>
            </Card>
          </div>

          <TrendsAreaChart />
        </TabsContent>

        {/* Interventions Tab */}
        <TabsContent value="interventions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-1">
                Activation Rate
              </p>
              <p className="text-3xl font-bold">19.8%</p>
              <p className="text-xs text-success mt-1">+3.5% vs last month</p>
            </Card>

            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-1">
                Time to Activate
              </p>
              <p className="text-3xl font-bold">5.2 days</p>
              <p className="text-xs text-success mt-1">-1.3 days improvement</p>
            </Card>

            <Card className="p-6">
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
            <Card className="p-6">
              <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Sent</p>
              <p className="text-2xl font-bold">450</p>
            </Card>

            <Card className="p-6">
              <div className="p-2 rounded-lg bg-success/10 w-fit mb-3">
                <Mail className="w-5 h-5 text-success" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Delivered</p>
              <p className="text-2xl font-bold">445</p>
              <p className="text-xs text-muted-foreground">98.9%</p>
            </Card>

            <Card className="p-6">
              <div className="p-2 rounded-lg bg-info/10 w-fit mb-3">
                <CheckCircle2 className="w-5 h-5 text-info" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Opened</p>
              <p className="text-2xl font-bold">315</p>
              <p className="text-xs text-muted-foreground">70.8%</p>
            </Card>

            <Card className="p-6">
              <div className="p-2 rounded-lg bg-warning/10 w-fit mb-3">
                <TrendingUp className="w-5 h-5 text-warning" />
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
