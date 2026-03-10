import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles, Filter, Grid3X3, LayoutList, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";
import WardrobeItemCard from "@/components/wardrobe/WardrobeItemCard";
import AISuggestionCard from "@/components/wardrobe/AISuggestionCard";
import WardrobeStats from "@/components/wardrobe/WardrobeStats";
import CategoryFilter, { type Category } from "@/components/wardrobe/CategoryFilter";

import { auth, db } from "@/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

/* Clothing Images */
import charcoalBlazer from "@/assets/clothing/charcoal-blazer.png";
import ivoryBlouse from "@/assets/clothing/ivory-blouse.png";
import creamTrousers from "@/assets/clothing/cream-trousers.png";
import navySkirt from "@/assets/clothing/navy-skirt.png";
import goldHeels from "@/assets/clothing/gold-heels.png";
import whiteSneakers from "@/assets/clothing/white-sneakers.png";

/* Categories */
const categories = [
  { key: "all" as Category, label: "All Items", icon: "👗" },
  { key: "tops" as Category, label: "Tops", icon: "👕" },
  { key: "bottoms" as Category, label: "Bottoms", icon: "👖" },
  { key: "shoes" as Category, label: "Shoes", icon: "👟" },
  { key: "accessories" as Category, label: "Accessories", icon: "💍" },
];

/* Image Map */
const imageMap: any = {
  "Charcoal Blazer": charcoalBlazer,
  "Ivory Silk Blouse": ivoryBlouse,
  "Cream Trousers": creamTrousers,
  "Navy Midi Skirt": navySkirt,
  "Gold Heels": goldHeels,
  "White Sneakers": whiteSneakers
};

const WardrobeDashboard = () => {

  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wardrobeItems, setWardrobeItems] = useState<any[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("tops");

  /* Load wardrobe from Firestore */
  const loadWardrobe = async () => {

    const user = auth.currentUser;
    if (!user) return;

    const snapshot = await getDocs(
      collection(db, "users", user.uid, "wardrobe")
    );

    const items = snapshot.docs.map((doc, index) => {

      const data: any = doc.data();

      return {
        id: index,
        name: data.name || "Item",
        category: data.category || "tops",
        image: imageMap[data.name] || charcoalBlazer,
        worn: data.wearCount || 0,
        rating: data.rating || 4
      };

    });

    setWardrobeItems(items);
  };

  useEffect(() => {
    loadWardrobe();
  }, []);

  /* Add wardrobe item */
  const addItem = async () => {

    const user = auth.currentUser;

    if (!user) {
      alert("User not logged in");
      return;
    }

    await addDoc(
      collection(db, "users", user.uid, "wardrobe"),
      {
        name: itemName,
        category: category,
        wearCount: 0,
        rating: 4
      }
    );

    setItemName("");
    setShowForm(false);

    loadWardrobe();
  };

  const filteredItems =
    activeCategory === "all"
      ? wardrobeItems
      : wardrobeItems.filter((item) => item.category === activeCategory);

  const wardrobeStats = [
    { label: "Total Items", value: wardrobeItems.length },
    { label: "Categories", value: new Set(wardrobeItems.map(i => i.category)).size },
    { label: "Unused (30d)", value: "2 items" },
    { label: "Style Score", value: "92%" },
  ];

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
                {wardrobeItems.length} items
              </p>
            </div>

            <div className="flex items-center gap-3">

              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-secondary text-sm font-medium text-foreground">
                <Filter size={16} />
                Filter
                <ChevronDown size={14} />
              </button>

              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-gold text-primary-foreground text-sm font-semibold"
              >
                <Plus size={16} />
                Add Item
              </button>

            </div>

          </motion.div>

          {/* Add Item Form */}
          {showForm && (
            <div className="glass-card p-6 mb-6">

              <input
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="border p-2 rounded mr-3"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 rounded mr-3"
              >
                <option value="tops">Top</option>
                <option value="bottoms">Bottom</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
              </select>

              <button
                onClick={addItem}
                className="bg-accent text-white px-4 py-2 rounded"
              >
                Save Item
              </button>

            </div>
          )}

          <div className="grid lg:grid-cols-[1fr_340px] gap-8">

            {/* Main Wardrobe */}
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
                  className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-accent/20 text-accent" : "text-muted-foreground"}`}
                >
                  <Grid3X3 size={18} />
                </button>

                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${viewMode === "list" ? "bg-accent/20 text-accent" : "text-muted-foreground"}`}
                >
                  <LayoutList size={18} />
                </button>

              </div>

              {/* Wardrobe Items */}
              <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-3"}>

                {filteredItems.map((item, i) => (
                  <div key={i} onClick={() => navigate("/tryon", { state: item })}>
                    <WardrobeItemCard
                      item={item}
                      index={i}
                      viewMode={viewMode}
                    />
                  </div>
                ))}

              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">

              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles size={18} className="text-accent" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    AI Suggestions
                  </h3>
                </div>

                <p className="text-sm text-muted-foreground">
                  Suggestions will appear after wardrobe data loads.
                </p>

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