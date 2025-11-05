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

interface User {
  id: string;
  email: string;
  name: string;
  heartScore: number;
  sessions: number;
  archetype: string;
  emailCount: number;
}

const EmailQueue = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>("john@company.com");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<QueuedEmail | null>(null);
  const [viewMode, setViewMode] = useState<"stack" | "list">("list");
  
  const users: User[] = [
    {
      id: "1",
      email: "john@company.com",
      name: "John Smith",
      heartScore: 85,
      sessions: 24,
      archetype: "Fast Mover",
      emailCount: 1,
    },
    {
      id: "2",
      email: "sarah@startup.io",
      name: "Sarah Johnson",
      heartScore: 72,
      sessions: 12,
      archetype: "On Track",
      emailCount: 1,
    },
    {
      id: "3",
      email: "mike@tech.com",
      name: "Mike Davis",
      heartScore: 78,
      sessions: 8,
      archetype: "Fast Mover",
      emailCount: 1,
    },
  ];

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

  // Filter emails for selected user
  const filteredEmails = selectedUser
    ? queuedEmailsList.filter((email) => email.email === selectedUser)
    : [];


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

  const handleSelectAll = () => {
    if (selectedEmails.length === queuedEmailsList.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(queuedEmailsList.map(e => e.id));
    }
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
          <h1 className="text-3xl font-bold mb-2">Email Queue</h1>
          <p className="text-muted-foreground">
            AI-generated emails ready for review
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <EmailQueueStats />

      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Users */}
        <div className="col-span-4">
          <div className="border rounded-lg overflow-hidden bg-card sticky top-6">
            <div className="p-4 border-b bg-muted/50">
              <h2 className="font-semibold">Users</h2>
              <p className="text-sm text-muted-foreground">Select to view emails</p>
            </div>
            <div className="divide-y">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user.email)}
                  className={`w-full p-4 text-left transition-all hover:bg-accent/50 relative ${
                    selectedUser === user.email
                      ? "bg-primary/5 border-l-4 border-primary"
                      : ""
                  }`}
                >
                  {/* Connection Line Indicator */}
                  {selectedUser === user.email && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-primary" />
                  )}
                  
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{user.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                    </div>
                    <div className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0">
                      <span className="text-xs font-semibold text-primary">{user.heartScore}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{user.sessions} sessions</span>
                    <span>·</span>
                    <span className="px-2 py-0.5 rounded-full bg-success/10 text-success">
                      {user.emailCount} {user.emailCount === 1 ? 'email' : 'emails'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Email Threads */}
        <div className="col-span-8">
          <div className="border rounded-lg overflow-hidden bg-card">
            <div className="p-4 border-b bg-muted/50">
              <h2 className="font-semibold">
                {selectedUser ? `Emails for ${users.find(u => u.email === selectedUser)?.name}` : 'Select a user'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredEmails.length} {filteredEmails.length === 1 ? 'email' : 'emails'} ready for review
              </p>
            </div>
            
            {selectedUser ? (
              filteredEmails.length > 0 ? (
                <div>
                  {filteredEmails.map((email) => (
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
              ) : (
                <div className="p-12 text-center text-muted-foreground">
                  No emails for this user
                </div>
              )
            ) : (
              <div className="p-12 text-center text-muted-foreground">
                Select a user to view their email threads
              </div>
            )}
          </div>
        </div>
      </div>

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
