import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  ChevronRight, 
  Copy, 
  Mail, 
  Users, 
  Activity, 
  BarChart3, 
  Settings,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { useProject } from "@/contexts/ProjectContext";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentProject } = useProject();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const trackerSnippet = `<script>
  (function() {
    window.pascalTracker = {
      apiKey: '${currentProject.toLowerCase().replace(/\\s+/g, '-')}-api-key',
      track: function(event, properties) {
        console.log('Pascal tracking:', event, properties);
      }
    };
  })();
</script>`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(trackerSnippet);
    toast({
      title: "Copied to clipboard",
      description: "Paste this snippet into your website's <head> tag",
    });
  };

  const toggleStep = (step: number) => {
    setExpandedStep(expandedStep === step ? null : step);
  };

  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const steps = [
    {
      id: 1,
      title: "Connect Pascal tracker",
      description: "Add the tracking snippet to your website to start collecting events",
      icon: Activity,
      estimatedTime: "5 min",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Copy and paste this snippet into your website's <code className="px-2 py-1 bg-muted rounded text-xs">&lt;head&gt;</code> tag to start tracking user events.
          </p>
          <div className="relative">
            <pre className="bg-muted p-4 rounded border border-border overflow-x-auto text-xs">
              <code>{trackerSnippet}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
              onClick={handleCopySnippet}
            >
              <Copy className="w-3 h-3 mr-2" />
              Copy
            </Button>
          </div>
          <Button onClick={() => markStepComplete(1)} className="w-full">
            I've added the snippet
          </Button>
        </div>
      )
    },
    {
      id: 2,
      title: "Add benchmark customers",
      description: "Identify your successfully activated users to help Pascal learn ideal journeys",
      icon: Users,
      estimatedTime: "3 min",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add emails of customers who successfully activated or your own email to record ideal activation journeys. Pascal will learn from these patterns.
          </p>
          <Button 
            onClick={() => {
              markStepComplete(2);
              navigate('/benchmarks');
            }} 
            className="w-full"
          >
            Go to Benchmarks
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )
    },
    {
      id: 3,
      title: "View tracked users",
      description: "See users being tracked and manually trigger Pascal email generation",
      icon: Sparkles,
      estimatedTime: "2 min",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Monitor user journeys in real-time. You can manually trigger Pascal's AI to generate personalized emails for specific users.
          </p>
          <Button 
            onClick={() => {
              markStepComplete(3);
              navigate('/journey');
            }} 
            className="w-full"
          >
            Go to Journey
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )
    },
    {
      id: 4,
      title: "Review email queue",
      description: "Accept or reject Pascal's suggested emails to activate users",
      icon: Mail,
      estimatedTime: "5 min",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Pascal generates personalized emails based on user behavior. Review, edit, and approve emails before they're sent to help users reach activation.
          </p>
          <Button 
            onClick={() => {
              markStepComplete(4);
              navigate('/email-queue');
            }} 
            className="w-full"
          >
            Go to Email Queue
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )
    },
    {
      id: 5,
      title: "Explore analytics",
      description: "View detailed metrics and insights about user engagement",
      icon: BarChart3,
      estimatedTime: "3 min",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Track key metrics like active users, engagement rates, feature adoption, and email performance to measure your success.
          </p>
          <Button 
            onClick={() => {
              markStepComplete(5);
              navigate('/analytics');
            }} 
            className="w-full"
          >
            Go to Analytics
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )
    },
    {
      id: 6,
      title: "Configure reply email",
      description: "Add your reply email address to track responses in user journeys",
      icon: Settings,
      estimatedTime: "2 min",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Set up your reply email address so Pascal can track customer responses and stitch them into the user journey timeline.
          </p>
          <Button 
            onClick={() => {
              markStepComplete(6);
              navigate('/settings');
            }} 
            className="w-full"
          >
            Go to Settings
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )
    },
    {
      id: 7,
      title: "You're all set!",
      description: "Pascal is ready to help you build the most engaged user base",
      icon: Check,
      estimatedTime: "Done",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            🎉 Congratulations! You've completed the setup. Pascal will now automatically track users, generate personalized emails, and help you maximize user engagement and activation.
          </p>
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate('/email-queue')} 
              className="flex-1"
            >
              Start Using Pascal
            </Button>
          </div>
        </div>
      )
    }
  ];

  const completedCount = completedSteps.length;
  const totalSteps = steps.length - 1; // Excluding the final "You're all set" step
  const progressPercentage = (completedCount / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Your quick start guide
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Get set up and start engaging with your customers in minutes
            </p>
          </div>
          <Card className="flex flex-col sm:flex-row items-start gap-4 p-4 md:p-6 bg-gradient-subtle border-border shadow-card">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-hero flex items-center justify-center shrink-0">
              <AnimatedLogo />
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-medium">Pascal AI</p>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                Hi there! I'm Pascal. I'm here to help you get set up and start engaging with your customers. Let's go!
              </p>
            </div>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {completedCount} of {totalSteps} steps completed
            </span>
            <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-success transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step) => {
            const StepIcon = step.icon;
            const isCompleted = completedSteps.includes(step.id);
            const isExpanded = expandedStep === step.id;

            return (
              <Card 
                key={step.id}
                className={`border-border transition-all ${isCompleted ? 'bg-success/5 border-success/20' : 'bg-card'}`}
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full p-6 flex items-center gap-4 text-left hover:bg-accent/5 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isCompleted 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant="outline" className="text-xs">
                      {step.estimatedTime}
                    </Badge>
                    <ChevronRight 
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        isExpanded ? 'rotate-90' : ''
                      }`} 
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 animate-accordion-down">
                    {step.content}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-subtle border-border">
          <h3 className="font-semibold text-foreground mb-4">Need help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start">
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" className="justify-start">
              <Activity className="w-4 h-4 mr-2" />
              View Documentation
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
