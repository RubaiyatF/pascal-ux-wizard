import { useState } from "react";
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

const EmailQueue = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [showJourneyModal, setShowJourneyModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<QueuedEmail | null>(null);
  const [viewMode, setViewMode] = useState<"stack" | "list">("stack");
  const [statusFilter, setStatusFilter] = useState<"queued" | "approved" | "rejected">("queued");
  const [queuedEmailsList, setQueuedEmailsList] = useState<QueuedEmail[]>([]);
  const { toast } = useToast();

  // Filter emails based on status
  const filteredEmails = queuedEmailsList.filter(email => email.status === statusFilter);

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
