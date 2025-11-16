import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CareerBot = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <main className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <div className="p-6 bg-white/50 backdrop-blur-lg rounded-full border-4 border-primary/20 shadow-lg animate-bounce-subtle mb-6">
          <Bot className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Discover Your Future with AI</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Our AI-powered career counselor will ask you a series of targeted questions to understand your unique strengths, passions, and goals. Let's build your personalized career blueprint together.
        </p>
        <Link to="/career-chat">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full shadow-lg font-semibold text-lg px-8 py-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Start the Conversation
            </Button>
        </Link>
      </main>
    </div>
  );
};

export default CareerBot;
