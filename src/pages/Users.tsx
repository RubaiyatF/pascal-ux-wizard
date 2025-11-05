import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, TrendingUp, TrendingDown, Minus } from "lucide-react";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [archetypeFilter, setArchetypeFilter] = useState("all");

  // Mock data
  const users = [
    {
      id: 1,
      email: "john@acme.com",
      name: "John Smith",
      archetype: "Fast Mover",
      journeyStage: "Adoption",
      heartScore: 85,
      sessions: 24,
      lastSeen: "2 hours ago",
      trend: "up",
      velocity: 125,
    },
    {
      id: 2,
      email: "sarah@startup.io",
      name: "Sarah Johnson",
      archetype: "On Track",
      journeyStage: "Onboarding",
      heartScore: 72,
      sessions: 12,
      lastSeen: "1 day ago",
      trend: "stable",
      velocity: 100,
    },
    {
      id: 3,
      email: "mike@company.com",
      name: "Mike Davis",
      archetype: "At Risk",
      journeyStage: "Discovery",
      heartScore: 45,
      sessions: 3,
      lastSeen: "5 days ago",
      trend: "down",
      velocity: 65,
    },
    {
      id: 4,
      email: "emma@tech.co",
      name: "Emma Wilson",
      archetype: "Fast Mover",
      journeyStage: "Expansion",
      heartScore: 92,
      sessions: 45,
      lastSeen: "30 min ago",
      trend: "up",
      velocity: 140,
    },
    {
      id: 5,
      email: "alex@digital.io",
      name: "Alex Brown",
      archetype: "Slow Adopter",
      journeyStage: "Onboarding",
      heartScore: 58,
      sessions: 8,
      lastSeen: "3 days ago",
      trend: "stable",
      velocity: 75,
    },
  ];

  const getArchetypeColor = (archetype: string) => {
    switch (archetype) {
      case "Fast Mover":
        return "bg-success/10 text-success border-success/20";
      case "On Track":
        return "bg-info/10 text-info border-info/20";
      case "Slow Adopter":
        return "bg-warning/10 text-warning border-warning/20";
      case "At Risk":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArchetype =
      archetypeFilter === "all" || user.archetype === archetypeFilter;
    return matchesSearch && matchesArchetype;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Users</h1>
        <p className="text-muted-foreground">
          Track user journeys and success patterns
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by email or name..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={archetypeFilter} onValueChange={setArchetypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by archetype" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Archetypes</SelectItem>
              <SelectItem value="Fast Mover">Fast Mover</SelectItem>
              <SelectItem value="On Track">On Track</SelectItem>
              <SelectItem value="Slow Adopter">Slow Adopter</SelectItem>
              <SelectItem value="At Risk">At Risk</SelectItem>
              <SelectItem value="Different Path">Different Path</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Archetype
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Journey Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  HEART Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Velocity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Sessions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Last Seen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getArchetypeColor(
                        user.archetype
                      )}`}
                    >
                      {user.archetype}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.journeyStage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                        <span className="text-sm font-semibold text-primary">
                          {user.heartScore}
                        </span>
                      </div>
                      {getTrendIcon(user.trend)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{user.velocity}%</div>
                    <div className="text-xs text-muted-foreground">
                      vs benchmark
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.sessions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {user.lastSeen}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No users found</p>
        </div>
      )}
    </div>
  );
};

export default Users;
