# Pascal Analytics - Complete UX Flow

## Design Philosophy

**Inspired by**: PostHog (analytics clarity) + Perplexity (chat simplicity) + Linear (beautiful design)

**Core Principles**:
- Minimal steps to activation (3-step onboarding)
- AI-first experience (insights everywhere)
- Clear visual hierarchy
- Non-technical user friendly
- Mobile responsive

## Design System

### Color Palette
- **Primary (Deep Purple)**: `hsl(263, 70%, 50%)` - Intelligence, trust, AI
- **Accent (Vibrant Cyan)**: `hsl(189, 94%, 43%)` - Innovation, energy
- **Success (Green)**: `hsl(142, 76%, 36%)` - Fast Movers, positive trends
- **Warning (Orange)**: `hsl(38, 92%, 50%)` - Slow Adopters
- **Info (Blue)**: `hsl(199, 89%, 48%)` - On Track users
- **Destructive (Red)**: `hsl(0, 84%, 60%)` - At Risk users

### Key Features
- Gradient backgrounds for CTAs and hero elements
- Glow effects on primary elements
- Smooth animations (fade-in, slide-in)
- Consistent 0.75rem border radius
- Card-based layout with elevation shadows

## Complete User Journey (End-to-End)

### 1. Authentication (`/auth`)
**Purpose**: Secure entry point with combined sign up/login

**Components**:
- Logo with gradient background and glow effect
- Card with auth form
- Toggle between sign up and login modes
- Email and password fields
- Name field (sign up only)
- Gradient CTA button
- Terms acceptance footer

**User Actions**:
- New users: Click "Sign up" → Enter details → Create account
- Returning users: Click "Sign in" → Enter credentials → Access dashboard
- Auto-redirect if already authenticated

**Backend Requirements**: 
- Lovable Cloud authentication
- Email/password auth
- Session management

---

### 2. Onboarding (`/onboarding`)
**Purpose**: Quick 3-step setup to get users tracking

**Step 1: Create Project**
- **Components**: Project name input, website URL input
- **Validation**: Both fields required before proceeding
- **Backend**: Create project record, generate project_id and api_key

**Step 2: Install Tracker**
- **Components**: 
  - Code snippet with syntax highlighting
  - Copy to clipboard button
  - Framework-specific documentation link
- **Data Shown**: 
  - Project ID
  - API key
  - Complete tracking code
- **User Action**: Copy code → Paste in website `<head>`

**Step 3: Verify Installation**
- **Components**:
  - Real-time event listener
  - Pulsing indicator
  - Success checklist
- **Backend**: Wait for first event from tracker
- **Auto-advance**: On first event received → Redirect to dashboard

**Design Notes**:
- Progress indicator (1/3, 2/3, 3/3)
- Can't skip steps
- Back button enabled except on step 1
- Clear visual feedback on completion

---

### 3. Dashboard (`/dashboard`)
**Purpose**: High-level overview with AI insights

**Layout**:
```
┌─────────────────────────────────────────┐
│ Sidebar (fixed) │ Main Content          │
│                 │                       │
│ - Dashboard     │ Stats Cards (4)       │
│ - Users         │ ├─ Active Users       │
│ - Sessions      │ ├─ Activation Rate    │
│ - Interventions │ ├─ HEART Score        │
│ - Settings      │ └─ Interventions      │
│                 │                       │
│                 │ User Archetypes (2/3) │
│                 │ AI Insights (1/3)     │
│                 │                       │
│                 │ Recent Sessions       │
└─────────────────────────────────────────┘
```

**Key Metrics** (4 stat cards):
1. **Active Users**: Total count with % change
2. **Activation Rate**: Percentage with trend
3. **Avg. HEART Score**: 0-100 score with trend
4. **Interventions Sent**: Email count with trend

**User Archetypes Section**:
- Horizontal bar charts showing distribution
- 5 archetypes with color coding:
  - Fast Mover (Green)
  - On Track (Blue)
  - Slow Adopter (Orange)
  - At Risk (Red)
  - Different Path (Gray)
- Click to filter users by archetype

**AI Insights Panel** (prominent):
- Gradient background with primary colors
- 3 actionable insights:
  - Top opportunity (at-risk users)
  - Success pattern (benchmark learning)
  - Quick win (feature adoption)
- CTA buttons for each insight

**Recent Sessions**:
- Table with 3-5 latest sessions
- Shows: User, HEART score, duration, pages, archetype
- Click to view session details

**Backend Data Required**:
- Active user count (last 30 days)
- Activation rate calculation
- Average HEART scores from `session_video_analysis`
- Archetype distribution from `gemini_analysis`
- Recent sessions with AI summaries

---

### 4. Users (`/users`)
**Purpose**: View all users with success intelligence

**Components**:
- Search bar (email/name filter)
- Archetype dropdown filter
- Sortable table with columns:
  - User (name + email)
  - Archetype (badge with color)
  - Journey Stage
  - HEART Score (with trend icon)
  - Velocity (% vs benchmark)
  - Sessions count
  - Last seen timestamp
  - Actions (View Details button)

**Filters**:
- Search: Real-time text filtering
- Archetype: Dropdown (All, Fast Mover, On Track, etc.)
- Combined filtering (AND logic)

**Table Features**:
- Hover state on rows
- Color-coded archetype badges
- Trend indicators (up/down/stable arrows)
- Velocity shown as percentage vs benchmark
- Click row → Navigate to user detail page

**Backend Data Required**:
- List of all users from `identity_users`
- Latest success intelligence from `session_video_analysis`
- Archetype classification
- Journey stage detection
- Session count and last_seen

---

### 5. Sessions (`/sessions`)
**Purpose**: View session replays with AI analysis

**Components**:
- HEART framework legend (educational)
- Session cards with:
  - Large HEART score badge (color-coded)
  - User email and journey stage
  - Duration, pages viewed, events count
  - AI summary (from Gemini analysis)
  - Watch Replay CTA button
  - Collapsed HEART breakdown (5 metrics)

**HEART Framework Legend**:
- Explains the 5 dimensions
- Helps users understand scoring
- Links to documentation

**Session Card Details**:
- **Score Badge**: 
  - 80+ = Green (success)
  - 60-79 = Blue (info)
  - 40-59 = Orange (warning)
  - <40 = Red (at risk)
- **AI Summary**: One-sentence analysis from Gemini
- **Metrics**: Duration, pages, events with icons
- **HEART Breakdown**: 5 individual scores (show on expand)

**User Actions**:
- Click "Watch Replay" → Open session replay player
- Hover card → Show full HEART breakdown
- Filter by score range, user, date

**Backend Data Required**:
- Sessions from `events` table
- Recording chunks from `recording_chunks`
- AI analysis from `session_video_analysis`
- HEART scores (Happiness, Engagement, Adoption, Retention, Task Success)

---

### 6. Interventions (`/interventions`)
**Purpose**: Manage AI-powered email campaigns

**Components**:

**Stats Grid** (4 cards):
1. Total Sent
2. Avg Open Rate
3. Avg Action Rate
4. Success Impact

**Campaign List**:
- Each campaign shows:
  - Name and status (active/scheduled)
  - Type badge (education/guidance/celebration)
  - Archetype and journey stage tags
  - Metrics: Sent, Opened, Clicked, Action Rate
  - Last sent timestamp
  - Edit button

**Campaign Types**:
- **Education**: Onboarding guides, feature tutorials
- **Guidance**: Gap-specific recommendations
- **Celebration**: Milestone achievements
- **Warning**: At-risk notifications

**AI Learning Insights**:
- Success patterns discovered
- Optimal send times
- Archetype preferences
- Best practices

**User Actions**:
- Create Campaign → Set up new intervention
- Edit Campaign → Modify triggers/content
- View metrics → Analyze performance
- Read insights → Learn from AI

**Backend Data Required**:
- Campaigns from email configuration
- Email activity from `identity_email_activity`
- Feedback data from `email_feedback`
- Success learnings from `success_learnings`

---

### 7. Settings (`/settings`)
**Purpose**: Configure project, tracking, email, and AI

**Tabs**:

**General**:
- Project name
- Website URL
- Project ID (read-only, copyable)

**Tracking**:
- Session recording toggle
- Data retention (days)
- Privacy settings:
  - Mask all inputs
  - Mask emails
  - Mask passwords

**Email Config**:
- Enable/disable session insights
- From email and name
- Brevo API key (encrypted)
- Daily email limit

**AI Settings**:
- Enable/disable AI analysis
- Manage benchmark users
- HEART framework weights (5 sliders):
  - Happiness: 25%
  - Engagement: 20%
  - Adoption: 30%
  - Retention: 15%
  - Task Success: 10%

**Privacy Notice**:
- GDPR compliance statement
- Data encryption info
- User consent management

**User Actions**:
- Update any setting
- Test email configuration
- Manage benchmarks
- Save changes (validates inputs)

**Backend Data Required**:
- Project settings from `project_email_config`
- Encryption key from GCP Secret Manager
- Benchmark user list
- Current AI configuration

---

## Navigation Structure

### Sidebar (Fixed Left, Always Visible)
```
┌────────────────────┐
│ [Logo] Pascal      │
│        Analytics   │
├────────────────────┤
│ Dashboard          │
│ Users              │
│ Sessions           │
│ Interventions      │
│ Settings           │
├────────────────────┤
│ [Pro Tip Card]     │
└────────────────────┘
```

**Features**:
- Active state highlighting (primary gradient)
- Icons for each section
- Chevron on active item
- Bottom card with contextual tips
- Fixed width: 16rem (256px)

---

## Component Architecture Mapping

### Backend System → Frontend Components

**Pascal Neural Engine Components** → **Frontend Pages**:

1. **Session Analysis (Gemini)** → `/sessions`
   - Displays HEART scores
   - Shows AI summaries
   - Session replay player

2. **Success Intelligence** → `/users`
   - Archetype classification
   - Journey stage tracking
   - Velocity calculations
   - Gap analysis

3. **Decision Agent** → `/interventions`
   - Email campaigns
   - Trigger rules
   - Success metrics

4. **Memory Layer (Mem0)** → User detail page
   - User journey timeline
   - Historical context
   - Behavior patterns

5. **Pattern Learning** → `/interventions` (insights section)
   - Success learnings
   - Optimal timing
   - Archetype preferences

**Database Tables** → **UI Components**:

- `identity_users` → Users table
- `session_video_analysis` → Session cards
- `email_feedback` → Campaign metrics
- `success_learnings` → AI insights
- `benchmark_patterns` → Benchmark comparisons

---

## Mobile Responsiveness

All screens are fully responsive:
- Sidebar collapses to hamburger menu on mobile
- Stats cards stack vertically
- Tables become scrollable cards
- Forms use full width
- Touch-friendly tap targets (min 44px)

---

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- High contrast color ratios (WCAG AA)
- Focus indicators on all inputs
- Screen reader friendly

---

## Performance Optimizations

- Lazy load session recordings
- Paginate user lists (100 per page)
- Cache AI summaries (Redis, 1 hour TTL)
- Debounce search inputs (300ms)
- Optimize bundle size (<500KB initial load)

---

## User Personas & Use Cases

### Persona 1: Customer Success Manager (Sarah)
**Technical Level**: Low
**Goals**: Identify at-risk users, send interventions

**Journey**:
1. Login → Dashboard
2. See "285 At Risk users" alert
3. Click "Create Campaign"
4. AI suggests intervention type
5. Review and approve
6. Monitor results

### Persona 2: Product Manager (Mike)
**Technical Level**: Medium
**Goals**: Understand user behavior, improve features

**Journey**:
1. Login → Dashboard
2. Review HEART scores
3. Click Users → Filter by "Slow Adopter"
4. Identify common patterns
5. Watch session replays
6. Plan feature improvements

### Persona 3: Growth Engineer (Emma)
**Technical Level**: High
**Goals**: Optimize activation funnel

**Journey**:
1. Login → Users
2. Compare Fast Movers vs Slow Adopters
3. Analyze benchmark gaps
4. Review success patterns
5. Adjust AI weights
6. Monitor velocity changes

---

## Success Metrics for Frontend

1. **Time to First Value**: <5 minutes from signup to first insight
2. **Onboarding Completion**: >85% complete all 3 steps
3. **Daily Active Users**: Users who log in daily
4. **Feature Adoption**: % using each major feature
5. **User Satisfaction**: NPS score >50

---

## Future Enhancements (Not in v1)

1. **User Detail Page**: Individual user timeline with journey
2. **Session Replay Player**: Full video playback with AI annotations
3. **Custom Dashboards**: Drag-and-drop widgets
4. **Team Management**: Multi-user accounts with roles
5. **API Documentation**: Interactive API explorer
6. **Webhooks**: Real-time notifications
7. **Slack/Discord Integration**: Alert notifications
8. **Mobile App**: Native iOS/Android apps

---

## Technical Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Animations**: Framer Motion (if needed)
- **Icons**: Lucide React

---

## Deployment Checklist

- [ ] Set proper SEO meta tags
- [ ] Configure CDN for static assets
- [ ] Enable HTTPS/SSL
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics
- [ ] Add loading states
- [ ] Implement error boundaries
- [ ] Add toast notifications
- [ ] Test across browsers
- [ ] Mobile testing
- [ ] Accessibility audit
- [ ] Performance testing

---

## Backend API Endpoints Required

All endpoints already documented in system architecture:

- `POST /ingest` - Tracker events
- `GET /api/users/:userId/success-journey` - User intelligence
- `GET /api/projects/:projectId/success-metrics` - Dashboard stats
- `GET /api/projects/:projectId/intervention-effectiveness` - Campaign metrics
- `GET /api/sessions/:sessionId/visual-description` - Session AI summary
- `GET /api/sessions/:sessionId/heart-analysis` - HEART scores
- `GET /api/projects/:projectId/high-activation-sessions` - Top sessions

---

## Conclusion

This UX flow provides:
✅ **Minimal friction**: 3-step onboarding, clear navigation
✅ **AI-first**: Insights on every page
✅ **Non-technical friendly**: Plain language, visual indicators
✅ **Complete coverage**: Every backend component has frontend representation
✅ **Scalable**: Room for growth without complexity
✅ **Beautiful**: Modern design with delightful interactions

The shortest path to activation: **Sign up → Install code → See AI insights in < 5 minutes**
