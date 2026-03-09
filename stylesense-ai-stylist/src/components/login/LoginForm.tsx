import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import SocialLoginButtons from "./SocialLoginButtons";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  // --- ADDED THIS FUNCTION ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation check
    if (email && password) {
      console.log("Logging in with:", email, password);
      // For now, let's redirect to the main page/dashboard
      navigate("/"); 
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="font-display text-3xl font-semibold text-foreground mb-2">
        Sign In
      </h2>
      <p className="text-muted-foreground mb-8">
        Enter your credentials to access your wardrobe
      </p>

      {/* --- CHANGED onSubmit HERE --- */}
      <form className="space-y-5" onSubmit={handleLogin}>
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
          Continue
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <SocialLoginButtons />

      <p className="text-center text-sm text-muted-foreground mt-8">
        Don't have an account?{" "}
        <Link to="/signup" className="text-accent font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;