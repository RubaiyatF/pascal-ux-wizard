import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, SkipForward, SkipBack, X, Maximize2 } from "lucide-react";
import { useState } from "react";

interface InlineSessionPlayerProps {
  session: any;
  onClose: () => void;
}

export const InlineSessionPlayer = ({ session, onClose }: InlineSessionPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalTime = 734; // 12:14 in seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = (currentTime / totalTime) * 100;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate playback
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalTime) {
            clearInterval(interval);
            setIsPlaying(false);
            return totalTime;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handleSkipBack = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };

  const handleSkipForward = () => {
    setCurrentTime(Math.min(totalTime, currentTime + 10));
  };

  return (
    <Card className="mt-3 overflow-hidden border-primary/20 animate-fade-in">
      {/* Video Player */}
      <div className="relative bg-muted/50 aspect-video flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="relative text-center">
          <Badge variant="outline" className="mb-2">Session Recording</Badge>
          <p className="text-sm text-muted-foreground">
            {session.sessionId}
          </p>
        </div>
        
        {/* Close Button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 border-destructive text-destructive hover:bg-destructive/10"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Controls */}
      <div className="p-4 space-y-3">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalTime)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="icon" onClick={handleSkipBack}>
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button 
            variant="default" 
            size="icon" 
            className="w-12 h-12"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </Button>
          <Button variant="outline" size="icon" onClick={handleSkipForward}>
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Session Info */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="text-sm font-semibold">{session.duration}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Pages</p>
            <p className="text-sm font-semibold">{session.pages}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Events</p>
            <p className="text-sm font-semibold">{session.events}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
