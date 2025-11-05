import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Eye, Sparkles, MessageSquare } from "lucide-react";

const EmailQueue = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const queuedEmails = [
    {
      id: "email_1",
      email: "john@company.com",
      confidence: 94,
      heartScore: 85,
      subject: "You're making great progress, John!",
      preview: "Hi John, I noticed you completed 3 new...",
      aiReasoning: "User showing high activation signals. Completed core workflow. Perfect timing for upgrade.",
      sessionId: "sess_xyz789",
      sessionTime: "12 min ago",
      type: "first_touch",
    },
    {
      id: "email_2",
      email: "sarah@startup.io",
      confidence: 87,
      heartScore: 72,
      subject: "Re: Your question about integrations",
      preview: "Thread: 3 messages | Last reply: 'What about API limits?'",
      aiReasoning: "User actively engaged in technical questions. Ongoing dialogue shows high interest.",
      sessionId: "sess_abc456",
      sessionTime: "25 min ago",
      type: "reply",
      conversationStage: "ongoing_dialogue",
      sentiment: "positive",
      intent: "question",
    },
    {
      id: "email_3",
      email: "mike@tech.com",
      confidence: 91,
      heartScore: 78,
      subject: "Great session today - here's what's next",
      preview: "Hi Mike, I saw you explored our advanced features...",
      aiReasoning: "User exploring premium features. High engagement with advanced tools. Strong conversion signal.",
      sessionId: "sess_def123",
      sessionTime: "1 hour ago",
      type: "first_touch",
    },
  ];

  const stats = [
    { label: "Pending Approval", value: "24", sublabel: "emails" },
    { label: "Active Threads", value: "12", sublabel: "conversations" },
    { label: "AI Accuracy", value: "89%", sublabel: "this week" },
    { label: "Avg Response Time", value: "2.3h", sublabel: "human approval" },
  ];

  const toggleEmailSelection = (id: string) => {
    setSelectedEmails(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mission Control</h1>
          <p className="text-muted-foreground">
            Email Queue Dashboard · Human-in-the-Loop Command Center
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Emails</SelectItem>
              <SelectItem value="high">High Confidence</SelectItem>
              <SelectItem value="replies">Replies Only</SelectItem>
              <SelectItem value="first">First Touch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedEmails.length > 0 && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <p className="font-medium">
              {selectedEmails.length} email(s) selected
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Approve Selected
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowFeedbackModal(true)}
              >
                Reject with Feedback
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Email Queue */}
      <div className="space-y-4">
        {queuedEmails.map((email) => (
          <Card
            key={email.id}
            className="p-6 hover:shadow-elevated transition-all"
          >
            <div className="space-y-4">
              {/* Header Row */}
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={selectedEmails.includes(email.id)}
                  onCheckedChange={() => toggleEmailSelection(email.id)}
                  className="mt-1"
                />

                <div className="flex-1 space-y-3">
                  {/* User Info & Confidence */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{email.email}</h3>
                      <Badge
                        variant="outline"
                        className="bg-success/10 text-success border-success/20"
                      >
                        {email.confidence}% confidence
                      </Badge>
                      <Badge variant="outline">Score: {email.heartScore}</Badge>
                      {email.type === "reply" && (
                        <Badge
                          variant="outline"
                          className="bg-info/10 text-info border-info/20"
                        >
                          Reply Thread
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Email Content */}
                  <div className="space-y-2">
                    <p className="font-medium">Subject: "{email.subject}"</p>
                    <p className="text-sm text-muted-foreground">
                      Preview: {email.preview}
                    </p>
                  </div>

                  {/* AI Reasoning */}
                  <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">
                          🧠 AI Reasoning
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {email.aiReasoning}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Conversation Stage (for replies) */}
                  {email.conversationStage && (
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        💬 Stage: {email.conversationStage}
                      </span>
                      <span className="text-muted-foreground">
                        😊 Sentiment: {email.sentiment}
                      </span>
                      <span className="text-muted-foreground">
                        Intent: {email.intent}
                      </span>
                    </div>
                  )}

                  {/* Session Trigger */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Play className="w-4 h-4" />
                    <span>
                      📹 Triggered by: Session {email.sessionId} (
                      {email.sessionTime})
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      size="sm"
                      className="bg-gradient-hero hover:opacity-90"
                    >
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit & Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      Reject
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4 mr-2" />
                      Watch Recording
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      View Thread
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="p-6 max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">
              Batch Feedback - Rejecting {selectedEmails.length} email(s)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Provide feedback for AI learning:
            </p>
            <Textarea
              placeholder="E.g., Too aggressive. Soften tone for technical users."
              className="mb-4"
              rows={4}
            />
            <p className="text-xs text-muted-foreground mb-4">
              This feedback will improve future emails for similar patterns.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowFeedbackModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setSelectedEmails([]);
                }}
              >
                Submit Feedback
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EmailQueue;
