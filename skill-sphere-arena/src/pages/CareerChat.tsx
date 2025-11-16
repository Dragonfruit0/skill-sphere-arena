import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, User, Loader2, Sparkles } from 'lucide-react';
import { useLocalStorage } from 'react-use';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

// IMPORTANT: Move this to a .env.local file for security
const GEMINI_API_KEY = 'AIzaSyDr4UL0wqYdWveV3djU9K-oZ5ukzJfDStQ';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const CareerChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useLocalStorage<any[]>('career-chat-history', []);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start the conversation if it hasn't started yet
    if (messages.length === 0) {
      const initialBotMessage: Message = { sender: 'bot', text: "Hello! I'm here to help you discover your ideal career path. To start, what subjects do you enjoy the most in school?" };
      setMessages([initialBotMessage]);
      setConversationHistory([
        { role: 'user', parts: [{ text: "Let's begin." }] }, // Priming the conversation
        { role: 'model', parts: [{ text: initialBotMessage.text }] }
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const callGeminiAPI = async (prompt: any) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: prompt,
        })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("API Error Response:", error);
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (!data.candidates || !data.candidates[0].content) {
        console.error("Invalid API response structure:", data);
        throw new Error("Invalid API response from Gemini.");
      }
      return data.candidates[0].content.parts[0].text;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    const newHistory = [...conversationHistory, { role: 'user', parts: [{ text: userInput }] }];

    try {
        const systemPrompt = `You are an adaptive, interactive career-counselling assistant for teenagers.
Your ONLY job is to ask short, crisp, relevant questions to understand the student’s interests, hobbies, strengths, weaknesses, mindset, and ambitions.

Rules you must follow strictly:

1. Ask only one question at a time.
2. Your questions must adapt based on the student's previous answer.
3. Do NOT add explanations, praise, suggestions, summaries, or opinions. Ask questions only.
4. Questions must get progressively more specific.
5. Keep questions concise (max 1 sentence).
6. Continue asking until you have asked 7–10 questions.
7. When you have enough information and have completed the question count, output ONLY the exact string:
[BLUEPRINT_READY]`;

      const apiResponse = await callGeminiAPI([
        { role: 'user', parts: [{ text: systemPrompt }] },
        ...newHistory
      ]);

      if (apiResponse.trim() === '[BLUEPRINT_READY]') {
        // Before navigating, save the final history that led to the blueprint
        setConversationHistory(newHistory)
        navigate('/career-blueprint');
        return;
      }

      const botMessage: Message = { sender: 'bot', text: apiResponse };
      setMessages(prev => [...prev, botMessage]);
      // Update history with both user message and bot response
      setConversationHistory([...newHistory, { role: 'model', parts: [{ text: apiResponse }] }]);

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = { sender: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl h-[70vh] bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col">
          <div className="flex-grow p-6 space-y-6 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'bot' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                <div className={`px-4 py-3 rounded-2xl max-w-md ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                  {msg.text}
                </div>
                {msg.sender === 'user' && <User className="h-6 w-6 text-gray-400 flex-shrink-0" />}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                  <div className="px-4 py-3 rounded-2xl bg-gray-100">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="relative">
              <Input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isLoading ? "AI is thinking..." : "Type your answer..."}
                className="w-full rounded-full py-6 px-6"
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full" size="icon" disabled={isLoading}>
                <Sparkles className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerChat;
