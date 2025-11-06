import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, TrendingUp, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { AddBenchmarkModal } from "@/components/home/AddBenchmarkModal";
import { UserJourneyModal } from "@/components/home/UserJourneyModal";
import { UserDetailsModal } from "@/components/home/UserDetailsModal";
import { BenchmarksEmptyState } from "@/components/empty-states/BenchmarksEmptyState";
import { useToast } from "@/hooks/use-toast";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { useNavigate } from "react-router-dom";
import { useProject } from "@/contexts/ProjectContext";

const Benchmarks = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentProject } = useProject();
  const [addBenchmarkOpen, setAddBenchmarkOpen] = useState(false);
  const [benchmarkEmail, setBenchmarkEmail] = useState("");
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedSimilarUser, setSelectedSimilarUser] = useState<{
    email: string;
    similarity: number;
    reason: string;
  } | null>(null);
  const [showAllSimilarUsers, setShowAllSimilarUsers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const demoBenchmarks = currentProject === "Pascal Demo" ? [
    {
      email: "nora@sample.com",
      markedDate: "Jan 10",
      sessionsAnalyzed: 8,
    },
    {
      email: "david@enterprise.co",
      markedDate: "Jan 12",
      sessionsAnalyzed: 15,
    },
    {
      email: "melissa@startup.io",
      markedDate: "Jan 14",
      sessionsAnalyzed: 12,
    },
  ] : [];

  const [benchmarkUsers, setBenchmarkUsers] = useState<Array<{
    email: string;
    markedDate: string;
    sessionsAnalyzed: number;
  }>>(demoBenchmarks);

  // Reset benchmark users when project changes
  useEffect(() => {
    setBenchmarkUsers(demoBenchmarks);
  }, [currentProject]);

  const handleAddBenchmark = (email: string) => {
    // Check if user is already a benchmark
    if (benchmarkUsers.some(user => user.email === email)) {
      toast({
        title: "Already a benchmark",
        description: `${email} is already marked as a benchmark user`,
        variant: "destructive",
      });
      return;
    }

    // Add new benchmark user
    const newUser = {
      email,
      markedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sessionsAnalyzed: Math.floor(Math.random() * 50) + 20, // Mock data
    };

    setBenchmarkUsers([...benchmarkUsers, newUser]);
    
    // Mark onboarding step 2 as complete
    localStorage.setItem(`pascal-benchmark-added-${currentProject}`, 'true');
    
    toast({
      title: "Benchmark user added",
      description: `${email} has been added as a benchmark user`,
    });
  };

  const handleRemoveBenchmark = (email: string) => {
    setBenchmarkUsers(benchmarkUsers.filter(user => user.email !== email));
    
    toast({
      title: "Benchmark removed",
      description: `${email} has been removed from benchmark users`,
    });
  };

  const allSimilarUsers = [
    { email: "sarah@example.com", similarity: 85, reason: "Similar usage pattern" },
    { email: "alex@corp.com", similarity: 82, reason: "Comparable engagement" },
    { email: "emma@agency.co", similarity: 78, reason: "Matching feature use" },
    { email: "james@tech.io", similarity: 76, reason: "Similar activation time" },
    { email: "lisa@digital.com", similarity: 74, reason: "Comparable feature adoption" },
    { email: "mike@startup.co", similarity: 72, reason: "Similar session frequency" },
    { email: "olivia@brand.com", similarity: 70, reason: "Matching engagement pattern" },
    { email: "noah@enterprise.io", similarity: 68, reason: "Similar workflow" },
    { email: "sophia@agency.net", similarity: 67, reason: "Comparable activity level" },
    { email: "william@corp.co", similarity: 65, reason: "Similar feature usage" },
    { email: "ava@platform.io", similarity: 63, reason: "Similar usage pattern" },
    { email: "ethan@saas.com", similarity: 62, reason: "Comparable engagement" },
    { email: "mia@cloud.co", similarity: 60, reason: "Matching feature use" },
    { email: "lucas@app.io", similarity: 58, reason: "Similar activation time" },
    { email: "isabella@tool.com", similarity: 57, reason: "Comparable feature adoption" },
  ];

  const sortedUsers = [...allSimilarUsers].sort((a, b) => 
    sortOrder === 'desc' ? b.similarity - a.similarity : a.similarity - b.similarity
  );

  const USERS_PER_PAGE = 10;
  const totalPages = Math.ceil(sortedUsers.length / USERS_PER_PAGE);
  
  const similarUsers = showAllSimilarUsers 
    ? sortedUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE)
    : sortedUsers.slice(0, 3);
  
  const handleToggleShowAll = () => {
    setShowAllSimilarUsers(!showAllSimilarUsers);
    setCurrentPage(1); // Reset to first page when toggling
  };

  const handleToggleSort = () => {
    setSortOrder(current => current === 'desc' ? 'asc' : 'desc');
    setCurrentPage(1); // Reset to first page when sorting
  };

  const metrics = [
    { label: "Active Users", value: "890", change: "+12", key: "activeUsers" },
    { label: "Avg Activation", value: "68%", change: "+5.2%", key: "activation" },
    { label: "Retention", value: "82%", change: "+3.1%", key: "retention" },
    { label: "Feature Adoption", value: "65%", change: "+8%", key: "featureAdoption" },
  ];

  const handleMetricClick = (metricKey: string) => {
    navigate('/analytics', { state: { selectedMetrics: [metricKey] } });
  };

  // Show empty state if no benchmark users
  if (benchmarkUsers.length === 0) {
    return (
      <>
        <BenchmarksEmptyState onAddBenchmark={() => setAddBenchmarkOpen(true)} />
        <AddBenchmarkModal
          open={addBenchmarkOpen}
          onOpenChange={setAddBenchmarkOpen}
          initialEmail={benchmarkEmail}
        />
      </>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Success Benchmarks</h1>
          <p className="text-muted-foreground">
            12 benchmark users · 47 similar users found
          </p>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card 
            key={metric.label} 
            className="p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
            onClick={() => handleMetricClick(metric.key)}
          >
            <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{metric.value}</p>
              <span className="text-sm font-medium text-success">
                {metric.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Trends */}
      <Card className="p-6 bg-white border-border">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 shrink-0">
            <AnimatedLogo />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Success Trends - Last 30 Days</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Activation</p>
                <p className="text-2xl font-bold">+5.2%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Retention</p>
                <p className="text-2xl font-bold">+3.1%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Benchmarks Added</p>
                <p className="text-2xl font-bold">+8</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Benchmark Users */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Benchmark Users</h2>
            <p className="text-sm text-muted-foreground">
              Your Success Templates (Mark users who represent success)
            </p>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add benchmark user by email..."
              className="w-64"
              value={benchmarkEmail}
              onChange={(e) => setBenchmarkEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setAddBenchmarkOpen(true);
                }
              }}
            />
            <Button size="sm" onClick={() => setAddBenchmarkOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {benchmarkUsers.map((user) => (
            <div
              key={user.email}
              className="flex items-center justify-between p-4 border border-border rounded-lg bg-white hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleRemoveBenchmark(user.email)}
                  className="group transition-all hover:scale-110 active:scale-95 hover:rotate-12 cursor-pointer animate-shake"
                  title="Click to remove from benchmarks"
                >
                  <Star className="w-5 h-5 text-primary fill-primary group-hover:fill-transparent transition-all" />
                </button>
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Marked: {user.markedDate} · {user.sessionsAnalyzed} sessions
                    analyzed
                  </p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => {
                  setSelectedUserEmail(user.email);
                  setJourneyOpen(true);
                }}
              >
                View Journey
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Similar Users */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Similar Users</h2>
            <p className="text-sm text-muted-foreground">
              Users behaving like your benchmarks (opportunity list)
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleSort}
            className="gap-2"
          >
            <ArrowUpDown className="w-4 h-4" />
            Sort by Similarity ({sortOrder === 'desc' ? 'High to Low' : 'Low to High'})
          </Button>
        </div>

        <div className="space-y-3">
          {similarUsers.map((user) => (
            <div
              key={user.email}
              className="flex items-center justify-between p-4 border border-border rounded-lg bg-white hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-muted-foreground">
                    "{user.reason}"
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="bg-success/10 text-success border-success/20"
                >
                  {user.similarity}% similarity
                </Badge>
                <Button 
                  size="sm" 
                  variant="default"
                  onClick={() => handleAddBenchmark(user.email)}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Add as Benchmark
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setSelectedSimilarUser(user);
                    setDetailsOpen(true);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border space-y-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-sm text-muted-foreground hover:text-foreground"
            onClick={handleToggleShowAll}
          >
            <span>
              Showing {showAllSimilarUsers ? `${(currentPage - 1) * USERS_PER_PAGE + 1}-${Math.min(currentPage * USERS_PER_PAGE, allSimilarUsers.length)}` : similarUsers.length} of {allSimilarUsers.length} similar users
            </span>
            {showAllSimilarUsers ? (
              <ChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </Button>
          
          {showAllSimilarUsers && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
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
          )}
        </div>
      </Card>

      {/* Modals */}
      <AddBenchmarkModal
        open={addBenchmarkOpen}
        onOpenChange={setAddBenchmarkOpen}
        initialEmail={benchmarkEmail}
      />
      
      <UserJourneyModal
        open={journeyOpen}
        onOpenChange={setJourneyOpen}
        userEmail={selectedUserEmail}
      />
      
      {selectedSimilarUser && (
        <UserDetailsModal
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          userEmail={selectedSimilarUser.email}
          similarity={selectedSimilarUser.similarity}
          reason={selectedSimilarUser.reason}
        />
      )}
    </div>
  );
};


export default Benchmarks;
