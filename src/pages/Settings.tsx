import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Key, Mail, Database, Shield, CheckCircle2, Copy, Plus, UserPlus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { EmailConfigEmptyState } from "@/components/empty-states/EmailConfigEmptyState";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProject } from "@/contexts/ProjectContext";

const Settings = () => {
  const { toast } = useToast();
  const { currentProject } = useProject();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("general");
  const [recordingEnabled, setRecordingEnabled] = useState(true);
  const [emailInsightsEnabled, setEmailInsightsEnabled] = useState(true);
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(true);
  const [emailConfigured, setEmailConfigured] = useState(false);

  // Set active tab from URL parameter on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['general', 'team', 'tracking', 'email'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Mark onboarding step 7 as complete when Settings is visited (with delay to prevent false triggers)
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(`pascal-settings-visited-${currentProject}`, 'true');
    }, 2000); // 2 second delay ensures user is actually viewing the page
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount - page visit, not on project changes

  const handleConfigureEmail = () => {
    setEmailConfigured(true);
    // Mark step 4 as complete
    localStorage.setItem(`pascal-email-provider-${currentProject}`, 'true');
  };

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "test 2", key: "pk_a903de21a...", fullKey: "pk_a903de21a123456789", status: "active", created: "11/4/2025" },
    { id: 2, name: "Default API Key", key: "pk_55629ba77...", fullKey: "pk_55629ba77987654321", status: "active", created: "11/4/2025" }
  ]);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [newGeneratedKey, setNewGeneratedKey] = useState("");
  const [projectId] = useState("proj_demo_abc123");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("editor");
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, email: "you@company.com", role: "Owner", status: "Active", joined: "Jan 2024" },
    { id: 2, email: "alex@company.com", role: "Editor", status: "Active", joined: "Feb 2024" },
    { id: 3, email: "sarah@company.com", role: "Viewer", status: "Pending", joined: "Mar 2024" },
  ]);

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

  const generateNewKey = () => {
    const fullKey = `pk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const newKey = {
      id: apiKeys.length + 1,
      name: `API Key ${apiKeys.length + 1}`,
      key: `pk_${Math.random().toString(36).substring(2, 15)}...`,
      fullKey: fullKey,
      status: "active",
      created: new Date().toLocaleDateString()
    };
    setApiKeys([...apiKeys, newKey]);
    setNewGeneratedKey(fullKey);
    setShowApiKeyModal(true);
  };

  const revokeKey = (keyId: number) => {
    setApiKeys(apiKeys.filter(k => k.id !== keyId));
    toast({
      title: "API Key revoked",
      description: "The API key has been revoked.",
      variant: "destructive"
    });
  };

  const handleInviteTeammate = () => {
    if (!inviteEmail) {
      toast({
        title: "Email required",
        description: "Please enter an email address to send the invitation.",
        variant: "destructive"
      });
      return;
    }

    // Check if already invited
    if (teamMembers.some(member => member.email === inviteEmail)) {
      toast({
        title: "Already invited",
        description: "This user has already been invited to the team.",
        variant: "destructive"
      });
      return;
    }

    const newMember = {
      id: teamMembers.length + 1,
      email: inviteEmail,
      role: inviteRole.charAt(0).toUpperCase() + inviteRole.slice(1),
      status: "Pending",
      joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    setTeamMembers([...teamMembers, newMember]);
    setInviteEmail("");
    setInviteRole("editor");

    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${inviteEmail}`,
    });
  };

  const removeTeamMember = (memberId: number) => {
    setTeamMembers(teamMembers.filter(m => m.id !== memberId));
    toast({
      title: "Member removed",
      description: "The team member has been removed.",
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
          <TabsTrigger value="email">Email Config</TabsTrigger>
        </TabsList>

        {/* Email Setup */}
        <TabsContent value="email" className="space-y-6">
          {!emailConfigured ? (
            <EmailConfigEmptyState onConfigure={handleConfigureEmail} />
          ) : (
            <>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6">Brevo Integration</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="brevo-key">API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        id="brevo-key"
                        type="password"
                        placeholder="Enter your Brevo API key..."
                      />
                      <Button variant="outline">Verify</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Get your API key from{" "}
                      <a
                        href="https://app.brevo.com/settings/keys/api"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Brevo Dashboard
                      </a>
                    </p>
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
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email address that will appear as the sender
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="from-name">From Name</Label>
                    <Input
                      id="from-name"
                      placeholder="Your Company Name"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Name that will appear as the sender
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="app-url">App URL</Label>
                    <Input
                      id="app-url"
                      type="url"
                      placeholder="https://example.com"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Your application's base URL for links in emails
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6">Email Limits</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="daily-limit">Daily Email Limit</Label>
                    <Input
                      id="daily-limit"
                      type="number"
                      placeholder="100"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum number of emails to send per day
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Session Insights</Label>
                      <p className="text-sm text-muted-foreground">
                        Include AI-powered session insights in emails
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </Card>
            </>
          )}
        </TabsContent>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="p-6 bg-white">
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
        </TabsContent>

        {/* Team Management */}
        <TabsContent value="team" className="space-y-6">
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Team Members</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage who has access to this project
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-white hover:bg-muted/30 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{member.email}</p>
                      <Badge 
                        variant="outline" 
                        className={member.status === "Active" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}
                      >
                        {member.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {member.role} · Joined {member.joined}
                    </p>
                  </div>
                  {member.role !== "Owner" && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeTeamMember(member.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">Invite Teammate</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Send an invitation to add a new member to your team
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteEmail">Email Address</Label>
                <Input
                  id="inviteEmail"
                  type="email"
                  placeholder="teammate@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inviteRole">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger id="inviteRole">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer - View only access</SelectItem>
                    <SelectItem value="editor">Editor - Can edit and view</SelectItem>
                    <SelectItem value="admin">Admin - Full access except deletion</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose the level of access for this team member
                </p>
              </div>

              <Button 
                onClick={handleInviteTeammate} 
                className="bg-gradient-hero hover:opacity-90"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </Card>

          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <p className="text-sm font-medium mb-2">About Team Roles:</p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><span className="font-medium text-foreground">Viewer:</span> Can view all project data but cannot make changes</p>
              <p><span className="font-medium text-foreground">Editor:</span> Can view and edit project settings and configurations</p>
              <p><span className="font-medium text-foreground">Admin:</span> Can manage team members and all project settings</p>
              <p><span className="font-medium text-foreground">Owner:</span> Full control including project deletion</p>
            </div>
          </div>
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
                      <code className="text-sm text-muted-foreground font-mono mb-1 block">
                        {apiKey.key}
                      </code>
                      <p className="text-xs text-muted-foreground">
                        Created {apiKey.created}
                      </p>
                    </div>
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
              ))}
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
  data-project-id="${projectId}"
  data-api-key="${apiKeys[apiKeys.length - 1]?.key || 'YOUR_API_KEY'}"
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
  data-project-id="${projectId}"
  data-api-key="${apiKeys[apiKeys.length - 1]?.key || 'YOUR_API_KEY'}"
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
  projectId: '${projectId}',
  apiKey: '${apiKeys[apiKeys.length - 1]?.key || 'YOUR_API_KEY'}',
  endpoint: 'https://pascal.cx/ingest'
});`}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(`import { PascalTracker } from '@pascal/tracker';

const tracker = new PascalTracker({
  projectId: '${projectId}',
  apiKey: '${apiKeys[apiKeys.length - 1]?.key || 'YOUR_API_KEY'}',
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

        </TabsContent>

      </Tabs>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={showApiKeyModal}
        apiKey={newGeneratedKey}
        onClose={() => setShowApiKeyModal(false)}
      />
    </div>
  );
};

export default Settings;
