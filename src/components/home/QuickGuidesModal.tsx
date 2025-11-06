import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Rocket, 
  Code2, 
  Play, 
  Target, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QuickGuidesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickGuidesModal = ({ open, onOpenChange }: QuickGuidesModalProps) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)]">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl md:text-2xl">Quick Guides</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="getting-started" className="text-xs sm:text-sm">Getting Started</TabsTrigger>
            <TabsTrigger value="api" className="text-xs sm:text-sm">API Reference</TabsTrigger>
            <TabsTrigger value="tutorials" className="text-xs sm:text-sm">Tutorials</TabsTrigger>
            <TabsTrigger value="best-practices" className="text-xs sm:text-sm">Best Practices</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(90vh-140px)] sm:h-[calc(85vh-160px)] mt-4">
            {/* Getting Started Tab */}
            <TabsContent value="getting-started" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-primary" />
                  Getting Started with Pascal
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Follow these steps to set up Pascal and start activating your revenue pipeline.
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="border rounded-lg p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Install the Tracking Code</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Add the Pascal tracking script to your website's &lt;head&gt; section to start recording user sessions.
                      </p>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`<script>
  (function(p,a,s,c,a,l){
    p.PascalObject=a;p[a]=p[a]||function(){
    (p[a].q=p[a].q||[]).push(arguments)};
    p[a].l=1*new Date();l=s.createElement('script');
    l.async=1;l.src=c;s=s.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(l,s)
  })(window,'pascal','https://cdn.pascal.ai/tracker.js');
  
  pascal('init', 'YOUR_PROJECT_ID');
</script>`}
                        </pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(
                            `<script>\n  (function(p,a,s,c,a,l){\n    p.PascalObject=a;p[a]=p[a]||function(){\n    (p[a].q=p[a].q||[]).push(arguments)};\n    p[a].l=1*new Date();l=s.createElement('script');\n    l.async=1;l.src=c;s=s.getElementsByTagName('script')[0];\n    s.parentNode.insertBefore(l,s)\n  })(window,'pascal','https://cdn.pascal.ai/tracker.js');\n  \n  pascal('init', 'YOUR_PROJECT_ID');\n</script>`,
                            'Tracking code'
                          )}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Identify Users</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Send user information to Pascal to enable personalized tracking and email generation.
                      </p>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`// After user logs in or signs up
pascal('identify', {
  email: 'user@example.com',
  name: 'John Doe',
  userId: 'user_123',
  company: 'Acme Inc',
  plan: 'free'
});`}
                        </pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(
                            `pascal('identify', {\n  email: 'user@example.com',\n  name: 'John Doe',\n  userId: 'user_123',\n  company: 'Acme Inc',\n  plan: 'free'\n});`,
                            'Identify code'
                          )}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Mark Benchmark Users</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Identify successful users who represent your ideal conversion path. Pascal will analyze their behavior to guide other users.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="secondary">Navigate to Benchmarks</Badge>
                        <Badge variant="secondary">Add Successful Users</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-primary">4</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Configure Email Settings</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Set up your email provider (Brevo recommended) to enable Pascal to send personalized emails.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="secondary">Go to Settings</Badge>
                        <Badge variant="secondary">Add Brevo API Key</Badge>
                        <Badge variant="secondary">Configure Sender Email</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-primary">5</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Review and Send Emails</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pascal's AI will generate personalized emails based on user behavior. Review them in the Email Queue and approve to send.
                      </p>
                      <div className="mt-3 p-3 bg-primary/5 rounded-md">
                        <p className="text-xs text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>
                            Human-in-the-loop design ensures every email is reviewed before sending, maintaining your brand voice.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  Important Notes
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>The tracking script is only 5.9KB and won't slow down your website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>GDPR compliant with built-in consent management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Session recordings are encrypted with AES-256 encryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>It typically takes 24-48 hours for Pascal to gather enough data for initial analysis</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            {/* API Reference Tab */}
            <TabsContent value="api" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  API Reference
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Complete reference for integrating Pascal into your application.
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                {/* Initialize */}
                <div className="border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">pascal('init', projectId)</h4>
                    <Badge variant="secondary">Required</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Initialize Pascal tracking with your project ID. Must be called before any other Pascal methods.
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs font-medium">Parameters:</div>
                    <div className="bg-muted p-3 rounded-md text-xs space-y-1">
                      <div><span className="text-primary">projectId</span> (string, required) - Your unique Pascal project ID</div>
                    </div>
                  </div>
                  <div className="mt-3 relative">
                    <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`pascal('init', 'proj_abc123xyz');`}
                    </pre>
                  </div>
                </div>

                {/* Identify */}
                <div className="border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">pascal('identify', userData)</h4>
                    <Badge variant="secondary">Recommended</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Associate session recordings with a specific user. This enables personalized email generation and user journey tracking.
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs font-medium">Parameters:</div>
                    <div className="bg-muted p-3 rounded-md text-xs space-y-1">
                      <div><span className="text-primary">email</span> (string, required) - User's email address</div>
                      <div><span className="text-primary">userId</span> (string, recommended) - Your internal user ID</div>
                      <div><span className="text-primary">name</span> (string, optional) - User's full name</div>
                      <div><span className="text-primary">company</span> (string, optional) - Company name</div>
                      <div><span className="text-primary">plan</span> (string, optional) - Current subscription plan</div>
                      <div><span className="text-primary">customData</span> (object, optional) - Any additional user properties</div>
                    </div>
                  </div>
                  <div className="mt-3 relative">
                    <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`pascal('identify', {
  email: 'sarah@techcorp.com',
  userId: 'user_789',
  name: 'Sarah Johnson',
  company: 'TechCorp',
  plan: 'starter',
  customData: {
    signupDate: '2025-01-15',
    industry: 'SaaS',
    teamSize: 5
  }
});`}
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(
                        `pascal('identify', {\n  email: 'sarah@techcorp.com',\n  userId: 'user_789',\n  name: 'Sarah Johnson',\n  company: 'TechCorp',\n  plan: 'starter',\n  customData: {\n    signupDate: '2025-01-15',\n    industry: 'SaaS',\n    teamSize: 5\n  }\n});`,
                        'Identify example'
                      )}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Track Event */}
                <div className="border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">pascal('track', eventName, properties)</h4>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Track custom events to help Pascal understand user behavior and conversion milestones.
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs font-medium">Parameters:</div>
                    <div className="bg-muted p-3 rounded-md text-xs space-y-1">
                      <div><span className="text-primary">eventName</span> (string, required) - Name of the event</div>
                      <div><span className="text-primary">properties</span> (object, optional) - Event properties</div>
                    </div>
                  </div>
                  <div className="mt-3 relative">
                    <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`// Track feature usage
pascal('track', 'feature_used', {
  featureName: 'dashboard',
  plan: 'pro'
});

// Track conversion milestones
pascal('track', 'upgrade_completed', {
  fromPlan: 'free',
  toPlan: 'pro',
  revenue: 49
});`}
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(
                        `pascal('track', 'feature_used', {\n  featureName: 'dashboard',\n  plan: 'pro'\n});\n\npascal('track', 'upgrade_completed', {\n  fromPlan: 'free',\n  toPlan: 'pro',\n  revenue: 49\n});`,
                        'Track event examples'
                      )}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Page View */}
                <div className="border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">pascal('page', pageName, properties)</h4>
                    <Badge variant="outline">Auto-tracked</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Track page views. This is automatically called on page load, but you can manually trigger it for SPAs.
                  </p>
                  <div className="mt-3 relative">
                    <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`// For single-page applications
pascal('page', 'Dashboard', {
  section: 'analytics'
});`}
                    </pre>
                  </div>
                </div>

                {/* Consent Management */}
                <div className="border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">pascal('consent', consentGiven)</h4>
                    <Badge variant="secondary">GDPR</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Manage user consent for GDPR compliance. Recording will only start after consent is given.
                  </p>
                  <div className="mt-3 relative">
                    <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`// Grant consent
pascal('consent', true);

// Revoke consent
pascal('consent', false);`}
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tutorials Tab */}
            <TabsContent value="tutorials" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  Step-by-Step Tutorials
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Learn Pascal through practical examples and common use cases.
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                {/* Tutorial 1 */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-primary/5 p-4 border-b">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</span>
                      Setting Up Your First Project
                    </h4>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Create a New Project</p>
                        <p className="text-muted-foreground">Click "Create Project" and enter your website details</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Copy Your Project ID</p>
                        <p className="text-muted-foreground">Found in Settings → API Keys section</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Install Tracking Code</p>
                        <p className="text-muted-foreground">Add the script to your website's &lt;head&gt; tag</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Verify Installation</p>
                        <p className="text-muted-foreground">Visit your website and check the Home page for verification</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tutorial 2 */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-primary/5 p-4 border-b">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">2</span>
                      Identifying Benchmark Users
                    </h4>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Analyze Your Best Customers</p>
                        <p className="text-muted-foreground">Look for users who converted quickly and use your product regularly</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Add to Benchmarks</p>
                        <p className="text-muted-foreground">Navigate to Benchmarks → Add Benchmark User</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Wait for Analysis</p>
                        <p className="text-muted-foreground">Pascal will analyze their sessions to identify success patterns</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Review Classifications</p>
                        <p className="text-muted-foreground">Other users will be classified based on how they compare to benchmarks</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tutorial 3 */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-primary/5 p-4 border-b">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">3</span>
                      Configuring Email Integration
                    </h4>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Sign Up for Brevo</p>
                        <p className="text-muted-foreground">Create a free account at brevo.com (recommended provider)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Generate API Key</p>
                        <p className="text-muted-foreground">Go to Brevo Settings → SMTP & API → Create API Key</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Configure in Pascal</p>
                        <p className="text-muted-foreground">Settings → Email Configuration → Add Brevo API Key</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Set Sender Details</p>
                        <p className="text-muted-foreground">Configure your from email and name for personalization</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Test Email Sending</p>
                        <p className="text-muted-foreground">Send a test email to verify configuration</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tutorial 4 */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-primary/5 p-4 border-b">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">4</span>
                      Managing the Email Queue
                    </h4>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Review Generated Emails</p>
                        <p className="text-muted-foreground">Pascal generates emails based on user behavior and journey stage</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Edit if Needed</p>
                        <p className="text-muted-foreground">Click "Edit" to refine the message or add personal touches</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Watch Session Recording</p>
                        <p className="text-muted-foreground">Click "View Recording" to understand user context</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Approve or Reject</p>
                        <p className="text-muted-foreground">Swipe right (or click ✓) to send, swipe left (or click ✗) to reject</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Provide Feedback</p>
                        <p className="text-muted-foreground">Help Pascal improve by explaining why you rejected an email</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tutorial 5 */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-primary/5 p-4 border-b">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">5</span>
                      Analyzing User Journeys
                    </h4>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Navigate to Journey Page</p>
                        <p className="text-muted-foreground">View comprehensive timeline of user interactions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Watch Session Recordings</p>
                        <p className="text-muted-foreground">Click on any session to see exactly what the user did</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Review AI Analysis</p>
                        <p className="text-muted-foreground">See Pascal's interpretation of user intent and struggles</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Generate Custom Emails</p>
                        <p className="text-muted-foreground">Create targeted interventions based on specific behaviors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-2">Pro Tip</h4>
                    <p className="text-sm text-muted-foreground">
                      Start with 3-5 benchmark users who represent your ideal customer journey. 
                      As Pascal learns, you can add more benchmarks for different use cases or personas.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Best Practices Tab */}
            <TabsContent value="best-practices" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Best Practices for Success
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Maximize your conversion rates with these proven strategies.
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                {/* Benchmark Selection */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    Choosing Benchmark Users
                  </h4>
                  <div className="space-y-3 ml-4">
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ Select users who converted quickly</p>
                      <p className="text-xs text-muted-foreground">
                        Users who upgraded within 7-14 days represent efficient conversion paths
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ Choose active, engaged users</p>
                      <p className="text-xs text-muted-foreground">
                        Look for high session counts and regular product usage patterns
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ Include diverse use cases</p>
                      <p className="text-xs text-muted-foreground">
                        Different personas may have different success paths - capture all of them
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-950/20">
                      <p className="text-sm font-medium mb-2">✗ Avoid outliers or unique scenarios</p>
                      <p className="text-xs text-muted-foreground">
                        Don't benchmark users with exceptional circumstances or hand-holding
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Email Strategy */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    Email Engagement Strategy
                  </h4>
                  <div className="space-y-3 ml-4">
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ Review every email before sending</p>
                      <p className="text-xs text-muted-foreground">
                        Human-in-the-loop ensures quality and brand consistency
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ Time your interventions carefully</p>
                      <p className="text-xs text-muted-foreground">
                        Pascal suggests optimal timing, but adjust based on your user's timezone and behavior
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ Personalize with session insights</p>
                      <p className="text-xs text-muted-foreground">
                        Reference specific features they explored or struggles they encountered
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ Set appropriate daily limits</p>
                      <p className="text-xs text-muted-foreground">
                        Recommended: 10-20 emails per day to maintain quality review
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-950/20">
                      <p className="text-sm font-medium mb-2">✗ Don't spam users with too many emails</p>
                      <p className="text-xs text-muted-foreground">
                        Wait at least 2-3 days between interventions per user
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Analysis & Optimization */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    Analysis & Optimization
                  </h4>
                  <div className="space-y-3 ml-4">
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ Review analytics weekly</p>
                      <p className="text-xs text-muted-foreground">
                        Track conversion trends and identify which interventions are most effective
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ Watch recordings of at-risk users</p>
                      <p className="text-xs text-muted-foreground">
                        Understanding friction points helps improve both product and messaging
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ A/B test your email approaches</p>
                      <p className="text-xs text-muted-foreground">
                        Try different tones, lengths, and CTAs to find what resonates
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ Update benchmarks quarterly</p>
                      <p className="text-xs text-muted-foreground">
                        As your product evolves, refresh benchmarks with recent successful users
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Privacy & Compliance */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    Privacy & Compliance
                  </h4>
                  <div className="space-y-3 ml-4">
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ Implement consent management</p>
                      <p className="text-xs text-muted-foreground">
                        Use pascal('consent', true) after user agrees to tracking
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ Respect unsubscribe requests</p>
                      <p className="text-xs text-muted-foreground">
                        Pascal automatically handles unsubscribes - never override this
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">✓ Be transparent about data usage</p>
                      <p className="text-xs text-muted-foreground">
                        Include information about Pascal in your privacy policy
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg">
                <h4 className="font-semibold mb-2">Success Metrics to Track</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">KPI</Badge>
                    <span>Free to paid conversion rate (target: 30-40% improvement)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">KPI</Badge>
                    <span>Time to first value (target: 40% reduction)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">KPI</Badge>
                    <span>Email open rate (benchmark: 40-50%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">KPI</Badge>
                    <span>Email click-through rate (benchmark: 15-25%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">KPI</Badge>
                    <span>Tier expansion rate (target: 25% improvement)</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};