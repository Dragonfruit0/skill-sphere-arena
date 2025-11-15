import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { collection, onSnapshot, query, where, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  userName: string;
  userRollNumber: string;
  mediaUrl: string;
  link?: string;
  status: 'pending' | 'approved' | 'rejected';
}

const Faculty = () => {
  const { userData } = useAuth();
  const [pendingAchievements, setPendingAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const q = query(collection(db, "achievements"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const achievements: Achievement[] = [];
      querySnapshot.forEach((doc) => {
        achievements.push({ id: doc.id, ...doc.data() } as Achievement);
      });
      setPendingAchievements(achievements);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected') => {
    const achievementRef = doc(db, "achievements", id);
    await updateDoc(achievementRef, { status });
  };

  if (userData?.role !== "faculty") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Faculty Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Pending Achievements for Review</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingAchievements.length > 0 ? (
              <ul className="space-y-4">
                {pendingAchievements.map((ach) => (
                  <li key={ach.id} className="p-4 border rounded-lg bg-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-lg">{ach.title}</p>
                        <p className="text-sm text-gray-600">Submitted by: {ach.userName} ({ach.userRollNumber})</p>
                        <p className="mt-2">{ach.description}</p>
                        <div className="mt-2">
                          <a href={ach.mediaUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Media</a>
                          {ach.link && <a href={ach.link} target="_blank" rel="noopener noreferrer" className="ml-4 text-blue-600 hover:underline">View Link</a>}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <Button onClick={() => handleUpdateStatus(ach.id, 'approved')} size="sm" className="bg-green-500 hover:bg-green-600 text-white">Approve</Button>
                        <Button onClick={() => handleUpdateStatus(ach.id, 'rejected')} size="sm" className="bg-red-500 hover:bg-red-600 text-white">Reject</Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 py-12">No pending achievements to review.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Faculty;
