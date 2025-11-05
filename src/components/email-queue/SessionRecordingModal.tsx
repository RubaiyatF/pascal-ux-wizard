import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, Play, Pause, SkipForward, SkipBack, Download, Maximize } from "lucide-react";
import { useState } from "react";

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
  const totalTime = 734; // 12:14 in seconds

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

        {/* Session Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* HEART Scores */}
          <Card className="p-4 bg-secondary/50">
            <h4 className="font-semibold mb-3">HEART Scores</h4>
            <div className="space-y-2">
              {[
                { label: "Happiness", value: 75, color: "bg-success" },
                { label: "Engagement", value: 82, color: "bg-info" },
                { label: "Adoption", value: 68, color: "bg-warning" },
                { label: "Retention", value: 90, color: "bg-success" },
                { label: "Task Success", value: 85, color: "bg-success" },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{metric.label}</span>
                    <span className="font-medium">{metric.value}</span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between">
                <span className="font-medium">Overall Score</span>
                <span className="text-xl font-bold">80/100</span>
              </div>
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="p-4 bg-secondary/50">
            <h4 className="font-semibold mb-3">AI Insights</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium mb-1">Visual Description:</p>
                <p className="text-muted-foreground">
                  User navigated to dashboard, explored charts, exported report to PDF,
                  tested API integration features.
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">Key Actions:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Exploring advanced features</li>
                  <li>• High engagement with charts</li>
                  <li>• Ready for upgrade prompt</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">Activation Signals:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    ✓ Core workflow
                  </Badge>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    ✓ Advanced features
                  </Badge>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    ✓ High task success
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex gap-2 justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-gradient-hero hover:opacity-90">
            Queue Follow-up Email
          </Button>
        </div>
      </Card>
    </div>
  );
};
