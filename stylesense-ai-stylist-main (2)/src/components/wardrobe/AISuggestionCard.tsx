import { motion } from "framer-motion";

interface AISuggestion {
  outfit: string;
  score: number;
  occasion: string;
  images: string[];
}

interface AISuggestionCardProps {
  suggestion: AISuggestion;
  index: number;
}

const AISuggestionCard = ({ suggestion, index }: AISuggestionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      className="p-4 rounded-xl bg-secondary/80 border border-border/50 hover:border-accent/30 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-accent">{suggestion.occasion}</span>
        <span className="text-xs font-bold gradient-gold-text">{suggestion.score}%</span>
      </div>
      <div className="flex gap-1 mb-2">
        {suggestion.images.map((img, idx) => (
          <div key={idx} className="w-10 h-10 rounded-lg bg-muted overflow-hidden">
            <img src={img} alt="" className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{suggestion.outfit}</p>
    </motion.div>
  );
};

export default AISuggestionCard;
