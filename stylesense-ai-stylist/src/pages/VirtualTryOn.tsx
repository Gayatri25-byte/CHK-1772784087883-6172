import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AvatarStage from "@/components/tryon/AvatarStage";
import ClothingSelector from "@/components/tryon/ClothingSelector";

import ivoryBlouse from "@/assets/clothing/ivory-blouse.png";
import charcoalBlazer from "@/assets/clothing/charcoal-blazer.png";
import creamTrousers from "@/assets/clothing/cream-trousers.png";
import navySkirt from "@/assets/clothing/navy-skirt.png";
import goldHeels from "@/assets/clothing/gold-heels.png";
import whiteSneakers from "@/assets/clothing/white-sneakers.png";
import pearlNecklace from "@/assets/clothing/pearl-necklace.png";
import leatherTote from "@/assets/clothing/leather-tote.png";

const clothingItems = [
  { id: 1, name: "Silk Blouse", image: ivoryBlouse },
  { id: 2, name: "Charcoal Blazer", image: charcoalBlazer },
  { id: 3, name: "Cream Trousers", image: creamTrousers },
  { id: 4, name: "Navy Skirt", image: navySkirt },
  { id: 5, name: "Gold Heels", image: goldHeels },
  { id: 6, name: "White Sneakers", image: whiteSneakers },
  { id: 7, name: "Pearl Necklace", image: pearlNecklace },
  { id: 8, name: "Leather Bag", image: leatherTote },
];

const VirtualTryOn = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              Virtual <span className="gradient-gold-text">Try-On Studio</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              See how outfits look before you wear them. Upload a photo or use our virtual avatar.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_380px] gap-8">
            <AvatarStage selectedItems={selectedItems} clothingItems={clothingItems} />
            <ClothingSelector items={clothingItems} selectedItems={selectedItems} onToggleItem={toggleItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
