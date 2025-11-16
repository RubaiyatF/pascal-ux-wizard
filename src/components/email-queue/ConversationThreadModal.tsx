import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, User, Bot } from "lucide-react";

interface Message {
  id: string;
  type: "sent" | "received";
  sender: "ai" | "user";
  subject?: string;
  content: string;
  timestamp: string;
  opened?: boolean;
  clicked?: boolean;
  intent?: string;
  sentiment?: string;
}

interface ConversationThreadModalProps {
  isOpen: boolean;
  email: string | null;
  userId: string | null;
  onClose: () => void;
}

export const ConversationThreadModal = ({
  isOpen,
  email,
  userId,
  onClose,
}: ConversationThreadModalProps) => {
  if (!isOpen || !email) return null;

  const messages: Message[] = [
    {
      id: "msg_1",
      type: "sent",
      sender: "ai",
      subject: "Welcome to Pascal!",
      content:
        "Hi Sarah,\n\nWelcome to Pascal! We're excited to have you on board. I noticed you just signed up and wanted to reach out personally.\n\nPascal helps you understand and activate your users through AI-powered session intelligence. Here are some quick wins to get started:\n\n• Install our tracker (takes 2 minutes)\n• Record your first session\n• See AI insights in action\n\nNeed any help getting started?\n\nBest,\nPascal Team",
      timestamp: "Nov 1, 10:23 AM",
      opened: true,
      clicked: true,
    },
    {
      id: "msg_2",
      type: "received",
      sender: "user",
      content:
        "Thanks! Quick question - how do I install the tracker on a React app? I'm using Next.js 14.",
      timestamp: "Nov 1, 2:45 PM",
      intent: "question",
      sentiment: "positive",
    },
    {
      id: "msg_3",
      type: "sent",
      sender: "ai",
      subject: "Re: Installing Pascal on Next.js",
      content:
        "Great question, Sarah!\n\nFor Next.js 14, you can install Pascal in your app/layout.tsx:\n\n```javascript\nimport { PascalTracker } from '@pascal/tracker';\n\nexport default function RootLayout({ children }) {\n  return (\n    <html>\n      <body>\n        <PascalTracker projectId='your_project_id' />\n        {children}\n      </body>\n    </html>\n  );\n}\n```\n\nThe tracker automatically handles:\n• Session recording with rrweb\n• User identification\n• Event tracking\n\nLet me know if you hit any issues!\n\nBest,\nPascal Team",
      timestamp: "Nov 1, 3:12 PM",
      opened: true,
      clicked: false,
    },
    {
      id: "msg_4",
      type: "received",
      sender: "user",
      content:
        "Perfect, got it installed! Now I'm seeing sessions. What about API rate limits? I'm expecting high traffic.",
      timestamp: "Nov 2, 11:34 AM",
      intent: "question",
      sentiment: "positive",
    },
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Conversation Thread</h3>
            <p className="text-sm text-muted-foreground">
              {email} • User ID: {userId}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-hidden">
          <h4 className="font-semibold mb-4">Email Thread (4 messages)</h4>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((message) => (
                <Card key={message.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === "ai"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary"
                      }`}
                    >
                      {message.sender === "ai" ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {message.sender === "ai" ? "Pascal AI" : "Sarah"}
                          </span>
                          <Badge
                            variant="outline"
                            className={
                              message.type === "sent"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-secondary"
                            }
                          >
                            {message.type === "sent" ? "Sent" : "Received"}
                          </Badge>
                          {message.intent && (
                            <Badge variant="outline" className="text-xs">
                              {message.intent}
                            </Badge>
                          )}
                          {message.sentiment && (
                            <Badge variant="outline" className="text-xs">
                              {message.sentiment === "positive" ? "😊" : "😐"}{" "}
                              {message.sentiment}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp}
                        </span>
                      </div>
                      {message.subject && (
                        <p className="font-medium text-sm mb-2">
                          Subject: {message.subject}
                        </p>
                      )}
                      <div className="bg-background border border-border rounded-lg overflow-hidden">
                        <div className="px-3 py-3 bg-card">
                          <div className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                            {message.content}
                          </div>
                        </div>
                      </div>
                      {message.type === "sent" && (
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          {message.opened && <span>✓ Opened</span>}
                          {message.clicked && <span>✓ Clicked</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </Card>
    </div>
  );
};
