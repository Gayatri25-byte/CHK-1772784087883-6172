import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/shopping/ProductCard";

import cashmereCoat from "@/assets/shopping/cashmere-coat.png";
import silkDress from "@/assets/shopping/silk-dress.png";
import pearlEarrings from "@/assets/shopping/pearl-earrings.png";
import ankleBoots from "@/assets/clothing/ankle-boots.png";
import ivoryKnit from "@/assets/shopping/ivory-knit.png";
import tailoredTrousers from "@/assets/shopping/tailored-trousers.png";
import suedClutch from "@/assets/shopping/suede-clutch.png";
import leatherTote from "@/assets/clothing/leather-tote.png";

// Add the `link` property for ProductCard
const products = [
  { id: 1, name: "Cashmere Wrap Coat", brand: "Loro Piana", price: "$3,200", originalPrice: "$4,500", rating: 4.9, image: cashmereCoat, match: 96, link: `https://www.amazon.com/s?k=${encodeURIComponent("Cashmere Wrap Coat")}` },
  { id: 2, name: "Silk Midi Dress", brand: "The Row", price: "$1,890", originalPrice: null, rating: 4.8, image: silkDress, match: 94, link: `https://www.amazon.com/s?k=${encodeURIComponent("Silk Midi Dress")}` },
  { id: 3, name: "Pearl Drop Earrings", brand: "Mikimoto", price: "$780", originalPrice: "$950", rating: 5.0, image: pearlEarrings, match: 92, link: `https://www.amazon.com/s?k=${encodeURIComponent("Pearl Drop Earrings")}` },
  { id: 4, name: "Leather Ankle Boots", brand: "Bottega Veneta", price: "$1,100", originalPrice: "$1,400", rating: 4.7, image: ankleBoots, match: 91, link: `https://www.amazon.com/s?k=${encodeURIComponent("Leather Ankle Boots")}` },
  { id: 5, name: "Ivory Knit Sweater", brand: "Brunello Cucinelli", price: "$1,650", originalPrice: null, rating: 4.6, image: ivoryKnit, match: 89, link: `https://www.amazon.com/s?k=${encodeURIComponent("Ivory Knit Sweater")}` },
  { id: 6, name: "Tailored Trousers", brand: "Max Mara", price: "$890", originalPrice: null, rating: 4.5, image: tailoredTrousers, match: 88, link: `https://www.amazon.com/s?k=${encodeURIComponent("Tailored Trousers")}` },
  { id: 7, name: "Suede Clutch", brand: "Saint Laurent", price: "$1,290", originalPrice: null, rating: 4.7, image: suedClutch, match: 85, link: `https://www.amazon.com/s?k=${encodeURIComponent("Suede Clutch")}` },
  { id: 8, name: "Leather Tote Bag", brand: "Loewe", price: "$2,100", originalPrice: "$2,600", rating: 4.9, image: leatherTote, match: 87, link: `https://www.amazon.com/s?k=${encodeURIComponent("Leather Tote Bag")}` },
];

const ShoppingPage = () => {
  const [liked, setLiked] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLiked((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          >
            <div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                Smart <span className="gradient-gold-text">Shopping</span>
              </h1>
              <p className="text-muted-foreground">AI-curated picks based on your wardrobe gaps and style.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-secondary text-sm font-medium text-foreground hover:bg-muted transition-colors">
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </motion.div>

          {/* Pinterest-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}  // ✅ fixed: provide 'link' in product
                index={i}
                isLiked={liked.includes(product.id)}
                onToggleLike={toggleLike}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;