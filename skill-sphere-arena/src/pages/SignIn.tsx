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
    // Redirect the user as soon as their data is available
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
      // On success, the onAuthStateChanged listener and useEffect will handle the rest.
      // isSigningIn remains true to keep the UI in a loading state.
    } catch (error: any) {
      setError("Failed to sign in. Please check your roll number and password.");
      setIsSigningIn(false); // Only set to false on error
    }
  };

  // This covers two scenarios:
  // 1. The initial authentication check when the app loads.
  // 2. A logged-in user revisiting the sign-in page (prevents form flash).
  // We exclude 'isSigningIn' because if the user is actively signing in, we want to show the disabled form, not a blank loader.
  if (loading || (currentUser && !isSigningIn)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // The user is in the process of logging in if they clicked the button OR
  // if auth state has changed but we are still fetching their user data from Firestore.
  const isProcessingLogin = isSigningIn || (currentUser && !userData);

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
                disabled={isProcessingLogin}
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
                disabled={isProcessingLogin}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button onClick={handleSignIn} className="w-full" disabled={isProcessingLogin}>
              {isProcessingLogin && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isProcessingLogin ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
