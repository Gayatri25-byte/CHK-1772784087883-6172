import { motion } from "framer-motion";
import { Heart, Share2, RotateCcw } from "lucide-react";

interface OutfitItem {
  label: string;
  name: string;
  image: string;
}

interface OutfitResult {
  id: number;
  items: OutfitItem[];
  score: number;
  colorHarmony: string[];
  mood: string;
}

interface OutfitResultCardProps {
  outfit: OutfitResult;
  onReset: () => void;
}

const OutfitResultCard = ({ outfit, onReset }: OutfitResultCardProps) => {
  return (
    <motion.div
      key={outfit.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-foreground">
            {outfit.mood}
          </h3>
          <p className="text-sm text-muted-foreground">Confidence Score: {outfit.score}%</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 rounded-xl bg-secondary hover:bg-muted transition-colors text-muted-foreground">
            <Heart size={18} />
          </button>
          <button className="p-2.5 rounded-xl bg-secondary hover:bg-muted transition-colors text-muted-foreground">
            <Share2 size={18} />
          </button>
          <button onClick={onReset} className="p-2.5 rounded-xl bg-secondary hover:bg-muted transition-colors text-muted-foreground">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Outfit Items with Images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {outfit.items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl bg-secondary/80 border border-border/50 overflow-hidden group"
          >
            <div className="aspect-square bg-gradient-to-b from-muted to-secondary flex items-center justify-center p-3 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-3">
              <p className="text-[10px] text-accent uppercase tracking-wider font-semibold">{item.label}</p>
              <p className="text-xs font-semibold text-foreground mt-0.5">{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Color Harmony */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-3">Color Harmony</p>
        <div className="flex gap-3">
          {outfit.colorHarmony.map((color, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className="w-12 h-12 rounded-xl shadow-md border border-border/30"
                style={{ backgroundColor: color }}
              />
              <span className="text-[10px] text-muted-foreground font-mono">{color}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default OutfitResultCard;
