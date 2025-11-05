import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";

interface UserJourneyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
}

export const UserJourneyModal = ({ open, onOpenChange, userEmail }: UserJourneyModalProps) => {
  // Mock data - in real app, this would come from API
  const timeline = [
    {
      id: 1,
      timestamp: "2024-01-15 09:00",
      type: "session" as const,
      sessionId: "sess_abc001",
      duration: "3:45",
      score: 65,
      pages: 5,
      events: 89,
      journeyStage: "Onboarding",
      aiSummary: "User explored dashboard features, completed initial setup steps.",
      heartBreakdown: {
        happiness: 60,
        engagement: 65,
        adoption: 68,
        retention: 70,
        taskSuccess: 62,
      },
      actions: ["Signed up", "Explored dashboard", "Viewed docs"],
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:30",
      type: "email" as const,
      direction: "sent" as const,
      subject: "Welcome to Pascal!",
      content: "Welcome to Pascal Analytics...",
      opened: true,
      clicked: true,
    },
    {
      id: 3,
      timestamp: "2024-01-16 10:20",
      type: "session" as const,
      sessionId: "sess_def456",
      duration: "8:21",
      score: 72,
      pages: 7,
      events: 134,
      journeyStage: "Evaluation",
      aiSummary: "Strong engagement with pricing and product comparison tools.",
      heartBreakdown: {
        happiness: 70,
        engagement: 75,
        adoption: 72,
        retention: 68,
        taskSuccess: 75,
      },
      actions: ["Checked pricing", "Used ROI calculator", "Compared plans"],
    },
    {
      id: 4,
      timestamp: "2024-01-16 16:45",
      type: "email" as const,
      direction: "reply" as const,
      subject: "Re: Welcome",
      content: "Thanks! Quick question - how do I install the tracker on React?",
      intent: "question",
      sentiment: "positive",
    },
    {
      id: 5,
      timestamp: "2024-01-17 11:00",
      type: "email" as const,
      direction: "sent" as const,
      subject: "Re: Welcome",
      content: "Great question! Here's how to install Pascal tracker in React...",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-y-auto">
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
          <div className="space-y-3">
            <h3 className="font-semibold">Journey Timeline</h3>
            <JourneyTimeline 
              timeline={timeline}
            />
          </div>
        </DialogContent>
      </Dialog>
  );
};
