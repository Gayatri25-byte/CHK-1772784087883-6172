import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Sun, MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import ChipSelector from "@/components/outfit/ChipSelector";
import OutfitResultCard from "@/components/outfit/OutfitResultCard";

import ivoryBlouse from "@/assets/clothing/ivory-blouse.png";
import creamTrousers from "@/assets/clothing/cream-trousers.png";
import goldHeels from "@/assets/clothing/gold-heels.png";
import pearlNecklace from "@/assets/clothing/pearl-necklace.png";
import charcoalBlazer from "@/assets/clothing/charcoal-blazer.png";
import navySkirt from "@/assets/clothing/navy-skirt.png";
import ankleBoots from "@/assets/clothing/ankle-boots.png";
import silkScarf from "@/assets/clothing/silk-scarf.png";
import whiteSneakers from "@/assets/clothing/white-sneakers.png";
import blackJeans from "@/assets/clothing/black-jeans.png";
import cashmereSweater from "@/assets/clothing/cashmere-sweater.png";

const occasions = ["Business Meeting", "Date Night", "Casual Outing", "Wedding Guest", "Weekend Brunch", "Gym / Workout"];
const weathers = ["☀️ Sunny", "🌤 Partly Cloudy", "🌧 Rainy", "❄️ Cold", "🌡 Hot & Humid"];
const styles = ["Classic Elegant", "Street Casual", "Boho Chic", "Minimalist", "Avant-Garde", "Sporty Luxe"];

const generatedOutfits = [
  {
    id: 1,
    items: [
      { label: "Top", name: "Ivory Silk Blouse", image: ivoryBlouse },
      { label: "Bottom", name: "Cream High-Waist Trousers", image: creamTrousers },
      { label: "Shoes", name: "Gold Pointed Heels", image: goldHeels },
      { label: "Accessories", name: "Pearl Drop Earrings", image: pearlNecklace },
    ],
    score: 96,
    colorHarmony: ["#f5f0e8", "#f0e6d3", "#c5a55a", "#f5f0e8"],
    mood: "Refined Elegance",
  },
  {
    id: 2,
    items: [
      { label: "Top", name: "Charcoal Cashmere Sweater", image: charcoalBlazer },
      { label: "Bottom", name: "Navy Midi Skirt", image: navySkirt },
      { label: "Shoes", name: "Brown Ankle Boots", image: ankleBoots },
      { label: "Accessories", name: "Silk Scarf", image: silkScarf },
    ],
    score: 91,
    colorHarmony: ["#3a3a3a", "#1e3a5f", "#4a3728", "#c9a96e"],
    mood: "Sophisticated Warmth",
  },
  {
    id: 3,
    items: [
      { label: "Top", name: "Cashmere Sweater", image: cashmereSweater },
      { label: "Bottom", name: "Black Slim Jeans", image: blackJeans },
      { label: "Shoes", name: "White Sneakers", image: whiteSneakers },
      { label: "Accessories", name: "Silk Scarf", image: silkScarf },
    ],
    score: 88,
    colorHarmony: ["#d4c5a9", "#1a1a1a", "#ffffff", "#c5a55a"],
    mood: "Effortless Cool",
  },
];

const OutfitGenerator = () => {
  const API_KEY = "YOUR_OPENWEATHER_API_KEY";

  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [selectedWeather, setSelectedWeather] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [generated, setGenerated] = useState(false);
  const [activeOutfit, setActiveOutfit] = useState(0);

const getWeatherFromLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      const weatherMain = data.weather[0].main;
      const temp = data.main.temp;

      let weatherOption = "";

      if (weatherMain === "Rain") weatherOption = "🌧 Rainy";
      else if (temp < 10) weatherOption = "❄️ Cold";
      else if (temp > 30) weatherOption = "🌡 Hot & Humid";
      else if (weatherMain === "Clear") weatherOption = "☀️ Sunny";
      else weatherOption = "🌤 Partly Cloudy";

      setSelectedWeather(weatherOption);
    });
  };

  const handleGenerate = () => {
    setGenerated(true);
    setActiveOutfit(0)
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles size={14} />
              AI Stylist
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              AI Outfit <span className="gradient-gold-text">Generator</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Tell us about your day, and we'll create the perfect outfit.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Inputs */}
           <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="glass-card p-8 mb-8"
>

  {/* Occasion */}
  <ChipSelector
    label="Occasion"
    icon={Calendar}
    options={occasions}
    selected={selectedOccasion}
    onSelect={setSelectedOccasion}
  />

  {/* WEATHER SECTION */}
  <div className="mb-6">

    <div className="flex justify-between items-center mb-3">

      <span className="text-sm font-medium flex items-center gap-2">
        <Sun size={16} />
        Weather
      </span>

      <div className="flex gap-3">

        <button
          onClick={() => {
            const city = prompt("Enter your city name");
            if (!city) return;

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
              .then(res => res.json())
              .then(data => {
                const weatherMain = data.weather[0].main;
                const temp = data.main.temp;

                let weatherOption = "";

                if (weatherMain === "Rain") weatherOption = "🌧 Rainy";
                else if (temp < 10) weatherOption = "❄️ Cold";
                else if (temp > 30) weatherOption = "🌡 Hot & Humid";
                else if (weatherMain === "Clear") weatherOption = "☀️ Sunny";
                else weatherOption = "🌤 Partly Cloudy";

                setSelectedWeather(weatherOption);
              });
          }}
          className="text-xs flex items-center gap-1 text-accent hover:underline"
        >
          📍 Choose Location
        </button>

        <button
          onClick={getWeatherFromLocation}
          className="text-xs flex items-center gap-1 text-accent hover:underline"
        >
          <MapPin size={14} />
          Use Current Location
        </button>

      </div>

    </div>

    <ChipSelector
      label=""
      icon={Sun}
      options={weathers}
      selected={selectedWeather}
      onSelect={setSelectedWeather}
    />

  </div>

  {/* Personal Style */}
  <div className="mb-8">
    <ChipSelector
      label="Personal Style"
      icon={MapPin}
      options={styles}
      selected={selectedStyle}
      onSelect={setSelectedStyle}
    />
  </div>

  <button
    onClick={handleGenerate}
    className="w-full py-4 rounded-xl gradient-gold text-primary-foreground font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
  >
    <Sparkles size={18} />
    Generate Outfit
  </button>

</motion.div>

            {/* Results */}
            <AnimatePresence>
              {generated && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                    {generatedOutfits.map((outfit, i) => (
                      <button
                        key={outfit.id}
                        onClick={() => setActiveOutfit(i)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                          activeOutfit === i
                            ? "glass-card border-accent/30 shadow-lg"
                            : "bg-secondary text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <span className="gradient-gold-text font-bold">{outfit.score}%</span>
                        {outfit.mood}
                      </button>
                    ))}
                  </div>

                  <OutfitResultCard
                    outfit={generatedOutfits[activeOutfit]}
                    onReset={() => setGenerated(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitGenerator;
