import { motion } from "framer-motion";

interface ClothingItem {
  id: number;
  name: string;
  image: string;
}

interface ClothingSelectorProps {
  items: ClothingItem[];
  selectedItems: number[];
  onToggleItem: (id: number) => void;
}

const ClothingSelector = ({ items, selectedItems, onToggleItem }: ClothingSelectorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      <div className="glass-card p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Select Clothing
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onToggleItem(item.id)}
              className={`rounded-xl border transition-all text-left overflow-hidden ${
                selectedItems.includes(item.id)
                  ? "border-accent bg-accent/10 shadow-md ring-2 ring-accent/20"
                  : "border-border bg-secondary hover:bg-muted"
              }`}
            >
              <div className="aspect-square bg-gradient-to-b from-muted to-secondary overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain p-2 hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="text-xs font-medium text-foreground p-2.5 text-center">{item.name}</p>
            </button>
          ))}
        </div>
      </div>

      <button className="w-full py-4 rounded-xl gradient-gold text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
        Save Look
      </button>
    </motion.div>
  );
};

export default ClothingSelector;
