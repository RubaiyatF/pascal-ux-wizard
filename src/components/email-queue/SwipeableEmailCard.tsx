import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Eye, Sparkles, X, Check, Edit, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { QueuedEmail } from "./EmailCard";

interface SwipeableEmailCardProps {
  email: QueuedEmail;
  onApprove: (id: string) => void;
  onEdit: (id: string) => void;
  onReject: (id: string) => void;
  onViewRecording: (id: string) => void;
  style?: React.CSSProperties;
  zIndex?: number;
  isExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
}

export const SwipeableEmailCard = ({
  email,
  onApprove,
  onEdit,
  onReject,
  onViewRecording,
  style,
  zIndex = 1,
  isExpanded: externalIsExpanded,
  onExpandChange,
}: SwipeableEmailCardProps) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isExpanded = externalIsExpanded !== undefined ? externalIsExpanded : internalIsExpanded;
  
  const handleExpandToggle = () => {
    const newValue = !isExpanded;
    if (onExpandChange) {
      onExpandChange(newValue);
    } else {
      setInternalIsExpanded(newValue);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startPos.x;
    const deltaY = e.touches[0].clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleRelease = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Swipe threshold
    const threshold = 150;

    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        // Swipe right - Approve
        onApprove(email.id);
      } else {
        // Swipe left - Reject
        onReject(email.id);
      }
    }

    // Reset position
    setDragOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleRelease);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleRelease);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleRelease);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleRelease);
      };
    }
  }, [isDragging, dragOffset, startPos]);

  const rotation = dragOffset.x / 20;
  const opacity = Math.max(0, Math.min(1, Math.abs(dragOffset.x) / 150));
  const swipeDirection = dragOffset.x > 0 ? "approve" : "reject";

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="absolute inset-x-0 mx-auto w-full max-w-2xl cursor-grab active:cursor-grabbing select-none"
      style={{
        ...style,
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
        transition: isDragging ? "none" : "transform 0.3s ease-out",
        zIndex,
      }}
    >
      {/* Swipe Indicators */}
      {Math.abs(dragOffset.x) > 50 && (
        <>
          {swipeDirection === "approve" && (
            <div
              className="absolute -top-4 -right-4 bg-primary rounded-full p-4 shadow-lg z-10"
              style={{ opacity }}
            >
              <Check className="w-8 h-8 text-primary-foreground" />
            </div>
          )}
          {swipeDirection === "reject" && (
            <div
              className="absolute -top-4 -left-4 bg-destructive rounded-full p-4 shadow-lg z-10"
              style={{ opacity }}
            >
              <X className="w-8 h-8 text-destructive-foreground" />
            </div>
          )}
        </>
      )}

      {/* Card Content */}
      <div className="bg-card border-2 border-border rounded-2xl shadow-2xl p-6 backdrop-blur-sm bg-opacity-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-lg">{email.email}</span>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Confidence Score: {email.confidence}%
            </Badge>
            <Badge variant="outline">HEART Score: {email.heartScore}</Badge>
          </div>
          {email.type === "reply" && (
            <Badge variant="outline" className="bg-info/10 text-info border-info/20">
              Reply
            </Badge>
          )}
        </div>

        {/* Subject */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <h3 className="text-xl font-semibold flex-1">"{email.subject}"</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExpandToggle}
            className="shrink-0"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Expand
              </>
            )}
          </Button>
        </div>

        {/* Email Preview/Full Content */}
        <div className="bg-background border border-border rounded-lg overflow-hidden mb-4">
          {/* Email Header - Inbox Style */}
          <div className="bg-muted/30 px-4 py-2 border-b border-border">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  {email.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-foreground">{email.email}</div>
                  <div className="text-muted-foreground">to: customer@example.com</div>
                </div>
              </div>
              <div className="text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
          
          {/* Email Body */}
          <div className="px-4 py-4 bg-card">
            <div className="text-sm leading-relaxed text-foreground whitespace-pre-wrap font-normal">
              {isExpanded ? (
                // Full email content
                `${email.preview}\n\nBest regards,\nYour AI Assistant\n\nP.S. This is an auto-generated email based on user behavior and engagement patterns. We've analyzed their session activity and determined this is an optimal touchpoint for meaningful engagement.\n\nKey insights:\n- User engagement level: ${email.heartScore}%\n- Behavior patterns indicate high interest\n- Optimal timing for conversion dialogue\n\nFeel free to customize this message before sending.`
              ) : (
                // Preview only
                email.preview
              )}
            </div>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 mb-4 border border-primary/20">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-primary shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">AI Reasoning</p>
              <p className="text-sm text-muted-foreground">{email.aiReasoning}</p>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 flex-wrap">
          <span className="flex items-center gap-1">
            <Play className="w-3 h-3" />
            Session {email.sessionTime}
          </span>
          {email.conversationStage && (
            <>
              <span>Stage: {email.conversationStage}</span>
              <span>Sentiment: {email.sentiment}</span>
              <span>Intent: {email.intent}</span>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-4 mt-auto border-t">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onEdit(email.id)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onViewRecording(email.id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
