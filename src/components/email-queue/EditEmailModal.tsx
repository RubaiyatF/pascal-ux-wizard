import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { QueuedEmail } from "./EmailCard";
import { Sparkles, X } from "lucide-react";

interface EditEmailModalProps {
  isOpen: boolean;
  email: QueuedEmail | null;
  onClose: () => void;
  onSave: (emailId: string, subject: string, body: string) => void;
}

export const EditEmailModal = ({
  isOpen,
  email,
  onClose,
  onSave,
}: EditEmailModalProps) => {
  const [subject, setSubject] = useState(email?.subject || "");
  const [body, setBody] = useState(
    `Hi ${email?.email.split("@")[0]},\n\n${email?.preview || ""}\n\nBest regards,\nPascal Team`
  );

  if (!isOpen || !email) return null;

  const handleSave = () => {
    onSave(email.id, subject, body);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Edit Email Before Sending</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* AI Reasoning Context */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-border mb-6">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">AI Reasoning</p>
              <p className="text-sm text-muted-foreground">{email.aiReasoning}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Recipient */}
          <div>
            <Label htmlFor="recipient">To</Label>
            <Input
              id="recipient"
              value={email.email}
              disabled
              className="bg-muted"
            />
          </div>

          {/* Subject */}
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
            />
          </div>

          {/* Body */}
          <div>
            <Label htmlFor="body">Email Body</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Email content..."
              rows={12}
              className="font-mono text-sm"
            />
          </div>

          {/* Session Context */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-2">Session Context</p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Session ID: {email.sessionId}</p>
              <p>• Triggered: {email.sessionTime}</p>
              <p>• HEART Score: {email.heartScore}</p>
              <p>• Confidence: {email.confidence}%</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-gradient-hero hover:opacity-90">
            Save & Approve
          </Button>
        </div>
      </Card>
    </div>
  );
};
