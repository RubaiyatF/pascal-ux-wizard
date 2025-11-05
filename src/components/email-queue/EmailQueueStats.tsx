import { Card } from "@/components/ui/card";
import { Mail, CheckCircle, Clock, XCircle } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  sublabel: string;
  icon: React.ReactNode;
}

const stats: StatCardProps[] = [
  { 
    label: "Total Drafts", 
    value: "10", 
    sublabel: "All time",
    icon: <Mail className="w-5 h-5 text-muted-foreground" />
  },
  { 
    label: "Approved", 
    value: "2", 
    sublabel: "Ready to send",
    icon: <CheckCircle className="w-5 h-5 text-green-500" />
  },
  { 
    label: "Pending", 
    value: "3", 
    sublabel: "Awaiting review",
    icon: <Clock className="w-5 h-5 text-yellow-500" />
  },
  { 
    label: "Rejected", 
    value: "5", 
    sublabel: "With feedback",
    icon: <XCircle className="w-5 h-5 text-red-500" />
  },
];

export const EmailQueueStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 border-border/50">
          <div className="flex items-center gap-2 mb-2">
            {stat.icon}
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
