import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useApiClient } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface EmailResponse {
  queue_id?: string;
  id?: string;
  email_id?: string;
  email?: string;
  to_email?: string;
  status?: string;
  subject?: string;
  body?: string;
  ai_reasoning?: string;
  reasoning?: string;
  confidence_score?: number;
  email_type?: string;
  created_at?: string;
  heart_score?: number;
  session_id?: string;
  conversation_stage?: string;
  sentiment?: string;
  intent?: string;
  rejection_reason?: string;
}

const EmailQueue = () => {
  const { projectId } = useOnboarding();
  const { userId } = useAuth();
  const api = useApiClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [showJourneyModal, setShowJourneyModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<QueuedEmail | null>(null);
  const [viewMode, setViewMode] = useState<"stack" | "list">("list");
  const [statusFilter, setStatusFilter] = useState<"queued" | "approved" | "rejected">("queued");
  const [typeFilter, setTypeFilter] = useState<"all" | "high" | "replies" | "first">("all");

  // Mark onboarding step 5 as complete when Email Queue is visited
  useEffect(() => {
    if (projectId) {
      localStorage.setItem(`pascal-email-queue-visited-${projectId}`, 'true');
    }
  }, [projectId]);

  // Reset statusFilter to "queued" when switching to stack view
  // Stack view is designed only for queued emails (swipe to approve/reject)
  useEffect(() => {
    if (viewMode === "stack" && statusFilter !== "queued") {
      setStatusFilter("queued");
    }
  }, [viewMode, statusFilter]);

  // Fetch emails from the approval queue based on selected status
  // Map frontend status to backend status: 'queued' -> 'pending'
  const backendStatus = statusFilter === 'queued' ? 'pending' : statusFilter;

  const { data: emailsResponse, isLoading } = useQuery({
    queryKey: ["approval-queue", projectId, statusFilter],  // Include statusFilter in key
    queryFn: () => api.get(`/api/projects/${projectId}/email-queue?status=${backendStatus}&limit=50`),
    enabled: !!projectId,
    refetchInterval: 10000, // Poll every 10 seconds for new emails
  });

  // Fetch stats for accurate tab counts
  const { data: statsData } = useQuery({
    queryKey: ["email-queue-stats", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/email-queue/stats?days=30`),
    enabled: !!projectId,
    refetchInterval: 10000, // Poll every 10 seconds
  });

  // Approve email mutation
  const approveMutation = useMutation({
    mutationFn: (emailId: string) =>
      api.post(`/api/email-queue/${emailId}/approve`, {
        reviewedBy: userId
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approval-queue", projectId] });
      queryClient.invalidateQueries({ queryKey: ["email-queue-stats", projectId] });
      toast({
        title: "Email Approved",
        description: "Email has been queued for sending.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error approving email",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  // Edit and approve email mutation
  const editMutation = useMutation({
    mutationFn: ({ emailId, subject, body }: { emailId: string; subject: string; body: string }) =>
      api.post(`/api/email-queue/${emailId}/approve`, {
        reviewedBy: userId,
        edits: { subject, body }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approval-queue", projectId] });
      queryClient.invalidateQueries({ queryKey: ["email-queue-stats", projectId] });
      toast({
        title: "Email Updated & Approved",
        description: "Your edited email has been queued for sending.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating email",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  // Reject email mutation
  const rejectMutation = useMutation({
    mutationFn: ({ emailId, feedback }: { emailId: string; feedback: string }) =>
      api.post(`/api/email-queue/${emailId}/reject`, {
        reviewedBy: userId,
        feedback
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approval-queue", projectId] });
      queryClient.invalidateQueries({ queryKey: ["email-queue-stats", projectId] });
      toast({
        title: "Email Rejected",
        description: "Feedback submitted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error rejecting email",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  // Transform API response to match QueuedEmail interface
  const queuedEmailsList: QueuedEmail[] = emailsResponse?.emails?.map((email: EmailResponse) => ({
    id: email.queue_id || email.id || email.email_id,
    email: email.email || email.to_email,
    status: email.status === "pending" ? "queued" : (email.status || "queued"),
    subject: email.subject,
    preview: email.body?.substring(0, 150) || "",
    aiReasoning: email.ai_reasoning || email.reasoning,
    confidence: email.confidence_score || 0,
    type: email.email_type || "first_touch",
    sessionTime: email.created_at ? new Date(email.created_at).toLocaleString() : "",
    heartScore: email.heart_score || 0,
    sessionId: email.session_id,
    conversationStage: email.conversation_stage || "Unknown",
    sentiment: email.sentiment || "neutral",
    intent: email.intent || "unknown",
    rejectionReason: email.rejection_reason,
  })) || [];

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

  // Show empty state only if NO emails exist across ALL statuses
  // Check total count from stats instead of current filtered list
  const totalEmailCount = (statsData?.stats?.pending_count || 0) +
                          (statsData?.stats?.approved_count || 0) +
                          (statsData?.stats?.rejected_count || 0);

  if (!isLoading && totalEmailCount === 0) {
    return <EmailQueueEmptyState />;
  }

  const toggleEmailSelection = (id: string) => {
    setSelectedEmails(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const handleApprove = (id: string) => {
    approveMutation.mutate(id);
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
    // Approve all selected emails sequentially
    selectedEmails.forEach(emailId => {
      approveMutation.mutate(emailId);
    });
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
    // Reject all selected emails with the same feedback
    selectedEmails.forEach(emailId => {
      rejectMutation.mutate({ emailId, feedback });
    });
    setShowFeedbackModal(false);
    setSelectedEmails([]);
  };

  const handleEditSave = (emailId: string, subject: string, body: string) => {
    editMutation.mutate({ emailId, subject, body });
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

          <Select
            value={typeFilter}
            onValueChange={value => setTypeFilter(value as "all" | "high" | "replies" | "first")}
          >
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
      <EmailQueueStats statsData={statsData} />

      {/* Instructions - Only show in stack view */}
      {viewMode === "stack" && (
        <div className="relative px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-gradient-to-r from-transparent via-primary/5 to-transparent py-3 animate-[slideLeftRight_3s_ease-in-out_infinite]">
              <div className="relative flex items-center justify-center gap-3 text-sm font-medium text-muted-foreground">
                <span className="text-destructive animate-pulse">←</span>
                <span>Swipe left or right to approve/reject</span>
                <span className="text-chart-1 animate-pulse">→</span>
              </div>
              <div className="relative text-center text-xs text-muted-foreground/60 mt-1">
                or scroll down to use the buttons for quick actions
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Filter Tabs (List View Only) */}
      {viewMode === "list" && (
        <Tabs
          value={statusFilter}
          onValueChange={value => setStatusFilter(value as "queued" | "approved" | "rejected")}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger
              value="queued"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Queued ({statsData?.stats?.pending_count || 0})
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="data-[state=active]:bg-success data-[state=active]:text-success-foreground"
            >
              Approved ({statsData?.stats?.approved_count || 0})
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
            >
              Rejected ({statsData?.stats?.rejected_count || 0})
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
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-muted-foreground">Loading emails...</p>
          </div>
        </div>
      ) : viewMode === "stack" ? (
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
            filteredEmails.map(email => (
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
