import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface WardrobeDistributionChartProps {
  data: CategoryData[];
}

const WardrobeDistributionChart = ({ data }: WardrobeDistributionChartProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
      <h3 className="font-display text-lg font-semibold text-foreground mb-6">Wardrobe Distribution</h3>
      <div className="flex items-center gap-8">
        <ResponsiveContainer width="50%" height={200}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-3">
          {data.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-sm text-foreground">{cat.name}</span>
              <span className="text-sm font-semibold text-muted-foreground">{cat.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WardrobeDistributionChart;
