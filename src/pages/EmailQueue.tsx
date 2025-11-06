import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Layers } from "lucide-react";
import { EmailQueueStats } from "@/components/email-queue/EmailQueueStats";
import { BulkActions } from "@/components/email-queue/BulkActions";
import { EmailCard, QueuedEmail } from "@/components/email-queue/EmailCard";
import { CardStackView } from "@/components/email-queue/CardStackView";
import { FeedbackModal } from "@/components/email-queue/FeedbackModal";
import { EditEmailModal } from "@/components/email-queue/EditEmailModal";
import { SessionRecordingModal } from "@/components/email-queue/SessionRecordingModal";
import { UserJourneyModal } from "@/components/home/UserJourneyModal";
import { EmailQueueEmptyState } from "@/components/empty-states/EmailQueueEmptyState";
import { useToast } from "@/hooks/use-toast";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { useProject } from "@/contexts/ProjectContext";

const EmailQueue = () => {
  const { currentProject } = useProject();
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [showJourneyModal, setShowJourneyModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<QueuedEmail | null>(null);
  const [viewMode, setViewMode] = useState<"stack" | "list">("list");
  const [statusFilter, setStatusFilter] = useState<"queued" | "approved" | "rejected">("queued");
  const [typeFilter, setTypeFilter] = useState<"all" | "high" | "replies" | "first">("all");
  // Demo data for Pascal Demo project
  const demoEmails: QueuedEmail[] = currentProject === "Pascal Demo" ? [
    {
      id: "1",
      email: "sarah@startup.io",
      status: "queued",
      subject: "Quick check-in on your API integration",
      preview: "Hi Sarah, I noticed you explored our API documentation extensively yesterday. How's the integration going?",
      aiReasoning: "User spent 12+ minutes on API docs and authentication pages, indicating active integration work. High engagement (85 HEART score) suggests they're invested but may need support.",
      confidence: 92,
      type: "reply",
      sessionTime: "2 hours ago",
      heartScore: 85,
      sessionId: "sess_abc123",
      conversationStage: "Technical Exploration",
      sentiment: "engaged",
      intent: "support_question",
    },
    {
      id: "2",
      email: "alex@corp.com",
      status: "queued",
      subject: "Welcome to Pascal Analytics!",
      preview: "Hi Alex, Welcome aboard! I see you just signed up. I'd love to help you get started with your first integration.",
      aiReasoning: "New user completed signup 5 hours ago. HEART score of 72 indicates good initial engagement. First touch email to establish contact.",
      confidence: 88,
      type: "first_touch",
      sessionTime: "5 hours ago",
      heartScore: 72,
      sessionId: "sess_def456",
      conversationStage: "Onboarding",
      sentiment: "curious",
      intent: "getting_started",
    },
    {
      id: "3",
      email: "emma@agency.co",
      status: "queued",
      subject: "Following up on pricing questions",
      preview: "Hi Emma, I saw you spent some time on our pricing page. Happy to walk you through which plan would work best for your team.",
      aiReasoning: "User viewed pricing page for extended period, comparing plans. HEART score of 78 shows interest but needs clarification.",
      confidence: 85,
      type: "first_touch",
      sessionTime: "1 day ago",
      heartScore: 78,
      sessionId: "sess_ghi789",
      conversationStage: "Evaluation",
      sentiment: "considering",
      intent: "pricing_question",
    },
    {
      id: "4",
      email: "michael@tech.com",
      status: "approved",
      subject: "Great to see you're back!",
      preview: "Hi Michael, noticed you logged in again today. Let me know if there's anything I can help with!",
      aiReasoning: "Return user after 2-week absence. High HEART score (88) suggests positive past experience. Good moment to re-engage.",
      confidence: 90,
      type: "first_touch",
      sessionTime: "3 hours ago",
      heartScore: 88,
      sessionId: "sess_jkl012",
      conversationStage: "Re-engagement",
      sentiment: "positive",
      intent: "re_engagement",
    },
    {
      id: "5",
      email: "lisa@company.io",
      status: "rejected",
      subject: "Checking in on your trial",
      preview: "Hi Lisa, just wanted to check in on how your trial is going so far.",
      aiReasoning: "Generic check-in message. Lower HEART score (65) suggests lower engagement. Email lacks specific behavioral context.",
      confidence: 75,
      type: "first_touch",
      sessionTime: "2 days ago",
      heartScore: 65,
      sessionId: "sess_mno345",
      conversationStage: "Trial",
      sentiment: "neutral",
      intent: "check_in",
      rejectionReason: "Too generic, doesn't reference specific user behavior",
    },
  ] : [];

  const [queuedEmailsList, setQueuedEmailsList] = useState<QueuedEmail[]>(demoEmails);
  const { toast } = useToast();

  // Reset email list when project changes
  useEffect(() => {
    setQueuedEmailsList(demoEmails);
  }, [currentProject]);

  // Filter emails based on status and type
  const filteredEmails = queuedEmailsList.filter(email => {
    // First filter by status
    if (email.status !== statusFilter) return false;
    
    // Then filter by type/confidence
    if (typeFilter === "all") return true;
    if (typeFilter === "high") return email.confidence >= 90;
    if (typeFilter === "replies") return email.type === "reply";
    if (typeFilter === "first") return email.type === "first_touch";
    
    return true;
  });

  // Show empty state if no queued emails
  if (queuedEmailsList.length === 0) {
    return <EmailQueueEmptyState />;
  }

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
    // Update status to approved
    setQueuedEmailsList(prev => prev.map(e => e.id === id ? { ...e, status: "approved" as const } : e));
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
      setShowJourneyModal(true);
    }
  };

  const handleBulkApprove = () => {
    toast({
      title: "Bulk Approval",
      description: `${selectedEmails.length} emails approved.`,
    });
    // Update status to approved for selected emails
    setQueuedEmailsList(prev => prev.map(e => selectedEmails.includes(e.id) ? { ...e, status: "approved" as const } : e));
    setSelectedEmails([]);
  };

  const handleBulkReject = () => {
    setShowFeedbackModal(true);
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredEmails.map(e => e.id));
    }
  };

  const handleFeedbackSubmit = (feedback: string) => {
    toast({
      title: "Feedback Submitted",
      description: `Rejected ${selectedEmails.length} emails with feedback.`,
    });
    // Update status to rejected for selected emails and store feedback
    setQueuedEmailsList(prev => prev.map(e => 
      selectedEmails.includes(e.id) 
        ? { ...e, status: "rejected" as const, rejectionReason: feedback } 
        : e
    ));
    setShowFeedbackModal(false);
    setSelectedEmails([]);
  };

  const handleEditSave = (emailId: string, subject: string, body: string) => {
    toast({
      title: "Email Updated & Approved",
      description: "Your edited email has been queued for sending.",
    });
    // Update status to approved after editing
    setQueuedEmailsList(prev => prev.map(e => e.id === emailId ? { ...e, status: "approved" as const } : e));
    setShowEditModal(false);
    setCurrentEmail(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            Mission Control
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <AnimatedLogo />
            </div>
          </h1>
          <p className="text-muted-foreground">
            Email Queue Dashboard · Human-in-the-Loop Command Center
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8"
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              List
            </Button>
            <Button
              variant={viewMode === "stack" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("stack")}
              className="h-8"
            >
              <Layers className="w-4 h-4 mr-2" />
              Stack
            </Button>
          </div>

          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as "all" | "high" | "replies" | "first")}>
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

      {/* Instructions - Only show in stack view */}
      {viewMode === "stack" && (
        <div className="relative py-4 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-gradient-to-r from-transparent via-primary/5 to-transparent py-3 animate-[slideLeftRight_3s_ease-in-out_infinite]">
              <div className="relative flex items-center justify-center gap-3 text-sm font-medium text-muted-foreground">
                <span className="text-destructive animate-pulse">←</span>
                <span>Swipe left or right to approve/reject</span>
                <span className="text-green-500 animate-pulse">→</span>
              </div>
              <div className="relative text-center text-xs text-muted-foreground/60 mt-1">
                or use the buttons below for quick actions
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Status Filter Tabs (List View Only) */}
      {viewMode === "list" && (
        <Tabs value={statusFilter} onValueChange={(value) => setStatusFilter(value as "queued" | "approved" | "rejected")} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="queued" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Queued ({queuedEmailsList.filter(e => e.status === "queued").length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="data-[state=active]:bg-success data-[state=active]:text-success-foreground">
              Approved ({queuedEmailsList.filter(e => e.status === "approved").length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
              Rejected ({queuedEmailsList.filter(e => e.status === "rejected").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      {/* Conditional Bulk Actions (List View Only) */}
      {viewMode === "list" && statusFilter === "queued" && (
        <BulkActions
          selectedCount={selectedEmails.length}
          totalCount={filteredEmails.length}
          allSelected={selectedEmails.length === filteredEmails.length && filteredEmails.length > 0}
          onApprove={handleBulkApprove}
          onReject={handleBulkReject}
          onSelectAll={handleSelectAll}
        />
      )}

      {/* Email Queue Views */}
      {viewMode === "stack" ? (
        <CardStackView
          emails={queuedEmailsList.filter(e => e.status === "queued")}
          onApprove={handleApprove}
          onEdit={handleEdit}
          onReject={handleReject}
          onViewRecording={handleViewRecording}
        />
      ) : (
        <div className="border rounded-lg overflow-hidden bg-card">
          {filteredEmails.length > 0 ? (
            filteredEmails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                isSelected={selectedEmails.includes(email.id)}
                onToggleSelect={toggleEmailSelection}
                onApprove={handleApprove}
                onEdit={handleEdit}
                onReject={handleReject}
                onViewRecording={handleViewRecording}
              />
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No {statusFilter} emails found
            </div>
          )}
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

      {/* User Journey Modal */}
      <UserJourneyModal
        open={showJourneyModal}
        onOpenChange={setShowJourneyModal}
        userEmail={currentEmail?.email || ""}
      />
    </div>
  );
};

export default EmailQueue;
