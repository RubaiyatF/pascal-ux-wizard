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
import { Save, Key, Mail, Database, Shield, CheckCircle2, Copy, Plus, UserPlus, X, Loader2, Send, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { EmailConfigEmptyState } from "@/components/empty-states/EmailConfigEmptyState";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProject } from "@/contexts/ProjectContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api";

interface TeamMember {
  id: string;
  email: string;
  status: string;
  role: string;
  invitedAt: string;
}

interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  status: string;
  createdAt: string;
  lastUsedAt?: string;
}

const Settings = () => {
  const { toast } = useToast();
  const { currentProject } = useProject();
  const { projectId } = useOnboarding();
  const api = useApiClient();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("general");
  const [recordingEnabled, setRecordingEnabled] = useState(true);
  const [emailInsightsEnabled, setEmailInsightsEnabled] = useState(true);
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(true);

  // Email config form state
  const [brevoApiKey, setBrevoApiKey] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [fromName, setFromName] = useState("");
  const [appUrl, setAppUrl] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");
  const [includeInsights, setIncludeInsights] = useState(true);

  // Set active tab from URL parameter on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['general', 'team', 'tracking', 'email'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Mark onboarding step 7 as complete when Settings is visited
  useEffect(() => {
    if (projectId) {
      localStorage.setItem(`pascal-settings-visited-${projectId}`, 'true');
    }
  }, [projectId]);

  // Fetch email configuration
  const { data: emailConfig, isLoading: emailConfigLoading } = useQuery({
    queryKey: ["email-config", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/email-config`),
    enabled: !!projectId,
  });

  // Populate form when config is loaded
  useEffect(() => {
    if (emailConfig) {
      setBrevoApiKey(emailConfig.brevo_api_key || "");
      setFromEmail(emailConfig.from_email || "");
      setFromName(emailConfig.from_name || "");
      setAppUrl(emailConfig.app_url || "");
      setDailyLimit(emailConfig.daily_limit?.toString() || "");
      setIncludeInsights(emailConfig.include_insights ?? true);
    }
  }, [emailConfig]);

  // Verify Brevo API key
  const verifyMutation = useMutation({
    mutationFn: () => api.post(`/api/projects/${projectId}/email-config/verify`, { brevo_api_key: brevoApiKey }),
    onSuccess: () => {
      toast({
        title: "API key verified",
        description: "Your Brevo API key is valid.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Verification failed",
        description: error.message || "Invalid API key. Please check and try again.",
        variant: "destructive",
      });
    },
  });

  // Save email configuration
  const saveMutation = useMutation({
    mutationFn: () =>
      api.post(`/api/projects/${projectId}/email-config`, {
        brevo_api_key: brevoApiKey,
        from_email: fromEmail,
        from_name: fromName,
        app_url: appUrl,
        daily_limit: parseInt(dailyLimit) || 100,
        include_insights: includeInsights,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-config", projectId] });
      // Mark onboarding step 4 complete
      localStorage.setItem(`pascal-email-provider-${projectId}`, 'true');
      toast({
        title: "Configuration saved",
        description: "Email configuration has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Save failed",
        description: error.message || "Failed to save configuration.",
        variant: "destructive",
      });
    },
  });

  // Test email
  const testEmailMutation = useMutation({
    mutationFn: (testEmail: string) =>
      api.post(`/api/projects/${projectId}/email-config/test`, { test_email: testEmail }),
    onSuccess: () => {
      toast({
        title: "Test email sent",
        description: "Check your inbox for the test email.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Test failed",
        description: error.message || "Failed to send test email.",
        variant: "destructive",
      });
    },
  });

  // Delete configuration
  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/api/projects/${projectId}/email-config`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-config", projectId] });
      setBrevoApiKey("");
      setFromEmail("");
      setFromName("");
      setAppUrl("");
      setDailyLimit("");
      setIncludeInsights(true);
      localStorage.removeItem(`pascal-email-provider-${projectId}`);
      toast({
        title: "Configuration deleted",
        description: "Email configuration has been removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete configuration.",
        variant: "destructive",
      });
    },
  });

  const handleVerifyApiKey = () => {
    if (!brevoApiKey) {
      toast({
        title: "API key required",
        description: "Please enter your Brevo API key.",
        variant: "destructive",
      });
      return;
    }
    verifyMutation.mutate();
  };

  const handleSaveEmailConfig = () => {
    if (!brevoApiKey || !fromEmail || !fromName || !appUrl) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    saveMutation.mutate();
  };

  const handleTestEmail = () => {
    if (!emailConfig) {
      toast({
        title: "Configuration required",
        description: "Please save your configuration first.",
        variant: "destructive",
      });
      return;
    }
    const testEmail = prompt("Enter email address to send test to:");
    if (testEmail) {
      testEmailMutation.mutate(testEmail);
    }
  };

  const handleDeleteConfig = () => {
    if (confirm("Are you sure you want to delete your email configuration?")) {
      deleteMutation.mutate();
    }
  };

  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [newGeneratedKey, setNewGeneratedKey] = useState("");
  const [newGeneratedKeyName, setNewGeneratedKeyName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("editor");
  const [projectName, setProjectName] = useState("");
  const [projectWebsite, setProjectWebsite] = useState("");

  // Fetch project details
  const { data: projectDetails, isLoading: projectLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}`),
    enabled: !!projectId,
  });

  // Populate project details when loaded
  useEffect(() => {
    if (projectDetails) {
      setProjectName(projectDetails.name || "");
      setProjectWebsite(projectDetails.website || "");
    }
  }, [projectDetails]);

  // Fetch team members
  const { data: teamMembers = [], isLoading: teamLoading } = useQuery({
    queryKey: ["team-members", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/team`),
    enabled: !!projectId,
  });

  // Fetch API keys
  const { data: apiKeys = [], isLoading: keysLoading } = useQuery({
    queryKey: ["api-keys", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/api-keys`),
    enabled: !!projectId,
  });

  // Update project settings
  const updateProjectMutation = useMutation({
    mutationFn: (updates: { name?: string; website?: string }) =>
      api.put(`/api/projects/${projectId}`, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      toast({
        title: "Settings saved",
        description: "Your project settings have been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Save failed",
        description: error.message || "Failed to save project settings.",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    if (!projectName || !projectWebsite) {
      toast({
        title: "Required fields missing",
        description: "Please fill in both project name and website.",
        variant: "destructive",
      });
      return;
    }
    updateProjectMutation.mutate({
      name: projectName,
      website: projectWebsite,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });
  };

  // Generate new API key
  const generateKeyMutation = useMutation({
    mutationFn: (keyName: string) =>
      api.post(`/api/projects/${projectId}/api-keys`, { name: keyName }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["api-keys", projectId] });
      setNewGeneratedKey(data.fullKey);
      setNewGeneratedKeyName(data.name);
      setShowApiKeyModal(true);
      // Mark onboarding step 2 complete
      localStorage.setItem(`pascal-api-key-${projectId}`, 'true');
    },
    onError: (error: Error) => {
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate API key.",
        variant: "destructive",
      });
    },
  });

  const generateNewKey = () => {
    const keyName = prompt("Enter a name for this API key:");
    if (keyName) {
      generateKeyMutation.mutate(keyName);
    }
  };

  // Revoke API key
  const revokeKeyMutation = useMutation({
    mutationFn: (keyId: string) =>
      api.delete(`/api/projects/${projectId}/api-keys/${keyId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys", projectId] });
      toast({
        title: "API Key revoked",
        description: "The API key has been revoked.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Revocation failed",
        description: error.message || "Failed to revoke API key.",
        variant: "destructive",
      });
    },
  });

  const revokeKey = (keyId: string) => {
    if (confirm("Are you sure you want to revoke this API key? This action cannot be undone.")) {
      revokeKeyMutation.mutate(keyId);
    }
  };

  // Invite team member
  const inviteMutation = useMutation({
    mutationFn: ({ email, role }: { email: string; role: string }) =>
      api.post(`/api/projects/${projectId}/team/invite`, { email, role }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["team-members", projectId] });
      setInviteEmail("");
      setInviteRole("editor");
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${data.email}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Invitation failed",
        description: error.message || "Failed to send invitation.",
        variant: "destructive",
      });
    },
  });

  const handleInviteTeammate = () => {
    if (!inviteEmail) {
      toast({
        title: "Email required",
        description: "Please enter an email address to send the invitation.",
        variant: "destructive"
      });
      return;
    }

    inviteMutation.mutate({ email: inviteEmail, role: inviteRole });
  };

  // Remove team member
  const removeMemberMutation = useMutation({
    mutationFn: (memberId: string) =>
      api.delete(`/api/projects/${projectId}/team/${memberId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members", projectId] });
      toast({
        title: "Member removed",
        description: "The team member has been removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Removal failed",
        description: error.message || "Failed to remove team member.",
        variant: "destructive",
      });
    },
  });

  const removeTeamMember = (memberId: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      removeMemberMutation.mutate(memberId);
    }
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
          {emailConfigLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p className="text-muted-foreground">Loading email configuration...</p>
              </div>
            </div>
          ) : !emailConfig ? (
            <EmailConfigEmptyState onConfigure={() => setActiveTab("email")} />
          ) : (
            <>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Brevo Integration</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={handleDeleteConfig}
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 mr-2" />
                    )}
                    Delete Config
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="brevo-key">API Key *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="brevo-key"
                        type="password"
                        placeholder="Enter your Brevo API key..."
                        value={brevoApiKey}
                        onChange={(e) => setBrevoApiKey(e.target.value)}
                        disabled={verifyMutation.isPending || saveMutation.isPending}
                      />
                      <Button
                        variant="outline"
                        onClick={handleVerifyApiKey}
                        disabled={verifyMutation.isPending || !brevoApiKey}
                      >
                        {verifyMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Verify"
                        )}
                      </Button>
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
                    <Label htmlFor="from-email">From Email *</Label>
                    <Input
                      id="from-email"
                      type="email"
                      placeholder="noreply@example.com"
                      value={fromEmail}
                      onChange={(e) => setFromEmail(e.target.value)}
                      disabled={saveMutation.isPending}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email address that will appear as the sender
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="from-name">From Name *</Label>
                    <Input
                      id="from-name"
                      placeholder="Your Company Name"
                      value={fromName}
                      onChange={(e) => setFromName(e.target.value)}
                      disabled={saveMutation.isPending}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Name that will appear as the sender
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="app-url">App URL *</Label>
                    <Input
                      id="app-url"
                      type="url"
                      placeholder="https://example.com"
                      value={appUrl}
                      onChange={(e) => setAppUrl(e.target.value)}
                      disabled={saveMutation.isPending}
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
                      value={dailyLimit}
                      onChange={(e) => setDailyLimit(e.target.value)}
                      disabled={saveMutation.isPending}
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
                    <Switch
                      checked={includeInsights}
                      onCheckedChange={setIncludeInsights}
                      disabled={saveMutation.isPending}
                    />
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleSaveEmailConfig}
                  disabled={saveMutation.isPending}
                  className="bg-gradient-hero hover:opacity-90"
                >
                  {saveMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Configuration
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleTestEmail}
                  disabled={testEmailMutation.isPending || !emailConfig}
                >
                  {testEmailMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Test Email
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          {projectLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p className="text-muted-foreground">Loading project details...</p>
              </div>
            </div>
          ) : (
            <>
              <Card className="p-6 bg-card">
                <h2 className="text-xl font-semibold mb-4">Project Details</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Enter project name"
                      disabled={updateProjectMutation.isPending}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      type="url"
                      value={projectWebsite}
                      onChange={(e) => setProjectWebsite(e.target.value)}
                      placeholder="https://your-website.com"
                      disabled={updateProjectMutation.isPending}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectId">Project ID</Label>
                    <div className="flex gap-2">
                      <Input
                        id="projectId"
                        value={projectId || ""}
                        disabled
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(projectId || "")}
                      >
                        <Copy className="w-4 h-4" />
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
                  disabled={updateProjectMutation.isPending}
                  className="bg-gradient-hero hover:opacity-90 transition-opacity"
                >
                  {updateProjectMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        {/* Team Management */}
        <TabsContent value="team" className="space-y-6">
          {teamLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p className="text-muted-foreground">Loading team members...</p>
              </div>
            </div>
          ) : (
            <>
              <Card className="p-6 bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Team Members</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manage who has access to this project
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {teamMembers.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No team members yet. Invite someone to get started!
                    </p>
                  ) : (
                    teamMembers.map((member: TeamMember) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-muted/30 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{member.email}</p>
                            <Badge
                              variant="outline"
                              className={member.status === "active" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}
                            >
                              {member.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)} · Invited {new Date(member.invitedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                        {member.role !== "owner" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => removeTeamMember(member.id)}
                            disabled={removeMemberMutation.isPending}
                          >
                            {removeMemberMutation.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </Card>

              <Card className="p-6 bg-card">
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
                      disabled={inviteMutation.isPending}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inviteRole">Role</Label>
                    <Select value={inviteRole} onValueChange={setInviteRole} disabled={inviteMutation.isPending}>
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
                    disabled={inviteMutation.isPending}
                    className="bg-gradient-hero hover:opacity-90"
                  >
                    {inviteMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Send Invitation
                      </>
                    )}
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
            </>
          )}
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
              <Button
                onClick={generateNewKey}
                disabled={generateKeyMutation.isPending || keysLoading}
                className="bg-gradient-hero hover:opacity-90"
              >
                {generateKeyMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Generate New Key
                  </>
                )}
              </Button>
            </div>

            {keysLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : apiKeys.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No API keys yet. Generate one to get started!
              </p>
            ) : (
              <div className="space-y-4">
                {apiKeys.map((apiKey: ApiKey) => (
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
                          {apiKey.keyPrefix}
                        </code>
                        <p className="text-xs text-muted-foreground">
                          Created {new Date(apiKey.createdAt).toLocaleDateString()}
                          {apiKey.lastUsedAt && ` · Last used ${new Date(apiKey.lastUsedAt).toLocaleDateString()}`}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
                        onClick={() => revokeKey(apiKey.id)}
                        disabled={revokeKeyMutation.isPending}
                      >
                        {revokeKeyMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Revoke"
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
  data-api-key="${apiKeys.length > 0 ? apiKeys[0].keyPrefix : 'YOUR_API_KEY'}"
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
  data-api-key="${apiKeys.length > 0 ? apiKeys[0].keyPrefix : 'YOUR_API_KEY'}"
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
  apiKey: '${apiKeys.length > 0 ? apiKeys[0].keyPrefix : 'YOUR_API_KEY'}',
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
  apiKey: '${apiKeys.length > 0 ? apiKeys[0].keyPrefix : 'YOUR_API_KEY'}',
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
