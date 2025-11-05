import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Key, Mail, Database, Shield, CheckCircle2, Copy, Eye, EyeOff, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [recordingEnabled, setRecordingEnabled] = useState(true);
  const [emailInsightsEnabled, setEmailInsightsEnabled] = useState(true);
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(true);
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "test 2", key: "pk_a903de21a...", fullKey: "pk_a903de21a123456789", status: "active", created: "11/4/2025" },
    { id: 2, name: "Default API Key", key: "pk_55629ba77...", fullKey: "pk_55629ba77987654321", status: "active", created: "11/4/2025" }
  ]);
  const [visibleKeys, setVisibleKeys] = useState<Set<number>>(new Set());

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });
  };

  const toggleKeyVisibility = (keyId: number) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const generateNewKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      name: `API Key ${apiKeys.length + 1}`,
      key: `pk_${Math.random().toString(36).substring(2, 15)}...`,
      fullKey: `pk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      status: "active",
      created: new Date().toLocaleDateString()
    };
    setApiKeys([...apiKeys, newKey]);
    toast({
      title: "API Key generated",
      description: "Your new API key has been created.",
    });
  };

  const revokeKey = (keyId: number) => {
    setApiKeys(apiKeys.filter(k => k.id !== keyId));
    toast({
      title: "API Key revoked",
      description: "The API key has been revoked.",
      variant: "destructive"
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

          {/* Quick Start - Simple Script Tag */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Start - Simple Script Tag</h2>
            <p className="text-muted-foreground mb-4">
              The easiest way to get started. Just add this script tag to your HTML:
            </p>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Add to your HTML &lt;head&gt; or before &lt;/body&gt;
                </Label>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`<script
  src="https://tracker.pascal.cx/simple-snippet.js"
  data-project-id="f98d132b-22b9-4d99-a075-e06c780eafc3"
  data-api-key="pk_a903de21a..."
  data-recording="true"
  async
></script>`}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(`<script
  src="https://tracker.pascal.cx/simple-snippet.js"
  data-project-id="f98d132b-22b9-4d99-a075-e06c780eafc3"
  data-api-key="pk_a903de21a..."
  data-recording="true"
  async
></script>`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Available Options:</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><code className="bg-background px-1.5 py-0.5 rounded">data-project-id</code> - Your project ID (required)</p>
                  <p><code className="bg-background px-1.5 py-0.5 rounded">data-api-key</code> - Your API key (required)</p>
                  <p><code className="bg-background px-1.5 py-0.5 rounded">data-recording</code> - Enable session recording (true/false)</p>
                  <p><code className="bg-background px-1.5 py-0.5 rounded">data-debug</code> - Enable debug logging (true/false)</p>
                  <p><code className="bg-background px-1.5 py-0.5 rounded">data-endpoint</code> - Custom API endpoint (optional)</p>
                </div>
              </div>

              <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2"><span className="text-success">✓</span> Automatic page view tracking</p>
                  <p className="flex items-center gap-2"><span className="text-success">✓</span> Automatic click tracking</p>
                  <p className="flex items-center gap-2"><span className="text-success">✓</span> Session recordings (if enabled)</p>
                  <p className="flex items-center gap-2"><span className="text-success">✓</span> No build step required</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Advanced - SDK Integration */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Advanced - SDK Integration</h2>
            <p className="text-muted-foreground mb-4">
              For more control and custom event tracking:
            </p>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  1. Install the Pascal Tracker SDK
                </Label>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>npm install @pascal/tracker</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard('npm install @pascal/tracker')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  2. Initialize the tracker
                </Label>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { PascalTracker } from '@pascal/tracker';

const tracker = new PascalTracker({
  projectId: 'f98d132b-22b9-4d99-a075-e06c780eafc3',
  apiKey: 'YOUR_API_KEY',
  endpoint: 'https://pascal.cx/ingest'
});`}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(`import { PascalTracker } from '@pascal/tracker';

const tracker = new PascalTracker({
  projectId: 'f98d132b-22b9-4d99-a075-e06c780eafc3',
  apiKey: 'YOUR_API_KEY',
  endpoint: 'https://pascal.cx/ingest'
});`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  3. Track events
                </Label>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`tracker.track('page_view', {
  page: window.location.pathname,
  title: document.title
});`}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(`tracker.track('page_view', {
  page: window.location.pathname,
  title: document.title
});`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* API Keys */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">API Keys</h2>
              <Button onClick={generateNewKey} className="bg-gradient-hero hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Generate New Key
              </Button>
            </div>
            
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{apiKey.name}</h3>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          {apiKey.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-sm text-muted-foreground font-mono">
                          {visibleKeys.has(apiKey.id) ? apiKey.fullKey : apiKey.key}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                        >
                          {visibleKeys.has(apiKey.id) ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(apiKey.fullKey)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Created {apiKey.created}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
                        onClick={() => revokeKey(apiKey.id)}
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
