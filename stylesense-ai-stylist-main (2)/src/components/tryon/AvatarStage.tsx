import { motion } from "framer-motion";
import { Upload, RotateCcw, Palette, Sun, ZoomIn, Camera } from "lucide-react";
import tryonStage from "@/assets/tryon-stage.jpg";

interface ClothingItem {
  id: number;
  name: string;
  image: string;
}

interface AvatarStageProps {
  selectedItems: number[];
  clothingItems: ClothingItem[];
}

const controls = [
  { icon: RotateCcw, label: "Rotate" },
  { icon: Palette, label: "Colors" },
  { icon: Sun, label: "Lighting" },
  { icon: ZoomIn, label: "Zoom" },
  { icon: Camera, label: "Capture" },
];

const AvatarStage = ({ selectedItems, clothingItems }: AvatarStageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-4 md:p-8"
    >
      <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
        <img
          src={tryonStage}
          alt="Virtual dressing room"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/30" />
        
        {selectedItems.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center glass-card p-8">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Upload size={28} className="text-accent" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">Upload Your Photo</p>
              <p className="text-xs text-muted-foreground">or select items to preview</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-end justify-center z-10 p-6">
            <div className="flex gap-3 flex-wrap justify-center">
              {selectedItems.map((id) => {
                const item = clothingItems.find((i) => i.id === id);
                return item ? (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-20 h-20 rounded-xl glass-card overflow-hidden"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                  </motion.div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mt-6">
        {controls.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl hover:bg-secondary transition-colors"
          >
            <Icon size={18} className="text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">{label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default AvatarStage;
