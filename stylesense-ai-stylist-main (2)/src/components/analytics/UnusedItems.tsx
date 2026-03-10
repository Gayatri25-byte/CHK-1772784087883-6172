import { motion } from "framer-motion";

interface UnusedItemsProps {
  items: string[];
}

const UnusedItems = ({ items }: UnusedItemsProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6 mt-6">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Unused Items (30 days)</h3>
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <div key={item} className="px-4 py-2 rounded-xl bg-secondary border border-border/50 text-sm text-foreground">
            {item}
            <span className="text-xs text-muted-foreground ml-2">— consider donating or styling</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default UnusedItems;
