import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/firebase";
import { collection, onSnapshot, query, where, doc, updateDoc, increment } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Building2 } from 'lucide-react';

interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  userName: string;
  userRollNumber: string;
  userDepartment: string;
  mediaUrl: string;
  link?: string;
  status: 'pending' | 'approved' | 'rejected';
}

const Faculty = () => {
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

  const handleUpdateStatus = async (achievement: Achievement, status: 'approved' | 'rejected') => {
    const achievementRef = doc(db, "achievements", achievement.id);
    await updateDoc(achievementRef, { status });

    if (status === 'approved') {
        const userRef = doc(db, "users", achievement.userId);
        // Atomically increment the user's score by 10
        await updateDoc(userRef, {
            score: increment(10)
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Achievement Review</h1>
        <Card>
          <CardHeader>
            <CardTitle>Pending Achievements for Review</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingAchievements.length > 0 ? (
              <ul className="space-y-4">
                {pendingAchievements.map((ach) => (
                  <li key={ach.id} className="p-4 border rounded-lg bg-white shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                      <div className="flex-grow">
                        <p className="font-bold text-lg text-gray-800">{ach.title}</p>
                        <div className="text-sm text-gray-600 mt-1">
                          <p>Submitted by: <span className="font-semibold">{ach.userName}</span> ({ach.userRollNumber})</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            <span>{ach.userDepartment}</span>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-700">{ach.description}</p>
                        <div className="mt-3">
                          <a href={ach.mediaUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">View Media</a>
                          {ach.link && <a href={ach.link} target="_blank" rel="noopener noreferrer" className="ml-4 text-blue-600 hover:underline font-medium">View Link</a>}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                        <Button onClick={() => handleUpdateStatus(ach, 'approved')} size="sm" className="bg-green-500 hover:bg-green-600 text-white">Approve</Button>
                        <Button onClick={() => handleUpdateStatus(ach, 'rejected')} size="sm" className="bg-red-500 hover:bg-red-600 text-white">Reject</Button>
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
