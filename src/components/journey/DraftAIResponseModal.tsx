import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, Send, RefreshCw } from "lucide-react";
import { useState } from "react";

interface TimelineEvent {
  type: string;
  direction?: string;
}

interface Conversation {
  email: string;
  summary: string;
  stage: string;
  heartAnalysis: {
    overall: number;
  };
  timeline: TimelineEvent[];
}

interface DraftAIResponseModalProps {
  isOpen: boolean;
  conversation: Conversation | null;
  onClose: () => void;
}

export const DraftAIResponseModal = ({
  isOpen,
  conversation,
  onClose,
}: DraftAIResponseModalProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [draftContent, setDraftContent] = useState("");

  if (!isOpen || !conversation) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const lastReply = conversation.timeline
        .filter((e: TimelineEvent) => e.type === "email" && e.direction === "reply")
        .pop();
      
      const mockResponse = `Hi ${conversation.email.split("@")[0]},

Thank you for your question about API rate limits!

I'd be happy to help you understand our rate limiting system. Our API has the following rate limits:

• Free Plan: 100 requests per hour
• Pro Plan: 1,000 requests per hour
• Enterprise: Custom limits available

For your current usage patterns, I'd recommend upgrading to the Pro plan which would give you 10x more capacity. You can also implement exponential backoff in your application to handle rate limits gracefully.

Would you like me to schedule a call to discuss your specific use case and recommend the best solution?

Best regards,
Pascal Team`;

      setDraftContent(mockResponse);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSend = () => {
    // Handle sending the email
    console.log("Sending email:", draftContent);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Draft AI Response</h3>
            <Badge variant="outline" className="ml-2">
              {conversation.email}
            </Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Context Summary */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-border mb-6">
          <div className="flex items-start gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">Journey Context</p>
              <p className="text-sm text-muted-foreground">
                {conversation.summary}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">Journey Stage</p>
              <Badge variant="outline" className="mt-1">{conversation.stage}</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">HEART Score</p>
              <p className="text-lg font-semibold mt-1">{conversation.heartAnalysis.overall}/100</p>
            </div>
          </div>
        </div>

        {/* Draft Area */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Email Draft</label>
            <Textarea
              placeholder="Click 'Generate AI Draft' to create a personalized response based on the user's journey and context..."
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
          </div>

          {/* AI Suggestions */}
          {draftContent && (
            <div className="bg-info/5 border border-info/20 rounded-lg p-3">
              <p className="text-xs font-medium text-info mb-2">💡 AI Suggestions</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Consider addressing their specific pain point about rate limits</li>
                <li>• Reference their high engagement score (HEART: {conversation.heartAnalysis.overall})</li>
                <li>• Offer a personalized demo or consultation</li>
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-2 mt-6">
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Draft
                </>
              )}
            </Button>
            {draftContent && (
              <Button variant="outline" onClick={handleGenerate}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              className="bg-gradient-hero hover:opacity-90"
              onClick={handleSend}
              disabled={!draftContent}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
