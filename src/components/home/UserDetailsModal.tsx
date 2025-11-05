import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, Activity, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";
import { EmailDetailModal } from "@/components/journey/EmailDetailModal";

interface UserDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
  similarity: number;
  reason: string;
}

export const UserDetailsModal = ({ open, onOpenChange, userEmail, similarity, reason }: UserDetailsModalProps) => {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);

  // Mock timeline data
  const timeline = [
    {
      id: 1,
      timestamp: "2024-01-15 09:00",
      type: "session" as const,
      sessionId: "sess_abc001",
      duration: "5:12",
      score: 55,
      pages: 3,
      events: 45,
      journeyStage: "Discovery",
      aiSummary: "Brief initial exploration, limited engagement.",
      heartBreakdown: {
        happiness: 55,
        engagement: 58,
        adoption: 50,
        retention: 60,
        taskSuccess: 52,
      },
      actions: ["Signed up", "Viewed homepage"],
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:30",
      type: "email" as const,
      direction: "sent" as const,
      subject: "Welcome to Pascal!",
      content: "Welcome to Pascal Analytics...",
      opened: true,
      clicked: false,
    },
    {
      id: 3,
      timestamp: "2024-01-16 10:20",
      type: "session" as const,
      sessionId: "sess_def456",
      duration: "8:21",
      score: 68,
      pages: 6,
      events: 98,
      journeyStage: "Exploration",
      aiSummary: "Increased engagement with core features, exploring functionality.",
      heartBreakdown: {
        happiness: 65,
        engagement: 70,
        adoption: 68,
        retention: 65,
        taskSuccess: 70,
      },
      actions: ["Explored features", "Tested integrations"],
    },
  ];

  const handleEmailClick = (event: any) => {
    setSelectedEmail(event);
    setEmailModalOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed analysis for {userEmail}
            </DialogDescription>
          </DialogHeader>

          {/* Similarity Score */}
          <Card className="p-4 bg-success/5 border-success/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Similarity Score</p>
                <p className="text-3xl font-bold text-success">{similarity}%</p>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                High Match
              </Badge>
            </div>
            <Separator className="my-3" />
            <p className="text-sm text-muted-foreground">
              <strong>Reason:</strong> {reason}
            </p>
          </Card>

          {/* User Activity */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <p className="text-sm font-medium">Account Age</p>
              </div>
              <p className="text-2xl font-bold">23 days</p>
              <p className="text-xs text-muted-foreground">Since Oct 15, 2024</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                <p className="text-sm font-medium">Total Sessions</p>
              </div>
              <p className="text-2xl font-bold">34</p>
              <p className="text-xs text-muted-foreground">Avg 1.5 per day</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <p className="text-sm font-medium">Avg Session</p>
              </div>
              <p className="text-2xl font-bold">8.5 min</p>
              <p className="text-xs text-muted-foreground">Above average</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <p className="text-sm font-medium">Engagement Trend</p>
              </div>
              <p className="text-2xl font-bold">+15%</p>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </Card>
          </div>

          {/* Journey Timeline */}
          <div className="space-y-3">
            <h3 className="font-semibold">Recent Activity Timeline</h3>
            <JourneyTimeline 
              timeline={timeline}
              onEmailClick={handleEmailClick}
              compact
            />
          </div>

          {/* Behavioral Patterns */}
          <div className="space-y-3">
            <h3 className="font-semibold">Behavioral Patterns</h3>
            <div className="space-y-2">
              <Card className="p-3 border-l-4 border-l-success">
                <p className="font-medium text-sm">Similar Feature Usage</p>
                <p className="text-sm text-muted-foreground">
                  Uses the same core features as benchmark users (Dashboard, Analytics, Reports)
                </p>
              </Card>
              <Card className="p-3 border-l-4 border-l-success">
                <p className="font-medium text-sm">Consistent Login Pattern</p>
                <p className="text-sm text-muted-foreground">
                  Logs in during similar hours and days as successful users
                </p>
              </Card>
              <Card className="p-3 border-l-4 border-l-warning">
                <p className="font-medium text-sm">Partial Feature Exploration</p>
                <p className="text-sm text-muted-foreground">
                  Has explored 60% of available features, opportunity for activation
                </p>
              </Card>
            </div>
          </div>

          {/* Recommended Actions */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Recommended Actions
            </h4>
            <ul className="space-y-2 text-sm">
              <li>• Send personalized activation email highlighting unused features</li>
              <li>• Offer guided tour of advanced capabilities</li>
              <li>• Schedule check-in to understand their goals</li>
            </ul>
          </Card>
        </DialogContent>
      </Dialog>

      {/* Email Modal */}
      <EmailDetailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        email={selectedEmail}
      />
    </>
  );
};
