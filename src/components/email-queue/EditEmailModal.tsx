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
            <div className="bg-background border border-border rounded-lg overflow-hidden">
              <div className="px-3 py-3 bg-white">
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Hi there,

Your email content here...

Best regards,
Sarah Thompson
Customer Success Team
support@company.com"
                  rows={12}
                  className="text-sm border-0 p-0 focus-visible:ring-0 resize-none"
                />
              </div>
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
