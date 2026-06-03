import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { categories } from "../data/categories";
import { getProductCountBySubcategory } from "../data/products";

export default function ProductsMegaMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="relative px-4 py-2 flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        Products
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50"
          >
            <div className="w-[min(920px,calc(100vw-2rem))] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
                {categories.map((category, i) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-5"
                  >
                    <Link
                      to={`/products/${category.id}`}
                      className="block font-bold text-gray-900 hover:text-red-600 mb-1 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {category.name}
                    </Link>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    <ul className="space-y-1">
                      {category.subcategories.map((sub) => {
                        const count = getProductCountBySubcategory(sub.id);
                        if (count === 0) return null;
                        return (
                          <li key={sub.id}>
                            <Link
                              to={`/products/${category.id}?subcategory=${sub.id}`}
                              className="text-xs text-gray-600 hover:text-red-600 hover:pl-1 transition-all flex items-center gap-1 py-0.5"
                              onClick={() => setOpen(false)}
                            >
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                              {sub.name}
                              <span className="text-gray-400">({count})</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <Link
                      to={`/products/${category.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 mt-3 hover:gap-2 transition-all"
                      onClick={() => setOpen(false)}
                    >
                      All {category.name} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Main Category → Subcategory → Products
                </span>
                <Link
                  to="/products"
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                  onClick={() => setOpen(false)}
                >
                  View Full Catalog →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
