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
    "liam@sample.com": {
      email: "liam@sample.com",
      userId: "user_123",
      thread: [
        {
          day: 1,
          type: "sent",
          subject: "Welcome to Pascal!",
          content: "Welcome to Pascal Analytics...",
          opened: true,
          clicked: false,
        },
      ],
      sessions: [],
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
          content: "Love this product! Already seeing insights.",
          intent: "positive_feedback",
          sentiment: "positive",
        },
      ],
      sessions: [],
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
        <h1 className="text-3xl font-bold mb-2">Conversations</h1>
        <p className="text-muted-foreground">
          View email threads and session context for each user
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

        {/* Right Column - Email Thread */}
        <div className="col-span-12 lg:col-span-8 space-y-4 relative">
          {/* Connection indicator on the left edge */}
          <div className="hidden lg:block absolute -left-3 top-8 w-1 h-12 bg-gradient-to-b from-accent/50 to-transparent rounded-full" />
          
          <Card className="p-6 relative">
            {/* Connection dot */}
            <div className="hidden lg:block absolute -left-[1.15rem] top-8 w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50 animate-pulse" />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Email Thread</h2>
              <Badge variant="outline" className="text-xs">
                User ID: {conversation.userId}
              </Badge>
            </div>
            <div className="space-y-4">
              {conversation.thread.map((message: any, idx: number) => (
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
                        {message.type === "sent"
                          ? "Sent"
                          : `Reply from ${
                              users.find((u) => u.email === selectedUser)?.name.split(" ")[0]
                            }`}
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

          {/* Session Recordings & HEART */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Sessions</h3>
              <div className="space-y-4">
                {conversation.sessions.length > 0 ? (
                  conversation.sessions.map((session: any) => (
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
                        {session.actions.map((action: string, idx: number) => (
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
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No sessions yet</p>
                )}
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
                        <span className="capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span className="font-medium">{value as number}</span>
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
  );
};

export default Journey;
