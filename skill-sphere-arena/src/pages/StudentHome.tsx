import { Navigation } from "@/components/Navigation";
import { StatsCard } from "@/components/StatsCard";
import { LeaderboardPreview } from "@/components/LeaderboardPreview";
import { Trophy, TrendingUp, Target, Award, Zap, BookOpen, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { collection, query, where, getCountFromServer, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "@/firebase";
import { Link } from "react-router-dom";

const StudentHome = () => {
  const { currentUser, userData } = useAuth();
  const [stats, setStats] = useState({
    rank: 0,
    totalAchievements: 0,
    pendingAchievements: 0,
  });
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  useEffect(() => {
    if (!currentUser || !userData) return;

    const fetchUserStats = async () => {
      setLoadingStats(true);
      try {
        const rankQuery = query(collection(db, "users"), where("score", ">", userData.score || 0));
        const rankSnapshot = await getCountFromServer(rankQuery);
        const rank = rankSnapshot.data().count + 1;

        const achievementsQuery = query(collection(db, "achievements"), where("userId", "==", currentUser.uid));
        const achievementsSnapshot = await getCountFromServer(achievementsQuery);
        const totalAchievements = achievementsSnapshot.data().count;
        
        const pendingQuery = query(collection(db, "achievements"), where("userId", "==", currentUser.uid), where("status", "==", "pending"));
        const pendingSnapshot = await getCountFromServer(pendingQuery);
        const pendingAchievements = pendingSnapshot.data().count;

        setStats({ rank, totalAchievements, pendingAchievements });

      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchUserStats();
  }, [currentUser, userData]);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("score", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const leaderboardData: any[] = [];
      querySnapshot.forEach((doc, index) => {
        leaderboardData.push({ 
          id: doc.id, 
          rank: index + 1,
          trend: "same", 
          skillLevel: Math.floor(Math.random() * 5) + 1, 
          ...doc.data() 
        });
      });
      setLeaderboard(leaderboardData);
      setLoadingLeaderboard(false);
    });

    return () => unsubscribe();
  }, []);

  const userScore = userData?.score || 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary p-8 text-white shadow-2xl">
           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
                Student Dashboard
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Welcome back, {userData?.name || 'Student'}! 👋</h1>
              {loadingStats ? (
                <div className="h-6 bg-white/20 rounded-md w-64 animate-pulse"></div>
              ) : (
                <p className="text-xl text-white/90">You're currently ranked <strong>#{stats.rank}</strong> with <strong>{userScore}</strong> points</p>
              )}
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/40 animate-bounce-subtle">
                <Trophy className="h-12 w-12 text-yellow-400" />
              </div>
              <Link to="/profile">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg">
                    View Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={Trophy}
            label="Current Rank"
            value={loadingStats ? <Loader2 className="h-6 w-6 animate-spin" /> : `#${stats.rank}`}
            variant="primary"
          />
          <StatsCard
            icon={Target}
            label="Total Points"
            value={loadingStats ? <Loader2 className="h-6 w-6 animate-spin" /> : userScore}
            variant="success"
          />
          <div className="relative">
            <StatsCard
              icon={Award}
              label="Achievements"
              value={loadingStats ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.totalAchievements}
              trend={{ value: `${stats.pendingAchievements} pending`, isPositive: stats.pendingAchievements > 0 }}
              variant="warning"
            />
            <Link to="/achievements" className="absolute bottom-4 right-4">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          <StatsCard
            icon={TrendingUp}
            label="Skill Level"
            value="TBD"
            trend={{ value: "Coming Soon", isPositive: false }}
            variant="default"
          />
        </div>

        {loadingLeaderboard ? (
            <div className="text-center py-12 text-gray-500">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p>Loading Top Performers...</p>
            </div>
        ) : (
            <LeaderboardPreview data={leaderboard} />
        )}

        <div className="text-center my-12 p-8 bg-card rounded-lg border-2 border-dashed">
            <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Confused what to do??</h2>
            <p className="text-muted-foreground mb-6">Let our AI career counselor guide you to your future.</p>
            <Link to="/career-bot">
                <Button size="lg" className="font-semibold text-lg px-8 py-6">
                    AI got u
                </Button>
            </Link>
        </div>

      </main>
    </div>
  );
};

export default StudentHome;
