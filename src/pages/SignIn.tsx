import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const SignIn = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();
  const { currentUser, userData, loading } = useAuth();

  useEffect(() => {
    if (currentUser && userData) {
      if (userData.role === 'faculty') {
        navigate("/faculty");
      } else {
        navigate("/home");
      }
    }
  }, [currentUser, userData, navigate]);

  const handleSignIn = async () => {
    setError("");
    setIsSigningIn(true);
    const email = `${rollNumber}@example.com`;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation is handled by the useEffect hook
    } catch (error: any) {
      setError("Failed to sign in. Please check your roll number and password.");
      setIsSigningIn(false);
    }
  };

  // Show a loader only if auth state is loading but there's no user yet,
  // or if the user is authenticated but their data hasn't loaded yet.
  if (loading || (currentUser && !userData)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  // If user is logged in, they will be redirected by useEffect. 
  // Otherwise, show the sign-in form.
  if (!currentUser) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Sign In to Skill Sphere Arena</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="roll-number">Roll Number</Label>
                  <Input
                    id="roll-number"
                    type="text"
                    placeholder="Enter your roll number"
                    required
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button onClick={handleSignIn} className="w-full" disabled={isSigningIn}>
                  {isSigningIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} 
                  {isSigningIn ? 'Signing In...' : 'Sign In'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
  }
  
  // Fallback loader while redirecting
  return (
    <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );

};

export default SignIn;
