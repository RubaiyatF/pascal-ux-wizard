import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PASCAL_KNOWLEDGE = `
# Pascal 101

## What is Pascal?

Pascal is a revenue activation agent for B2B businesses. Its goal is to increase free tier to conversion, low tier to high tier conversion, increase engagement, and increase activation. 

Pascal does this by analyzing each individual session recording, creating a stitched memory layer that is persistent, including a decision agent that decides when to nudge the customer and a human in the loop email generating gen AI. 

Pascal has visual memory, textual engagement memory and its model is finetuned on basis of world's best companies customer success frameworks.

## How Pascal Works

### 1. Session Recording Analysis
- Records and analyzes every user session in real-time
- Captures user behavior, clicks, navigation patterns
- Understands intent and confusion points

### 2. Memory Layer
- Creates persistent memory for each user
- Stitches together sessions across time
- Builds comprehensive understanding of user journey

### 3. AI Decision Agent
- Decides when to engage users
- Determines optimal timing for interventions
- Avoids notification fatigue

### 4. Email Generation
- Human-in-the-loop AI system
- Generates personalized emails based on user context
- Allows review before sending

## User Classification

Pascal classifies users into 5 archetypes based on their behavior compared to successful users:

1. **Fast Mover** - Power users progressing rapidly
2. **On Track** - Following successful patterns
3. **Slow Adopter** - Engaged but needs guidance  
4. **At Risk** - Deviating from success patterns
5. **Different Path** - Unique usage patterns

## Journey Stages

Pascal tracks users through 5 journey stages:

1. **Discovery** (Days 0-3) - Initial exploration
2. **Onboarding** (Days 4-14) - Learning features
3. **Adoption** (Days 15-45) - Regular usage
4. **Expansion** (Days 46-90) - Advanced features
5. **Advocacy** (Days 90+) - Sustained success

## Key Metrics

### Conversion Improvements
- 30-40% increase in free-to-paid conversion
- 25% increase in tier expansion
- 40% reduction in time to value

### Revenue Recovery
- Recovers 30-40% of abandoned revenue
- Industry standard: 10-15%

## Quick Start Guide

### Getting Started with Pascal Demo

1. **Navigate the Dashboard**: Start at the home page to see your project overview
2. **Email Queue**: Review AI-generated emails that help guide users through their journey
3. **Benchmarks**: Add successful users to train Pascal's AI on what "good" looks like
4. **Journey**: Track individual user journeys and see detailed insights
5. **Analytics**: Monitor trends and performance metrics over time

### Key Features to Explore

1. **Email Queue**: 
   - Review AI-generated intervention emails
   - Approve, edit, or reject suggestions
   - See conversation threads with users
   - View session recordings linked to emails

2. **Benchmarks**:
   - Add 3-5 successful users as benchmarks
   - Pascal learns from their behavior patterns
   - Uses this to identify gaps in other users

3. **Journey Tracking**:
   - View individual user timelines
   - See session recordings with AI analysis
   - Understand user archetypes and stages
   - Generate personalized interventions

4. **Analytics**:
   - Monitor conversion trends
   - Track engagement metrics
   - See AI-powered insights

### Best Practices

1. **Add Benchmark Users First**: This helps Pascal understand what success looks like for your product
2. **Review Email Queue Daily**: Approve or edit AI suggestions to improve future recommendations
3. **Watch Session Recordings**: Understand user behavior to make informed decisions
4. **Monitor Journey Stages**: Identify where users get stuck in their journey

## Implementation

### Simple Setup
1. Install JavaScript tracking code
2. Configure user identification
3. Set up benchmark users
4. Enable AI analysis
5. Activate email notifications

### Integration
- 5.9KB JavaScript tracker
- API access for custom implementations
- GDPR compliant with consent management
- Multi-tenant architecture

## Technical Architecture

### Core Components
- **Session Recording**: rrweb technology
- **AI Analysis**: Google Gemini 1.5 Pro
- **Memory System**: Mem0 + OpenAI
- **Decision Engine**: GPT-4o-mini
- **Email Generation**: GPT-4o

### Infrastructure
- ClickHouse for analytics
- Redpanda/Kafka for streaming
- Redis for caching
- Cloud Run for API
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are Pascal's helpful customer support assistant. Your goal is to help users understand and get started with the Pascal demo application.

${PASCAL_KNOWLEDGE}

Guidelines:
- Be friendly, concise, and helpful
- Guide users through features step-by-step
- Explain concepts clearly without being overly technical
- When users ask about features, explain both WHAT they do and WHY they're valuable
- Encourage users to explore the demo and try different features
- If users seem stuck, ask clarifying questions to understand their needs better
- Always stay focused on helping them get value from Pascal

Remember: You're helping users navigate the Pascal demo and understand how to use it effectively.`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
