import { motion } from "framer-motion";
import { Heart, ExternalLink, Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  originalPrice: string | null;
  rating: number;
  image: string;
  match: number;
}

interface ProductCardProps {
  product: Product;
  index: number;
  isLiked: boolean;
  onToggleLike: (id: number) => void;
}

const ProductCard = ({ product, index, isLiked, onToggleLike }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card break-inside-avoid hover-lift group cursor-pointer overflow-hidden"
    >
      <div className={`relative bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden ${
        index % 3 === 0 ? "aspect-[3/4]" : index % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
      }`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
        />
        
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-panel text-xs font-bold gradient-gold-text">
          {product.match}% match
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onToggleLike(product.id); }}
          className="absolute top-3 right-3 p-2 rounded-full glass-panel transition-colors"
        >
          <Heart
            size={16}
            className={isLiked ? "text-red-500 fill-red-500" : "text-muted-foreground"}
          />
        </button>

        {product.originalPrice && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-accent text-primary-foreground text-xs font-semibold">
            Sale
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-accent font-semibold tracking-wider uppercase">{product.brand}</p>
        <h3 className="text-sm font-semibold text-foreground mt-1">{product.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-bold text-foreground">{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <Star size={12} className="text-accent fill-accent" />
            <span className="text-xs font-medium text-foreground">{product.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors">
            <ExternalLink size={12} />
            Shop
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
