import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Mail, Reply, Clock, MousePointer, Eye, Sparkles, Search, Calendar } from "lucide-react";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { SessionRecordingModal } from "@/components/email-queue/SessionRecordingModal";
import { EmailDetailModal } from "@/components/journey/EmailDetailModal";
import { DraftAIResponseModal } from "@/components/journey/DraftAIResponseModal";
import { GenerateEmailModal } from "@/components/journey/GenerateEmailModal";
import { JourneyEmptyState } from "@/components/empty-states/JourneyEmptyState";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useApiClient } from "@/lib/api";

interface User {
  canonical_user_id: string;
  email: string;
  name?: string;
  session_count: number;
  last_seen: string;
  is_benchmark_user?: boolean;
}

interface Session {
  session_id: string;
  started_at: string;
  duration_minutes?: number;
  event_count?: number;
  overall_activation_score?: number;
  ai_summary?: string;
}

interface EmailEvent {
  id: string;
  type: string;
  timestamp: string;
  subject?: string;
  content?: string;
  direction?: string; // Add for compatibility with EmailDetail
}

const Journey = () => {
  const { projectId } = useOnboarding();
  const api = useApiClient();

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<EmailEvent | null>(null);
  const [draftModalOpen, setDraftModalOpen] = useState(false);
  const [generateEmailModalOpen, setGenerateEmailModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [currentPage, setCurrentPage] = useState(1);

  // Mark onboarding step 3 as complete when Journey is visited
  useEffect(() => {
    if (projectId) {
      localStorage.setItem(`pascal-journey-visited-${projectId}`, 'true');
    }
  }, [projectId]);

  // Fetch users (from identity_users table)
  const { data: usersResponse, isLoading: usersLoading } = useQuery({
    queryKey: ["users", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/users`),
    enabled: !!projectId,
  });

  // Filter out anonymous users client-side (safety check)
  const users: User[] = useMemo(() => {
    const allUsers = usersResponse?.users || [];
    return allUsers.filter(u =>
      u.email &&
      u.email.length > 0 &&
      !u.canonical_user_id.startsWith('anon_')
    );
  }, [usersResponse?.users]);

  // Set first user as selected on load
  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      setSelectedUser(users[0].canonical_user_id);
    }
  }, [users, selectedUser]);

  // Fetch selected user's sessions (skip for anonymous users)
  const { data: sessionsResponse } = useQuery({
    queryKey: ["user-sessions", selectedUser, projectId],
    queryFn: () => api.get(`/api/users/${selectedUser}/sessions?project_id=${projectId}`),
    enabled: !!selectedUser && !!projectId && !selectedUser.startsWith('anon_'),
  });

  // Fetch selected user's success journey (skip for anonymous users)
  const { data: successJourney } = useQuery({
    queryKey: ["success-journey", selectedUser, projectId],
    queryFn: () => api.get(`/api/users/${selectedUser}/success-journey?project_id=${projectId}`),
    enabled: !!selectedUser && !!projectId && !selectedUser.startsWith('anon_'),
  });

  // Filter users based on search query and date range
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === "" ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (dateFrom || dateTo) {
      const userDate = new Date(user.last_seen);
      const matchesDateFrom = !dateFrom || userDate >= dateFrom;
      const matchesDateTo = !dateTo || userDate <= dateTo;
      return matchesDateFrom && matchesDateTo;
    }

    return true;
  });

  // Pagination
  const USERS_PER_PAGE = 20;
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  // Show empty state if no users
  if (!usersLoading && users.length === 0) {
    return <JourneyEmptyState />;
  }

  const currentUser = users.find(u => u.canonical_user_id === selectedUser);
  const sessions = sessionsResponse?.sessions || [];

  const handleSessionClick = (session: Session) => {
    setSelectedSession(session);
    setSessionModalOpen(true);
  };

  const handleEmailClick = (event: EmailEvent) => {
    setSelectedEmail(event);
    setEmailModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Journey</h1>
          <p className="text-muted-foreground">
            View user journey timeline with session recordings and email interactions
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 relative items-start">
          {/* Left Column - Users List */}
          <div className="col-span-12 lg:col-span-4 relative">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Users</h2>

              {/* Search and Filter Controls */}
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by email or name..."
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      handleFilterChange();
                    }}
                    className="pl-9"
                  />
                </div>

                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 justify-start text-left font-normal">
                        <Calendar className="w-4 h-4 mr-2" />
                        {dateFrom && dateTo
                          ? `${format(dateFrom, "MMM d")} - ${format(dateTo, "MMM d")}`
                          : dateFrom
                          ? `From ${format(dateFrom, "MMM d")}`
                          : dateTo
                          ? `To ${format(dateTo, "MMM d")}`
                          : "Date Range"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-background" align="start">
                      <div className="p-4 space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">From</p>
                          <CalendarComponent
                            mode="single"
                            selected={dateFrom}
                            onSelect={date => {
                              setDateFrom(date);
                              handleFilterChange();
                            }}
                            className="pointer-events-auto"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">To</p>
                          <CalendarComponent
                            mode="single"
                            selected={dateTo}
                            onSelect={date => {
                              setDateTo(date);
                              handleFilterChange();
                            }}
                            className="pointer-events-auto"
                          />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  {(searchQuery || dateFrom || dateTo) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setDateFrom(undefined);
                        setDateTo(undefined);
                        handleFilterChange();
                      }}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {usersLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading users...</div>
                ) : paginatedUsers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No users found</div>
                ) : (
                  paginatedUsers.map(user => (
                    <div
                      key={user.canonical_user_id}
                      onClick={() => setSelectedUser(user.canonical_user_id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all relative ${
                        selectedUser === user.canonical_user_id
                          ? "border-success bg-white shadow-lg shadow-success/20 ring-2 ring-success/20"
                          : "border-border hover:border-accent/30 hover:bg-accent/5"
                      }`}
                    >
                      {selectedUser === user.canonical_user_id && (
                        <>
                          <div className="absolute -right-[1.75rem] top-1/2 -translate-y-1/2 w-7 h-0.5 bg-gradient-to-r from-accent to-accent/50 z-10" />
                          <div className="absolute -right-[1.6rem] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50" />
                        </>
                      )}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{user.name || user.email}</h3>
                            {user.is_benchmark_user && (
                              <Badge variant="outline" className="text-xs bg-success/10 border-success/30 text-success">
                                Benchmark
                              </Badge>
                            )}
                          </div>
                          {user.name && (
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          )}
                        </div>
                        {selectedUser === user.canonical_user_id && (
                          <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                        <span>{user.session_count} sessions</span>
                        <span>•</span>
                        <span>Last: {new Date(user.last_seen).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <span className="text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Journey Timeline */}
          <div className="col-span-12 lg:col-span-8 relative">
            {/* Connection indicator on the left edge */}
            <div className="hidden lg:block absolute -left-3 top-8 w-1 h-12 bg-gradient-to-b from-accent/50 to-transparent rounded-full" />

            {selectedUser && currentUser ? (
              <Card className="p-6 relative">
                {/* Connection dot */}
                <div className="hidden lg:block absolute -left-[1.15rem] top-8 w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50 animate-pulse" />

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Journey Timeline</h2>
                  <Badge variant="outline" className="text-xs">
                    User ID: {currentUser.canonical_user_id.substring(0, 12)}...
                  </Badge>
                </div>

                {/* Success Journey Summary */}
                {successJourney && (
                  <div className="mb-6 p-4 bg-white rounded-lg border border-border">
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 mt-0.5 shrink-0">
                        <AnimatedLogo />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold mb-1">Success Journey</p>
                        <p className="text-sm text-muted-foreground">
                          Current Stage: <span className="font-medium">{successJourney.currentStage}</span> •
                          {successJourney.journeyDays} days into product
                        </p>
                        {successJourney.nextSuggestedAction && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Next: {successJourney.nextSuggestedAction}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Vertical Timeline */}
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

                  {/* Timeline Events */}
                  <div className="space-y-6">
                    {sessions.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        No sessions found for this user
                      </div>
                    ) : (
                      sessions.map((session: Session, idx: number) => (
                        <div
                          key={session.session_id}
                          className="relative pl-12 animate-fade-in"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          {/* Timeline Dot */}
                          <div className="absolute left-[0.9rem] top-2 w-2.5 h-2.5 rounded-full ring-4 ring-background bg-primary shadow-lg shadow-primary/50" />

                          {/* Event Card - Session */}
                          <Card
                            className="p-4 hover:shadow-md transition-all cursor-pointer"
                            onClick={() => handleSessionClick(session)}
                          >
                            <div className="space-y-4">
                              {/* Header Row */}
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                  {/* Score Badge */}
                                  {session.overall_activation_score !== undefined && (
                                    <div
                                      className={`flex items-center justify-center w-16 h-16 rounded-xl bg-muted ${
                                        session.overall_activation_score >= 80
                                          ? "text-success"
                                          : session.overall_activation_score >= 60
                                          ? "text-info"
                                          : session.overall_activation_score >= 40
                                          ? "text-warning"
                                          : "text-destructive"
                                      }`}
                                    >
                                      <div className="text-center">
                                        <div className="text-2xl font-bold">
                                          {session.overall_activation_score}
                                        </div>
                                        <div className="text-[10px] uppercase tracking-wide opacity-70">
                                          Score
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Session Info */}
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <Play className="w-4 h-4 text-primary" />
                                      <span className="font-semibold text-sm">Session Recording</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2">
                                      {new Date(session.started_at).toLocaleString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit'
                                      })}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                      <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {session.duration_minutes ? `${session.duration_minutes.toFixed(1)} min` : 'N/A'}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <MousePointer className="w-3 h-3" />
                                        {session.event_count} events
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Action Button */}
                                <Button
                                  size="sm"
                                  className="bg-gradient-hero hover:opacity-90 transition-opacity shrink-0"
                                  onClick={e => {
                                    e.stopPropagation();
                                    handleSessionClick(session);
                                  }}
                                >
                                  <Play className="w-3 h-3 mr-2" />
                                  Watch
                                </Button>
                              </div>

                              {/* AI Summary if available */}
                              {session.ai_summary && (
                                <div className="bg-white rounded-lg p-3 border border-border">
                                  <div className="flex items-start gap-2">
                                    <div className="w-4 h-4 shrink-0 mt-0.5 rounded-full overflow-hidden">
                                      <AnimatedLogo />
                                    </div>
                                    <div>
                                      <p className="text-xs font-medium mb-1">AI Analysis</p>
                                      <p className="text-xs text-muted-foreground">
                                        {session.ai_summary}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </Card>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Generate with Pascal Button */}
                <div className="mt-6 flex justify-end">
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                    onClick={() => setGenerateEmailModalOpen(true)}
                  >
                    <div className="w-4 h-4 mr-2 rounded-full overflow-hidden">
                      <AnimatedLogo />
                    </div>
                    Generate Email to Send with Pascal
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">Select a user to view their journey</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <SessionRecordingModal
        isOpen={sessionModalOpen}
        sessionId={selectedSession?.session_id || null}
        email={currentUser?.email || null}
        onClose={() => {
          setSessionModalOpen(false);
          setSelectedSession(null);
        }}
      />

      <EmailDetailModal
        isOpen={emailModalOpen}
        email={selectedEmail ? {...selectedEmail, direction: selectedEmail.direction || "outbound"} as any : null}
        onClose={() => {
          setEmailModalOpen(false);
          setSelectedEmail(null);
        }}
      />

      <DraftAIResponseModal
        isOpen={draftModalOpen}
        conversation={null}
        onClose={() => setDraftModalOpen(false)}
      />

      <GenerateEmailModal
        isOpen={generateEmailModalOpen}
        conversation={null}
        onClose={() => setGenerateEmailModalOpen(false)}
      />
    </>
  );
};

export default Journey;
