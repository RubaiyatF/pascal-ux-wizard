import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Key, Mail, Database, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [recordingEnabled, setRecordingEnabled] = useState(true);
  const [emailInsightsEnabled, setEmailInsightsEnabled] = useState(true);
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(true);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your project configuration and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
          <TabsTrigger value="email">Email Config</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
        </TabsList>

        {/* Email Setup */}
        <TabsContent value="email" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Brevo Integration</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <div>
                  <p className="font-medium">✅ Connected</p>
                  <p className="text-sm text-muted-foreground">
                    Account: premium
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="brevo-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="brevo-key"
                    type="password"
                    placeholder="xkeysib-abc123..."
                    defaultValue="xkeysib-abc123..."
                  />
                  <Button variant="outline">Verify</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Sender Settings</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="from-email">From Email</Label>
                <Input
                  id="from-email"
                  type="email"
                  placeholder="noreply@example.com"
                  defaultValue="noreply@example.com"
                />
              </div>

              <div>
                <Label htmlFor="from-name">From Name</Label>
                <Input
                  id="from-name"
                  placeholder="Pascal Analytics"
                  defaultValue="Pascal Analytics"
                />
              </div>

              <div>
                <Label htmlFor="app-url">App URL</Label>
                <Input
                  id="app-url"
                  type="url"
                  placeholder="https://example.com"
                  defaultValue="https://example.com"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Limits</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="daily-limit">Daily Email Limit</Label>
                <Input
                  id="daily-limit"
                  type="number"
                  placeholder="100"
                  defaultValue="100"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum emails per day
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Session Insights</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable AI-powered session insights
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Button className="bg-gradient-hero hover:opacity-90">
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
          <Button variant="outline" className="ml-2">
            Send Test Email
          </Button>
        </TabsContent>

        {/* Email Stats */}
        <TabsContent value="stats" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">
              Email Performance - Last 30 Days
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 border border-border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Sent</p>
                <p className="text-2xl font-bold">450</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Delivered</p>
                <p className="text-2xl font-bold">445</p>
                <p className="text-xs text-muted-foreground">98.9%</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Opened</p>
                <p className="text-2xl font-bold">315</p>
                <p className="text-xs text-success">70.8%</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Clicked</p>
                <p className="text-2xl font-bold">180</p>
                <p className="text-xs text-success">40.4%</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-medium">By Email Type:</p>
              {[
                {
                  type: "Activation nudge",
                  sent: 200,
                  open: "75%",
                  click: "45%",
                },
                {
                  type: "Feature tutorial",
                  sent: 150,
                  open: "68%",
                  click: "38%",
                },
                {
                  type: "Re-engagement",
                  sent: 100,
                  open: "65%",
                  click: "35%",
                },
              ].map((stat) => (
                <div
                  key={stat.type}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{stat.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {stat.sent} sent
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Open</p>
                      <p className="font-medium">{stat.open}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Click</p>
                      <p className="font-medium">{stat.click}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h3 className="text-lg font-semibold mb-4">Issues</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bounced</span>
                <Badge variant="outline">5</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Complained</span>
                <Badge variant="outline">2</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  defaultValue="My SaaS Product"
                  placeholder="Enter project name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  type="url"
                  defaultValue="https://myapp.com"
                  placeholder="https://your-website.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectId">Project ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="projectId"
                    defaultValue="proj_demo_abc123"
                    disabled
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Key className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This ID is used to identify your project in the tracking code
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tracking Settings */}
        <TabsContent value="tracking" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Tracking Features</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="recording">Session Recording</Label>
                  <p className="text-sm text-muted-foreground">
                    Record user sessions with rrweb for replay
                  </p>
                </div>
                <Switch
                  id="recording"
                  checked={recordingEnabled}
                  onCheckedChange={setRecordingEnabled}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Data Retention</Label>
                <Input type="number" defaultValue="90" className="w-32" />
                <p className="text-xs text-muted-foreground">
                  Days to keep session data (default: 90 days)
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Privacy Settings</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Switch id="maskInputs" defaultChecked />
                    <Label htmlFor="maskInputs" className="cursor-pointer">
                      Mask all input fields
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="maskEmails" defaultChecked />
                    <Label htmlFor="maskEmails" className="cursor-pointer">
                      Mask email addresses
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="maskPasswords" defaultChecked />
                    <Label htmlFor="maskPasswords" className="cursor-pointer">
                      Mask password fields
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Email Configuration</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailInsights">
                    Session Insight Emails
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Send AI-powered session insights to users
                  </p>
                </div>
                <Switch
                  id="emailInsights"
                  checked={emailInsightsEnabled}
                  onCheckedChange={setEmailInsightsEnabled}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    defaultValue="noreply@myapp.com"
                    placeholder="noreply@your-domain.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    defaultValue="My SaaS Product"
                    placeholder="Your Product Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brevoKey">Brevo API Key</Label>
                  <Input
                    id="brevoKey"
                    type="password"
                    placeholder="xkeysib-••••••••••••"
                  />
                  <p className="text-xs text-muted-foreground">
                    Get your API key from{" "}
                    <a
                      href="https://app.brevo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Brevo Dashboard
                    </a>
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Daily Email Limit</Label>
                <Input type="number" defaultValue="100" className="w-32" />
                <p className="text-xs text-muted-foreground">
                  Maximum emails to send per day (default: 100)
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* AI Settings */}
        <TabsContent value="ai" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">AI Analysis</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="aiAnalysis">AI Session Analysis</Label>
                  <p className="text-sm text-muted-foreground">
                    Analyze sessions with Google Gemini 1.5 Pro
                  </p>
                </div>
                <Switch
                  id="aiAnalysis"
                  checked={aiAnalysisEnabled}
                  onCheckedChange={setAiAnalysisEnabled}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Success Benchmarks</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Define benchmark users to compare against
                  </p>
                  <Button variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    Manage Benchmarks
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>HEART Framework Weights</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Customize scoring weights for each dimension
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: "Happiness", value: 25 },
                      { label: "Engagement", value: 20 },
                      { label: "Adoption", value: 30 },
                      { label: "Retention", value: 15 },
                      { label: "Task Success", value: 10 },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        className="flex items-center justify-between"
                      >
                        <Label className="text-sm">{metric.label}</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            defaultValue={metric.value}
                            className="w-20"
                            min="0"
                            max="100"
                          />
                          <span className="text-sm text-muted-foreground">
                            %
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-secondary/50">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Data Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  All session data is encrypted at rest and in transit. AI
                  analysis is performed on anonymized data only. We are
                  GDPR-compliant and respect user consent preferences.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-gradient-hero hover:opacity-90 transition-opacity"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
