import { motion } from "motion/react";
import { Link, useParams, useSearchParams } from "react-router";
import { Filter, Layers } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import ProductCard from "../components/ProductCard";
import {
  categories,
  products,
  getProductsByCategory,
  getProductsBySubcategory,
  getCategoryById,
  getSubcategoryById,
} from "../data/products";

export default function ProductsPage() {
  const { category: categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const subcategoryId = searchParams.get("subcategory");

  let filteredProducts = products;
  const currentCategory = categoryId ? getCategoryById(categoryId) : undefined;
  const currentSubcategory = subcategoryId ? getSubcategoryById(subcategoryId) : undefined;

  if (categoryId) filteredProducts = getProductsByCategory(categoryId);
  if (subcategoryId) filteredProducts = getProductsBySubcategory(subcategoryId);

  const pageTitle = currentSubcategory?.name ?? currentCategory?.name ?? "All Products";
  const pageDescription =
    currentSubcategory
      ? `Browse ${currentSubcategory.name} products from Emirates Lubricants.`
      : currentCategory?.description ?? "Browse our complete range of premium lubricants";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white py-16 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-300 mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-white transition-colors">Products</Link>
              {currentCategory && (
                <>
                  <span>/</span>
                  <Link to={`/products/${categoryId}`} className="hover:text-white transition-colors">
                    {currentCategory.name}
                  </Link>
                </>
              )}
              {currentSubcategory && (
                <>
                  <span>/</span>
                  <span className="text-white">{currentSubcategory.name}</span>
                </>
              )}
            </nav>
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-8 h-8 text-red-300" />
              <h1 className="text-4xl md:text-5xl font-bold">{pageTitle}</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl">{pageDescription}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="sticky top-28 shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Filter className="w-5 h-5 text-red-600" />
                  <h3 className="font-bold text-lg">Catalog</h3>
                </div>

                <div className="space-y-1">
                  <Link to="/products">
                    <Button variant={!categoryId ? "default" : "ghost"} className="w-full justify-start mb-2">
                      All Products ({products.length})
                    </Button>
                  </Link>

                  {categories.map((cat) => {
                    const catProducts = getProductsByCategory(cat.id);
                    if (catProducts.length === 0) return null;

                    return (
                      <div key={cat.id} className="mb-3">
                        <Link to={`/products/${cat.id}`}>
                          <Button
                            variant={categoryId === cat.id && !subcategoryId ? "default" : "ghost"}
                            className="w-full justify-start font-semibold text-left h-auto py-2"
                          >
                            {cat.name}
                            <span className="ml-auto text-xs opacity-70">{catProducts.length}</span>
                          </Button>
                        </Link>

                        {categoryId === cat.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="pl-3 mt-1 space-y-0.5 border-l-2 border-red-200 ml-3"
                          >
                            {cat.subcategories.map((sub) => {
                              const subCount = getProductsBySubcategory(sub.id).length;
                              if (subCount === 0) return null;
                              return (
                                <Link key={sub.id} to={`/products/${cat.id}?subcategory=${sub.id}`}>
                                  <Button
                                    variant={subcategoryId === sub.id ? "secondary" : "ghost"}
                                    size="sm"
                                    className="w-full justify-start text-xs h-auto py-1.5 whitespace-normal text-left"
                                  >
                                    {sub.name}
                                    <span className="ml-auto pl-2 opacity-60">{subCount}</span>
                                  </Button>
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing <strong>{filteredProducts.length}</strong> product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-2xl border"
              >
                <p className="text-gray-500 text-lg">No products found in this category.</p>
                <Button asChild className="mt-4" variant="outline">
                  <Link to="/products">Browse All Products</Link>
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
