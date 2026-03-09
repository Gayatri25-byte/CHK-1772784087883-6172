import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles, Filter, Grid3X3, LayoutList, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import WardrobeItemCard from "@/components/wardrobe/WardrobeItemCard";
import AISuggestionCard from "@/components/wardrobe/AISuggestionCard";
import WardrobeStats from "@/components/wardrobe/WardrobeStats";
import CategoryFilter, { type Category } from "@/components/wardrobe/CategoryFilter";

import charcoalBlazer from "@/assets/clothing/charcoal-blazer.png";
import ivoryBlouse from "@/assets/clothing/ivory-blouse.png";
import creamTrousers from "@/assets/clothing/cream-trousers.png";
import navySkirt from "@/assets/clothing/navy-skirt.png";
import goldHeels from "@/assets/clothing/gold-heels.png";
import whiteSneakers from "@/assets/clothing/white-sneakers.png";
import pearlNecklace from "@/assets/clothing/pearl-necklace.png";
import leatherTote from "@/assets/clothing/leather-tote.png";
import cashmereSweater from "@/assets/clothing/cashmere-sweater.png";
import blackJeans from "@/assets/clothing/black-jeans.png";
import ankleBoots from "@/assets/clothing/ankle-boots.png";
import silkScarf from "@/assets/clothing/silk-scarf.png";

const categories = [
  { key: "all" as Category, label: "All Items", icon: "👗" },
  { key: "tops" as Category, label: "Tops", icon: "👕" },
  { key: "bottoms" as Category, label: "Bottoms", icon: "👖" },
  { key: "shoes" as Category, label: "Shoes", icon: "👟" },
  { key: "accessories" as Category, label: "Accessories", icon: "💍" },
];

const wardrobeItems = [
  { id: 1, name: "Charcoal Blazer", category: "tops" as const, image: charcoalBlazer, worn: 12, rating: 4.8 },
  { id: 2, name: "Ivory Silk Blouse", category: "tops" as const, image: ivoryBlouse, worn: 8, rating: 4.5 },
  { id: 3, name: "Cream Trousers", category: "bottoms" as const, image: creamTrousers, worn: 15, rating: 4.9 },
  { id: 4, name: "Navy Midi Skirt", category: "bottoms" as const, image: navySkirt, worn: 6, rating: 4.2 },
  { id: 5, name: "Gold Heels", category: "shoes" as const, image: goldHeels, worn: 4, rating: 4.7 },
  { id: 6, name: "White Sneakers", category: "shoes" as const, image: whiteSneakers, worn: 20, rating: 4.6 },
  { id: 7, name: "Pearl Necklace", category: "accessories" as const, image: pearlNecklace, worn: 10, rating: 5.0 },
  { id: 8, name: "Leather Tote", category: "accessories" as const, image: leatherTote, worn: 18, rating: 4.8 },
  { id: 9, name: "Cashmere Sweater", category: "tops" as const, image: cashmereSweater, worn: 9, rating: 4.4 },
  { id: 10, name: "Black Jeans", category: "bottoms" as const, image: blackJeans, worn: 22, rating: 4.3 },
  { id: 11, name: "Ankle Boots", category: "shoes" as const, image: ankleBoots, worn: 14, rating: 4.6 },
  { id: 12, name: "Silk Scarf", category: "accessories" as const, image: silkScarf, worn: 7, rating: 4.9 },
];

const aiSuggestions = [
  { outfit: "Charcoal Blazer + Cream Trousers + Gold Heels", score: 96, occasion: "Business Meeting", images: [charcoalBlazer, creamTrousers, goldHeels] },
  { outfit: "Ivory Silk Blouse + Navy Midi Skirt + Ankle Boots", score: 91, occasion: "Date Night", images: [ivoryBlouse, navySkirt, ankleBoots] },
  { outfit: "Cashmere Sweater + Black Jeans + White Sneakers", score: 88, occasion: "Weekend Brunch", images: [cashmereSweater, blackJeans, whiteSneakers] },
];

const wardrobeStats = [
  { label: "Total Items", value: "12" },
  { label: "Most Worn", value: "Black Jeans" },
  { label: "Unused (30d)", value: "2 items" },
  { label: "Style Score", value: "92%" },
];

const WardrobeDashboard = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredItems = activeCategory === "all"
    ? wardrobeItems
    : wardrobeItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          >
            <div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                Smart <span className="gradient-gold-text">Wardrobe</span>
              </h1>
              <p className="text-muted-foreground">
                {wardrobeItems.length} items · {new Set(wardrobeItems.map(i => i.category)).size} categories
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-secondary text-sm font-medium text-foreground hover:bg-muted transition-colors">
                <Filter size={16} />
                Filter
                <ChevronDown size={14} />
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-gold text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                <Plus size={16} />
                Add Item
              </button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            {/* Main Content */}
            <div>
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              {/* View Toggle */}
              <div className="flex justify-end mb-4 gap-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-accent/20 text-accent" : "text-muted-foreground"}`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-accent/20 text-accent" : "text-muted-foreground"}`}
                >
                  <LayoutList size={18} />
                </button>
              </div>

              {/* Items Grid */}
              <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-3"}>
                {filteredItems.map((item, i) => (
                  <WardrobeItemCard key={item.id} item={item} index={i} viewMode={viewMode} />
                ))}
              </div>
            </div>

            {/* AI Suggestions Sidebar */}
            <div className="space-y-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles size={18} className="text-accent" />
                  <h3 className="font-display text-lg font-semibold text-foreground">AI Suggestions</h3>
                </div>
                <div className="space-y-4">
                  {aiSuggestions.map((sug, i) => (
                    <AISuggestionCard key={i} suggestion={sug} index={i} />
                  ))}
                </div>
              </div>

              <WardrobeStats stats={wardrobeStats} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardrobeDashboard;
