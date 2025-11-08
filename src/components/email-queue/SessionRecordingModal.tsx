import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { X, Play, Pause, SkipForward, SkipBack, Download, Maximize, Sparkles, TrendingUp, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api";
import { useOnboarding } from "@/contexts/OnboardingContext";
import * as pako from "pako";
import { Replayer } from "rrweb";

interface RecordingChunk {
  compressed_data: string;
}

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
  const [totalTime, setTotalTime] = useState(0);
  const [replayer, setReplayer] = useState<Replayer | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const { projectId } = useOnboarding();
  const api = useApiClient();

  // Fetch recording chunks
  const { data: recordingData, isLoading: recordingLoading, error: recordingError } = useQuery({
    queryKey: ["recording", sessionId, projectId],
    queryFn: () => api.get(`/api/recordings/${sessionId}?project_id=${projectId}`),
    enabled: !!sessionId && !!projectId && isOpen,
  });

  // Fetch AI analysis
  const { data: analysisData, isLoading: analysisLoading } = useQuery({
    queryKey: ["heart-analysis", sessionId, projectId],
    queryFn: () => api.get(`/api/sessions/${sessionId}/heart-analysis?project_id=${projectId}`),
    enabled: !!sessionId && !!projectId && isOpen,
  });

  // Decompress and initialize player
  useEffect(() => {
    if (!recordingData || !playerContainerRef.current || !isOpen) return;

    try {
      // Decompress chunks
      const events = recordingData.chunks.map((chunk: RecordingChunk) => {
        const compressed = Uint8Array.from(atob(chunk.compressed_data), c => c.charCodeAt(0));
        const decompressed = pako.inflate(compressed, { to: 'string' });
        return JSON.parse(decompressed);
      }).flat();

      // Clear previous player
      if (playerContainerRef.current) {
        playerContainerRef.current.innerHTML = '';
      }

      // Initialize rrweb player
      const replayerInstance = new Replayer(events, {
        root: playerContainerRef.current,
        speed: playbackSpeed,
      });

      setReplayer(replayerInstance);

      // Get total duration
      const duration = replayerInstance.getMetaData().totalTime;
      setTotalTime(Math.floor(duration / 1000)); // Convert to seconds

      // Update current time periodically
      const interval = setInterval(() => {
        if (replayerInstance) {
          const time = replayerInstance.getCurrentTime();
          setCurrentTime(Math.floor(time / 1000));
        }
      }, 100);

      return () => {
        clearInterval(interval);
        replayerInstance.destroy();
      };
    } catch (error) {
      console.error("Error initializing player:", error);
    }
  }, [recordingData, isOpen, playbackSpeed]);

  // Control playback
  useEffect(() => {
    if (!replayer) return;
    if (isPlaying) {
      replayer.play();
    } else {
      replayer.pause();
    }
  }, [isPlaying, replayer]);

  if (!isOpen || !sessionId) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSkipForward = () => {
    if (replayer) {
      const newTime = Math.min(currentTime + 10, totalTime);
      replayer.goto(newTime * 1000);
    }
  };

  const handleSkipBackward = () => {
    if (replayer) {
      const newTime = Math.max(currentTime - 10, 0);
      replayer.goto(newTime * 1000);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (replayer) {
      replayer.setConfig({ speed });
    }
  };

  const progress = totalTime > 0 ? (currentTime / totalTime) * 100 : 0;

  // Prepare analysis data
  const visualDescription = analysisData?.visual_description || "Loading session analysis...";
  const aiSummary = analysisData?.ai_summary || "AI analysis in progress...";

  const keyInsights = analysisData?.key_insights || [];
  const activationSignals = analysisData?.activation_signals || [];
  const concerns = analysisData?.concerns || [];

  // Loading state
  if (recordingLoading || analysisLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="p-6 max-w-md w-full">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Loading session recording...</p>
            <p className="text-sm text-muted-foreground">
              {recordingLoading && "Fetching recording data..."}
              {!recordingLoading && analysisLoading && "Loading AI analysis..."}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Error state
  if (recordingError) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="p-6 max-w-md w-full">
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Recording not available</p>
            <p className="text-sm text-muted-foreground mb-4">
              This session recording could not be loaded.
            </p>
            <Button onClick={onClose}>Close</Button>
          </div>
        </Card>
      </div>
    );
  }

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
        <div className="bg-muted rounded-lg mb-4 relative overflow-hidden" style={{ minHeight: '400px' }}>
          <div ref={playerContainerRef} className="w-full h-full" />
        </div>

        {/* Playback Controls */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">{formatTime(currentTime)}</span>
            <Progress value={progress} className="flex-1" />
            <span className="text-sm font-mono">{formatTime(totalTime)}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="icon" onClick={handleSkipBackward} disabled={!replayer}>
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              className="bg-gradient-hero hover:opacity-90"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={!replayer}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={handleSkipForward} disabled={!replayer}>
              <SkipForward className="w-4 h-4" />
            </Button>
            <div className="mx-4 border-l h-8" />
            <Button
              variant={playbackSpeed === 1 ? "default" : "outline"}
              size="sm"
              onClick={() => handleSpeedChange(1)}
              disabled={!replayer}
            >
              1x
            </Button>
            <Button
              variant={playbackSpeed === 2 ? "default" : "outline"}
              size="sm"
              onClick={() => handleSpeedChange(2)}
              disabled={!replayer}
            >
              2x
            </Button>
            <Button
              variant={playbackSpeed === 4 ? "default" : "outline"}
              size="sm"
              onClick={() => handleSpeedChange(4)}
              disabled={!replayer}
            >
              4x
            </Button>
            <div className="flex-1" />
            <Button variant="outline" size="icon" disabled>
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" disabled>
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
                  {visualDescription}
                </p>
              </div>
            </div>
          </Card>

          {/* AI Summary */}
          <Card className="p-4 bg-white border-border">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-0.5 rounded-full overflow-hidden shrink-0">
                <AnimatedLogo />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">AI Analysis</h4>
                <p className="text-sm whitespace-pre-line text-muted-foreground">
                  {aiSummary}
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
                {keyInsights.length > 0 && (
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <h4 className="font-semibold">Key Insights</h4>
                    </div>
                    <ul className="space-y-2">
                      {keyInsights.map((insight: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-success mt-0.5">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Activation Signals */}
                {activationSignals.length > 0 && (
                  <Card className="p-4 border-success/20 bg-success/5">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-success" />
                      <h4 className="font-semibold">Activation Signals</h4>
                      <Badge variant="outline" className="ml-auto bg-success/10 text-success border-success/20">
                        {activationSignals.length} signals
                      </Badge>
                    </div>
                    <ul className="space-y-2">
                      {activationSignals.map((signal: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                          <span>{signal}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Concerns */}
                {concerns.length > 0 && (
                  <Card className="p-4 border-warning/20 bg-warning/5">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      <h4 className="font-semibold">Areas to Monitor</h4>
                      <Badge variant="outline" className="ml-auto bg-warning/10 text-warning border-warning/20">
                        {concerns.length} items
                      </Badge>
                    </div>
                    <ul className="space-y-2">
                      {concerns.map((concern: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-warning mt-0.5">⚠</span>
                          <span>{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* No detailed analysis available */}
                {keyInsights.length === 0 && activationSignals.length === 0 && concerns.length === 0 && (
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground text-center">
                      No detailed analysis available for this session.
                    </p>
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
