import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Layers } from "lucide-react";
import { EmailQueueStats } from "@/components/email-queue/EmailQueueStats";
import { BulkActions } from "@/components/email-queue/BulkActions";
import { EmailCard, QueuedEmail } from "@/components/email-queue/EmailCard";
import { CardStackView } from "@/components/email-queue/CardStackView";
import { FeedbackModal } from "@/components/email-queue/FeedbackModal";
import { EditEmailModal } from "@/components/email-queue/EditEmailModal";
import { SessionRecordingModal } from "@/components/email-queue/SessionRecordingModal";
import { ConversationThreadModal } from "@/components/email-queue/ConversationThreadModal";
import { useToast } from "@/hooks/use-toast";

const EmailQueue = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<QueuedEmail | null>(null);
  const [viewMode, setViewMode] = useState<"stack" | "list">("stack");
  const [queuedEmailsList, setQueuedEmailsList] = useState<QueuedEmail[]>([
    {
      id: "email_1",
      email: "john@company.com",
      confidence: 94,
      heartScore: 85,
      subject: "You're making great progress, John!",
      preview: "Hi John, I noticed you completed 3 new workflows today. Your engagement is fantastic! Would love to show you some advanced features that could help you save even more time...",
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
      preview: "Hi Mike, I saw you explored our advanced features today. Looks like you're getting serious about automation! Here are some tips to get the most out of...",
      aiReasoning: "User exploring premium features. High engagement with advanced tools. Strong conversion signal.",
      sessionId: "sess_def123",
      sessionTime: "1 hour ago",
      type: "first_touch",
    },
  ]);
  const { toast } = useToast();


  const toggleEmailSelection = (id: string) => {
    setSelectedEmails(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const handleApprove = (id: string) => {
    toast({
      title: "Email Approved",
      description: "Email has been queued for sending.",
    });
    // Remove from queue
    setQueuedEmailsList(prev => prev.filter(e => e.id !== id));
  };

  const handleEdit = (id: string) => {
    const email = queuedEmailsList.find(e => e.id === id);
    if (email) {
      setCurrentEmail(email);
      setShowEditModal(true);
    }
  };

  const handleReject = (id: string) => {
    setSelectedEmails([id]);
    setShowFeedbackModal(true);
  };

  const handleViewRecording = (id: string) => {
    const email = queuedEmailsList.find(e => e.id === id);
    if (email) {
      setCurrentEmail(email);
      setShowRecordingModal(true);
    }
  };

  const handleViewThread = (id: string) => {
    const email = queuedEmailsList.find(e => e.id === id);
    if (email) {
      setCurrentEmail(email);
      setShowThreadModal(true);
    }
  };

  const handleBulkApprove = () => {
    toast({
      title: "Bulk Approval",
      description: `${selectedEmails.length} emails approved.`,
    });
    setSelectedEmails([]);
  };

  const handleBulkReject = () => {
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    toast({
      title: "Feedback Submitted",
      description: `Rejected ${selectedEmails.length} emails with feedback.`,
    });
    // Remove rejected emails from queue
    setQueuedEmailsList(prev => prev.filter(e => !selectedEmails.includes(e.id)));
    setShowFeedbackModal(false);
    setSelectedEmails([]);
  };

  const handleEditSave = (emailId: string, subject: string, body: string) => {
    toast({
      title: "Email Updated & Approved",
      description: "Your edited email has been queued for sending.",
    });
    // Remove from queue after editing and approving
    setQueuedEmailsList(prev => prev.filter(e => e.id !== emailId));
    setShowEditModal(false);
    setCurrentEmail(null);
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
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === "stack" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("stack")}
              className="h-8"
            >
              <Layers className="w-4 h-4 mr-2" />
              Stack
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8"
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>

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
      <EmailQueueStats />

      {/* Conditional Bulk Actions (List View Only) */}
      {viewMode === "list" && (
        <BulkActions
          selectedCount={selectedEmails.length}
          onApprove={handleBulkApprove}
          onReject={handleBulkReject}
        />
      )}

      {/* Email Queue Views */}
      {viewMode === "stack" ? (
        <CardStackView
          emails={queuedEmailsList}
          onApprove={handleApprove}
          onEdit={handleEdit}
          onReject={handleReject}
          onViewRecording={handleViewRecording}
          onViewThread={handleViewThread}
        />
      ) : (
        <div className="border rounded-lg overflow-hidden bg-card">
          {queuedEmailsList.map((email) => (
            <EmailCard
              key={email.id}
              email={email}
              isSelected={selectedEmails.includes(email.id)}
              onToggleSelect={toggleEmailSelection}
              onApprove={handleApprove}
              onEdit={handleEdit}
              onReject={handleReject}
              onViewRecording={handleViewRecording}
              onViewThread={handleViewThread}
            />
          ))}
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        selectedCount={selectedEmails.length}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={handleFeedbackSubmit}
      />

      {/* Edit Email Modal */}
      <EditEmailModal
        isOpen={showEditModal}
        email={currentEmail}
        onClose={() => {
          setShowEditModal(false);
          setCurrentEmail(null);
        }}
        onSave={handleEditSave}
      />

      {/* Session Recording Modal */}
      <SessionRecordingModal
        isOpen={showRecordingModal}
        sessionId={currentEmail?.sessionId || null}
        email={currentEmail?.email || null}
        onClose={() => {
          setShowRecordingModal(false);
          setCurrentEmail(null);
        }}
      />

      {/* Conversation Thread Modal */}
      <ConversationThreadModal
        isOpen={showThreadModal}
        email={currentEmail?.email || null}
        userId={currentEmail?.id || null}
        onClose={() => {
          setShowThreadModal(false);
          setCurrentEmail(null);
        }}
      />
    </div>
  );
};

export default EmailQueue;
