import { Navigation } from "@/components/Navigation";
import { StatsCard } from "@/components/StatsCard";
import { LeaderboardPreview } from "@/components/LeaderboardPreview";
import { Trophy, TrendingUp, Target, Award, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const StudentHome = () => {
  const { userData } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary p-8 text-white shadow-2xl">
           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
                  Student Dashboard
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Welcome back, {userData?.name || 'Student'}! 👋</h1>
              <p className="text-xl text-white/90">You're currently ranked #12 with 1,850 points</p>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/40 animate-bounce-subtle">
                <Trophy className="h-12 w-12 text-warning" />
              </div>
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg">
                View Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={Trophy}
            label="Current Rank"
            value="#12"
            trend={{ value: "+3 positions", isPositive: true }}
            variant="primary"
          />
          <StatsCard
            icon={Target}
            label="Total Points"
            value="1,850"
            trend={{ value: "+120 this week", isPositive: true }}
            variant="success"
          />
          <StatsCard
            icon={Award}
            label="Achievements"
            value="24"
            trend={{ value: "+2 pending", isPositive: true }}
            variant="warning"
          />
          <StatsCard
            icon={TrendingUp}
            label="Skill Level"
            value="4.2/5"
            trend={{ value: "+0.3 this month", isPositive: true }}
            variant="default"
          />
        </div>

        {/* Quick Actions */}
        <Card className="p-6 border-2 animate-slide-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" size="lg" className="flex items-center justify-start gap-3 h-16">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-semibold">Take a Quiz</span>
            </Button>
            <Button variant="outline" size="lg" className="flex items-center justify-start gap-3 h-16">
              <BookOpen className="h-6 w-6 text-success" />
              <span className="font-semibold">Browse Courses</span>
            </Button>
            <Button variant="outline" size="lg" className="flex items-center justify-start gap-3 h-16">
              <Trophy className="h-6 w-6 text-warning" />
              <span className="font-semibold">View Leaderboard</span>
            </Button>
          </div>
        </Card>

        <LeaderboardPreview />

      </main>
    </div>
  );
};

export default StudentHome;
