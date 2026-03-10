import { useState } from "react";
import { Sparkles, Sun, MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import ChipSelector from "@/components/outfit/ChipSelector";

/* Clothing Images */
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

/* Outfit Image Database */
const outfitImages: any = {
  blazer: charcoalBlazer,
  blouse: ivoryBlouse,
  sweater: cashmereSweater,
  trousers: creamTrousers,
  jeans: blackJeans,
  skirt: navySkirt,
  heels: goldHeels,
  sneakers: whiteSneakers,
  boots: ankleBoots,
  scarf: silkScarf,
  necklace: pearlNecklace
};

const occasions = [
  "Business Meeting",
  "Date Night",
  "Casual Outing",
  "Wedding Guest",
  "Weekend Brunch",
  "Gym / Workout",
];

const weathers = [
  "Sunny",
  "Partly Cloudy",
  "Rainy",
  "Cold",
  "Hot & Humid",
];

const styles = [
  "Classic Elegant",
  "Street Casual",
  "Boho Chic",
  "Minimalist",
  "Avant-Garde",
  "Sporty Luxe",
];

const OutfitGenerator = () => {

  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [selectedWeather, setSelectedWeather] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleGenerate = async () => {

    if (!selectedOccasion || !selectedWeather || !selectedStyle) {
      alert("Please select Occasion, Weather and Style");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "https://gemini-pro-ai.p.rapidapi.com/",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "gemini-pro-ai.p.rapidapi.com"
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `Generate a fashion outfit.

Occasion: ${selectedOccasion}
Weather: ${selectedWeather}
Style: ${selectedStyle}

Return format:
Top:
Bottom:
Shoes:
Accessories:`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();

      console.log("AI RESPONSE:", data);

      const result = data.candidates?.[0]?.content?.parts?.[0]?.text;

      setAiResult(result);

      /* Simple keyword detection for images */
      const resultText = result.toLowerCase();

      const matchedImages = Object.keys(outfitImages)
        .filter(key => resultText.includes(key))
        .map(key => outfitImages[key]);

      setImages(matchedImages);

    } catch (error) {

      console.error(error);
      alert("AI generation failed");

    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto pt-24 px-6">

        <h1 className="text-4xl font-bold mb-10 text-center">
          AI Outfit Generator
        </h1>

        <div className="glass-card p-8">

          <ChipSelector
            label="Occasion"
            icon={Calendar}
            options={occasions}
            selected={selectedOccasion}
            onSelect={setSelectedOccasion}
          />

          <ChipSelector
            label="Weather"
            icon={Sun}
            options={weathers}
            selected={selectedWeather}
            onSelect={setSelectedWeather}
          />

          <ChipSelector
            label="Personal Style"
            icon={MapPin}
            options={styles}
            selected={selectedStyle}
            onSelect={setSelectedStyle}
          />

          <button
            onClick={handleGenerate}
            className="w-full mt-6 py-4 rounded-xl gradient-gold text-white font-semibold flex items-center justify-center gap-2"
          >
            <Sparkles size={18}/>
            {loading ? "Generating..." : "Generate Outfit"}
          </button>

        </div>

        {/* AI RESULT */}
        {aiResult && (
          <div className="glass-card p-6 mt-8">

            <h3 className="text-xl font-semibold mb-4">
              AI Outfit Suggestion
            </h3>

            <p className="mb-6 whitespace-pre-line">
              {aiResult}
            </p>

            {/* Dynamic Images */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="rounded-lg shadow-md"
                />
              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default OutfitGenerator;

