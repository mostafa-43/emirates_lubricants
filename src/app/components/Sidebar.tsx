import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { categories } from "../data/categories";
import { getProductsByCategory } from "../data/products";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />

          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-lg">Products Menu</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <ScrollArea className="h-[calc(100vh-73px)]">
              <div className="p-4 space-y-2">
                <button
                  onClick={() => handleNavigation("/products")}
                  className="w-full text-left p-3 rounded-lg bg-red-600 text-white font-medium mb-2"
                >
                  All Products
                </button>

                {categories.map((category) => {
                  if (getProductsByCategory(category.id).length === 0) return null;
                  const isExpanded = expandedCategories.includes(category.id);

                  return (
                    <div key={category.id} className="space-y-1">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                      >
                        <span className="font-medium text-gray-900">{category.name}</span>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 space-y-1 py-1 border-l-2 border-red-200 ml-3">
                              {category.subcategories.map((subcategory) => (
                                <button
                                  key={subcategory.id}
                                  onClick={() =>
                                    handleNavigation(
                                      `/products/${category.id}?subcategory=${subcategory.id}`
                                    )
                                  }
                                  className="w-full text-left p-2 pl-3 rounded-md hover:bg-red-50 text-sm text-gray-600 hover:text-red-600 transition-colors"
                                >
                                  {subcategory.name}
                                </button>
                              ))}
                              <button
                                onClick={() => handleNavigation(`/products/${category.id}`)}
                                className="w-full text-left p-2 pl-3 rounded-md text-sm text-red-600 font-medium"
                              >
                                View All →
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <div className="pt-4 border-t mt-4 space-y-1">
                  {[
                    { to: "/", label: "Home" },
                    { to: "/about", label: "About" },
                    { to: "/certifications", label: "Certifications" },
                    { to: "/contact", label: "Contact" },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={onClose}
                      className="block p-2 text-sm text-gray-600 hover:text-red-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
