import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, Activity, TrendingUp, Clock } from "lucide-react";

interface UserDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
  similarity: number;
  reason: string;
}

export const UserDetailsModal = ({ open, onOpenChange, userEmail, similarity, reason }: UserDetailsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
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
  );
};
