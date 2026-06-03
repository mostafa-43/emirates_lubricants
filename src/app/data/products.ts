import generated from "./catalog.generated.json";
import {
  categories,
  getCategoryById,
  getSubcategoryById,
} from "./categories";

export type { Category, Subcategory } from "./categories";
export { categories, getCategoryById, getSubcategoryById };

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  specifications: { label: string; value: string }[];
  images: string[];
  pdfs?: { name: string; url: string }[];
  features?: string[];
}

const rawProducts = (generated.products ?? []) as Product[];

/** Only products with at least one image are visible on the site */
export const products: Product[] = rawProducts.filter(
  (p) => p.images && p.images.length > 0
);

export const getProductsByCategory = (categoryId: string): Product[] =>
  products.filter((p) => p.category === categoryId);

export const getProductsBySubcategory = (subcategoryId: string): Product[] =>
  products.filter((p) => p.subcategory === subcategoryId);

export const getProductById = (productId: string): Product | undefined =>
  products.find((p) => p.id === productId);

export const getFeaturedProducts = (limit = 8): Product[] =>
  products.slice(0, limit);

export const getRelatedProducts = (product: Product, limit = 4): Product[] =>
  products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.subcategory === product.subcategory || p.category === product.category)
    )
    .slice(0, limit);

export const getProductCountByCategory = (categoryId: string): number =>
  getProductsByCategory(categoryId).length;

export const getProductCountBySubcategory = (subcategoryId: string): number =>
  getProductsBySubcategory(subcategoryId).length;

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      getCategoryById(p.category)?.name.toLowerCase().includes(q) ||
      getSubcategoryById(p.subcategory)?.name.toLowerCase().includes(q)
  );
};
