import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Mail, Users, CheckCircle2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Analytics = () => {
  // Dummy trend data for the last 30 days
  const trendData = [
    { date: "Day 1", activeUsers: 780, activation: 62, retention: 78, featureAdoption: 58 },
    { date: "Day 5", activeUsers: 795, activation: 63, retention: 79, featureAdoption: 59 },
    { date: "Day 10", activeUsers: 810, activation: 64, retention: 80, featureAdoption: 60 },
    { date: "Day 15", activeUsers: 835, activation: 65, retention: 80, featureAdoption: 62 },
    { date: "Day 20", activeUsers: 860, activation: 66, retention: 81, featureAdoption: 63 },
    { date: "Day 25", activeUsers: 875, activation: 67, retention: 81, featureAdoption: 64 },
    { date: "Day 30", activeUsers: 890, activation: 68, retention: 82, featureAdoption: 65 },
  ];

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

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Trends - Last 30 Days</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="activeUsers" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Active Users"
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="activation" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    name="Activation %"
                    dot={{ fill: 'hsl(var(--success))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="retention" 
                    stroke="hsl(var(--info))" 
                    strokeWidth={2}
                    name="Retention %"
                    dot={{ fill: 'hsl(var(--info))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="featureAdoption" 
                    stroke="hsl(var(--warning))" 
                    strokeWidth={2}
                    name="Feature Adoption %"
                    dot={{ fill: 'hsl(var(--warning))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
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
