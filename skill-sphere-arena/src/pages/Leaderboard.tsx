import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award } from "lucide-react";
import { db } from "@/firebase";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Student {
  id: string;
  name: string;
  department: string;
  score: number;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Query the users collection and order by score in descending order.
    const q = query(collection(db, "users"), orderBy("score", "desc"), limit(100));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sortedLeaderboard: Student[] = [];
      querySnapshot.forEach((doc) => {
        sortedLeaderboard.push({ id: doc.id, ...doc.data() } as Student);
      });
      
      setLeaderboard(sortedLeaderboard);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-800">Global Leaderboard</h1>
        </div>
        
        <Card className="p-6 shadow-sm">
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              <p>Loading leaderboard...</p>
            </div>
          ) : leaderboard.length > 0 ? (
            <ul className="space-y-4">
              {leaderboard.map((student, index) => (
                <li key={student.id} className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200">
                  <div className="flex items-center gap-4">
                    <Badge className="text-lg font-bold">{index + 1}</Badge>
                    <div>
                      <Link to={`/portfolio/${student.id}`} className="hover:underline">
                        <p className="font-semibold text-gray-900">{student.name}</p>
                      </Link>
                      <p className="text-sm text-gray-600">{student.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-yellow-600">{student.score || 0} pts</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Award className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p>No approved achievements yet. The leaderboard is waiting for action!</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Leaderboard;
