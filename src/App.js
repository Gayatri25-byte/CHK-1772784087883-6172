import React, { useState } from 'react';
import { Eye, EyeOff, Apple } from 'lucide-react';

const App = () => {
  const [email, setEmail] = useState('abc@gmail.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate a brief loading state for the "Continue" button
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-white font-sans overflow-hidden">
      {/* LEFT SECTION: BRANDING & IMAGE */}
      <div className="relative w-full md:w-[53%] bg-[#121212] flex flex-col justify-end p-12 md:p-20 overflow-hidden">
        {/* Grayscale moody background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-[0.55]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop')`,
          }}
        />
        
        {/* Artistic thin-line circles from the image */}
        <div className="absolute top-16 left-16 w-28 h-28 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-[25%] right-[10%] w-20 h-20 border border-white/5 rounded-full"></div>

        <div className="relative z-10 space-y-1">
          <h1 className="text-5xl md:text-6xl font-serif text-white font-medium tracking-tight">
            Welcome to
          </h1>
          <h2 className="text-6xl md:text-7xl font-serif text-[#d89b6f] font-bold italic leading-tight">
            StyleSense
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-sm mt-6 font-light opacity-90">
            Your AI Personal Stylist. Curated outfits, intelligent wardrobe management, and fashion-forward recommendations.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION: LOGIN FORM */}
      <div className="w-full md:w-[47%] flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-[440px] flex flex-col">
          
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-[44px] font-serif font-bold text-[#1a1a1a] mb-2 tracking-tight">Sign In</h2>
            <p className="text-[#8e8e8e] text-[15px]">Enter your credentials to access your wardrobe</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-[#4a4a4a] ml-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-[#eef4ff] border-none rounded-[18px] focus:ring-2 focus:ring-[#d89b6f]/50 transition-all outline-none text-[#1a1a1a] text-[15px]"
                placeholder="Enter email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-[#4a4a4a] ml-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-[#eceae6] border-none rounded-[18px] focus:ring-2 focus:ring-[#d89b6f]/50 transition-all outline-none text-[#1a1a1a] text-[15px]"
                  placeholder="••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#9b9b9b] hover:text-[#5a5a5a] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-[18px] bg-[#d89b6f] hover:bg-[#c98b5e] text-white font-bold text-lg rounded-[18px] shadow-lg shadow-[#d89b6f]/20 transition-all transform active:scale-[0.98] flex items-center justify-center ${isLoading ? 'opacity-80' : ''}`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Continue"
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#f0f0f0]"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.15em] font-bold">
              <span className="bg-white px-5 text-[#b0b0b0]">or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-3 py-4 bg-[#eeedeb] hover:bg-[#e4e2e0] rounded-[18px] transition-colors border-none group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="font-bold text-[#444444]">Google</span>
            </button>
            <button className="flex items-center justify-center space-x-3 py-4 bg-[#eeedeb] hover:bg-[#e4e2e0] rounded-[18px] transition-colors border-none">
              <Apple className="w-5 h-5 fill-current text-[#1a1a1a]" />
              <span className="font-bold text-[#444444]">Apple</span>
            </button>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-12 space-y-6">
            <p className="text-[#6a6a6a] text-[15px] font-medium">
              Don't have an account?{' '}
              <button className="text-[#d89b6f] font-bold hover:underline">Sign up</button>
            </p>
            <p className="text-[#c0c0c0] text-[11px] tracking-[0.2em] uppercase font-bold text-center w-full">
              Let AI style your wardrobe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;