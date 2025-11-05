import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Eye, Sparkles, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-border hover:bg-accent/5 transition-colors">
      <div className="flex items-start gap-3 p-3">
        {/* Checkbox */}
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(email.id)}
          className="mt-1"
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header Row - Compact */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <span className="font-semibold text-sm">{email.email}</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs px-1.5 py-0">
                {email.confidence}%
              </Badge>
              {email.type === "reply" && (
                <Badge variant="outline" className="bg-info/10 text-info border-info/20 text-xs px-1.5 py-0">
                  Reply
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{email.sessionTime}</span>
          </div>

          {/* Subject Line */}
          <div className="mb-2">
            <span className="text-sm font-medium">"{email.subject}"</span>
          </div>

          {/* Preview/Expanded Content */}
          {!isExpanded ? (
            <div className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {email.preview}
            </div>
          ) : (
            <>
              {/* Full Email Body */}
              <div className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap bg-secondary/20 rounded p-3">
                {`${email.preview}\n\nBest regards,\nYour AI Assistant\n\nP.S. This is an auto-generated email based on user behavior and engagement patterns. We've analyzed their session activity and determined this is an optimal touchpoint for meaningful engagement.\n\nKey insights:\n- User engagement level: ${email.heartScore}%\n- Behavior patterns indicate high interest\n- Optimal timing for conversion dialogue\n\nFeel free to customize this message before sending.`}
              </div>

              {/* AI Reasoning */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded px-3 py-2 mb-3 border border-primary/20">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">{email.aiReasoning}</p>
                </div>
              </div>

              {/* Metadata - Only in expanded view */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <Play className="w-3 h-3" />
                  Session: {email.sessionId}
                </span>
                <Badge variant="outline" className="text-xs px-1.5 py-0">HEART: {email.heartScore}</Badge>
                {email.conversationStage && (
                  <>
                    <span>Stage: {email.conversationStage}</span>
                    <span>Sentiment: {email.sentiment}</span>
                    <span>Intent: {email.intent}</span>
                  </>
                )}
              </div>
            </>
          )}

          {/* Actions Row */}
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-7 text-xs px-2"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-1" />
                  Expand
                </>
              )}
            </Button>
            <Button
              size="sm"
              className="bg-gradient-hero hover:opacity-90 h-7 text-xs px-3"
              onClick={() => onApprove(email.id)}
            >
              Approve
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs px-3" onClick={() => onEdit(email.id)}>
              Edit
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs px-3" onClick={() => onReject(email.id)}>
              Reject
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => onViewRecording(email.id)}>
              <Eye className="w-3 h-3" />
            </Button>
            {email.type === "reply" && (
              <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => onViewThread(email.id)}>
                <MessageSquare className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
