import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import fashionFlatlay from "@/assets/fashion-flatlay.jpg";

const WardrobeDemo = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <img
                src={fashionFlatlay}
                alt="Wardrobe items"
                className="rounded-3xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent rounded-3xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Your Wardrobe,{" "}
              <span className="gradient-gold-text">Reimagined</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Upload your clothing items and let our AI organize, categorize, and create hundreds of outfit combinations you never thought of.
            </p>
            <div className="space-y-4">
              {["Smart categorization by type, color & season", "AI-powered outfit combinations", "Wardrobe gap analysis & shopping suggestions"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <Link
              to="/wardrobe"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full gradient-gold text-primary-foreground font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              Explore Wardrobe
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WardrobeDemo;
