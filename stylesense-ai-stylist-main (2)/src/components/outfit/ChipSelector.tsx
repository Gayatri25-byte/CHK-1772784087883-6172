import { LucideIcon } from "lucide-react";

interface ChipSelectorProps {
  label: string;
  icon: LucideIcon;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

const ChipSelector = ({ label, icon: Icon, options, selected, onSelect }: ChipSelectorProps) => {
  return (
    <div className="mb-6">
      <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
        <Icon size={16} className="text-accent" />
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selected === opt
                ? "gradient-gold text-primary-foreground shadow-md"
                : "bg-secondary text-muted-foreground hover:bg-muted"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChipSelector;
