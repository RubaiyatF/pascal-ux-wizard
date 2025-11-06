import { useState, useEffect } from "react";
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
import { useProject } from "@/contexts/ProjectContext";

interface User {
  name: string;
  email: string;
  userId: string;
  sessions: number;
  heartScore: number;
  plan: string;
  lastActivity: string;
}

const Journey = () => {
  const { currentProject } = useProject();
  const [selectedUser, setSelectedUser] = useState<string>("sarah@startup.io");
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [draftModalOpen, setDraftModalOpen] = useState(false);
  const [generateEmailModalOpen, setGenerateEmailModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [currentPage, setCurrentPage] = useState(1);

  // Mark onboarding step 3 as complete when Journey is visited
  useEffect(() => {
    localStorage.setItem(`pascal-journey-visited-${currentProject}`, 'true');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount, not when currentProject changes

  const users: User[] = currentProject === "Pascal Demo" ? [{
    name: "Sarah Johnson",
    email: "sarah@startup.io",
    userId: "user_456",
    sessions: 12,
    heartScore: 80,
    plan: "Pro",
    lastActivity: "2024-01-18"
  }, {
    name: "Liam Chen",
    email: "liam@sample.com",
    userId: "user_123",
    sessions: 3,
    heartScore: 65,
    plan: "Free",
    lastActivity: "2024-01-15"
  }, {
    name: "Nora Williams",
    email: "nora@sample.com",
    userId: "user_789",
    sessions: 8,
    heartScore: 92,
    plan: "Enterprise",
    lastActivity: "2024-01-12"
  }] : [];

  // Reset selected user when project changes
  useEffect(() => {
    if (users.length > 0) {
      setSelectedUser(users[0].email);
    }
  }, [currentProject]);

  // Show empty state if no users
  if (users.length === 0) {
    return <JourneyEmptyState />;
  }

  // Filter users based on search query and date range
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === "" || user.email.toLowerCase().includes(searchQuery.toLowerCase()) || user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const userDate = new Date(user.lastActivity);
    const matchesDateFrom = !dateFrom || userDate >= dateFrom;
    const matchesDateTo = !dateTo || userDate <= dateTo;
    return matchesSearch && matchesDateFrom && matchesDateTo;
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
  const conversations: Record<string, any> = {
    "sarah@startup.io": {
      email: "sarah@startup.io",
      userId: "user_456",
      timeline: [{
        id: 1,
        timestamp: "2024-01-15 09:00",
        type: "session",
        sessionId: "sess_abc001",
        duration: "3:45",
        score: 65,
        pages: 5,
        events: 89,
        journeyStage: "Onboarding",
        visualDescription: "User navigated 4-step onboarding (Welcome → Connect → Create → See Data). Explored dashboard. Connected Stripe. Viewed first transaction within 10 min. Smooth navigation.",
        aiSummary: "STRONG ACTIVATION SESSION. User reached 'aha moment' quickly by seeing real transaction data. High task success rate with zero friction.",
        keyInsights: ["User reached 'aha moment' in first 10 minutes", "Completed onboarding with zero friction or errors", "Strong interest in integrations (power user indicator)"],
        activationSignals: ["Completed first core action (created project)", "Connected paid integration (Stripe)", "Viewed real data (not demo/sample)"],
        concerns: ["Hesitated on pricing page for 3 minutes", "Did not invite team members (solo user?)"],
        heartBreakdown: {
          happiness: 60,
          engagement: 65,
          adoption: 68,
          retention: 70,
          taskSuccess: 62
        },
        actions: ["Signed up", "Explored dashboard", "Viewed docs"]
      }, {
        id: 2,
        timestamp: "2024-01-15 14:30",
        type: "email",
        direction: "sent",
        subject: "Welcome to Pascal!",
        content: "Welcome to Pascal Analytics...",
        opened: true,
        clicked: true
      }, {
        id: 3,
        timestamp: "2024-01-16 10:20",
        type: "session",
        sessionId: "sess_def456",
        duration: "8:21",
        score: 72,
        pages: 7,
        events: 134,
        journeyStage: "Evaluation",
        visualDescription: "User spent significant time on pricing page and feature comparison. Explored advanced features and API documentation.",
        aiSummary: "Strong engagement with pricing and product comparison tools. User researching advanced capabilities.",
        keyInsights: ["Deep research behavior (8+ minutes on docs)", "Price conscious but interested in advanced features", "Comparing with competitors"],
        activationSignals: ["Explored advanced features (API docs)", "Long session duration (high engagement)", "Multiple pages viewed"],
        concerns: ["Price sensitivity evident", "Comparing with competitors"],
        heartBreakdown: {
          happiness: 70,
          engagement: 75,
          adoption: 72,
          retention: 68,
          taskSuccess: 75
        },
        actions: ["Checked pricing", "Used ROI calculator", "Compared plans"]
      }, {
        id: 4,
        timestamp: "2024-01-16 16:45",
        type: "email",
        direction: "reply",
        subject: "Re: Welcome",
        content: "Thanks! Quick question - how do I install the tracker on React?",
        intent: "question",
        sentiment: "positive"
      }, {
        id: 5,
        timestamp: "2024-01-17 11:00",
        type: "email",
        direction: "sent",
        subject: "Re: Welcome",
        content: "Great question! Here's how to install Pascal tracker in React..."
      }, {
        id: 6,
        timestamp: "2024-01-17 15:23",
        type: "session",
        sessionId: "sess_abc123",
        duration: "12:34",
        score: 85,
        pages: 12,
        events: 245,
        journeyStage: "Adoption",
        aiSummary: "Deep technical exploration with API documentation, encountered rate limit questions.",
        heartBreakdown: {
          happiness: 82,
          engagement: 90,
          adoption: 85,
          retention: 88,
          taskSuccess: 80
        },
        actions: ["Explored API docs", "Tested authentication", "Got stuck on rate limits"]
      }, {
        id: 7,
        timestamp: "2024-01-18 09:15",
        type: "email",
        direction: "reply",
        subject: "Re: Welcome",
        content: "What about API rate limits?",
        intent: "question",
        topics: ["rate_limits", "api"],
        isNew: true
      }],
      heartAnalysis: {
        happiness: 75,
        engagement: 82,
        adoption: 68,
        retention: 90,
        taskSuccess: 85,
        overall: 80
      },
      stage: "ongoing_dialogue",
      summary: "User actively engaged, asking technical questions."
    },
    "liam@sample.com": {
      email: "liam@sample.com",
      userId: "user_123",
      timeline: [{
        id: 1,
        timestamp: "2024-01-15 09:00",
        type: "session",
        sessionId: "sess_liam001",
        duration: "5:12",
        score: 55,
        pages: 3,
        events: 45,
        journeyStage: "Discovery",
        aiSummary: "Brief initial exploration, limited engagement.",
        heartBreakdown: {
          happiness: 55,
          engagement: 58,
          adoption: 50,
          retention: 60,
          taskSuccess: 52
        },
        actions: ["Signed up", "Viewed homepage"]
      }, {
        id: 2,
        timestamp: "2024-01-15 14:30",
        type: "email",
        direction: "sent",
        subject: "Welcome to Pascal!",
        content: "Welcome to Pascal Analytics...",
        opened: true,
        clicked: false
      }],
      heartAnalysis: {
        happiness: 60,
        engagement: 70,
        adoption: 55,
        retention: 75,
        taskSuccess: 65,
        overall: 65
      },
      stage: "initial_contact",
      summary: "New user, initial onboarding."
    },
    "nora@sample.com": {
      email: "nora@sample.com",
      userId: "user_789",
      timeline: [{
        id: 1,
        timestamp: "2024-01-10 09:00",
        type: "session",
        sessionId: "sess_nora001",
        duration: "15:30",
        score: 90,
        pages: 15,
        events: 312,
        journeyStage: "Power User",
        aiSummary: "Exceptional onboarding experience, completed full API integration independently.",
        heartBreakdown: {
          happiness: 92,
          engagement: 95,
          adoption: 90,
          retention: 90,
          taskSuccess: 93
        },
        actions: ["Signed up", "Completed setup", "Integrated API"]
      }, {
        id: 2,
        timestamp: "2024-01-10 12:30",
        type: "email",
        direction: "sent",
        subject: "Welcome to Pascal!",
        content: "Welcome to Pascal Analytics...",
        opened: true,
        clicked: true
      }, {
        id: 3,
        timestamp: "2024-01-11 08:15",
        type: "email",
        direction: "reply",
        subject: "Re: Welcome",
        content: "Love this product! Already seeing insights.",
        intent: "positive_feedback",
        sentiment: "positive"
      }, {
        id: 4,
        timestamp: "2024-01-12 14:00",
        type: "session",
        sessionId: "sess_nora002",
        duration: "22:45",
        score: 95,
        pages: 18,
        events: 387,
        journeyStage: "Champion",
        aiSummary: "Power user behavior: extensive feature exploration, team collaboration setup.",
        heartBreakdown: {
          happiness: 95,
          engagement: 98,
          adoption: 92,
          retention: 95,
          taskSuccess: 95
        },
        actions: ["Explored advanced features", "Set up custom dashboards", "Invited team members"]
      }],
      heartAnalysis: {
        happiness: 90,
        engagement: 95,
        adoption: 88,
        retention: 95,
        taskSuccess: 92,
        overall: 92
      },
      stage: "adoption",
      summary: "Highly engaged power user."
    }
  };
  const conversation = conversations[selectedUser];
  const handleSessionClick = (event: any) => {
    setSelectedSession(event);
    setSessionModalOpen(true);
  };
  const handleEmailClick = (event: any) => {
    setSelectedEmail(event);
    setEmailModalOpen(true);
  };
  const handleDraftResponse = () => {
    setDraftModalOpen(true);
  };
  return <>
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
                <Input placeholder="Search by email or name..." value={searchQuery} onChange={e => {
                  setSearchQuery(e.target.value);
                  handleFilterChange();
                }} className="pl-9" />
              </div>
              
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 justify-start text-left font-normal">
                      <Calendar className="w-4 h-4 mr-2" />
                      {dateFrom && dateTo ? `${format(dateFrom, "MMM d")} - ${format(dateTo, "MMM d")}` : dateFrom ? `From ${format(dateFrom, "MMM d")}` : dateTo ? `To ${format(dateTo, "MMM d")}` : "Date Range"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background" align="start">
                    <div className="p-4 space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">From</p>
                        <CalendarComponent mode="single" selected={dateFrom} onSelect={date => {
                          setDateFrom(date);
                          handleFilterChange();
                        }} className="pointer-events-auto" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">To</p>
                        <CalendarComponent mode="single" selected={dateTo} onSelect={date => {
                          setDateTo(date);
                          handleFilterChange();
                        }} className="pointer-events-auto" />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {(searchQuery || dateFrom || dateTo) && <Button variant="ghost" size="sm" onClick={() => {
                  setSearchQuery("");
                  setDateFrom(undefined);
                  setDateTo(undefined);
                  handleFilterChange();
                }}>
                    Clear
                  </Button>}
              </div>
            </div>
            
            <div className="space-y-2">
              {paginatedUsers.map(user => <div key={user.email} onClick={() => setSelectedUser(user.email)} className={`p-4 rounded-lg border cursor-pointer transition-all relative ${selectedUser === user.email ? "border-success bg-white shadow-lg shadow-success/20 ring-2 ring-success/20" : "border-border hover:border-accent/30 hover:bg-accent/5"}`}>
                  {selectedUser === user.email && <>
                      <div className="absolute -right-[1.75rem] top-1/2 -translate-y-1/2 w-7 h-0.5 bg-gradient-to-r from-accent to-accent/50 z-10" />
                      <div className="absolute -right-[1.6rem] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50" />
                    </>}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {user.plan}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    {selectedUser === user.email && <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span>{user.sessions} sessions</span>
                    <span>•</span>
                    <span>HEART: {user.heartScore}</span>
                  </div>
                </div>)}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                      Previous
                    </Button>
                    <span className="text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                      Next
                    </Button>
                  </div>
                </div>
              </div>}
          </Card>
        </div>

        {/* Right Column - Journey Timeline */}
        <div className="col-span-12 lg:col-span-8 relative">
          {/* Connection indicator on the left edge */}
          <div className="hidden lg:block absolute -left-3 top-8 w-1 h-12 bg-gradient-to-b from-accent/50 to-transparent rounded-full" />
          
          <Card className="p-6 relative">
            {/* Connection dot */}
            <div className="hidden lg:block absolute -left-[1.15rem] top-8 w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50 animate-pulse" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Journey Timeline</h2>
              <Badge variant="outline" className="text-xs">
                User ID: {conversation.userId}
              </Badge>
            </div>
            
            {/* Vertical Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />
              
              {/* Timeline Events */}
              <div className="space-y-6">
                {conversation.timeline.map((event: any, idx: number) => <div key={event.id} className="relative pl-12 animate-fade-in" style={{
                  animationDelay: `${idx * 50}ms`
                }}>
                    {/* Timeline Dot */}
                    <div className={`absolute left-[0.9rem] top-2 w-2.5 h-2.5 rounded-full ring-4 ring-background ${event.type === "session" ? "bg-primary shadow-lg shadow-primary/50" : event.direction === "sent" ? "bg-accent shadow-lg shadow-accent/50" : "bg-success shadow-lg shadow-success/50"}`} />
                    
                    {/* Event Card */}
                    <Card className={`p-4 hover:shadow-md transition-all cursor-pointer ${event.isNew ? "border-primary bg-primary/5 ring-1 ring-primary/20" : ""}`} onClick={() => event.type === "session" ? handleSessionClick(event) : handleEmailClick(event)}>
                      {event.type === "session" ?
                    // Session Recording Event
                    <div className="space-y-4">
                          {/* Header Row */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              {/* Score Badge */}
                              <div className={`flex items-center justify-center w-16 h-16 rounded-xl bg-muted ${event.score >= 80 ? "text-success" : event.score >= 60 ? "text-info" : event.score >= 40 ? "text-warning" : "text-destructive"}`}>
                                <div className="text-center">
                                  <div className="text-2xl font-bold">
                                    {event.score}
                                  </div>
                                  <div className="text-[10px] uppercase tracking-wide opacity-70">
                                    Score
                                  </div>
                                </div>
                              </div>

                              {/* Session Info */}
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Play className="w-4 h-4 text-primary" />
                                  <span className="font-semibold text-sm">Session Recording</span>
                                  <Badge variant="outline" className="text-xs">
                                    {event.journeyStage}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {new Date(event.timestamp).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {event.duration}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {event.pages} pages
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MousePointer className="w-3 h-3" />
                                    {event.events} events
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <Button size="sm" className="bg-gradient-hero hover:opacity-90 transition-opacity shrink-0" onClick={e => {
                          e.stopPropagation();
                          handleSessionClick(event);
                        }}>
                              <Play className="w-3 h-3 mr-2" />
                              Watch
                            </Button>
                          </div>

                          {/* AI Summary */}
                          <div className="bg-white rounded-lg p-3 border border-border">
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 shrink-0 mt-0.5 rounded-full overflow-hidden">
                                <AnimatedLogo />
                              </div>
                              <div>
                                <p className="text-xs font-medium mb-1">AI Analysis</p>
                                <p className="text-xs text-muted-foreground">
                                  {event.aiSummary}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* HEART Breakdown */}
                          <div className="grid grid-cols-5 gap-2 pt-3 border-t border-border">
                            {Object.entries(event.heartBreakdown).map(([key, value]) => <div key={key} className="text-center">
                                <div className="text-[10px] text-muted-foreground mb-1 capitalize">
                                  {key}
                                </div>
                                <div className="text-sm font-semibold">
                                  {value as number}
                                </div>
                              </div>)}
                          </div>
                        </div> :
                    // Email Event
                    <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {event.direction === "sent" ? <Mail className="w-4 h-4 text-accent" /> : <Reply className="w-4 h-4 text-success" />}
                              <span className="font-semibold text-sm">
                                {event.direction === "sent" ? "Email Sent" : `Reply from ${users.find(u => u.email === selectedUser)?.name.split(" ")[0]}`}
                              </span>
                              {event.isNew && <Badge className="bg-primary text-primary-foreground text-xs">
                                  NEW
                                </Badge>}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {new Date(event.timestamp).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2"
                                onClick={() => {
                                  setSelectedEmail(event);
                                  setEmailModalOpen(true);
                                }}
                              >
                                <Eye className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="font-medium text-sm mb-2">"{event.subject}"</p>
                          
                          {/* Email Content - Inbox Style */}
                          <div 
                            className="bg-background border border-border rounded-lg overflow-hidden mb-3 cursor-pointer hover:border-primary/50 transition-colors"
                            onClick={() => {
                              setSelectedEmail(event);
                              setEmailModalOpen(true);
                            }}
                          >
                            <div className="px-3 py-3 bg-white">
                              <div className="text-sm leading-relaxed text-foreground whitespace-pre-wrap line-clamp-3">
                                {event.content}
                              </div>
                            </div>
                          </div>
                          
                          {event.direction === "sent" && <div className="flex gap-3 text-xs text-muted-foreground">
                              {event.opened && <span className="flex items-center gap-1">✓ Opened</span>}
                              {event.clicked && <span className="flex items-center gap-1">✓ Clicked</span>}
                            </div>}
                          
                          {event.direction === "reply" && <div className="flex gap-2 text-xs flex-wrap">
                              {event.intent && <Badge variant="outline" className="text-xs">
                                  Intent: {event.intent}
                                </Badge>}
                              {event.sentiment && <Badge variant="outline" className="text-xs">
                                  😊 {event.sentiment}
                                </Badge>}
                              {event.topics && <Badge variant="outline" className="text-xs">
                                  Topics: {event.topics.join(", ")}
                                </Badge>}
                            </div>}
                        </div>}
                    </Card>
                  </div>)}
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-border">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 mt-0.5 shrink-0">
                  <AnimatedLogo />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1">Journey Summary</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {conversation.summary}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Stage: {conversation.stage}
                  </p>
                </div>
              </div>
            </div>

            {/* Generate with Pascal Button */}
            <div className="mt-4 flex justify-end">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md" onClick={() => setGenerateEmailModalOpen(true)}>
                <div className="w-4 h-4 mr-2 rounded-full overflow-hidden">
                  <AnimatedLogo />
                </div>
                Generate Email to Send with Pascal
              </Button>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            
          </div>

          {/* HEART Analysis */}
          <Card className="p-6 mt-6">
            <h3 className="font-semibold mb-4">HEART Analysis</h3>
            <div className="space-y-3">
              {Object.entries(conversation.heartAnalysis).filter(([key]) => key !== "overall").map(([key, value]) => <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="font-medium">{value as number}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-500" style={{
                    width: `${value}%`
                  }} />
                    </div>
                  </div>)}
              <div className="pt-2 border-t border-border">
                <div className="flex justify-between">
                  <span className="font-semibold">Overall Score</span>
                  <span className="font-semibold text-lg">
                    {conversation.heartAnalysis.overall}/100
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      </div>

      {/* Modals */}
      <SessionRecordingModal isOpen={sessionModalOpen} sessionId={selectedSession?.sessionId || null} email={selectedUser} onClose={() => {
      setSessionModalOpen(false);
      setSelectedSession(null);
    }} />

      <EmailDetailModal isOpen={emailModalOpen} email={selectedEmail} onClose={() => {
      setEmailModalOpen(false);
      setSelectedEmail(null);
    }} />

      <DraftAIResponseModal isOpen={draftModalOpen} conversation={conversation} onClose={() => setDraftModalOpen(false)} />

      <GenerateEmailModal isOpen={generateEmailModalOpen} conversation={conversation} onClose={() => setGenerateEmailModalOpen(false)} />
    </>;
};
export default Journey;