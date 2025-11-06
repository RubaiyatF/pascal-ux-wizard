import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface TrackerVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerified: () => void;
}

export const TrackerVerificationModal = ({ open, onOpenChange, onVerified }: TrackerVerificationModalProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  const handleCheck = () => {
    setIsChecking(true);
    setHasChecked(true);
    
    // Simulate checking for tracker connection
    setTimeout(() => {
      // For demo purposes, randomly succeed
      const connected = Math.random() > 0.3;
      setIsConnected(connected);
      setIsChecking(false);
    }, 2000);
  };

  const handleContinue = () => {
    onVerified();
    onOpenChange(false);
  };

  const handleSkip = () => {
    onOpenChange(false);
  };

  useEffect(() => {
    if (!open) {
      // Reset state when modal closes
      setTimeout(() => {
        setIsChecking(false);
        setIsConnected(false);
        setHasChecked(false);
      }, 300);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Verify Tracker Connection</DialogTitle>
          <DialogDescription>
            Let's check if Pascal is receiving events from your website
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!hasChecked && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-foreground font-medium">
                  Ready to verify
                </p>
                <p className="text-xs text-muted-foreground">
                  Make sure you've added the tracking snippet to your website and triggered at least one event
                </p>
              </div>
            </div>
          )}

          {isChecking && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-foreground font-medium">
                  Checking for events...
                </p>
                <p className="text-xs text-muted-foreground">
                  Looking for tracking data from your website
                </p>
              </div>
            </div>
          )}

          {!isChecking && hasChecked && isConnected && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-foreground font-medium">
                  Tracker connected successfully!
                </p>
                <p className="text-xs text-muted-foreground">
                  Pascal is now receiving events from your website
                </p>
              </div>
            </div>
          )}

          {!isChecking && hasChecked && !isConnected && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-foreground font-medium">
                  No events detected yet
                </p>
                <p className="text-xs text-muted-foreground">
                  Make sure the snippet is properly installed and you've triggered at least one event
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {!hasChecked && (
              <>
                <Button variant="outline" onClick={handleSkip} className="flex-1">
                  Skip for Now
                </Button>
                <Button onClick={handleCheck} className="flex-1">
                  Check Connection
                </Button>
              </>
            )}

            {isChecking && (
              <Button disabled className="w-full">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Checking...
              </Button>
            )}

            {!isChecking && hasChecked && isConnected && (
              <Button onClick={handleContinue} className="w-full">
                Continue to Next Step
              </Button>
            )}

            {!isChecking && hasChecked && !isConnected && (
              <>
                <Button variant="outline" onClick={handleSkip} className="flex-1">
                  Skip for Now
                </Button>
                <Button onClick={handleCheck} className="flex-1">
                  Try Again
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
