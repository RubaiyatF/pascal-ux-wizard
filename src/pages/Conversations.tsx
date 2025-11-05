import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Mail, Reply } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  heartScore: number;
  sessions: number;
  threadCount: number;
  lastActivity: string;
}

const Conversations = () => {
  const [selectedUser, setSelectedUser] = useState<string>("sarah@startup.io");

  const users: User[] = [
    {
      id: "user_456",
      email: "sarah@startup.io",
      name: "Sarah Johnson",
      heartScore: 80,
      sessions: 12,
      threadCount: 4,
      lastActivity: "Today 10:23am",
    },
    {
      id: "user_123",
      email: "john@company.com",
      name: "John Smith",
      heartScore: 85,
      sessions: 24,
      threadCount: 2,
      lastActivity: "12 min ago",
    },
    {
      id: "user_789",
      email: "mike@tech.com",
      name: "Mike Davis",
      heartScore: 78,
      sessions: 8,
      threadCount: 1,
      lastActivity: "1 hour ago",
    },
  ];

  const conversations = {
    "sarah@startup.io": {
    email: "sarah@startup.io",
    userId: "user_456",
    thread: [
      {
        day: 1,
        type: "sent",
        subject: "Welcome to Pascal!",
        content: "Welcome to Pascal Analytics...",
        opened: true,
        clicked: true,
      },
      {
        day: 2,
        type: "reply",
        subject: "Re: Welcome",
        content: "Thanks! Quick question - how do I install the tracker on React?",
        intent: "question",
        sentiment: "positive",
      },
      {
        day: 3,
        type: "sent",
        subject: "Re: Welcome",
        content: "Great question! Here's how to install Pascal tracker in React...",
      },
      {
        day: 4,
        type: "reply",
        subject: "Re: Welcome",
        content: "What about API rate limits?",
        intent: "question",
        topics: ["rate_limits", "api"],
        isNew: true,
      },
    ],
    sessions: [
      {
        id: "sess_abc123",
        time: "Today 10:23am",
        duration: "12:34",
        score: 85,
        actions: [
          "Explored API docs",
          "Tested authentication",
          "Got stuck on rate limits",
        ],
      },
      {
        id: "sess_def456",
        time: "Yesterday",
        duration: "8:21",
        score: 72,
        actions: ["Checked pricing", "Used ROI calculator", "Compared plans"],
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
    "john@company.com": {
      email: "john@company.com",
      userId: "user_123",
      thread: [
        {
          day: 1,
          type: "sent",
          subject: "You're making great progress!",
          content: "Hi John, noticed you completed 3 workflows today...",
          opened: true,
        },
      ],
      sessions: [
        {
          id: "sess_xyz789",
          time: "12 min ago",
          duration: "15:42",
          score: 85,
          actions: ["Completed workflows", "Explored features"],
        },
      ],
      heartAnalysis: {
        happiness: 80,
        engagement: 90,
        adoption: 75,
        retention: 85,
        taskSuccess: 88,
        overall: 85,
      },
      stage: "adoption",
      summary: "Power user, high engagement.",
    },
    "mike@tech.com": {
      email: "mike@tech.com",
      userId: "user_789",
      thread: [
        {
          day: 1,
          type: "sent",
          subject: "Great session today",
          content: "Hi Mike, saw you explored advanced features...",
          opened: true,
        },
      ],
      sessions: [
        {
          id: "sess_def123",
          time: "1 hour ago",
          duration: "10:15",
          score: 78,
          actions: ["Explored premium features"],
        },
      ],
      heartAnalysis: {
        happiness: 70,
        engagement: 85,
        adoption: 72,
        retention: 80,
        taskSuccess: 75,
        overall: 78,
      },
      stage: "exploration",
      summary: "Exploring premium features.",
    },
  };

  const conversation = conversations[selectedUser as keyof typeof conversations];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Conversations</h1>
        <p className="text-muted-foreground">
          View user conversations with full thread and session context
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Users */}
        <div className="col-span-4">
          <div className="border rounded-lg overflow-hidden bg-card sticky top-6">
            <div className="p-4 border-b bg-muted/50">
              <h2 className="font-semibold">Users</h2>
              <p className="text-sm text-muted-foreground">Select to view conversation</p>
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
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <span>{user.sessions} sessions</span>
                    <span>·</span>
                    <span>{user.threadCount} {user.threadCount === 1 ? 'thread' : 'threads'}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user.lastActivity}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Conversation Thread */}
        <div className="col-span-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Email Thread */}
            <div className="lg:col-span-2 space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Email Thread</h2>
            <div className="space-y-4">
              {conversation.thread.map((message, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border ${
                    message.isNew
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {message.type === "sent" ? (
                        <Mail className="w-4 h-4 text-primary" />
                      ) : (
                        <Reply className="w-4 h-4 text-success" />
                      )}
                      <span className="font-medium">
                        {message.type === "sent" ? "Sent" : "Reply from Sarah"}
                      </span>
                      {message.isNew && (
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          NEW
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Day {message.day}
                    </span>
                  </div>

                  <p className="font-medium text-sm mb-2">{message.subject}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {message.content}
                  </p>

                  {message.type === "sent" && (
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      {message.opened && <span>✓ Opened</span>}
                      {message.clicked && <span>✓ Clicked</span>}
                    </div>
                  )}

                  {message.type === "reply" && (
                    <div className="flex gap-2 text-xs mt-2">
                      {message.intent && (
                        <Badge variant="outline" className="text-xs">
                          Intent: {message.intent}
                        </Badge>
                      )}
                      {message.sentiment && (
                        <Badge variant="outline" className="text-xs">
                          😊 {message.sentiment}
                        </Badge>
                      )}
                      {message.topics && (
                        <Badge variant="outline" className="text-xs">
                          Topics: {message.topics.join(", ")}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
              <p className="text-sm font-medium mb-1">Summary</p>
              <p className="text-sm text-muted-foreground mb-2">
                {conversation.summary}
              </p>
              <p className="text-xs text-muted-foreground">
                Stage: {conversation.stage}
              </p>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="bg-gradient-hero hover:opacity-90">
              Draft AI Response
            </Button>
            <Button variant="outline">Assign to Human</Button>
            <Button variant="outline">Mark Thread Resolved</Button>
          </div>
        </div>

        {/* Session Recordings & HEART */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Recent Sessions</h3>
            <div className="space-y-4">
              {conversation.sessions.map((session) => (
                <div
                  key={session.id}
                  className="p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{session.id}</span>
                    <Badge variant="outline">{session.score}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {session.time} · {session.duration}
                  </p>
                  <div className="space-y-1 mb-3">
                    {session.actions.map((action, idx) => (
                      <p key={idx} className="text-xs text-muted-foreground">
                        • {action}
                      </p>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    <Play className="w-3 h-3 mr-2" />
                    Watch Recording
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">HEART Analysis</h3>
            <div className="space-y-3">
              {Object.entries(conversation.heartAnalysis)
                .filter(([key]) => key !== "overall")
                .map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
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
      </div>
    </div>
  );
};

export default Conversations;
