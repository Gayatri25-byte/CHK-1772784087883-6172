import { CheckCircle2, Circle } from "lucide-react";

interface PackingItem {
  name: string;
  packed: boolean;
  image: string;
}

interface PackingCategory {
  category: string;
  items: PackingItem[];
}

interface PackingListProps {
  items: PackingCategory[];
  packedCount: number;
  totalCount: number;
  onTogglePacked: (catIdx: number, itemIdx: number) => void;
}

const PackingList = ({ items, packedCount, totalCount, onTogglePacked }: PackingListProps) => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg font-semibold text-foreground">Packing List</h3>
        <span className="text-xs font-medium text-accent">{packedCount}/{totalCount} packed</span>
      </div>

      <div className="w-full h-2 rounded-full bg-secondary mb-6">
        <div
          className="h-2 rounded-full gradient-gold transition-all duration-500"
          style={{ width: `${(packedCount / totalCount) * 100}%` }}
        />
      </div>

      <div className="space-y-6">
        {items.map((cat, catIdx) => (
          <div key={cat.category}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{cat.category}</p>
            <div className="space-y-2">
              {cat.items.map((item, itemIdx) => (
                <button
                  key={item.name}
                  onClick={() => onTogglePacked(catIdx, itemIdx)}
                  className="flex items-center gap-3 w-full text-left py-2 hover:bg-secondary/50 rounded-lg px-2 transition-colors"
                >
                  {item.packed ? (
                    <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
                  ) : (
                    <Circle size={18} className="text-muted-foreground flex-shrink-0" />
                  )}
                  <div className="w-8 h-8 rounded-md bg-muted overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <span className={`text-sm ${item.packed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackingList;
