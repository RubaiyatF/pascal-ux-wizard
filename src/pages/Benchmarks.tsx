import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddBenchmarkModal } from "@/components/home/AddBenchmarkModal";
import { UserJourneyModal } from "@/components/home/UserJourneyModal";
import { UserDetailsModal } from "@/components/home/UserDetailsModal";
import { BenchmarksEmptyState } from "@/components/empty-states/BenchmarksEmptyState";
import { useToast } from "@/hooks/use-toast";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useApiClient } from "@/lib/api";

interface BenchmarkUser {
  canonical_user_id: string;
  email: string;
  marked_at: string;
  session_count?: number;
}

interface SimilarUser {
  canonical_user_id: string;
  email: string;
  similarity_score: number;
  similarity_reason?: string;
}

const Benchmarks = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { projectId } = useOnboarding();
  const api = useApiClient();
  const queryClient = useQueryClient();

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

  // Fetch benchmark users
  const { data: benchmarkData, isLoading: benchmarksLoading } = useQuery({
    queryKey: ["benchmark-users", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/benchmark-users`),
    enabled: !!projectId,
  });

  // Fetch similar users
  const { data: similarData } = useQuery({
    queryKey: ["similar-users", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/similar-users?similarity_threshold=60`),
    enabled: !!projectId && (benchmarkData?.benchmarkUsers?.length || 0) > 0,
  });

  // Fetch success metrics
  const { data: metricsData } = useQuery({
    queryKey: ["success-metrics", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}/success-metrics?days=30`),
    enabled: !!projectId,
  });

  // Add benchmark mutation
  const addBenchmarkMutation = useMutation({
    mutationFn: (email: string) =>
      api.post(`/api/projects/${projectId}/benchmark-users`, { email }),
    onSuccess: (data, email) => {
      queryClient.invalidateQueries({ queryKey: ["benchmark-users", projectId] });
      queryClient.invalidateQueries({ queryKey: ["similar-users", projectId] });
      queryClient.invalidateQueries({ queryKey: ["success-metrics", projectId] });

      // Mark onboarding step 2 as complete
      if (projectId) {
        localStorage.setItem(`pascal-benchmark-added-${projectId}`, 'true');
      }

      toast({
        title: "Benchmark user added",
        description: `${email} has been added as a benchmark user`,
      });
    },
    onError: (error: Error, email: string) => {
      toast({
        title: "Error adding benchmark",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  // Remove benchmark mutation
  const removeBenchmarkMutation = useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      api.delete(`/api/projects/${projectId}/benchmark-users/${userId}`),
    onSuccess: (_data: unknown, { email }: { userId: string; email: string }) => {
      queryClient.invalidateQueries({ queryKey: ["benchmark-users", projectId] });
      queryClient.invalidateQueries({ queryKey: ["similar-users", projectId] });
      queryClient.invalidateQueries({ queryKey: ["success-metrics", projectId] });

      toast({
        title: "Benchmark removed",
        description: `${email} has been removed from benchmark users`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error removing benchmark",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const benchmarkUsers = benchmarkData?.benchmarkUsers || [];
  const allSimilarUsers = similarData?.users || [];

  const sortedUsers = [...allSimilarUsers].sort((a: SimilarUser, b: SimilarUser) =>
    sortOrder === 'desc' ? b.similarity_score - a.similarity_score : a.similarity_score - b.similarity_score
  );

  const USERS_PER_PAGE = 10;
  const totalPages = Math.ceil(sortedUsers.length / USERS_PER_PAGE);

  const similarUsers = showAllSimilarUsers
    ? sortedUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE)
    : sortedUsers.slice(0, 3);

  const handleToggleShowAll = () => {
    setShowAllSimilarUsers(!showAllSimilarUsers);
    setCurrentPage(1);
  };

  const handleToggleSort = () => {
    setSortOrder(current => current === 'desc' ? 'asc' : 'desc');
    setCurrentPage(1);
  };

  const handleAddBenchmark = (email: string) => {
    // Check if user is already a benchmark
    if (benchmarkUsers.some((user: BenchmarkUser) => user.email === email)) {
      toast({
        title: "Already a benchmark",
        description: `${email} is already marked as a benchmark user`,
        variant: "destructive",
      });
      return;
    }

    addBenchmarkMutation.mutate(email);
  };

  const handleRemoveBenchmark = (userId: string, email: string) => {
    removeBenchmarkMutation.mutate({ userId } as any);
  };

  // Build metrics from API data
  const metrics = metricsData?.metrics
    ? [
        {
          label: "Active Users",
          value: metricsData.metrics.active_users?.toString() || "0",
          change: `+${metricsData.metrics.total_users || 0}`,
          key: "activeUsers"
        },
        {
          label: "Avg Activation",
          value: `${metricsData.metrics.avg_activation_score || 0}%`,
          change: metricsData.trends?.activation_score_change || "+0%",
          key: "activation"
        },
        {
          label: "Retention",
          value: `${Math.round((metricsData.metrics.retention_rate || 0) * 100)}%`,
          change: metricsData.trends?.retention_change || "+0%",
          key: "retention"
        },
        {
          label: "Feature Adoption",
          value: `${Math.round((metricsData.metrics.feature_adoption_rate || 0) * 100)}%`,
          change: "+8%",
          key: "featureAdoption"
        },
      ]
    : [
        { label: "Active Users", value: "0", change: "+0", key: "activeUsers" },
        { label: "Avg Activation", value: "0%", change: "+0%", key: "activation" },
        { label: "Retention", value: "0%", change: "+0%", key: "retention" },
        { label: "Feature Adoption", value: "0%", change: "+0%", key: "featureAdoption" },
      ];

  const handleMetricClick = (metricKey: string) => {
    navigate('/analytics', { state: { selectedMetrics: [metricKey] } });
  };

  // Show empty state if no benchmark users
  if (!benchmarksLoading && benchmarkUsers.length === 0) {
    return (
      <>
        <BenchmarksEmptyState onAddBenchmark={() => setAddBenchmarkOpen(true)} />
        <AddBenchmarkModal
          open={addBenchmarkOpen}
          onOpenChange={setAddBenchmarkOpen}
          onSuccess={handleAddBenchmark}
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
            {benchmarkUsers.length} benchmark users · {allSimilarUsers.length} similar users found
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
      {metricsData?.trends && (
        <Card className="p-6 bg-card border-border">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 shrink-0">
              <AnimatedLogo />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Success Trends - Last 30 Days</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Activation</p>
                  <p className="text-2xl font-bold">{metricsData.trends.activation_score_change || "+0%"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Retention</p>
                  <p className="text-2xl font-bold">{metricsData.trends.retention_change || "+0%"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Benchmarks Added</p>
                  <p className="text-2xl font-bold">{metricsData.trends.benchmark_user_growth || "+0"}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

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
            <Button
              size="sm"
              onClick={() => setAddBenchmarkOpen(true)}
              disabled={addBenchmarkMutation.isPending}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {benchmarksLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading benchmarks...</div>
        ) : (
          <div className="space-y-3">
            {benchmarkUsers.map((user: BenchmarkUser) => (
              <div
                key={user.canonical_user_id}
                className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleRemoveBenchmark(user.canonical_user_id, user.email)}
                    disabled={removeBenchmarkMutation.isPending}
                    className="group transition-all hover:scale-110 active:scale-95 hover:rotate-12 cursor-pointer animate-shake disabled:opacity-50"
                    title="Click to remove from benchmarks"
                  >
                    <Star className="w-5 h-5 text-primary fill-primary group-hover:fill-transparent transition-all" />
                  </button>
                  <div>
                    <p className="font-medium">{user.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Marked: {new Date(user.marked_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {user.session_count && ` · ${user.session_count} sessions`}
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
        )}
      </Card>

      {/* Similar Users */}
      {allSimilarUsers.length > 0 && (
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
            {similarUsers.map((user: SimilarUser) => (
              <div
                key={user.canonical_user_id}
                className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{user.email}</p>
                    <p className="text-sm text-muted-foreground">
                      "{user.similarity_reason || 'Similar behavior pattern'}"
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-success/10 text-success border-success/20"
                  >
                    {user.similarity_score}% similarity
                  </Badge>
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleAddBenchmark(user.email)}
                    disabled={addBenchmarkMutation.isPending}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Add as Benchmark
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedSimilarUser({
                        email: user.email,
                        similarity: user.similarity_score,
                        reason: user.similarity_reason || 'Similar behavior pattern'
                      });
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
      )}

      {/* Modals */}
      <AddBenchmarkModal
        open={addBenchmarkOpen}
        onOpenChange={setAddBenchmarkOpen}
        onSuccess={handleAddBenchmark}
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
