import { motion } from "framer-motion";
import heroFashion from "@/assets/hero-fashion.jpg";

const LoginHero = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal" />
      <img
        src={heroFashion}
        alt="Fashion"
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-charcoal/40" />

      <motion.div
        className="absolute top-20 left-16 w-20 h-20 rounded-full border border-gold/30 animate-float"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-14 h-14 rounded-full border border-rose-gold/20 animate-float-delayed"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 flex flex-col justify-end p-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="font-display text-5xl font-bold text-ivory leading-tight mb-4">
            Welcome to<br />
            <span className="gradient-gold-text">StyleSense</span>
          </h1>
          <p className="text-ivory/70 text-lg font-light max-w-md">
            Your AI Personal Stylist. Curated outfits, intelligent wardrobe management, and fashion-forward recommendations.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginHero;
