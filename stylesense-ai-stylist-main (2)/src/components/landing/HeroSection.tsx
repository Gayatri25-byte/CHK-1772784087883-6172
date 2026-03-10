import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import heroFashion from "@/assets/hero-fashion.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/50 to-background" />
      
      <div className="absolute top-32 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-1/4 w-48 h-48 rounded-full bg-rose-gold/5 blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wider uppercase mb-6">
              <Sparkles size={14} />
              AI-Powered Fashion
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6 text-balance">
              Your AI Personal Stylist &{" "}
              <span className="gradient-gold-text">Smart Wardrobe</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
              StyleSense analyzes your wardrobe, weather, occasion, and trends to create perfect outfit recommendations — every single day.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/wardrobe"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary-foreground font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity hover-lift"
              >
                Upload Your Wardrobe
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/outfit-generator"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border bg-secondary text-foreground font-semibold text-sm tracking-wide hover:bg-muted transition-colors"
              >
                Try AI Stylist
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl" />
              <img
                src={heroFashion}
                alt="AI Fashion Stylist"
                className="relative rounded-3xl shadow-2xl w-full aspect-square object-cover"
              />
              <motion.div
                className="absolute -bottom-6 -left-6 glass-card p-4 flex items-center gap-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                  <Sparkles size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Outfit Score</p>
                  <p className="text-lg font-bold gradient-gold-text">96%</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-4 -right-4 glass-card p-3 px-4"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <p className="text-xs text-muted-foreground">Today's Weather</p>
                <p className="text-sm font-semibold text-foreground">☀️ 24°C — Perfect for layers</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
