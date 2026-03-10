import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, Shirt, Plane, Palette, BarChart3 } from "lucide-react";
import { LucideIcon } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

const features: Feature[] = [
  { icon: Sparkles, title: "AI Outfit Generator", desc: "Get perfectly curated outfits for any occasion, weather, and mood.", color: "text-accent" },
  { icon: Shirt, title: "Smart Wardrobe", desc: "Digitize your wardrobe and let AI maximize your styling potential.", color: "text-rose-gold" },
  { icon: Palette, title: "Virtual Try-On", desc: "See how outfits look on your avatar before you wear or buy.", color: "text-accent" },
  { icon: Plane, title: "Travel Packing AI", desc: "Smart packing lists based on destination weather and planned events.", color: "text-rose-gold" },
  { icon: ShoppingBag, title: "Smart Shopping", desc: "AI-powered recommendations with price comparison across stores.", color: "text-accent" },
  { icon: BarChart3, title: "Outfit Analytics", desc: "Track your style patterns, spending, and wardrobe utilization.", color: "text-rose-gold" },
];

const FeatureCards = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} custom={0} className="text-xs font-semibold tracking-widest uppercase text-accent">
            Features
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Everything You Need to{" "}
            <span className="gradient-gold-text">Look Stunning</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground max-w-xl mx-auto">
            From AI outfit generation to virtual try-ons, StyleSense is your complete fashion intelligence platform.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="glass-card p-8 hover-lift group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={22} className={feature.color} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
