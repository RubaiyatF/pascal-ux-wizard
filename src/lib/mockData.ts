// Mock data for demo purposes

export const mockProjects = [
  {
    id: "demo-project-1",
    name: "Pascal Demo",
    website: "https://demo.pascal.cx",
    apiKey: "demo_api_key_12345",
  },
];

export const mockEvents = [
  { id: "1", timestamp: new Date(Date.now() - 1000 * 60 * 5), type: "page_view", user: "user@example.com" },
  { id: "2", timestamp: new Date(Date.now() - 1000 * 60 * 15), type: "click", user: "user2@example.com" },
  { id: "3", timestamp: new Date(Date.now() - 1000 * 60 * 30), type: "signup", user: "user3@example.com" },
];

export const mockBenchmarks = [
  {
    userId: "user1",
    email: "power.user@example.com",
    status: "Fast Mover",
    avgSessionTime: 420,
    metrics: { sessionCount: 50, conversionRate: 85 },
    trends: [
      { date: "2024-01-01", value: 120 },
      { date: "2024-01-08", value: 145 },
    ],
  },
  {
    userId: "user2",
    email: "good.user@example.com",
    status: "On Track",
    avgSessionTime: 280,
    metrics: { sessionCount: 30, conversionRate: 72 },
    trends: [
      { date: "2024-01-01", value: 80 },
      { date: "2024-01-08", value: 95 },
    ],
  },
];

export const mockUsers = [
  {
    userId: "user1",
    email: "john.doe@example.com",
    name: "John Doe",
    archetype: "Fast Mover",
    stage: "Adoption",
    journeyDays: 25,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30),
    currentStage: "Adoption",
    nextSuggestedAction: "Upgrade to premium",
    metrics: {
      sessionCount: 45,
      avgSessionDuration: 320,
      featuresUsed: 12,
      actionsCompleted: 89,
    },
  },
  {
    userId: "user2",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    archetype: "On Track",
    stage: "Onboarding",
    journeyDays: 8,
    lastSeen: new Date(Date.now() - 1000 * 60 * 120),
    currentStage: "Onboarding",
    nextSuggestedAction: "Complete profile setup",
    metrics: {
      sessionCount: 15,
      avgSessionDuration: 180,
      featuresUsed: 6,
      actionsCompleted: 23,
    },
  },
  {
    userId: "user3",
    email: "bob.wilson@example.com",
    name: "Bob Wilson",
    archetype: "At Risk",
    stage: "Discovery",
    journeyDays: 45,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 48),
    currentStage: "Discovery",
    nextSuggestedAction: "Re-engagement campaign",
    metrics: {
      sessionCount: 8,
      avgSessionDuration: 90,
      featuresUsed: 3,
      actionsCompleted: 12,
    },
  },
];

export const mockEmails = [
  {
    id: "email1",
    userId: "user3",
    userName: "Bob Wilson",
    userEmail: "bob.wilson@example.com",
    subject: "We noticed you haven't completed your profile",
    body: "Hi Bob,\n\nWe noticed you started setting up your account but haven't completed your profile yet...",
    status: "pending",
    archetype: "At Risk",
    stage: "Discovery",
    reason: "User hasn't logged in for 48 hours after initial signup",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "email2",
    userId: "user2",
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    subject: "Unlock advanced features to boost your productivity",
    body: "Hi Jane,\n\nGreat progress! You're using the core features well. Ready to explore advanced capabilities?",
    status: "pending",
    archetype: "On Track",
    stage: "Onboarding",
    reason: "User is progressing well and ready for feature expansion",
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
  },
];

export const mockAnalytics = {
  metrics: {
    totalUsers: 1247,
    activeUsers: 892,
    conversionRate: 34.2,
    avgLifetimeValue: 2450,
  },
  trends: [
    { date: "2024-01-01", users: 120, conversions: 38, revenue: 4500 },
    { date: "2024-01-08", users: 145, conversions: 45, revenue: 5200 },
    { date: "2024-01-15", users: 168, conversions: 52, revenue: 6100 },
    { date: "2024-01-22", users: 182, conversions: 59, revenue: 6800 },
    { date: "2024-01-29", users: 201, conversions: 68, revenue: 7500 },
  ],
  interventions: {
    total: 342,
    successful: 156,
    pending: 45,
  },
  outcomes: {
    increased_engagement: 67,
    prevented_churn: 34,
    feature_adoption: 55,
  },
  learning_insights: [
    { insight: "Users who complete onboarding within 3 days have 80% higher retention", category: "Onboarding" },
    { insight: "Feature X drives 45% more engagement than feature Y", category: "Features" },
  ],
  effectiveness_by_type: [
    { type: "Email", effectiveness: 72, count: 245 },
    { type: "In-app", effectiveness: 85, count: 189 },
  ],
};

export const mockSessions = [
  {
    sessionId: "session1",
    userId: "user1",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    duration: 320,
    pages: 8,
    actions: 15,
    chunks: [],
    visual_description: "User navigated through main features",
    ai_summary: "Active session exploring core functionality",
    key_insights: ["High engagement", "Feature discovery"],
    activation_signals: ["Completed setup", "Used key feature"],
    concerns: [],
  },
];

export const mockCampaigns = [
  {
    id: "campaign1",
    name: "Onboarding Series",
    type: "email",
    status: "active",
    sent: 245,
    opened: 189,
    clicked: 67,
    total_sent: 245,
    sent_change: 12,
    avg_open_rate: 77.1,
    open_rate_change: 5.2,
    avg_action_rate: 35.4,
    action_rate_change: 8.1,
    success_impact: 67,
    impact_change: 15.3,
    insights: [
      { message: "Email timing optimization increased opens by 12%", priority: "high" },
      { message: "Subject line A/B test showed 23% improvement", priority: "medium" },
    ],
  },
];
