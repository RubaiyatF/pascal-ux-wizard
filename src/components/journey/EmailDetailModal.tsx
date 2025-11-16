import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Mail, Reply, ExternalLink } from "lucide-react";

interface EmailDetail {
  direction: string;
  subject: string;
  timestamp: string;
  opened?: boolean;
  clicked?: boolean;
  intent?: string;
  sentiment?: string;
  topics?: string[];
  content: string;
}

interface EmailDetailModalProps {
  isOpen: boolean;
  email: EmailDetail | null;
  onClose: () => void;
}

export const EmailDetailModal = ({
  isOpen,
  email,
  onClose,
}: EmailDetailModalProps) => {
  if (!isOpen || !email) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {email.direction === "sent" ? (
              <Mail className="w-5 h-5 text-accent" />
            ) : (
              <Reply className="w-5 h-5 text-success" />
            )}
            <h3 className="text-lg font-semibold">
              {email.direction === "sent" ? "Email Sent" : "Email Reply"}
            </h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Email Header */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Subject</label>
            <p className="text-base font-semibold mt-1">{email.subject}</p>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div>
              <label className="text-muted-foreground">Date</label>
              <p className="font-medium">
                {new Date(email.timestamp).toLocaleString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          {email.direction === "sent" && (
            <div className="flex gap-2">
              {email.opened && (
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  ✓ Opened
                </Badge>
              )}
              {email.clicked && (
                <Badge variant="outline" className="bg-info/10 text-info border-info/20">
                  ✓ Clicked Links
                </Badge>
              )}
            </div>
          )}

          {email.direction === "reply" && (
            <div className="flex gap-2 flex-wrap">
              {email.intent && (
                <Badge variant="outline">
                  Intent: {email.intent}
                </Badge>
              )}
              {email.sentiment && (
                <Badge variant="outline">
                  Sentiment: {email.sentiment}
                </Badge>
              )}
              {email.topics && (
                <Badge variant="outline">
                  Topics: {email.topics.join(", ")}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Email Content */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Message</label>
          <div className="bg-background border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-4 bg-card">
              <div className="text-sm leading-relaxed text-foreground space-y-4">
                <p>Hi there,</p>
                
                <p>{email.content}</p>
                
                <p>I'd love to hear your thoughts on this. Feel free to reach out if you have any questions!</p>
                
                <div className="space-y-1">
                  <p>Best regards,</p>
                  <p>Sarah Thompson</p>
                  <p className="text-muted-foreground">Customer Success Team</p>
                  <p className="text-muted-foreground">support@company.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {email.direction === "reply" && (
            <Button className="bg-gradient-hero hover:opacity-90">
              <Reply className="w-4 h-4 mr-2" />
              Reply
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
