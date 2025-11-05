import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmailQueueStats } from "@/components/email-queue/EmailQueueStats";
import { BulkActions } from "@/components/email-queue/BulkActions";
import { EmailCard, QueuedEmail } from "@/components/email-queue/EmailCard";
import { FeedbackModal } from "@/components/email-queue/FeedbackModal";
import { useToast } from "@/hooks/use-toast";

const EmailQueue = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const { toast } = useToast();

  const queuedEmails: QueuedEmail[] = [
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
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Edit Email",
      description: "Email editor would open here.",
    });
  };

  const handleReject = (id: string) => {
    setSelectedEmails([id]);
    setShowFeedbackModal(true);
  };

  const handleViewRecording = (id: string) => {
    const email = queuedEmails.find(e => e.id === id);
    toast({
      title: "Opening Session Recording",
      description: `Loading session ${email?.sessionId}...`,
    });
  };

  const handleViewThread = (id: string) => {
    toast({
      title: "Opening Thread",
      description: "Full conversation would open here.",
    });
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
    setShowFeedbackModal(false);
    setSelectedEmails([]);
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
      <EmailQueueStats />

      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedEmails.length}
        onApprove={handleBulkApprove}
        onReject={handleBulkReject}
      />

      {/* Email Queue */}
      <div className="space-y-4">
        {queuedEmails.map((email) => (
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

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        selectedCount={selectedEmails.length}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};

export default EmailQueue;
