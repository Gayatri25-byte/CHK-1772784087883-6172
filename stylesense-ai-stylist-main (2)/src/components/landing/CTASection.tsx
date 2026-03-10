import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card-dark text-center py-20 px-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-rose-gold/10" />
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ivory mb-4">
              Ready to Transform Your Style?
            </h2>
            <p className="text-ivory/60 max-w-lg mx-auto mb-8">
              Join thousands who've elevated their fashion game with AI-powered styling.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full gradient-gold text-primary-foreground font-semibold tracking-wide hover:opacity-90 transition-opacity"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
