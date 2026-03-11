import { motion } from "framer-motion";
import { Heart, ExternalLink, Star, ArrowRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  rating: number;
  image: string;
  match: number;
  link: string; // e.g., "https://www.amazon.com/..."
}

interface ProductCardProps {
  product: Product;
  index: number;
  isLiked: boolean;
  onToggleLike: (id: number) => void;
}

const ProductCard = ({ product, index, isLiked, onToggleLike }: ProductCardProps) => {
  const handleRedirect = () => {
  // Construct Amazon search URL using product name
  const query = encodeURIComponent(product.name); // encode special characters
  const amazonSearchURL = `https://www.amazon.com/s?k=${query}`;
  
  window.open(amazonSearchURL, "_blank"); // opens Amazon search in new tab
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/5] overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        {/* MATCH BADGE */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold shadow">
          <span className="text-amber-600">{product.match}%</span> match
        </div>

        {/* LIKE BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(product.id);
          }}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow z-20"
        >
          <Heart
            size={18}
            className={isLiked ? "text-red-500 fill-red-500" : "text-gray-400"}
          />
        </button>

        {/* HOVER overlay clickable */}
        <div
          onClick={handleRedirect} // click overlay → opens Amazon
          className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer z-10"
        >
          <div className="bg-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            Shop Now <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="p-6">
        <p className="text-xs font-bold tracking-widest text-amber-600">{product.brand}</p>
        <h3 className="text-lg font-semibold mt-1">{product.name}</h3>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold">{product.price}</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold">{product.rating}</span>
          </div>

          {/* SHOP button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevents triggering parent
              window.open(product.link, "_blank"); // opens Amazon
            }}
            className="flex items-center gap-1 text-sm font-semibold hover:text-black"
          >
            <ExternalLink size={14} />
            Shop
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;