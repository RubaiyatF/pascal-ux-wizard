import { Card } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string;
  sublabel: string;
}

interface StatsData {
  stats?: {
    pending_count?: number;
    sent_count?: number;
    avg_confidence?: number;
    avg_review_time_seconds?: number;
  };
}

interface EmailQueueStatsProps {
  statsData?: StatsData;
}

export const EmailQueueStats = ({ statsData }: EmailQueueStatsProps) => {
  const stats = statsData?.stats;

  // Format stats for display
  const formatHours = (seconds: number) => {
    if (!seconds || seconds === 0) return "N/A";
    const hours = seconds / 3600;
    return hours < 1 ? `${Math.round(seconds / 60)}m` : `${hours.toFixed(1)}h`;
  };

  const displayStats: StatCardProps[] = [
    {
      label: "Pending Approval",
      value: stats?.pending_count?.toString() || "0",
      sublabel: "emails"
    },
    {
      label: "Sent This Month",
      value: stats?.sent_count?.toString() || "0",
      sublabel: "delivered"
    },
    {
      label: "AI Confidence",
      value: stats?.avg_confidence ? `${Math.round(stats.avg_confidence)}%` : "N/A",
      sublabel: "average"
    },
    {
      label: "Avg Review Time",
      value: formatHours(stats?.avg_review_time_seconds || 0),
      sublabel: "human approval"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {displayStats.map((stat) => (
        <Card key={stat.label} className="p-4 bg-white">
          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
