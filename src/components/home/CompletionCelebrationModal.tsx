import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatedLogo } from "@/components/AnimatedLogo";

interface CompletionCelebrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CompletionCelebrationModal = ({ open, onOpenChange }: CompletionCelebrationModalProps) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    onOpenChange(false);
    navigate('/email-queue');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-0">
        <div className="text-center py-8 space-y-6">
          {/* Animated Logo with Gradient Background */}
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 bg-gradient-hero rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-hero flex items-center justify-center">
              <AnimatedLogo />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">All Set!</h2>
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <p className="text-base text-muted-foreground max-w-sm mx-auto">
              You've completed the setup! Pascal is now ready to help you build the most engaged user base.
            </p>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto pt-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">∞</div>
              <div className="text-xs text-muted-foreground">Possibilities</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-success flex items-center justify-center gap-1">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-xs text-muted-foreground">Growth</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-xs text-muted-foreground">Ready</div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleGetStarted} 
              className="w-full bg-gradient-hero hover:opacity-90"
              size="lg"
            >
              Start Using Pascal
            </Button>
            <p className="text-xs text-muted-foreground">
              You can always revisit this guide by clicking the Pascal logo
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
