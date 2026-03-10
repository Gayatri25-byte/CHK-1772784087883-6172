type Category = "all" | "tops" | "bottoms" | "shoes" | "accessories";

interface CategoryItem {
  key: Category;
  label: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: CategoryItem[];
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onCategoryChange(cat.key)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            activeCategory === cat.key
              ? "gradient-gold text-primary-foreground shadow-md"
              : "bg-secondary text-muted-foreground hover:bg-muted"
          }`}
        >
          <span>{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
export type { Category };
