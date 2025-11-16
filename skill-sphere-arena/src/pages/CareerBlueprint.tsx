import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Navigation } from '@/components/Navigation';
import {
  Loader2, ArrowRight, Book, Briefcase, Lightbulb, TrendingUp, DollarSign, ExternalLink, AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// --- Interfaces and Data ---
interface RoadmapStep {
  title: string;
  description: string;
}

interface Resource {
  name: string;
  url: string;
  type: 'Course' | 'Tool' | 'Website' | 'Book';
}

interface CareerData {
  career_title: string;
  career_description: string;
  step_by_step_roadmap: RoadmapStep[];
  required_skills: string[];
  recommended_education: string[];
  certifications_and_courses: Resource[];
  portfolio_project_ideas: string[];
  internship_and_work_opportunities: string[];
  salary_ranges: string;
  potential_job_roles: string[];
  current_industry_trends: string[];
  pros: string[];
  cons: string[];
  alternative_career_options: string[];
}

// IMPORTANT: Move this to a .env.local file for security
const GEMINI_API_KEY = 'AIzaSyBHWULpdNM7feCXGMw7jzLPH-5rj2HdT2s';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;


const CareerBlueprint = () => {
  const [conversationHistory] = useLocalStorage<any[]>('career-chat-history', []);
  const [blueprint, setBlueprint] = useState<CareerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateBlueprint = async () => {
      if (!conversationHistory || conversationHistory.length === 0) {
        setError("No conversation history found.");
        setLoading(false);
        return;
      }

      const prompt = `
        Based on the following conversation with a teenager, generate a comprehensive and personalized Career Path Blueprint. 
        Conversation History: ${JSON.stringify(conversationHistory)}

        Your task is to act as an expert career counselor. Analyze the user's interests, strengths, and preferences from the conversation and decide on the single most suitable career path for them. Then, generate a detailed blueprint for that career.

        The output MUST be a valid JSON object following this exact structure:
        {
          "career_title": "...",
          "career_description": "...",
          "step_by_step_roadmap": [{"title": "...", "description": "..."}],
          "required_skills": ["..."],
          "recommended_education": ["..."],
          "certifications_and_courses": [{"name": "...", "url": "...", "type": "Course | Tool | Website | Book"}],
          "portfolio_project_ideas": ["..."],
          "internship_and_work_opportunities": ["..."],
          "salary_ranges": "...",
          "potential_job_roles": ["..."],
          "current_industry_trends": ["..."],
          "pros": ["..."],
          "cons": ["..."],
          "alternative_career_options": ["..."]
        }

        Ensure all fields are filled with high-quality, actionable, and encouraging information. The roadmap descriptions should relate back to the user's interests. Provide real, credible resources and websites.
      `;

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${await response.text()}`);
        }

        const data = await response.json();
        const jsonString = data.candidates[0].content.parts[0].text.replace(/\`\`\`json|\`\`\`/g, '').trim();
        const parsedBlueprint = JSON.parse(jsonString);
        setBlueprint(parsedBlueprint);

      } catch (err) {
        console.error("Error generating blueprint:", err);
        setError("Failed to generate your career blueprint. The AI may be overloaded. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    generateBlueprint();
  }, [conversationHistory]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 flex-col gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg text-gray-700">Analyzing your answers and building your personalized blueprint...</p>
        <p className="text-sm text-gray-500">This can take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
       <div className="flex h-screen items-center justify-center bg-gray-50 flex-col gap-4 px-4 text-center">
         <AlertTriangle className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-bold text-gray-800">Oops! Something went wrong.</h2>
        <p className="text-lg text-destructive max-w-xl">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  if (!blueprint) {
    return null;
  }

  const Section = ({ title, icon: Icon, children } : any) => (
    <Card className="p-6 shadow-md animate-fade-in"> 
      <div className="flex items-center gap-3 mb-4">
        <Icon className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700">{children}</div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-3">Your Career Blueprint: {blueprint.career_title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{blueprint.career_description}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Section title="Step-by-Step Roadmap" icon={TrendingUp}>
              <ul className="space-y-4 not-prose">
                {blueprint.step_by_step_roadmap.map((step, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">{i + 1}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Portfolio Project Ideas" icon={Lightbulb}>
                <ul className="list-disc list-inside space-y-2">
                    {blueprint.portfolio_project_ideas.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
            </Section>

            <Section title="Pros & Cons" icon={Briefcase}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-lg text-green-600 mb-2">Pros</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {blueprint.pros.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-2">Cons</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {blueprint.cons.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </div>
                </div>
            </Section>
          </div>

          <div className="space-y-8">
             <Section title="Key Skills" icon={Book}>
                <div className="flex flex-wrap gap-2">
                    {blueprint.required_skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </div>
            </Section>
            <Section title="Salary & Roles" icon={DollarSign}>
                <p><strong>Salary Range:</strong> {blueprint.salary_ranges}</p>
                <p className="mt-2"><strong>Potential Roles:</strong></p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {blueprint.potential_job_roles.map(role => <Badge key={role} variant="outline">{role}</Badge>)}
                </div>
            </Section>
             <Section title="Learning Resources" icon={ExternalLink}>
                <ul className="space-y-3">
                    {blueprint.certifications_and_courses.map(res => (
                        <li key={res.name}>
                           <a href={res.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline flex items-center gap-2">
                                {res.name} <ExternalLink className="h-4 w-4" />
                            </a>
                            <span className="text-xs text-gray-500"> ({res.type})</span>
                        </li>
                    ))}
                </ul>
            </Section>
             <Section title="Alternative Career Paths" icon={ArrowRight}>
                 <div className="flex flex-wrap gap-2">
                    {blueprint.alternative_career_options.map(alt => <Badge key={alt} variant="default">{alt}</Badge>)}
                </div>
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareerBlueprint;
