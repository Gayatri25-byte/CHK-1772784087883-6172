import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface WearData {
  name: string;
  outfits: number;
}

interface WearFrequencyChartProps {
  data: WearData[];
}

const WearFrequencyChart = ({ data }: WearFrequencyChartProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
      <h3 className="font-display text-lg font-semibold text-foreground mb-6">Wear Frequency</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 5%, 45%)", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 5%, 45%)", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: "hsl(40, 20%, 97%)",
              border: "1px solid hsl(35, 15%, 88%)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          />
          <Bar dataKey="outfits" fill="hsl(38, 70%, 55%)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default WearFrequencyChart;
