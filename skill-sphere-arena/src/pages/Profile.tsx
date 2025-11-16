import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  query,
  serverTimestamp,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Award, User, CheckCircle, XCircle, Clock, Building2, Loader2, Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}

const Profile = () => {
  const { currentUser, userData } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [githubUrl, setGithubUrl] = useState(userData?.githubUrl || "");
  const [linkedinUrl, setLinkedinUrl] = useState(userData?.linkedinUrl || "");
  const [bio, setBio] = useState(userData?.bio || "");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);


  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loadingAchievements, setLoadingAchievements] = useState(true);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (userData) {
      setGithubUrl(userData.githubUrl || "");
      setLinkedinUrl(userData.linkedinUrl || "");
      setBio(userData.bio || "");
    }
  }, [userData]);

  useEffect(() => {
    if (!currentUser?.uid) {
      setLoadingAchievements(false);
      return;
    }

    const fetchInitialAchievements = async () => {
      setLoadingAchievements(true);
      try {
        const q = query(
          collection(db, "achievements"),
          where("userId", "==", currentUser.uid),
          orderBy("submittedAt", "desc"),
          limit(10)
        );
        const documentSnapshots = await getDocs(q);
        
        const userAchievements: Achievement[] = [];
        documentSnapshots.forEach((doc) => {
          userAchievements.push({ id: doc.id, ...doc.data() } as Achievement);
        });

        setAchievements(userAchievements);
        const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastVisible(lastDoc);

        if (documentSnapshots.docs.length < 10) {
          setHasMore(false);
        }

      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoadingAchievements(false);
      }
    };

    fetchInitialAchievements();
  }, [currentUser]);

  const fetchMoreAchievements = async () => {
    if (!lastVisible || !currentUser?.uid) return;

    setLoadingMore(true);
    try {
      const nextQuery = query(
        collection(db, "achievements"),
        where("userId", "==", currentUser.uid),
        orderBy("submittedAt", "desc"),
        startAfter(lastVisible),
        limit(10)
      );
      const documentSnapshots = await getDocs(nextQuery);

      const newAchievements: Achievement[] = [];
      documentSnapshots.forEach((doc) => {
        newAchievements.push({ id: doc.id, ...doc.data() } as Achievement);
      });

      setAchievements((prev) => [...prev, ...newAchievements]);
      const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastDoc);

      if (documentSnapshots.docs.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more achievements:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !userData) {
      alert("Please fill out the title and description.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newAchievementData = {
        userId: currentUser.uid,
        userName: userData.name,
        userRollNumber: userData.rollNumber,
        userDepartment: userData.department,
        title,
        description,
        link,
        mediaUrl: "", // No media URL for now
        status: "pending" as const,
        submittedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "achievements"), newAchievementData);

      const displayAchievement = { 
        id: docRef.id, 
        ...newAchievementData,
        status: 'pending' as const
      };
      setAchievements(prev => [displayAchievement, ...prev]);

      setTitle("");
      setDescription("");
      setLink("");
      
      alert("Achievement submitted for verification!");
    } catch (error) {
      console.error("Error submitting achievement: ", error);
      alert("Failed to submit achievement. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsUpdatingProfile(true);
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        githubUrl,
        linkedinUrl,
        bio,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
            <User className="h-12 w-12 text-gray-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{userData?.name}</h1>
            <p className="text-gray-600">{userData?.rollNumber}</p>
            <div className="flex items-center gap-2 mt-1">
                <Building2 className="h-4 w-4 text-gray-600" />
                <p className="text-gray-600">{userData?.department}</p>
            </div>
             <div className="flex items-center gap-4 mt-2">
              {userData?.githubUrl && (
                <a href={userData.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6 text-gray-600 hover:text-gray-900" />
                </a>
              )}
              {userData?.linkedinUrl && (
                <a href={userData.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6 text-gray-600 hover:text-gray-900" />
                </a>
              )}
            </div>
          </div>
        </div>
        
        {userData?.bio && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">About Me</h2>
            <p className="text-gray-600">{userData.bio}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900">
              Edit Profile
            </h2>
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="pt-6">
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <Label htmlFor="githubUrl" className="text-gray-700">
                      GitHub URL
                    </Label>
                    <Input
                      id="githubUrl"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/your-username"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedinUrl" className="text-gray-700">
                      LinkedIn URL
                    </Label>
                    <Input
                      id="linkedinUrl"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/your-profile"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-gray-700">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us a little about yourself."
                      className="bg-white"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-white font-semibold shadow-lg"
                    style={{
                      backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
                    }}
                    disabled={isUpdatingProfile}
                  >
                    {isUpdatingProfile ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900">
              <Award className="h-6 w-6" />
              Add New Achievement
            </h2>
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-gray-700">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Won 1st place in CodeFest"
                      className="bg-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-gray-700">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="A brief description of your achievement."
                      className="bg-white"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">
                      Media (Image/Certificate)
                    </Label>
                    <div className="flex items-center justify-center p-4 bg-gray-100 rounded-md border-dashed border-2 border-gray-300 mt-1">
                      <p className="text-sm text-gray-500">
                        Direct media upload coming soon!
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="link" className="text-gray-700">
                      Link to Proof (Optional)
                    </Label>
                    <Input
                      id="link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="e.g., Google Drive, GitHub link"
                      className="bg-white"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-white font-semibold shadow-lg"
                    style={{
                      backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit for Verification"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
