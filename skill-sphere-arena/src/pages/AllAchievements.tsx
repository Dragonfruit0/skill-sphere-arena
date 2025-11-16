import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { db } from "@/firebase";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  userName: string;
  userDepartment: string;
  status: "pending" | "approved" | "rejected";
}

const AllAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "achievements"), orderBy("submittedAt", "desc"), limit(100));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allAchievements: Achievement[] = [];
      querySnapshot.forEach((doc) => {
        allAchievements.push({ id: doc.id, ...doc.data() } as Achievement);
      });
      
      setAchievements(allAchievements);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const StatusIcon = ({ status }: { status: Achievement["status"] }) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-800">All Achievements</h1>
        </div>
        
        <Card className="p-6 shadow-sm">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : achievements.length > 0 ? (
            <ul className="space-y-4">
              {achievements.map((ach) => (
                <li key={ach.id} className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200">
                  <div className="flex items-start gap-4">
                     <StatusIcon status={ach.status} />
                    <div>
                      <p className="font-semibold text-gray-900">{ach.title}</p>
                      <p className="text-sm text-gray-600">{ach.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{ach.userName}</p>
                    <p className="text-sm text-gray-600">{ach.userDepartment}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Award className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p>No achievements have been submitted yet.</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AllAchievements;
