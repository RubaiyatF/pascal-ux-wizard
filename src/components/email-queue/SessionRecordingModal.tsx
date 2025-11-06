import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { X, Play, Pause, SkipForward, SkipBack, Download, Maximize, Sparkles, TrendingUp, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { AnimatedLogo } from "@/components/AnimatedLogo";

interface SessionRecordingModalProps {
  isOpen: boolean;
  sessionId: string | null;
  email: string | null;
  onClose: () => void;
}

export const SessionRecordingModal = ({
  isOpen,
  sessionId,
  email,
  onClose,
}: SessionRecordingModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  const totalTime = 734; // 12:14 in seconds

  // Mock AI analysis data
  const sessionAnalysis = {
    visualDescription: "User navigated 4-step onboarding (Welcome → Connect → Create → See Data). Explored dashboard. Connected Stripe. Viewed first transaction within 10 min. Smooth navigation.",
    aiSummary: "STRONG ACTIVATION SESSION. User reached 'aha moment' quickly by seeing real transaction data. High task success rate with zero friction. Power user signals (API docs, integrations). RECOMMENDATION: Send conversion email within 24 hours highlighting value + offer trial extension.",
    keyInsights: [
      "User reached 'aha moment' in first 10 minutes (saw real Stripe data)",
      "Strong interest in integrations and API (power user indicator)",
      "Completed onboarding with zero friction or errors",
      "Returned within 24 hours (retention signal)",
      "Spent time examining data (value discovery)"
    ],
    activationSignals: [
      "Completed first core action (created project)",
      "Connected paid integration (Stripe)",
      "Viewed real data (not demo/sample)",
      "Returned for 2nd session within 24h",
      "Explored advanced features (API docs)",
      "Fast onboarding completion (6 minutes)"
    ],
    concerns: [
      "Hesitated on pricing page for 3 minutes (price sensitivity?)",
      "Did not invite team members (solo user?)",
      "Only connected one integration (potential for more)"
    ]
  };

  if (!isOpen || !sessionId) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = (currentTime / totalTime) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Session Recording</h3>
            <p className="text-sm text-muted-foreground">
              {email} • {sessionId}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Video Player Area */}
        <div className="bg-muted rounded-lg aspect-video flex items-center justify-center mb-4 relative">
          <div className="text-center text-muted-foreground">
            <Play className="w-16 h-16 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Session Recording Player</p>
            <p className="text-xs mt-1">Integration with rrweb player would go here</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">{formatTime(currentTime)}</span>
            <Progress value={progress} className="flex-1" />
            <span className="text-sm font-mono">{formatTime(totalTime)}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="icon">
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              className="bg-gradient-hero hover:opacity-90"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="icon">
              <SkipForward className="w-4 h-4" />
            </Button>
            <div className="mx-4 border-l h-8" />
            <Button variant="outline" size="sm">
              1x
            </Button>
            <Button variant="outline" size="sm">
              2x
            </Button>
            <Button variant="outline" size="sm">
              4x
            </Button>
            <div className="flex-1" />
            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="mt-6 space-y-4">
          {/* Visual Description */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Session Overview</h4>
                <p className="text-sm text-muted-foreground">
                  {sessionAnalysis.visualDescription}
                </p>
              </div>
            </div>
          </Card>

          {/* AI Summary */}
          <Card className={`p-4 border ${
            sessionAnalysis.activationSignals && sessionAnalysis.activationSignals.length > 2
              ? "bg-success/5 border-success/20"
              : sessionAnalysis.concerns && sessionAnalysis.concerns.length > 1
              ? "bg-destructive/5 border-destructive/20"
              : "bg-white border-border"
          }`}>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-0.5 rounded-full overflow-hidden shrink-0">
                <AnimatedLogo />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">AI Analysis</h4>
                <p className="text-sm whitespace-pre-line text-muted-foreground">
                  {sessionAnalysis.aiSummary}
                </p>
              </div>
            </div>
          </Card>

          {/* Expandable Detailed Analysis */}
          <div>
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => setShowFullAnalysis(!showFullAnalysis)}
            >
              <span>Detailed Analysis</span>
              {showFullAnalysis ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>

            {showFullAnalysis && (
              <div className="mt-4 space-y-4 animate-fade-in">
                {/* Key Insights */}
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <h4 className="font-semibold">Key Insights</h4>
                  </div>
                  <ul className="space-y-2">
                    {sessionAnalysis.keyInsights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-success mt-0.5">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Activation Signals */}
                <Card className="p-4 border-success/20 bg-success/5">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-success" />
                    <h4 className="font-semibold">Activation Signals</h4>
                    <Badge variant="outline" className="ml-auto bg-success/10 text-success border-success/20">
                      {sessionAnalysis.activationSignals.length} signals
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {sessionAnalysis.activationSignals.map((signal, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Concerns */}
                {sessionAnalysis.concerns.length > 0 && (
                  <Card className="p-4 border-warning/20 bg-warning/5">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      <h4 className="font-semibold">Areas to Monitor</h4>
                      <Badge variant="outline" className="ml-auto bg-warning/10 text-warning border-warning/20">
                        {sessionAnalysis.concerns.length} items
                      </Badge>
                    </div>
                    <ul className="space-y-2">
                      {sessionAnalysis.concerns.map((concern, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-warning mt-0.5">⚠</span>
                          <span>{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </Card>
    </div>
  );
};
