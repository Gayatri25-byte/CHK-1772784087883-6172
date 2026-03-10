// src/components/signup/SocialLoginButtons.tsx
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SocialLoginButtons = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle redirect result (for mobile/fallback)
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log("Redirect sign-in successful", result.user);
          navigate("/");
        }
      } catch (error) {
        console.error("Redirect sign-in error:", error);
      }
    };
    
    handleRedirectResult();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // Using popup (better UX for desktop)
      const result = await signInWithPopup(auth, googleProvider);
      
      // Get user info
      const user = result.user;
      console.log("Google sign-in successful:", user);
      
      // You can access:
      // - user.displayName (user's full name)
      // - user.email (user's email)
      // - user.photoURL (profile picture)
      // - user.uid (unique Firebase ID)
      
      // Redirect to home page
      navigate("/");
      
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      
      // Handle specific errors
      if (error.code === "auth/popup-blocked") {
        // Fallback to redirect if popup is blocked
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectError) {
          alert("Please enable popups for this site to sign in with Google.");
        }
      } else if (error.code === "auth/account-exists-with-different-credential") {
        alert("An account already exists with the same email but different sign-in method.");
      } else {
        alert(error.message || "Error signing in with Google.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        type="button"
        className="flex items-center justify-center gap-2 p-3 border border-charcoal/10 rounded-lg hover:bg-charcoal/5 transition disabled:opacity-50"
      >
        <FcGoogle className="w-5 h-5" />
        <span className="text-sm font-medium text-charcoal">
          {loading ? "Loading..." : "Google"}
        </span>
      </button>
      
      {/* Apple button remains the same */}
      <button
        type="button"
        className="flex items-center justify-center gap-2 p-3 border border-charcoal/10 rounded-lg hover:bg-charcoal/5 transition"
      >
        <FaApple className="w-5 h-5 text-charcoal" />
        <span className="text-sm font-medium text-charcoal">Apple</span>
      </button>
    </div>
  );
};

export default SocialLoginButtons;