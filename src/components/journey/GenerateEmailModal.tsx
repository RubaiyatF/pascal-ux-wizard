import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Send, RefreshCw } from "lucide-react";
import { useState } from "react";
import { AnimatedLogo } from "@/components/AnimatedLogo";

interface TimelineEvent {
  type: string;
  journeyStage?: string;
  aiSummary?: string;
}

interface ConversationData {
  email: string;
  summary: string;
  stage: string;
  heartAnalysis: {
    overall: number;
  };
  timeline: TimelineEvent[];
}

interface GenerateEmailModalProps {
  isOpen: boolean;
  conversation: ConversationData | null;
  onClose: () => void;
}

export const GenerateEmailModal = ({
  isOpen,
  conversation,
  onClose,
}: GenerateEmailModalProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  if (!isOpen || !conversation) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation based on journey data
    setTimeout(() => {
      const userName = conversation.email.split("@")[0];
      const stage = conversation.stage;
      const heartScore = conversation.heartAnalysis.overall;
      
      // Generate subject based on context
      const generatedSubject = stage === "ongoing_dialogue" 
        ? `Quick follow-up on your recent activity`
        : stage === "adoption"
        ? `Congratulations on your progress with Pascal!`
        : `Let's help you get started with Pascal`;
      
      // Generate email body based on journey context
      const generatedBody = `Hi ${userName.charAt(0).toUpperCase() + userName.slice(1)},

I've been following your journey with Pascal and wanted to reach out personally.

Based on your recent activity (HEART Score: ${heartScore}/100), I noticed:
${conversation.timeline
  .filter((e: TimelineEvent) => e.type === "session")
  .slice(-2)
  .map((e: TimelineEvent) => `• ${e.journeyStage}: ${e.aiSummary}`)
  .join("\n")}

${stage === "ongoing_dialogue" 
  ? `I see you're actively exploring our platform. Is there anything specific I can help you with?`
  : stage === "adoption"
  ? `You're doing amazing! Your engagement shows you're getting real value from Pascal. Would you be interested in exploring some advanced features?`
  : `I'd love to help you get the most out of Pascal. Would you like to schedule a quick call to discuss your goals?`
}

Looking forward to hearing from you!

Best regards,
The Pascal Team`;

      setSubject(generatedSubject);
      setEmailBody(generatedBody);
      setIsGenerating(false);
    }, 2500);
  };

  const handleSend = () => {
    // Handle sending the email
    console.log("Sending email:", { subject, emailBody });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <AnimatedLogo />
            </div>
            <h3 className="text-lg font-semibold">Generate Email with Pascal</h3>
            <Badge variant="outline" className="ml-2">
              {conversation.email}
            </Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Journey Summary */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="mb-3">
            <p className="text-sm font-medium mb-1">Journey Summary</p>
            <p className="text-sm text-muted-foreground">
              {conversation.summary}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">Stage</p>
              <Badge variant="outline" className="mt-1 text-xs">{conversation.stage}</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">HEART Score</p>
              <p className="text-lg font-semibold mt-1">{conversation.heartAnalysis.overall}/100</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Interactions</p>
              <p className="text-lg font-semibold mt-1">{conversation.timeline.length}</p>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        {!emailBody && (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Pascal will analyze the user journey and generate a personalized email
            </p>
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating with Pascal AI...
                </>
              ) : (
                <>
                  <div className="w-4 h-4 mr-2 rounded-full overflow-hidden">
                    <AnimatedLogo />
                  </div>
                  Generate Email
                </>
              )}
            </Button>
          </div>
        )}

        {/* Email Draft */}
        {emailBody && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject..."
                className="text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Email Body</label>
              <div className="bg-background border border-border rounded-lg overflow-hidden">
                <div className="px-4 py-4 bg-white">
                  <Textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="min-h-[350px] text-sm border-0 p-0 focus-visible:ring-0 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-secondary/50 border border-border rounded-lg p-3">
              <p className="text-xs font-medium mb-2">💡 Pascal AI Insights</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Email personalized based on {conversation.timeline.length} user interactions</li>
                <li>• Context includes journey stage: {conversation.stage}</li>
                <li>• User engagement level: {conversation.heartAnalysis.overall >= 80 ? "High" : conversation.heartAnalysis.overall >= 60 ? "Medium" : "Low"}</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex justify-between gap-2 pt-4">
              <Button 
                variant="outline"
                onClick={handleGenerate}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSend}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
