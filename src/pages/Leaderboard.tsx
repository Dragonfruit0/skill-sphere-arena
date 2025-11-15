import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award } from "lucide-react";
import { db } from "@/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

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
    const q = query(collection(db, "achievements"), where("status", "==", "approved"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const studentScores: { [userId: string]: Student & { achievements: number } } = {};

      querySnapshot.forEach((doc) => {
        const achievement = doc.data();
        const { userId, userName, userDepartment } = achievement;

        if (!studentScores[userId]) {
          studentScores[userId] = {
            id: userId,
            name: userName,
            department: userDepartment || 'N/A',
            score: 0,
            achievements: 0,
          };
        }
        studentScores[userId].score += 10; // Assign 10 points for each approved achievement
        studentScores[userId].achievements += 1;
      });

      const sortedLeaderboard = Object.values(studentScores).sort((a, b) => b.score - a.score);
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
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-yellow-600">{student.score} pts</p>
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
