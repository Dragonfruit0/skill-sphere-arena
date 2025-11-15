import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/firebase";
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Award, User, CheckCircle, XCircle, Clock, Building2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}

const Profile = () => {
  const { userData } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    if (!userData) return;

    const q = query(collection(db, "achievements"), where("userId", "==", userData.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userAchievements: Achievement[] = [];
      querySnapshot.forEach((doc) => {
        userAchievements.push({ id: doc.id, ...doc.data() } as Achievement);
      });
      setAchievements(userAchievements);
    });

    return () => unsubscribe();
  }, [userData]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !file || !userData) return;

    setIsSubmitting(true);
    try {
      const storageRef = ref(storage, `achievements/${Date.now()}_${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const mediaUrl = await getDownloadURL(uploadResult.ref);

      await addDoc(collection(db, "achievements"), {
        userId: userData.uid,
        userName: userData.name,
        userRollNumber: userData.rollNumber,
        userDepartment: userData.department, // Add this line
        title,
        description,
        link,
        mediaUrl,
        status: "pending",
        submittedAt: serverTimestamp(),
      });

      setTitle("");
      setDescription("");
      setLink("");
      setFile(null);
      alert("Achievement submitted for verification!");
    } catch (error) {
      console.error("Error submitting achievement: ", error);
      alert("Failed to submit achievement. Please try again.");
    } finally {
      setIsSubmitting(false);
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
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
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
                    <Label htmlFor="media" className="text-gray-700">
                      Media (Image/Certificate)
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="media"
                        type="file"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="link" className="text-gray-700">
                      Link (Optional)
                    </Label>
                    <Input
                      id="link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="e.g., https://github.com/your-project"
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

          <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">My Achievements</h2>
          <Card className="bg-gray-50 border-gray-200 p-6">
            {achievements.length > 0 ? (
              <ul className="space-y-4">
                {achievements.map((ach) => (
                  <li key={ach.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-800">{ach.title}</p>
                      <p className="text-sm text-gray-600">{ach.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {ach.status === 'approved' && <CheckCircle className="h-6 w-6 text-green-500" />}
                      {ach.status === 'rejected' && <XCircle className="h-6 w-6 text-red-500" />}
                      {ach.status === 'pending' && <Clock className="h-6 w-6 text-yellow-500" />}
                      <span className="capitalize text-gray-700">{ach.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Your submitted achievements will appear here.</p>
              </div>
            )}
          </Card>
        </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
