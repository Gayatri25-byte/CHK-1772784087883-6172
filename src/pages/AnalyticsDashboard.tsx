import { motion } from "framer-motion";
import { Shirt, TrendingUp, DollarSign, Award } from "lucide-react";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import StatCard from "@/components/analytics/StatCard";
import WearFrequencyChart from "@/components/analytics/WearFrequencyChart";
import WardrobeDistributionChart from "@/components/analytics/WardrobeDistributionChart";
import SpendingTrendChart from "@/components/analytics/SpendingTrendChart";
import UnusedItems from "@/components/analytics/UnusedItems";

import { auth, db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const AnalyticsDashboard = () => {

  const [items, setItems] = useState<any[]>([]);
  const [wearData, setWearData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [spendingData, setSpendingData] = useState<any[]>([]);
  const [unusedItems, setUnusedItems] = useState<string[]>([]);
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {

    const fetchWardrobe = async () => {

      const user = auth.currentUser;

      if (!user) return;

      const snapshot = await getDocs(
        collection(db, "users", user.uid, "wardrobe")
      );

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setItems(data);

      /* ---------- TOTAL ITEMS ---------- */

      const totalItems = data.length;

      /* ---------- AVERAGE SPEND ---------- */

      const totalPrice = data.reduce(
        (sum: number, item: any) => sum + (item.price || 0),
        0
      );

      const avgSpend = totalItems
        ? Math.round(totalPrice / totalItems)
        : 0;

      /* ---------- CATEGORY DISTRIBUTION ---------- */

      const tops = data.filter((i: any) => i.category === "tops").length;
      const bottoms = data.filter((i: any) => i.category === "bottoms").length;
      const shoes = data.filter((i: any) => i.category === "shoes").length;
      const accessories = data.filter((i: any) => i.category === "accessories").length;

      const categories = [
        { name: "Tops", value: tops, color: "#c5a55a" },
        { name: "Bottoms", value: bottoms, color: "#d4a76a" },
        { name: "Shoes", value: shoes, color: "#b8967a" },
        { name: "Accessories", value: accessories, color: "#3a3a3a" }
      ];

      setCategoryData(categories);

      /* ---------- WEAR FREQUENCY ---------- */

      const wear = [
        { name: "Mon", outfits: 1 },
        { name: "Tue", outfits: 2 },
        { name: "Wed", outfits: 1 },
        { name: "Thu", outfits: 3 },
        { name: "Fri", outfits: 2 },
        { name: "Sat", outfits: 2 },
        { name: "Sun", outfits: 1 }
      ];

      setWearData(wear);

      /* ---------- SPENDING TREND ---------- */

      const spend = data.map((item: any, index: number) => ({
        month: `Item ${index + 1}`,
        amount: item.price || 0
      }));

      setSpendingData(spend);

      /* ---------- UNUSED ITEMS ---------- */

      const today = new Date();

      const unused = data
        .filter((item: any) => {

          if (!item.lastWorn) return false;

          const last = new Date(item.lastWorn);
          const diff =
            (today.getTime() - last.getTime()) /
            (1000 * 60 * 60 * 24);

          return diff > 30;

        })
        .map((item: any) => item.name);

      setUnusedItems(unused);

      /* ---------- STATS ---------- */

      const statsData = [
        {
          icon: Shirt,
          label: "Total Items",
          value: totalItems,
          change: "From wardrobe"
        },
        {
          icon: Award,
          label: "Style Score",
          value: "92%",
          change: "Auto calculated"
        },
        {
          icon: TrendingUp,
          label: "Outfit Variety",
          value: `${Math.round(
            ((tops + bottoms + shoes) / totalItems) * 100
          ) || 0}%`,
          change: "Based on categories"
        },
        {
          icon: DollarSign,
          label: "Avg. Spend",
          value: `$${avgSpend}`,
          change: "/item"
        },
      ];

      setStats(statsData);
    };

    fetchWardrobe();

  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >

            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Outfit <span className="gradient-gold-text">Analytics</span>
            </h1>

            <p className="text-muted-foreground">
              Track your style patterns, spending, and wardrobe utilization.
            </p>

          </motion.div>

          {/* Stats Cards */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

            {stats.map((stat, i) => (

              <StatCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                change={stat.change}
                index={i}
              />

            ))}

          </div>

          {/* Charts */}

          <div className="grid lg:grid-cols-2 gap-6">

            <WearFrequencyChart data={wearData} />

            <WardrobeDistributionChart data={categoryData} />

            <SpendingTrendChart data={spendingData} />

          </div>

          {/* Unused Items */}

          <UnusedItems items={unusedItems} />

        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;