import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Car, Factory, Ship, Droplets } from "lucide-react";
import {
  categories,
  getProductCountByCategory,
  getProductCountBySubcategory,
} from "../data/products";

const iconMap = {
  car: Car,
  factory: Factory,
  ship: Ship,
  droplets: Droplets,
};

export default function BrowseByCategory() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage:
            "linear-gradient(45deg, #dc2626 25%, transparent 25%), linear-gradient(-45deg, #dc2626 25%, transparent 25%)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-4">
            Product Catalog
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our complete lubricant range — organized like a professional
            industrial catalog with main categories, subcategories, and products.
          </p>
        </motion.div>

        <div className="space-y-8">
          {categories.map((category, catIndex) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] ?? Factory;
            const productCount = getProductCountByCategory(category.id);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: catIndex * 0.08 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="grid lg:grid-cols-[280px_1fr]">
                  <Link
                    to={`/products/${category.id}`}
                    className="group bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 flex flex-col justify-between hover:from-red-700 hover:to-gray-900 transition-all duration-500"
                  >
                    <div>
                      <motion.div
                        whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-5"
                      >
                        <Icon className="w-7 h-7" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {productCount} products
                      </span>
                      <span className="flex items-center gap-1 text-sm font-medium text-red-300 group-hover:gap-2 transition-all">
                        View all <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 lg:p-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                      Subcategories
                    </p>
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {category.subcategories.map((sub, subIndex) => {
                        const subCount = getProductCountBySubcategory(sub.id);
                        if (subCount === 0) return null;

                        return (
                          <motion.div
                            key={sub.id}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: subIndex * 0.04 }}
                          >
                            <Link
                              to={`/products/${category.id}?subcategory=${sub.id}`}
                              className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-red-50 hover:border-red-200 transition-all duration-300"
                            >
                              <div>
                                <div className="font-medium text-gray-900 group-hover:text-red-700 transition-colors text-sm">
                                  {sub.name}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {subCount} product{subCount !== 1 ? "s" : ""}
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
