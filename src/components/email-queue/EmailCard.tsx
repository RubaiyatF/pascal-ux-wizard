import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Eye, Sparkles, MessageSquare } from "lucide-react";

export interface QueuedEmail {
  id: string;
  email: string;
  confidence: number;
  heartScore: number;
  subject: string;
  preview: string;
  aiReasoning: string;
  sessionId: string;
  sessionTime: string;
  type: "first_touch" | "reply";
  conversationStage?: string;
  sentiment?: string;
  intent?: string;
}

interface EmailCardProps {
  email: QueuedEmail;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onApprove: (id: string) => void;
  onEdit: (id: string) => void;
  onReject: (id: string) => void;
  onViewRecording: (id: string) => void;
  onViewThread: (id: string) => void;
}

export const EmailCard = ({
  email,
  isSelected,
  onToggleSelect,
  onApprove,
  onEdit,
  onReject,
  onViewRecording,
  onViewThread,
}: EmailCardProps) => {
  return (
    <Card className="p-6 hover:shadow-elevated transition-all">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggleSelect(email.id)}
            className="mt-1"
          />

          <div className="flex-1 space-y-3">
            {/* User Info & Confidence */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-lg">{email.email}</h3>
                <Badge
                  variant="outline"
                  className="bg-success/10 text-success border-success/20"
                >
                  {email.confidence}% confidence
                </Badge>
                <Badge variant="outline">Score: {email.heartScore}</Badge>
                {email.type === "reply" && (
                  <Badge
                    variant="outline"
                    className="bg-info/10 text-info border-info/20"
                  >
                    Reply Thread
                  </Badge>
                )}
              </div>
            </div>

            {/* Email Content */}
            <div className="space-y-2">
              <p className="font-medium">Subject: "{email.subject}"</p>
              <p className="text-sm text-muted-foreground">
                Preview: {email.preview}
              </p>
            </div>

            {/* AI Reasoning */}
            <div className="bg-secondary/50 rounded-lg p-4 border border-border">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">🧠 AI Reasoning</p>
                  <p className="text-sm text-muted-foreground">
                    {email.aiReasoning}
                  </p>
                </div>
              </div>
            </div>

            {/* Conversation Stage (for replies) */}
            {email.conversationStage && (
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">
                  💬 Stage: {email.conversationStage}
                </span>
                <span className="text-muted-foreground">
                  😊 Sentiment: {email.sentiment}
                </span>
                <span className="text-muted-foreground">
                  Intent: {email.intent}
                </span>
              </div>
            )}

            {/* Session Trigger */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Play className="w-4 h-4" />
              <span>
                📹 Triggered by: Session {email.sessionId} ({email.sessionTime})
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <Button
                size="sm"
                className="bg-gradient-hero hover:opacity-90"
                onClick={() => onApprove(email.id)}
              >
                Approve
              </Button>
              <Button size="sm" variant="outline" onClick={() => onEdit(email.id)}>
                Edit & Approve
              </Button>
              <Button size="sm" variant="outline" onClick={() => onReject(email.id)}>
                Reject
              </Button>
              <Button size="sm" variant="ghost" onClick={() => onViewRecording(email.id)}>
                <Eye className="w-4 h-4 mr-2" />
                Watch Recording
              </Button>
              <Button size="sm" variant="ghost" onClick={() => onViewThread(email.id)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                View Thread
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
