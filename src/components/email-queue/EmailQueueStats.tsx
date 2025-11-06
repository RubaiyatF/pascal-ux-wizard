import { Card } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string;
  sublabel: string;
}

const stats: StatCardProps[] = [
  { label: "Pending Approval", value: "24", sublabel: "emails" },
  { label: "Active Threads", value: "12", sublabel: "conversations" },
  { label: "AI Accuracy", value: "89%", sublabel: "this week" },
  { label: "Avg Response Time", value: "2.3h", sublabel: "human approval" },
];

export const EmailQueueStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 bg-white shadow-lg">
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
