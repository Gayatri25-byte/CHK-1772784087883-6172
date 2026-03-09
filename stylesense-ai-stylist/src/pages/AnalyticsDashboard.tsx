import { motion } from "framer-motion";
import { Shirt, TrendingUp, DollarSign, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/analytics/StatCard";
import WearFrequencyChart from "@/components/analytics/WearFrequencyChart";
import WardrobeDistributionChart from "@/components/analytics/WardrobeDistributionChart";
import SpendingTrendChart from "@/components/analytics/SpendingTrendChart";
import UnusedItems from "@/components/analytics/UnusedItems";

const wearData = [
  { name: "Mon", outfits: 1 },
  { name: "Tue", outfits: 2 },
  { name: "Wed", outfits: 1 },
  { name: "Thu", outfits: 3 },
  { name: "Fri", outfits: 2 },
  { name: "Sat", outfits: 2 },
  { name: "Sun", outfits: 1 },
];

const categoryData = [
  { name: "Tops", value: 35, color: "#c5a55a" },
  { name: "Bottoms", value: 25, color: "#d4a76a" },
  { name: "Shoes", value: 20, color: "#b8967a" },
  { name: "Accessories", value: 20, color: "#3a3a3a" },
];

const spendingData = [
  { month: "Jan", amount: 320 },
  { month: "Feb", amount: 180 },
  { month: "Mar", amount: 450 },
  { month: "Apr", amount: 280 },
  { month: "May", amount: 520 },
  { month: "Jun", amount: 190 },
];

const stats = [
  { icon: Shirt, label: "Total Items", value: "47", change: "+3 this month" },
  { icon: Award, label: "Style Score", value: "92%", change: "+5% from last month" },
  { icon: TrendingUp, label: "Outfit Variety", value: "78%", change: "Good diversity" },
  { icon: DollarSign, label: "Avg. Spend", value: "$310", change: "/month" },
];

const unusedItems = ["Navy Midi Skirt", "Gold Heels"];

const AnalyticsDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Outfit <span className="gradient-gold-text">Analytics</span>
            </h1>
            <p className="text-muted-foreground">Track your style patterns, spending, and wardrobe utilization.</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} change={stat.change} index={i} />
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <WearFrequencyChart data={wearData} />
            <WardrobeDistributionChart data={categoryData} />
            <SpendingTrendChart data={spendingData} />
          </div>

          <UnusedItems items={unusedItems} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
