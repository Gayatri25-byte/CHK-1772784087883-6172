import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface WardrobeItem {
  id: number;
  name: string;
  category: string;
  image: string;
  worn: number;
  rating: number;
}

interface WardrobeItemCardProps {
  item: WardrobeItem;
  index: number;
  viewMode: "grid" | "list";
}

const WardrobeItemCard = ({ item, index, viewMode }: WardrobeItemCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`glass-card hover-lift cursor-pointer group overflow-hidden ${
        viewMode === "list" ? "flex items-center gap-4 p-3" : ""
      }`}
    >
      <div
        className={`bg-gradient-to-b from-secondary to-muted flex items-center justify-center overflow-hidden ${
          viewMode === "grid" ? "aspect-square" : "w-20 h-20 rounded-xl flex-shrink-0"
        }`}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className={`flex-1 min-w-0 ${viewMode === "grid" ? "p-4" : ""}`}>
        <h3 className="text-sm font-semibold text-foreground truncate">{item.name}</h3>
        <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-0.5">
            <Star size={12} className="text-accent fill-accent" />
            <span className="text-xs font-medium text-foreground">{item.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">· Worn {item.worn}×</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WardrobeItemCard;
