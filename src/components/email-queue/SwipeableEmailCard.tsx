import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Play, Eye, Sparkles, MessageSquare, X, Check, Edit } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { QueuedEmail } from "./EmailCard";

interface SwipeableEmailCardProps {
  email: QueuedEmail;
  onApprove: (id: string) => void;
  onEdit: (id: string) => void;
  onReject: (id: string) => void;
  onViewRecording: (id: string) => void;
  onViewThread: (id: string) => void;
  style?: React.CSSProperties;
  zIndex?: number;
}

export const SwipeableEmailCard = ({
  email,
  onApprove,
  onEdit,
  onReject,
  onViewRecording,
  onViewThread,
  style,
  zIndex = 1,
}: SwipeableEmailCardProps) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

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
              className="absolute -top-4 -right-4 bg-success text-white rounded-full p-4 shadow-lg z-10"
              style={{ opacity }}
            >
              <Check className="w-8 h-8" />
            </div>
          )}
          {swipeDirection === "reject" && (
            <div
              className="absolute -top-4 -left-4 bg-destructive text-white rounded-full p-4 shadow-lg z-10"
              style={{ opacity }}
            >
              <X className="w-8 h-8" />
            </div>
          )}
        </>
      )}

      {/* Card Content */}
      <div className="bg-card border-2 border-border rounded-2xl shadow-2xl p-6 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <TooltipProvider delayDuration={0} skipDelayDuration={0}>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{email.email}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20 cursor-help">
                    {email.confidence}%
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" sideOffset={8} className="max-w-xs">
                  <p>AI confidence score - how certain the AI is that this email should be sent</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="cursor-help">♥ {email.heartScore}</Badge>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" sideOffset={8} className="max-w-xs">
                  <p>Heart score - user engagement and satisfaction metric</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
          {email.type === "reply" && (
            <Badge variant="outline" className="bg-info/10 text-info border-info/20">
              Reply
            </Badge>
          )}
        </div>

        {/* Subject */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold">"{email.subject}"</h3>
        </div>

        {/* Email Preview */}
        <div className="bg-secondary/30 rounded-lg p-4 mb-4 min-h-[100px]">
          <p className="text-sm leading-relaxed">{email.preview}</p>
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
        <div className="flex items-center gap-2 border-t pt-4">
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
          {email.type === "reply" && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onViewThread(email.id)}
            >
              <MessageSquare className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
