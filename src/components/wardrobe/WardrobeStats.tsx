interface Stat {
  label: string;
  value: string;
}

interface WardrobeStatsProps {
  stats: Stat[];
}

const WardrobeStats = ({ stats }: WardrobeStatsProps) => {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Wardrobe Stats</h3>
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <span className="text-sm font-semibold text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WardrobeStats;
