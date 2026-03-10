import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.ts";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import SocialLoginButtons from "../login/SocialLoginButtons.tsx";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1️⃣ Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2️⃣ Automatically create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date()
      });

      alert("Account created successfully!");

      // 3️⃣ Redirect user
      navigate("/");

    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-semibold text-foreground mb-2">
          Welcome to
        </h2>
        <h1 className="font-display text-4xl font-bold gradient-gold bg-clip-text text-transparent">
          StyleSense
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Your AI Personal Stylist. Curated outfits, intelligent wardrobe
          management, and fashion-forward recommendations.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSignup}>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl gradient-gold text-primary-foreground font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity animate-pulse-glow"
        >
          Create Account
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">
          or continue with
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <SocialLoginButtons />

      <p className="text-center text-sm text-muted-foreground mt-8">
        Already have an account?{" "}
        <Link to="/login" className="text-accent font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
