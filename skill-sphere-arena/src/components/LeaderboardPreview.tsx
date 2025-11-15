import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LeaderboardEntry {
  rank: number;
  name: string;
  department: string;
  points: number;
  trend: "up" | "down" | "same";
  skillLevel: number;
  avatar?: string;
}

const mockData: LeaderboardEntry[] = [
  { rank: 1, name: "Alex Chen", department: "Computer Science", points: 2450, trend: "up", skillLevel: 5 },
  { rank: 2, name: "Sarah Johnson", department: "Engineering", points: 2380, trend: "same", skillLevel: 5 },
  { rank: 3, name: "Michael Rodriguez", department: "Business", points: 2210, trend: "up", skillLevel: 4 },
  { rank: 4, name: "Emily Davis", department: "Computer Science", points: 2150, trend: "down", skillLevel: 4 },
  { rank: 5, name: "James Wilson", department: "Design", points: 2090, trend: "up", skillLevel: 4 },
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-success" />;
    case "down":
      return <TrendingDown className="h-4 w-4 text-destructive" />;
    default:
      return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

const getRankBadge = (rank: number) => {
  if (rank === 1) return <Badge className="bg-warning text-warning-foreground">🥇 1st</Badge>;
  if (rank === 2) return <Badge className="bg-muted text-foreground">🥈 2nd</Badge>;
  if (rank === 3) return <Badge className="bg-warning/60 text-warning-foreground">🥉 3rd</Badge>;
  return <Badge variant="outline">{rank}th</Badge>;
};

export const LeaderboardPreview = () => {
  return (
    <Card className="p-6 space-y-6 animate-slide-up border-2 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Top Performers</h2>
            <p className="text-sm text-muted-foreground">This week's leaderboard</p>
          </div>
        </div>
        <Link to="/leaderboard">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </div>

      <div className="space-y-3">
        {mockData.map((entry, index) => (
          <div
            key={entry.rank}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${
              index === 0 ? "bg-gradient-to-r from-warning/10 to-transparent border-warning/30" : "bg-card border-border"
            }`}
          >
            <div className="flex-shrink-0">
              {getRankBadge(entry.rank)}
            </div>

            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
              {entry.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{entry.name}</p>
              <p className="text-sm text-muted-foreground">{entry.department}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="font-bold text-lg text-foreground">{entry.points}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < entry.skillLevel ? "text-warning" : "text-muted"}>⭐</span>
                  ))}
                </div>
              </div>
              {getTrendIcon(entry.trend)}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border-2 border-primary/20">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary text-primary-foreground">Your Rank</Badge>
            <span className="font-semibold text-foreground">12th</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Your Points</p>
            <p className="text-xl font-bold text-primary">1,850</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
