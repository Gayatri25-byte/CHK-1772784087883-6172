import { Sparkles } from "lucide-react";

interface OutfitCombo {
  day: string;
  outfit: string;
  occasion: string;
  images: string[];
}

interface OutfitPlanProps {
  combos: OutfitCombo[];
}

const OutfitPlan = ({ combos }: OutfitPlanProps) => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={18} className="text-accent" />
        <h3 className="font-display text-lg font-semibold text-foreground">Outfit Plan</h3>
      </div>
      <div className="space-y-4">
        {combos.map((combo, i) => (
          <div key={i} className="p-4 rounded-xl bg-secondary/80 border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">{combo.day}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{combo.occasion}</span>
            </div>
            <div className="flex gap-1.5 mb-2">
              {combo.images.map((img, idx) => (
                <div key={idx} className="w-9 h-9 rounded-lg bg-muted overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{combo.outfit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitPlan;
