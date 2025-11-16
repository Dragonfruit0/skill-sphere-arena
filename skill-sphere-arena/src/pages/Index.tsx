import { LeaderboardPreview } from "@/components/LeaderboardPreview";
import { db } from "@/firebase";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

interface Student {
  id: string;
  name: string;
  department: string;
  score: number;
  trend: "up" | "down" | "same";
  skillLevel: number;
  rank: number;
}

const Index = () => {
  const [leaderboard, setLeaderboard] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Query the users collection and order by score in descending order, limiting to the top 5.
    const q = query(collection(db, "users"), orderBy("score", "desc"), limit(5));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sortedLeaderboard: Student[] = [];
      querySnapshot.forEach((doc, index) => {
        sortedLeaderboard.push({ 
          id: doc.id, 
          rank: index + 1,
          // Add a trend and skillLevel property to each student object
          trend: "same", 
          skillLevel: Math.floor(Math.random() * 5) + 1, 
          ...doc.data() 
        } as Student);
      });
      
      setLeaderboard(sortedLeaderboard);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="mb-4 text-4xl font-bold">Welcome to Skill Sphere Arena</h1>
          <p className="text-xl text-muted-foreground">Showcase your skills, climb the leaderboard, and get recognized for your achievements.</p>
        </div>
        {loading ? (
          <div className="text-center py-12 text-gray-500">
            <p>Loading top performers...</p>
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
      </div>
    </div>
  );
};

export default Index;
