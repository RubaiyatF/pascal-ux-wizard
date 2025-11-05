import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, Play, Mail, Eye } from "lucide-react";

interface UserJourneyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
}

export const UserJourneyModal = ({ open, onOpenChange, userEmail }: UserJourneyModalProps) => {
  const journeySteps = [
    {
      date: "Nov 1, 2024 10:30 AM",
      event: "Sign Up",
      description: "Created account via email",
      completed: true,
    },
    {
      date: "Nov 1, 2024 10:45 AM",
      event: "First Session",
      description: "Explored dashboard and viewed 3 features",
      completed: true,
    },
    {
      date: "Nov 2, 2024 2:15 PM",
      event: "Feature Activation",
      description: "Activated core feature and completed setup",
      completed: true,
    },
    {
      date: "Nov 3, 2024 9:00 AM",
      event: "Regular Usage",
      description: "Logged in daily for 5 consecutive days",
      completed: true,
    },
    {
      date: "Nov 8, 2024 3:30 PM",
      event: "Power User",
      description: "Used advanced features and integrations",
      completed: false,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Journey</DialogTitle>
          <DialogDescription>
            Viewing journey for {userEmail}
          </DialogDescription>
        </DialogHeader>

        {/* User Stats */}
        <div className="grid grid-cols-3 gap-4 py-4">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold">45</p>
            <p className="text-sm text-muted-foreground">Sessions</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Days Active</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm text-muted-foreground">Features Used</p>
          </Card>
        </div>

        {/* Journey Timeline */}
        <div className="space-y-4">
          <h3 className="font-semibold">Success Journey</h3>
          <div className="space-y-3">
            {journeySteps.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {step.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                  {index < journeySteps.length - 1 && (
                    <div className="w-0.5 h-12 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{step.event}</p>
                    {step.completed && (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Completed
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {step.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <h4 className="font-semibold mb-2">Key Success Indicators</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Play className="w-4 h-4 text-primary mt-0.5" />
              <span>Activated within first 24 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <Eye className="w-4 h-4 text-primary mt-0.5" />
              <span>High engagement in first week (5+ sessions)</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-primary mt-0.5" />
              <span>Responded positively to onboarding emails</span>
            </li>
          </ul>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
