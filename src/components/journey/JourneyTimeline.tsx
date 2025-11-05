import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Mail, Reply, Clock, MousePointer, Eye, Sparkles } from "lucide-react";
import { useState } from "react";
import { InlineSessionPlayer } from "./InlineSessionPlayer";

interface TimelineEvent {
  id: number;
  timestamp: string;
  type: "session" | "email";
  sessionId?: string;
  duration?: string;
  score?: number;
  pages?: number;
  events?: number;
  journeyStage?: string;
  aiSummary?: string;
  heartBreakdown?: {
    happiness: number;
    engagement: number;
    adoption: number;
    retention: number;
    taskSuccess: number;
  };
  actions?: string[];
  direction?: "sent" | "reply";
  subject?: string;
  content?: string;
  opened?: boolean;
  clicked?: boolean;
  intent?: string;
  sentiment?: string;
  topics?: string[];
  isNew?: boolean;
}

interface JourneyTimelineProps {
  timeline: TimelineEvent[];
  onSessionClick?: (event: TimelineEvent) => void;
  onEmailClick?: (event: TimelineEvent) => void;
  compact?: boolean;
}

export const JourneyTimeline = ({ 
  timeline, 
  onSessionClick, 
  onEmailClick,
  compact = false 
}: JourneyTimelineProps) => {
  const [expandedSession, setExpandedSession] = useState<number | null>(null);

  const handleSessionClick = (event: TimelineEvent) => {
    if (compact) {
      setExpandedSession(expandedSession === event.id ? null : event.id);
    } else if (onSessionClick) {
      onSessionClick(event);
    }
  };

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />
      
      {/* Timeline Events */}
      <div className={compact ? "space-y-4" : "space-y-6"}>
        {timeline.map((event, idx) => (
          <div 
            key={event.id} 
            className="relative pl-12 animate-fade-in" 
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {/* Timeline Dot */}
            <div 
              className={`absolute left-[0.9rem] top-2 w-2.5 h-2.5 rounded-full ring-4 ring-background ${
                event.type === "session" 
                  ? "bg-primary shadow-lg shadow-primary/50" 
                  : event.direction === "sent"
                  ? "bg-accent shadow-lg shadow-accent/50"
                  : "bg-success shadow-lg shadow-success/50"
              }`}
            />
            
            {/* Event Card */}
            <Card 
              className={`p-4 hover:shadow-md transition-all ${
                onSessionClick || onEmailClick || compact ? "cursor-pointer" : ""
              } ${event.isNew ? "border-primary bg-primary/5 ring-1 ring-primary/20" : ""}`}
              onClick={() => {
                if (event.type === "session") {
                  handleSessionClick(event);
                } else if (event.type === "email" && onEmailClick) {
                  onEmailClick(event);
                }
              }}
            >
              {event.type === "session" ? (
                // Session Recording Event
                <div className="space-y-3">
                  {/* Header Row */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {/* Score Badge */}
                      <div
                        className={`flex items-center justify-center ${
                          compact ? "w-12 h-12" : "w-16 h-16"
                        } rounded-xl bg-muted ${
                          event.score! >= 80 ? "text-success" :
                          event.score! >= 60 ? "text-info" :
                          event.score! >= 40 ? "text-warning" : "text-destructive"
                        }`}
                      >
                        <div className="text-center">
                          <div className={`${compact ? "text-xl" : "text-2xl"} font-bold`}>
                            {event.score}
                          </div>
                          <div className="text-[10px] uppercase tracking-wide opacity-70">
                            Score
                          </div>
                        </div>
                      </div>

                      {/* Session Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Play className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-sm">Session Recording</span>
                          {event.journeyStage && (
                            <Badge variant="outline" className="text-xs">
                              {event.journeyStage}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {new Date(event.timestamp).toLocaleString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {event.pages} pages
                          </div>
                          <div className="flex items-center gap-1">
                            <MousePointer className="w-3 h-3" />
                            {event.events} events
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    {!compact && (
                      <Button 
                        size="sm" 
                        className="bg-gradient-hero hover:opacity-90 transition-opacity shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedSession(expandedSession === event.id ? null : event.id);
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {expandedSession === event.id ? "Close" : "Watch"}
                      </Button>
                    )}
                  </div>

                  {/* Inline Session Player */}
                  {expandedSession === event.id && (
                    <InlineSessionPlayer 
                      session={event}
                      onClose={() => setExpandedSession(null)}
                    />
                  )}

                  {/* AI Summary */}
                  {event.aiSummary && !compact && (
                    <div className="bg-muted/50 rounded-lg p-3 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <p className="text-sm text-muted-foreground">{event.aiSummary}</p>
                    </div>
                  )}

                  {/* HEART Breakdown */}
                  {event.heartBreakdown && !compact && (
                    <div className="grid grid-cols-5 gap-2 pt-2 border-t border-border">
                      {Object.entries(event.heartBreakdown).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-xs font-semibold mb-0.5">{value}</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                            {key.charAt(0).toUpperCase() + key.slice(1, 3)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  {event.actions && event.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {event.actions.map((action, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Email Event
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {event.direction === "sent" ? (
                          <Mail className="w-4 h-4 text-accent" />
                        ) : (
                          <Reply className="w-4 h-4 text-success" />
                        )}
                        <span className="font-semibold text-sm">
                          {event.direction === "sent" ? "Email Sent" : "Email Reply"}
                        </span>
                        {event.isNew && (
                          <Badge variant="default" className="text-xs">New</Badge>
                        )}
                        {event.sentiment && (
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              event.sentiment === "positive" 
                                ? "bg-success/10 text-success border-success/20" 
                                : ""
                            }`}
                          >
                            {event.sentiment}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {new Date(event.timestamp).toLocaleString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="font-medium text-sm mb-1">{event.subject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.content}
                      </p>
                      
                      {event.direction === "sent" && (
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className={event.opened ? "text-success" : ""}>
                            {event.opened ? "✓ Opened" : "Not opened"}
                          </span>
                          {event.opened && (
                            <span className={event.clicked ? "text-success" : ""}>
                              {event.clicked ? "✓ Clicked" : "Not clicked"}
                            </span>
                          )}
                        </div>
                      )}

                      {event.topics && event.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {event.topics.map((topic, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {onEmailClick && !compact && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="shrink-0 ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEmailClick(event);
                        }}
                      >
                        View
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
