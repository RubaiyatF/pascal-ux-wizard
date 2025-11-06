import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, Users, TrendingUp, Mail, Zap, Shield, BarChart3 } from "lucide-react";

interface DocumentationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DocumentationModal = ({ open, onOpenChange }: DocumentationModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Pascal Documentation</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="classification">Classification</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(85vh-160px)] mt-4">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  What is Pascal?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pascal is a revenue activation agent for B2B businesses designed to increase free tier to paid conversion, 
                  low tier to high tier conversion, boost engagement, and accelerate activation.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Pascal analyzes each individual session recording, creates a stitched memory layer that is persistent, 
                  includes a decision agent that decides when to nudge customers, and features a human-in-the-loop 
                  email generating AI system.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">Visual Memory</Badge>
                  <Badge variant="secondary">Textual Engagement Memory</Badge>
                  <Badge variant="secondary">World-Class CS Frameworks</Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-4">How Pascal Works</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Session Recording Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Records and analyzes every user session in real-time, capturing behavior, clicks, 
                        navigation patterns, and understanding intent and confusion points.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Memory Layer</h4>
                      <p className="text-sm text-muted-foreground">
                        Creates persistent memory for each user, stitches together sessions across time, 
                        and builds comprehensive understanding of user journey.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">AI Decision Agent</h4>
                      <p className="text-sm text-muted-foreground">
                        Decides when to engage users, determines optimal timing for interventions, 
                        and avoids notification fatigue.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-primary">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email Generation</h4>
                      <p className="text-sm text-muted-foreground">
                        Human-in-the-loop AI system generates personalized emails based on user context 
                        with review capability before sending.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="space-y-6">
              <div className="grid gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Zap className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Real-Time Session Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Captures and analyzes every user interaction in real-time using rrweb technology. 
                        Understands user intent, identifies confusion points, and tracks navigation patterns.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Brain className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Persistent Memory System</h4>
                      <p className="text-sm text-muted-foreground">
                        Maintains context across all user sessions, stitching together interactions over time 
                        to build a complete picture of each user's journey and behavior patterns.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Users className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">User Classification</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically classifies users into 5 archetypes: Fast Mover, On Track, Slow Adopter, 
                        At Risk, and Different Path based on behavior patterns.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Journey Stage Tracking</h4>
                      <p className="text-sm text-muted-foreground">
                        Tracks users through 5 distinct stages: Discovery (0-3 days), Onboarding (4-14 days), 
                        Adoption (15-45 days), Expansion (46-90 days), and Advocacy (90+ days).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">AI-Powered Email Generation</h4>
                      <p className="text-sm text-muted-foreground">
                        Generates highly personalized emails using GPT-4o based on complete user context. 
                        Human-in-the-loop design ensures quality control before sending.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BarChart3 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Analytics & Benchmarking</h4>
                      <p className="text-sm text-muted-foreground">
                        Compare user behavior against benchmark users to identify success patterns and 
                        opportunities for intervention. Track conversion metrics and engagement trends.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Classification Tab */}
            <TabsContent value="classification" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  User Classification
                </h3>
                <p className="text-muted-foreground mb-4">
                  Pascal classifies users into 5 archetypes based on their behavior compared to successful users:
                </p>
                
                <div className="space-y-3">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-500">Fast Mover</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Power users progressing rapidly through the product, exceeding typical adoption patterns.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-500">On Track</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Users following successful patterns and making steady progress through onboarding.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-yellow-500">Slow Adopter</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Engaged users who need additional guidance and support to reach full adoption.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-red-500">At Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Users deviating from successful patterns, showing signs of potential churn.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-purple-500">Different Path</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Users with unique usage patterns that don't match typical successful journeys.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Journey Stages
                </h3>
                
                <div className="space-y-3">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Discovery</h4>
                      <Badge variant="outline">Days 0-3</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Initial exploration phase where users discover features and understand product value.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Onboarding</h4>
                      <Badge variant="outline">Days 4-14</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Learning phase where users familiarize themselves with core features and workflows.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Adoption</h4>
                      <Badge variant="outline">Days 15-45</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Regular usage phase where users integrate the product into their daily workflow.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Expansion</h4>
                      <Badge variant="outline">Days 46-90</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Advanced usage phase where users explore advanced features and expand their usage.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Advocacy</h4>
                      <Badge variant="outline">Days 90+</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sustained success phase where users become power users and potential advocates.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Metrics Tab */}
            <TabsContent value="metrics" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Key Performance Metrics
                </h3>
                
                <div className="grid gap-4">
                  <div className="border rounded-lg p-6 bg-gradient-to-br from-primary/5 to-primary/10">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">30-40%</div>
                      <div className="font-semibold mb-1">Free-to-Paid Conversion Increase</div>
                      <p className="text-sm text-muted-foreground">
                        Significant improvement in converting free tier users to paid customers
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6 bg-gradient-to-br from-primary/5 to-primary/10">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">25%</div>
                      <div className="font-semibold mb-1">Tier Expansion Increase</div>
                      <p className="text-sm text-muted-foreground">
                        Higher rate of users upgrading from lower to higher tiers
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6 bg-gradient-to-br from-primary/5 to-primary/10">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">40%</div>
                      <div className="font-semibold mb-1">Time to Value Reduction</div>
                      <p className="text-sm text-muted-foreground">
                        Faster activation and realization of product value for users
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6 bg-gradient-to-br from-green-500/5 to-green-500/10">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">30-40%</div>
                      <div className="font-semibold mb-1">Revenue Recovery Rate</div>
                      <p className="text-sm text-muted-foreground">
                        Recovers 30-40% of abandoned revenue vs industry standard of 10-15%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};