import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Product } from "../data/products";
import { getCategoryById, getSubcategoryById } from "../data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const category = getCategoryById(product.category);
  const subcategory = getSubcategoryById(product.subcategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card className="h-full border border-gray-200 hover:border-red-400 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
        <CardContent className="p-0 flex flex-col h-full">
          <Link
            to={`/products/${product.category}/${product.id}`}
            className="block relative overflow-hidden bg-white"
          >
            <div className="aspect-[4/3] p-6 flex items-center justify-center bg-white border-b border-gray-100">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full h-full flex items-center justify-center"
              >
                <ImageWithFallback
                  src={product.images[0]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </motion.div>
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </Link>

          <div className="p-5 flex flex-col flex-1">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <Badge variant="outline" className="text-xs font-normal">
                {category?.name}
              </Badge>
              {subcategory && (
                <Badge variant="secondary" className="text-xs font-normal">
                  {subcategory.name}
                </Badge>
              )}
            </div>

            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
              {product.name}
            </h3>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
              {product.description}
            </p>

            <Button
              asChild
              variant="outline"
              className="w-full group/btn border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600"
            >
              <Link to={`/products/${product.category}/${product.id}`}>
                Details
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
