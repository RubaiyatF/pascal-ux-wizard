import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Mail, Reply, Clock, MousePointer, Eye, Sparkles, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { InlineSessionPlayer } from "./InlineSessionPlayer";
import { AnimatedLogo } from "@/components/AnimatedLogo";

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
  visualDescription?: string;
  aiSummary?: string;
  keyInsights?: string[];
  activationSignals?: string[];
  concerns?: string[];
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
  const [expandedEmail, setExpandedEmail] = useState<number | null>(null);

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
                        <div className="space-y-2">
                          {event.visualDescription && (
                            <div className="bg-muted/50 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <div className="flex-1">
                                  <p className="text-xs font-semibold mb-1">Session Overview</p>
                                  <p className="text-sm text-muted-foreground">{event.visualDescription}</p>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className={`rounded-lg p-3 border ${
                            event.score! >= 70 
                              ? "bg-success/5 border-success/20" 
                              : event.score! < 50 
                              ? "bg-destructive/5 border-destructive/20" 
                              : "bg-white border-border"
                          }`}>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 mt-0.5 shrink-0">
                                <AnimatedLogo />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-semibold mb-1">AI Analysis</p>
                                <p className="text-sm text-muted-foreground whitespace-pre-line">{event.aiSummary}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Key Insights */}
                      {event.keyInsights && event.keyInsights.length > 0 && !compact && (
                        <div className="bg-card rounded-lg p-3 border">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                            <p className="text-xs font-semibold">Key Insights</p>
                          </div>
                          <ul className="space-y-1.5">
                            {event.keyInsights.map((insight, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs">
                                <span className="text-success mt-0.5">•</span>
                                <span className="text-muted-foreground">{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Activation Signals */}
                      {event.activationSignals && event.activationSignals.length > 0 && !compact && (
                        <div className="bg-success/5 rounded-lg p-3 border border-success/20">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-success" />
                            <p className="text-xs font-semibold">Activation Signals</p>
                            <Badge variant="outline" className="ml-auto bg-success/10 text-success border-success/20 text-xs">
                              {event.activationSignals.length}
                            </Badge>
                          </div>
                          <ul className="space-y-1.5">
                            {event.activationSignals.map((signal, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs">
                                <CheckCircle2 className="w-3 h-3 text-success mt-0.5 shrink-0" />
                                <span className="text-muted-foreground">{signal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Concerns */}
                      {event.concerns && event.concerns.length > 0 && !compact && (
                        <div className="bg-warning/5 rounded-lg p-3 border border-warning/20">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-warning" />
                            <p className="text-xs font-semibold">Areas to Monitor</p>
                            <Badge variant="outline" className="ml-auto bg-warning/10 text-warning border-warning/20 text-xs">
                              {event.concerns.length}
                            </Badge>
                          </div>
                          <ul className="space-y-1.5">
                            {event.concerns.map((concern, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs">
                                <span className="text-warning mt-0.5">⚠</span>
                                <span className="text-muted-foreground">{concern}</span>
                              </li>
                            ))}
                          </ul>
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
                      <p className="font-medium text-sm mb-1">"{event.subject}"</p>
                      
                      {/* Email Content - Inbox Style */}
                      <div 
                        className={`bg-background border border-border rounded-lg overflow-hidden cursor-pointer hover:border-primary/50 transition-colors ${expandedEmail === event.id ? "mb-4" : ""}`}
                        onClick={() => setExpandedEmail(expandedEmail === event.id ? null : event.id)}
                      >
                        <div className="px-3 py-3 bg-white">
                          {expandedEmail === event.id ? (
                            // Full email with formatting
                            <div className="text-sm leading-relaxed text-foreground space-y-4">
                              <p>Hi there,</p>
                              
                              <p>{event.content}</p>
                              
                              <p>I'd love to hear your thoughts on this. Feel free to reach out if you have any questions!</p>
                              
                              <div className="space-y-1">
                                <p>Best regards,</p>
                                <p>Sarah Thompson</p>
                                <p className="text-muted-foreground">Customer Success Team</p>
                                <p className="text-muted-foreground">support@company.com</p>
                              </div>
                            </div>
                          ) : (
                            // Collapsed preview
                            <div className="text-sm leading-relaxed text-foreground line-clamp-2">
                              Hi there, {event.content}
                              <span className="ml-2 text-muted-foreground italic">
                                click to see the full email...
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Expanded Email Details */}
                      {expandedEmail === event.id && (
                        <div className="mt-4 bg-muted/50 rounded-lg p-4 border border-border space-y-3">
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Date</label>
                            <p className="text-sm font-medium">
                              {new Date(event.timestamp).toLocaleString('en-US', { 
                                month: 'long', 
                                day: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          {event.direction === "reply" && (
                            <div className="flex gap-2 flex-wrap pt-2">
                              {event.intent && (
                                <Badge variant="outline">
                                  Intent: {event.intent}
                                </Badge>
                              )}
                              {event.sentiment && (
                                <Badge variant="outline">
                                  Sentiment: {event.sentiment}
                                </Badge>
                              )}
                              {event.topics && (
                                <Badge variant="outline">
                                  Topics: {event.topics.join(", ")}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      
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

                    <Button 
                      size="sm" 
                      variant="outline"
                      className="shrink-0 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedEmail(expandedEmail === event.id ? null : event.id);
                      }}
                    >
                      {expandedEmail === event.id ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          Close
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          View
                        </>
                      )}
                    </Button>
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
