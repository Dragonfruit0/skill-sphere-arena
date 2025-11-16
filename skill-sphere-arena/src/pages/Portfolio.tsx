import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  Github,
  Linkedin,
  Mail,
  Printer,
  Loader2,
  CheckCircle,
} from "lucide-react";

// Interfaces
interface UserData {
  name: string;
  email: string;
  department: string;
  githubUrl?: string;
  linkedinUrl?: string;
  bio?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
}

// Component
const PortfolioPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<UserData | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user data
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUser(userDoc.data() as UserData);
        }

        // Fetch approved achievements only
        const q = query(
          collection(db, "achievements"),
          where("userId", "==", userId),
          where("status", "==", "approved"),
          orderBy("submittedAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const userAchievements: Achievement[] = [];
        querySnapshot.forEach((doc) => {
          userAchievements.push({ id: doc.id, ...doc.data() } as Achievement);
        });
        setAchievements(userAchievements);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const portfolioStyles = `
    body { 
      --bg: #ffffff; 
      --card: #f9fafb; 
      --text: #1f2937; 
      --muted: #6b7280; 
      --accent: #4f46e5; 
      --link: #4f46e5; 
      --chip: #f3f4f6; 
      --border: #e5e7eb; 
    }
    .portfolio-body { background: var(--bg); color: var(--text); font: 500 15px/1.6 Inter, system-ui, sans-serif; }
    .portfolio-body a { color: var(--link); text-decoration: none; }
    .portfolio-wrap { max-width: 900px; margin: 40px auto; padding: 0 20px; }
    .portfolio-header { display: flex; flex-wrap: wrap; gap: 18px; align-items: flex-start; justify-content: space-between; margin-bottom: 18px; }
    .portfolio-name h1 { margin: 0; font-size: 30px; line-height: 1.2; color: #111827;}
    .portfolio-tag { color: var(--muted); margin-top: 6px; }
    .portfolio-chip { background: var(--chip); border: 1px solid var(--border); padding: 6px 10px; border-radius: 999px; display: inline-flex; gap: 6px; align-items: center; color: var(--muted); }
    .portfolio-chip:hover { background: #e5e7eb; }
    .portfolio-section { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 20px; margin: 14px 0; }
    .portfolio-section h2 { margin: 0 0 10px 0; font-size: 18px; color: var(--accent); letter-spacing: .2px; }
    .portfolio-item h3 { margin: 0 0 6px 0; font-size: 16px; }
    .portfolio-sub { color: var(--muted); font-size: 14px; margin-bottom: 6px; }
    .portfolio-body ul { margin: 8px 0 0 0; padding: 0; list-style: none; }
    .portfolio-body li { margin-bottom: 12px; }
    .print-btn { position: fixed; bottom: 20px; right: 20px; background: var(--accent); color: white; border: none; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 100; }
    
    @media print {
      .portfolio-body { --bg:#fff; --card:#fff; --text:#000; --muted:#444; --accent:#000; --link:#000; --chip:#f6f6f6; --border:#ddd; color: var(--text); }
      .portfolio-wrap { margin: 20px; }
      .print-btn, .non-printable { display: none; }
      .portfolio-section { border: 1px solid #ccc; page-break-inside: avoid; }
      .portfolio-chip { border-color: #ccc; }
      .portfolio-body a { color: var(--text); text-decoration: none; }
    }
  `;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-[#4f46e5]" />
      </div>
    );
  }

  if (!user) {
    return <div className="text-center py-12">User not found.</div>;
  }

  return (
    <>
      <style>{portfolioStyles}</style>
      <div className="portfolio-body">
        <button
          className="print-btn"
          onClick={() => window.print()}
          title="Print Portfolio"
        >
          <Printer size={20} />
        </button>

        <main className="portfolio-wrap">
          <header className="portfolio-header">
            <div className="portfolio-name">
              <h1>{user.name}</h1>
              <div className="portfolio-tag">{user.department}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.email && (
                <a className="portfolio-chip" href={`mailto:${user.email}`}>
                  <Mail size={14} /> {user.email}
                </a>
              )}
              {user.linkedinUrl && (
                <a
                  className="portfolio-chip"
                  href={user.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
              )}
              {user.githubUrl && (
                <a
                  className="portfolio-chip"
                  href={user.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={14} /> GitHub
                </a>
              )}
            </div>
          </header>

          <section className="portfolio-section">
            <h2>About</h2>
            <p>{user.bio || "This user has not provided a bio yet."}</p>
          </section>

          <section className="portfolio-section">
            <h2>Approved Achievements</h2>
            {achievements.length > 0 ? (
              <ul>
                {achievements.map((ach) => (
                  <li key={ach.id} className="flex items-start gap-3 p-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-base text-gray-800">{ach.title}</h3>
                      <p className="text-sm text-gray-600">
                        {ach.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No approved achievements to display.</p>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default PortfolioPage;
