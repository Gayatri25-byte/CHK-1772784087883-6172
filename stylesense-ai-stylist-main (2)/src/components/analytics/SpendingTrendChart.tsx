import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface SpendingData {
  month: string;
  amount: number;
}

interface SpendingTrendChartProps {
  data: SpendingData[];
}

const SpendingTrendChart = ({ data }: SpendingTrendChartProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 lg:col-span-2">
      <h3 className="font-display text-lg font-semibold text-foreground mb-6">Spending Trend</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 15%, 88%)" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 5%, 45%)", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 5%, 45%)", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: "hsl(40, 20%, 97%)",
              border: "1px solid hsl(35, 15%, 88%)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          />
          <Line type="monotone" dataKey="amount" stroke="hsl(38, 70%, 55%)" strokeWidth={2.5} dot={{ fill: "hsl(38, 70%, 55%)", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SpendingTrendChart;
