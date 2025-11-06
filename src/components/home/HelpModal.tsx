import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mail, Book, MessageCircle, Video } from "lucide-react";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'support' | 'docs';
}

export const HelpModal = ({ open, onOpenChange, type }: HelpModalProps) => {
  const supportContent = (
    <>
      <DialogHeader>
        <DialogTitle>Contact Support</DialogTitle>
        <DialogDescription>
          Our team is here to help you get the most out of Pascal
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start h-auto p-4"
            onClick={() => window.location.href = 'mailto:support@pascal.ai'}
          >
            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Email Support</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Get help via email - we typically respond within 24 hours
                </p>
              </div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start h-auto p-4"
            onClick={() => window.open('https://discord.gg/pascal', '_blank')}
          >
            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Join Discord Community</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Connect with other Pascal users and get real-time help
                </p>
              </div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start h-auto p-4"
            onClick={() => window.open('https://calendly.com/pascal-support', '_blank')}
          >
            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Video className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Schedule a Call</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Book a 30-minute onboarding call with our team
                </p>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </>
  );

  const docsContent = (
    <>
      <DialogHeader>
        <DialogTitle>Documentation</DialogTitle>
        <DialogDescription>
          Learn everything about Pascal's features and capabilities
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start h-auto p-4"
            onClick={() => window.open('https://docs.pascal.ai/getting-started', '_blank')}
          >
            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Book className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">Getting Started Guide</p>
                  <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Complete guide to setting up and using Pascal
                </p>
              </div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start h-auto p-4"
            onClick={() => window.open('https://docs.pascal.ai/api-reference', '_blank')}
          >
            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Book className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">API Reference</p>
                  <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Technical documentation for developers
                </p>
              </div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start h-auto p-4"
            onClick={() => window.open('https://docs.pascal.ai/examples', '_blank')}
          >
            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Video className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">Video Tutorials</p>
                  <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Step-by-step video guides and examples
                </p>
              </div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start h-auto p-4"
            onClick={() => window.open('https://docs.pascal.ai/best-practices', '_blank')}
          >
            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Book className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">Best Practices</p>
                  <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tips and strategies for maximizing engagement
                </p>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {type === 'support' ? supportContent : docsContent}
      </DialogContent>
    </Dialog>
  );
};
