import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import TripDetails from "@/components/travel/TripDetails";
import PackingList from "@/components/travel/PackingList";
import OutfitPlan from "@/components/travel/OutfitPlan";
import travelSuitcase from "@/assets/travel-suitcase.jpg";

import charcoalBlazer from "@/assets/clothing/charcoal-blazer.png";
import ivoryBlouse from "@/assets/clothing/ivory-blouse.png";
import creamTrousers from "@/assets/clothing/cream-trousers.png";
import navySkirt from "@/assets/clothing/navy-skirt.png";
import goldHeels from "@/assets/clothing/gold-heels.png";
import whiteSneakers from "@/assets/clothing/white-sneakers.png";
import pearlNecklace from "@/assets/clothing/pearl-necklace.png";
import silkScarf from "@/assets/clothing/silk-scarf.png";
import leatherTote from "@/assets/clothing/leather-tote.png";
import cashmereSweater from "@/assets/clothing/cashmere-sweater.png";
import blackJeans from "@/assets/clothing/black-jeans.png";

const initialPackingList = [
  { category: "Essentials", items: [
    { name: "Charcoal Blazer", packed: true, image: charcoalBlazer },
    { name: "Ivory Silk Blouse × 2", packed: true, image: ivoryBlouse },
    { name: "Cream Trousers", packed: false, image: creamTrousers },
    { name: "Navy Midi Skirt", packed: false, image: navySkirt },
  ]},
  { category: "Shoes", items: [
    { name: "Gold Heels", packed: true, image: goldHeels },
    { name: "White Sneakers", packed: false, image: whiteSneakers },
  ]},
  { category: "Accessories", items: [
    { name: "Pearl Necklace", packed: false, image: pearlNecklace },
    { name: "Silk Scarf", packed: false, image: silkScarf },
    { name: "Leather Tote", packed: true, image: leatherTote },
  ]},
];

const outfitCombos = [
  { day: "Day 1 — Arrival", outfit: "Cashmere Sweater + Black Jeans + White Sneakers", occasion: "Travel", images: [cashmereSweater, blackJeans, whiteSneakers] },
  { day: "Day 2 — Business", outfit: "Charcoal Blazer + Ivory Blouse + Cream Trousers + Gold Heels", occasion: "Meeting", images: [charcoalBlazer, ivoryBlouse, creamTrousers, goldHeels] },
  { day: "Day 3 — Explore", outfit: "Silk Blouse + Navy Skirt + White Sneakers", occasion: "Sightseeing", images: [ivoryBlouse, navySkirt, whiteSneakers] },
  { day: "Day 4 — Dinner", outfit: "Charcoal Blazer + Navy Skirt + Gold Heels + Pearl Necklace", occasion: "Fine Dining", images: [charcoalBlazer, navySkirt, goldHeels, pearlNecklace] },
];

const TravelPacking = () => {
  const [items, setItems] = useState(initialPackingList);

  const togglePacked = (catIdx: number, itemIdx: number) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[catIdx] = {
        ...updated[catIdx],
        items: updated[catIdx].items.map((item, i) =>
          i === itemIdx ? { ...item, packed: !item.packed } : item
        ),
      };
      return updated;
    });
  };

  const totalItems = items.reduce((acc, cat) => acc + cat.items.length, 0);
  const packedItems = items.reduce((acc, cat) => acc + cat.items.filter((i) => i.packed).length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              Travel <span className="gradient-gold-text">Packing AI</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Smart packing lists based on your destination, weather, and planned events.
            </p>
          </motion.div>

          {/* Suitcase Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="glass-card overflow-hidden rounded-2xl">
              <img
                src={travelSuitcase}
                alt="Luxury travel packing"
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
          </motion.div>

          <TripDetails />

          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <PackingList items={items} packedCount={packedItems} totalCount={totalItems} onTogglePacked={togglePacked} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <OutfitPlan combos={outfitCombos} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPacking;
