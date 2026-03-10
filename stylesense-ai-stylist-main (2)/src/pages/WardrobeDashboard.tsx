
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles, Filter, Grid3X3, LayoutList, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";
import WardrobeItemCard from "@/components/wardrobe/WardrobeItemCard";
import WardrobeStats from "@/components/wardrobe/WardrobeStats";
import CategoryFilter, { type Category } from "@/components/wardrobe/CategoryFilter";

import { auth, db } from "@/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

/* Categories */
const categories = [
  { key: "all" as Category, label: "All Items", icon: "👗" },
  { key: "tops" as Category, label: "Tops", icon: "👕" },
  { key: "bottoms" as Category, label: "Bottoms", icon: "👖" },
  { key: "shoes" as Category, label: "Shoes", icon: "👟" },
  { key: "accessories" as Category, label: "Accessories", icon: "💍" },
];

const WardrobeDashboard = () => {

  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wardrobeItems, setWardrobeItems] = useState<any[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("tops");
  const [image, setImage] = useState("");

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const [aiSuggestion, setAiSuggestion] = useState<any[]>([]);

  /* IMAGE UPLOAD */
  const handleImageUpload = (e:any) => {

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    if(file){
      reader.readAsDataURL(file);
    }
  };

  /* LOAD WARDROBE */
  const loadWardrobe = async () => {

    const user = auth.currentUser;
    if (!user) return;

    const snapshot = await getDocs(
      collection(db, "users", user.uid, "wardrobe")
    );

    const items = snapshot.docs.map((doc, index) => {

      const data:any = doc.data();

      return {
        id: index,
        name: data.name,
        category: data.category,
        image: data.image,
        worn: data.wearCount || 0,
        rating: data.rating || 4
      };

    });

    setWardrobeItems(items);
  };

  /* AI SUGGESTION */
  const generateAISuggestion = () => {

    const tops = wardrobeItems.filter(i => i.category === "tops");
    const bottoms = wardrobeItems.filter(i => i.category === "bottoms");
    const shoes = wardrobeItems.filter(i => i.category === "shoes");
    const accessories = wardrobeItems.filter(i => i.category === "accessories");

    if (!tops.length || !bottoms.length || !shoes.length) return;

    const outfit = [
      tops[Math.floor(Math.random() * tops.length)],
      bottoms[Math.floor(Math.random() * bottoms.length)],
      shoes[Math.floor(Math.random() * shoes.length)],
      accessories[Math.floor(Math.random() * accessories.length)] || null
    ].filter(Boolean);

    setAiSuggestion(outfit);

  };

  useEffect(() => {
    loadWardrobe();
  }, []);

  useEffect(() => {
    if (wardrobeItems.length) {
      generateAISuggestion();
    }
  }, [wardrobeItems]);

  /* ADD ITEM */
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
        image: image,
        wearCount: 0,
        rating: 4
      }
    );

    setItemName("");
    setImage("");
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
    <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>

      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          >

            <div>
              <h1 className="font-display text-4xl font-bold mb-2">
                Smart <span className="text-yellow-500">Wardrobe</span>
              </h1>

              <p>
                {wardrobeItems.length} items
              </p>
            </div>

            <div className="flex items-center gap-3">

              {/* THEME FILTER */}
              <div className="relative">

                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium"
                >
                  <Filter size={16} />
                  Theme
                  <ChevronDown size={14} />
                </button>

                {showFilterMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border p-2 z-10">

                    <button
                      onClick={() => {
                        setTheme("light");
                        setShowFilterMenu(false);
                      }}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-black"
                    >
                      Light
                    </button>

                    <button
                      onClick={() => {
                        setTheme("dark");
                        setShowFilterMenu(false);
                      }}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-black"
                    >
                      Dark
                    </button>

                  </div>
                )}

              </div>

              {/* ADD ITEM */}
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-500 text-white text-sm font-semibold"
              >
                <Plus size={16} />
                Add Item
              </button>

            </div>

          </motion.div>

          {/* ADD ITEM FORM */}
          {showForm && (
            <div className="p-6 mb-6 border rounded flex gap-3 flex-wrap">

              <input
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="border p-2 rounded"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="tops">Top</option>
                <option value="bottoms">Bottom</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
              </select>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border p-2 rounded"
              />

              <button
                onClick={addItem}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Item
              </button>

            </div>
          )}

          <div className="grid lg:grid-cols-[1fr_340px] gap-8">

            {/* WARDROBE */}
            <div>

              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              <div className="flex justify-end mb-4 gap-1">

                <button
                  onClick={() => setViewMode("grid")}
                  className="p-2 rounded-lg"
                >
                  <Grid3X3 size={18} />
                </button>

                <button
                  onClick={() => setViewMode("list")}
                  className="p-2 rounded-lg"
                >
                  <LayoutList size={18} />
                </button>

              </div>

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

            {/* SIDEBAR */}
            <div className="space-y-6">

              <div className="p-6 border rounded">

                <div className="flex items-center gap-2 mb-5">
                  <Sparkles size={18} />
                  <h3 className="text-lg font-semibold">
                    AI Suggestions
                  </h3>
                </div>

                {aiSuggestion.length === 0 ? (

                  <p className="text-sm">
                    Add more clothes to generate outfit suggestions.
                  </p>

                ) : (

                  <div className="grid grid-cols-2 gap-3">

                    {aiSuggestion.map((item, index) => (

                      <div key={index} className="border rounded-lg p-2 text-center">

                        <img
                          src={item.image}
                          className="rounded mb-2"
                        />

                        <p className="text-xs font-medium">
                          {item.name}
                        </p>

                      </div>

                    ))}

                  </div>

                )}

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