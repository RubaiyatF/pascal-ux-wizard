import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Eye, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
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
  status: "queued" | "approved" | "rejected";
  rejectionReason?: string;
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
}

export const EmailCard = ({
  email,
  isSelected,
  onToggleSelect,
  onApprove,
  onEdit,
  onReject,
  onViewRecording,
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
                Confidence Score: {email.confidence}%
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
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-sm font-medium">"{email.subject}"</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-7 text-xs px-2 shrink-0"
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
          </div>

          {/* Email Preview/Full Content - Inbox Style */}
          <div className="bg-background border border-border rounded-lg overflow-hidden mb-2">
            {/* Email Body */}
            <div className="px-3 py-3 bg-white">
              <div className="text-sm leading-relaxed text-foreground font-normal">
                {isExpanded ? (
                  // Full email content with proper spacing
                  <div className="space-y-4">
                    <p>Hi there,</p>
                    
                    <p>{email.preview}</p>
                    
                    <p>I'd love to hear your thoughts on this. Feel free to reach out if you have any questions!</p>
                    
                    <div className="space-y-1">
                      <p>Best regards,</p>
                      <p>Sarah Thompson</p>
                      <p className="text-muted-foreground">Customer Success Team</p>
                      <p className="text-muted-foreground">support@company.com</p>
                    </div>
                  </div>
                ) : (
                  // Preview only - compact format
                  <div>
                    Hi there, {email.preview}
                    <span 
                      className="ml-2 text-muted-foreground italic cursor-pointer hover:text-primary transition-colors"
                      onClick={() => setIsExpanded(true)}
                    >
                      click to see the full email...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Reasoning - Show in expanded view */}
          {isExpanded && (
            <>
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded px-3 py-2 mb-2 border border-primary/20">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium mb-0.5">AI Reasoning</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{email.aiReasoning}</p>
                  </div>
                </div>
              </div>

              {/* Metadata - Only in expanded view */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 flex-wrap">
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

          {/* Rejection Reason (Only for rejected emails) */}
          {email.status === "rejected" && email.rejectionReason && (
            <div className="bg-destructive/10 rounded px-3 py-2 mb-3 border border-destructive/20">
              <div className="flex items-start gap-2">
                <span className="text-xs font-semibold text-destructive">Rejection Reason:</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{email.rejectionReason}</p>
            </div>
          )}

          {/* Actions Row */}
          <div className="flex items-center gap-1.5">
            {email.status === "queued" && (
              <>
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
              </>
            )}
            {email.status === "approved" && (
              <Badge className="bg-success text-success-foreground h-7">Approved</Badge>
            )}
            {email.status === "rejected" && (
              <Badge className="bg-destructive text-destructive-foreground h-7">Rejected</Badge>
            )}
            <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => onViewRecording(email.id)}>
              <Eye className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
