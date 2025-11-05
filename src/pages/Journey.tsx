import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Mail, Reply } from "lucide-react";

interface User {
  name: string;
  email: string;
  userId: string;
  sessions: number;
  heartScore: number;
  plan: string;
}

const Journey = () => {
  const [selectedUser, setSelectedUser] = useState<string>("sarah@startup.io");

  const users: User[] = [
    {
      name: "Sarah Johnson",
      email: "sarah@startup.io",
      userId: "user_456",
      sessions: 6,
      heartScore: 80,
      plan: "Free",
    },
    {
      name: "Liam Chen",
      email: "liam@sample.com",
      userId: "user_123",
      sessions: 3,
      heartScore: 65,
      plan: "Free",
    },
    {
      name: "Nora Khan",
      email: "nora@sample.com",
      userId: "user_789",
      sessions: 8,
      heartScore: 92,
      plan: "Pro Trial",
    },
  ];

  const conversations: Record<string, any> = {
    "sarah@startup.io": {
      email: "sarah@startup.io",
      userId: "user_456",
      timeline: [
        {
          id: 1,
          timestamp: "2024-01-15 09:00",
          type: "session",
          sessionId: "sess_abc001",
          duration: "3:45",
          score: 65,
          actions: ["Signed up", "Explored dashboard", "Viewed docs"],
        },
        {
          id: 2,
          timestamp: "2024-01-15 14:30",
          type: "email",
          direction: "sent",
          subject: "Welcome to Pascal!",
          content: "Welcome to Pascal Analytics...",
          opened: true,
          clicked: true,
        },
        {
          id: 3,
          timestamp: "2024-01-16 10:20",
          type: "session",
          sessionId: "sess_def456",
          duration: "8:21",
          score: 72,
          actions: ["Checked pricing", "Used ROI calculator", "Compared plans"],
        },
        {
          id: 4,
          timestamp: "2024-01-16 16:45",
          type: "email",
          direction: "reply",
          subject: "Re: Welcome",
          content: "Thanks! Quick question - how do I install the tracker on React?",
          intent: "question",
          sentiment: "positive",
        },
        {
          id: 5,
          timestamp: "2024-01-17 11:00",
          type: "email",
          direction: "sent",
          subject: "Re: Welcome",
          content: "Great question! Here's how to install Pascal tracker in React...",
        },
        {
          id: 6,
          timestamp: "2024-01-17 15:23",
          type: "session",
          sessionId: "sess_abc123",
          duration: "12:34",
          score: 85,
          actions: [
            "Explored API docs",
            "Tested authentication",
            "Got stuck on rate limits",
          ],
        },
        {
          id: 7,
          timestamp: "2024-01-18 09:15",
          type: "email",
          direction: "reply",
          subject: "Re: Welcome",
          content: "What about API rate limits?",
          intent: "question",
          topics: ["rate_limits", "api"],
          isNew: true,
        },
      ],
      heartAnalysis: {
        happiness: 75,
        engagement: 82,
        adoption: 68,
        retention: 90,
        taskSuccess: 85,
        overall: 80,
      },
      stage: "ongoing_dialogue",
      summary: "User actively engaged, asking technical questions.",
    },
    "liam@sample.com": {
      email: "liam@sample.com",
      userId: "user_123",
      timeline: [
        {
          id: 1,
          timestamp: "2024-01-15 09:00",
          type: "session",
          sessionId: "sess_liam001",
          duration: "5:12",
          score: 55,
          actions: ["Signed up", "Viewed homepage"],
        },
        {
          id: 2,
          timestamp: "2024-01-15 14:30",
          type: "email",
          direction: "sent",
          subject: "Welcome to Pascal!",
          content: "Welcome to Pascal Analytics...",
          opened: true,
          clicked: false,
        },
      ],
      heartAnalysis: {
        happiness: 60,
        engagement: 70,
        adoption: 55,
        retention: 75,
        taskSuccess: 65,
        overall: 65,
      },
      stage: "initial_contact",
      summary: "New user, initial onboarding.",
    },
    "nora@sample.com": {
      email: "nora@sample.com",
      userId: "user_789",
      timeline: [
        {
          id: 1,
          timestamp: "2024-01-10 09:00",
          type: "session",
          sessionId: "sess_nora001",
          duration: "15:30",
          score: 90,
          actions: ["Signed up", "Completed setup", "Integrated API"],
        },
        {
          id: 2,
          timestamp: "2024-01-10 12:30",
          type: "email",
          direction: "sent",
          subject: "Welcome to Pascal!",
          content: "Welcome to Pascal Analytics...",
          opened: true,
          clicked: true,
        },
        {
          id: 3,
          timestamp: "2024-01-11 08:15",
          type: "email",
          direction: "reply",
          subject: "Re: Welcome",
          content: "Love this product! Already seeing insights.",
          intent: "positive_feedback",
          sentiment: "positive",
        },
        {
          id: 4,
          timestamp: "2024-01-12 14:00",
          type: "session",
          sessionId: "sess_nora002",
          duration: "22:45",
          score: 95,
          actions: ["Explored advanced features", "Set up custom dashboards", "Invited team members"],
        },
      ],
      heartAnalysis: {
        happiness: 90,
        engagement: 95,
        adoption: 88,
        retention: 95,
        taskSuccess: 92,
        overall: 92,
      },
      stage: "adoption",
      summary: "Highly engaged power user.",
    },
  };

  const conversation = conversations[selectedUser];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Journey</h1>
        <p className="text-muted-foreground">
          View user journey timeline with session recordings and email interactions
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 relative">
        {/* Left Column - Users List */}
        <div className="col-span-12 lg:col-span-4 space-y-4 relative">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.email}
                  onClick={() => setSelectedUser(user.email)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all relative ${
                    selectedUser === user.email
                      ? "border-accent bg-accent/10 shadow-md ring-2 ring-accent/20"
                      : "border-border hover:border-accent/30 hover:bg-accent/5"
                  }`}
                >
                  {selectedUser === user.email && (
                    <>
                      <div className="absolute -right-[1.75rem] top-1/2 -translate-y-1/2 w-7 h-0.5 bg-gradient-to-r from-accent to-accent/50 z-10" />
                      <div className="absolute -right-[1.6rem] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50" />
                    </>
                  )}
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
                    {selectedUser === user.email && (
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span>{user.sessions} sessions</span>
                    <span>•</span>
                    <span>HEART: {user.heartScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Journey Timeline */}
        <div className="col-span-12 lg:col-span-8 space-y-4 relative">
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
                {conversation.timeline.map((event: any, idx: number) => (
                  <div key={event.id} className="relative pl-12 animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                    {/* Timeline Dot */}
                    <div 
                      className={`absolute left-[0.9rem] top-2 w-2.5 h-2.5 rounded-full ring-4 ring-background ${
                        event.type === "session" 
                          ? "bg-primary shadow-lg shadow-primary/50" 
                          : event.direction === "sent"
                          ? "bg-accent shadow-lg shadow-accent/50"
                          : "bg-success shadow-lg shadow-success/50"
                      }`}
                    />
                    
                    {/* Event Card */}
                    <Card 
                      className={`p-4 hover:shadow-md transition-all ${
                        event.isNew ? "border-primary bg-primary/5 ring-1 ring-primary/20" : ""
                      }`}
                    >
                      {event.type === "session" ? (
                        // Session Recording Event
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Play className="w-4 h-4 text-primary" />
                              <span className="font-semibold text-sm">Session Recording</span>
                              <Badge variant="outline" className="text-xs">
                                Score: {event.score}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(event.timestamp).toLocaleString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-xs text-muted-foreground mb-2">
                              {event.sessionId} · Duration: {event.duration}
                            </p>
                            <div className="space-y-1">
                              {event.actions.map((action: string, actionIdx: number) => (
                                <p key={actionIdx} className="text-xs text-muted-foreground">
                                  • {action}
                                </p>
                              ))}
                            </div>
                          </div>
                          
                          <Button size="sm" variant="outline" className="w-full">
                            <Play className="w-3 h-3 mr-2" />
                            Watch Recording
                          </Button>
                        </div>
                      ) : (
                        // Email Event
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {event.direction === "sent" ? (
                                <Mail className="w-4 h-4 text-accent" />
                              ) : (
                                <Reply className="w-4 h-4 text-success" />
                              )}
                              <span className="font-semibold text-sm">
                                {event.direction === "sent" 
                                  ? "Email Sent" 
                                  : `Reply from ${users.find((u) => u.email === selectedUser)?.name.split(" ")[0]}`
                                }
                              </span>
                              {event.isNew && (
                                <Badge className="bg-primary text-primary-foreground text-xs">
                                  NEW
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(event.timestamp).toLocaleString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          
                          <p className="font-medium text-sm mb-2">{event.subject}</p>
                          <p className="text-sm text-muted-foreground mb-3">
                            {event.content}
                          </p>
                          
                          {event.direction === "sent" && (
                            <div className="flex gap-3 text-xs text-muted-foreground">
                              {event.opened && <span className="flex items-center gap-1">✓ Opened</span>}
                              {event.clicked && <span className="flex items-center gap-1">✓ Clicked</span>}
                            </div>
                          )}
                          
                          {event.direction === "reply" && (
                            <div className="flex gap-2 text-xs flex-wrap">
                              {event.intent && (
                                <Badge variant="outline" className="text-xs">
                                  Intent: {event.intent}
                                </Badge>
                              )}
                              {event.sentiment && (
                                <Badge variant="outline" className="text-xs">
                                  😊 {event.sentiment}
                                </Badge>
                              )}
                              {event.topics && (
                                <Badge variant="outline" className="text-xs">
                                  Topics: {event.topics.join(", ")}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
              <p className="text-sm font-medium mb-1">Journey Summary</p>
              <p className="text-sm text-muted-foreground mb-2">
                {conversation.summary}
              </p>
              <p className="text-xs text-muted-foreground">
                Stage: {conversation.stage}
              </p>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            <Button className="bg-gradient-hero hover:opacity-90">
              Draft AI Response
            </Button>
          </div>

          {/* HEART Analysis */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">HEART Analysis</h3>
            <div className="space-y-3">
              {Object.entries(conversation.heartAnalysis)
                .filter(([key]) => key !== "overall")
                .map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="font-medium">{value as number}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
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
  );
};

export default Journey;
