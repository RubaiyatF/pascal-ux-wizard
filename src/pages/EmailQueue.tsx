import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Layers, Mail, XCircle, Inbox, Pencil } from "lucide-react";
import { EmailQueueStats } from "@/components/email-queue/EmailQueueStats";
import { BulkActions } from "@/components/email-queue/BulkActions";
import { EmailCard, QueuedEmail } from "@/components/email-queue/EmailCard";
import { CardStackView } from "@/components/email-queue/CardStackView";
import { FeedbackModal } from "@/components/email-queue/FeedbackModal";
import { EditEmailModal } from "@/components/email-queue/EditEmailModal";
import { SessionRecordingModal } from "@/components/email-queue/SessionRecordingModal";
import { ConversationThreadModal } from "@/components/email-queue/ConversationThreadModal";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const EmailQueue = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<QueuedEmail | null>(null);
  const [viewMode, setViewMode] = useState<"stack" | "list">("list");
  const [filterTab, setFilterTab] = useState<"pending" | "approved" | "rejected" | "needs-feedback">("pending");
  const [emailFeedback, setEmailFeedback] = useState<Record<string, string>>({});
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
      status: "pending" as const,
    },
    {
      id: "email_4",
      email: "lisa@company.com",
      confidence: 69,
      heartScore: 65,
      subject: "Speed up component variants in Figma",
      preview: "Hi Lisa, noticed you're working on design systems...",
      aiReasoning: "User in design workflow phase.",
      sessionId: "sess_ghi789",
      sessionTime: "4d ago",
      type: "first_touch",
      status: "pending" as const,
    },
    {
      id: "email_5",
      email: "james@startup.io",
      confidence: 85,
      heartScore: 82,
      subject: "Level up your Figma prototyping",
      preview: "Hey James, saw your recent prototyping work...",
      aiReasoning: "Strong engagement signals detected.",
      sessionId: "sess_jkl456",
      sessionTime: "6d ago",
      type: "first_touch",
      status: "draft" as const,
    },
    {
      id: "email_6",
      email: "emma@tech.com",
      confidence: 87,
      heartScore: 79,
      subject: "Quick fix for CMS binding + 5-min walkthrough",
      preview: "Hi Emma, I can help you resolve that CMS issue...",
      aiReasoning: "User experiencing technical issues. High conversion opportunity.",
      sessionId: "sess_mno123",
      sessionTime: "3d ago",
      type: "first_touch",
      status: "ready" as const,
    },
    {
      id: "email_7",
      email: "alex@agency.com",
      confidence: 0,
      heartScore: 45,
      subject: "Unlock advanced animations in Framer",
      preview: "Hey Alex, noticed you're exploring animation features...",
      aiReasoning: "Too generic approach.",
      sessionId: "sess_pqr789",
      sessionTime: "3d ago",
      type: "first_touch",
      status: "rejected" as const,
      rejectionReason: "Too generic, doesn't address the specific database issues the user was facing. Need to be more personalized based on their actual struggles with relations and rollups.",
    },
    {
      id: "email_8",
      email: "olivia@startup.io",
      confidence: 0,
      heartScore: 52,
      subject: "Your Notion workspace setup guide",
      preview: "Hi Olivia, let me help you set up your workspace...",
      aiReasoning: "Generic onboarding message.",
      sessionId: "sess_stu456",
      sessionTime: "3d ago",
      type: "first_touch",
      status: "rejected" as const,
    },
    {
      id: "email_9",
      email: "noah@company.com",
      confidence: 0,
      heartScore: 58,
      subject: "Streamline your Airtable automations",
      preview: "Hey Noah, I can show you some automation tips...",
      aiReasoning: "Low engagement score.",
      sessionId: "sess_vwx123",
      sessionTime: "4d ago",
      type: "first_touch",
      status: "rejected" as const,
    },
    {
      id: "email_10",
      email: "sophia@tech.com",
      confidence: 0,
      heartScore: 48,
      subject: "Optimize your Webflow site performance",
      preview: "Hi Sophia, let's improve your site speed...",
      aiReasoning: "Premature outreach.",
      sessionId: "sess_yz789",
      sessionTime: "5d ago",
      type: "first_touch",
      status: "rejected" as const,
    },
    {
      id: "email_11",
      email: "kate@agency.com",
      confidence: 0,
      heartScore: 42,
      subject: "Master advanced CSS techniques",
      preview: "Hey Kate, want to level up your CSS skills?...",
      aiReasoning: "Not aligned with user interests.",
      sessionId: "sess_abc321",
      sessionTime: "3d ago",
      type: "first_touch",
      status: "needs-feedback" as const,
    },
    {
      id: "email_12",
      email: "tom@startup.io",
      confidence: 0,
      heartScore: 55,
      subject: "Improve your design workflow",
      preview: "Hi Tom, I have some workflow tips for you...",
      aiReasoning: "Generic content.",
      sessionId: "sess_def654",
      sessionTime: "4d ago",
      type: "first_touch",
      status: "needs-feedback" as const,
    },
    {
      id: "email_13",
      email: "grace@company.com",
      confidence: 0,
      heartScore: 49,
      subject: "Boost your productivity with shortcuts",
      preview: "Hey Grace, let me show you some time-saving shortcuts...",
      aiReasoning: "Low relevance.",
      sessionId: "sess_ghi987",
      sessionTime: "3d ago",
      type: "first_touch",
      status: "needs-feedback" as const,
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

  const filteredEmails = queuedEmailsList.filter((email) => {
    if (filterTab === "pending") return email.status === "pending";
    if (filterTab === "approved") return email.status === "ready";
    if (filterTab === "rejected") return email.status === "rejected";
    if (filterTab === "needs-feedback") return email.status === "needs-feedback";
    return true;
  });

  const statusCounts = {
    pending: queuedEmailsList.filter((e) => e.status === "pending").length,
    approved: queuedEmailsList.filter((e) => e.status === "ready").length,
    rejected: queuedEmailsList.filter((e) => e.status === "rejected").length,
    needsFeedback: queuedEmailsList.filter((e) => e.status === "needs-feedback").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Email Drafts</h1>
          <p className="text-muted-foreground">
            AI-generated personalized emails based on user behavior
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Pencil className="w-4 h-4 mr-2" />
          New Draft
        </Button>
      </div>

      {/* Stats Cards */}
      <EmailQueueStats />

      {/* All Drafts Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">All Drafts</h2>
          <p className="text-sm text-muted-foreground">Filter by status and review emails</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={filterTab === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterTab("pending")}
            className="h-9"
          >
            Pending
            <Badge variant="secondary" className="ml-2 px-1.5 py-0 text-xs">
              {statusCounts.pending}
            </Badge>
          </Button>
          <Button
            variant={filterTab === "approved" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterTab("approved")}
            className="h-9"
          >
            Approved
            <Badge variant="secondary" className="ml-2 px-1.5 py-0 text-xs">
              {statusCounts.approved}
            </Badge>
          </Button>
          <Button
            variant={filterTab === "rejected" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterTab("rejected")}
            className="h-9"
          >
            Rejected
            <Badge variant="secondary" className="ml-2 px-1.5 py-0 text-xs">
              {statusCounts.rejected}
            </Badge>
          </Button>
          <Button
            variant={filterTab === "needs-feedback" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterTab("needs-feedback")}
            className="h-9"
          >
            Needs Feedback
            <Badge variant="destructive" className="ml-2 px-1.5 py-0 text-xs">
              {statusCounts.needsFeedback}
            </Badge>
          </Button>
        </div>

        {/* Select all checkbox (for needs-feedback tab) */}
        {filterTab === "needs-feedback" && filteredEmails.length > 0 && (
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              id="select-all"
              checked={selectedEmails.length === filteredEmails.length}
              onCheckedChange={() => handleSelectAll()}
            />
            <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
              Select all emails
            </label>
          </div>
        )}

        {/* Email List */}
        <div className="space-y-3">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              className={`border rounded-lg p-4 ${
                email.status === "rejected" || email.status === "needs-feedback"
                  ? "border-destructive/50 bg-destructive/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                {filterTab === "needs-feedback" ? (
                  <Checkbox
                    checked={selectedEmails.includes(email.id)}
                    onCheckedChange={() => toggleEmailSelection(email.id)}
                    className="mt-1"
                  />
                ) : null}
                <div className="shrink-0 mt-1">
                  {email.status === "rejected" || email.status === "needs-feedback" ? (
                    <div className="w-10 h-10 rounded-md bg-destructive/10 flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-destructive" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-base">{email.subject}</h3>
                      {email.status === "rejected" && (
                        <Badge variant="destructive" className="text-xs">
                          Rejected
                        </Badge>
                      )}
                      {email.status === "needs-feedback" && (
                        <Badge variant="destructive" className="text-xs">
                          Needs Feedback
                        </Badge>
                      )}
                      {email.status === "pending" && (
                        <Badge variant="secondary" className="text-xs">
                          Ready
                        </Badge>
                      )}
                      {email.status === "draft" && (
                        <Badge variant="outline" className="text-xs">
                          Draft
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewRecording(email.id)}
                    >
                      View
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    {email.confidence > 0 && <span>Score: {email.confidence}%</span>}
                    <span>{email.sessionTime}</span>
                  </div>

                  {/* Rejection Feedback Section */}
                  {(email.status === "rejected" || email.status === "needs-feedback") && (
                    <div className="mt-3 space-y-2">
                      {email.rejectionReason && (
                        <div className="flex items-start gap-2 text-sm">
                          <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-destructive">Rejection Feedback:</p>
                            <p className="text-muted-foreground mt-1">{email.rejectionReason}</p>
                          </div>
                        </div>
                      )}
                      {email.status === "needs-feedback" && !email.rejectionReason && (
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm">
                            <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                            <p className="font-medium text-destructive">
                              Feedback required to help AI improve
                            </p>
                          </div>
                          <Textarea
                            placeholder="Why was this email rejected?"
                            value={emailFeedback[email.id] || ""}
                            onChange={(e) =>
                              setEmailFeedback((prev) => ({
                                ...prev,
                                [email.id]: e.target.value,
                              }))
                            }
                            className="min-h-[80px] bg-background"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
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
