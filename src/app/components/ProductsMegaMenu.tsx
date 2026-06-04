import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { categories } from "../data/categories";
import { getProductCountBySubcategory } from "../data/products";

type MenuNode = {
  id: string;
  name: string;
  description?: string;
  categoryId?: string;
  subcategories?: MenuNode[];
};

function hasChildren(node: MenuNode) {
  return Array.isArray(node.subcategories) && node.subcategories.length > 0;
}

export default function ProductsMegaMenu() {
  const [open, setOpen] = useState(false);
  const [openPath, setOpenPath] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const menuNodes = useMemo<MenuNode[]>(
    () =>
      categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        subcategories: category.subcategories.map((sub) => ({
          id: sub.id,
          name: sub.name,
          categoryId: sub.categoryId,
        })),
      })),
    []
  );

  const closeMenu = () => {
    setOpen(false);
    setOpenPath([]);
  };

  const goToNode = (node: MenuNode, parentTopId?: string) => {
    const topCategoryId = node.categoryId ?? parentTopId ?? node.id;
    if (hasChildren(node)) {
      navigate(`/products/${node.id}`);
    } else {
      navigate(`/products/${topCategoryId}?subcategory=${node.id}`);
    }
    closeMenu();
  };

  const rootTopId = openPath[0] ?? "";
  const activePanels: MenuNode[][] = [];
  let currentNodes = menuNodes;
  activePanels.push(currentNodes);
  for (let level = 0; level < openPath.length; level++) {
    const selectedId = openPath[level];
    const selected = currentNodes.find((item) => item.id === selectedId);
    if (!selected || !hasChildren(selected)) break;
    currentNodes = selected.subcategories!;
    activePanels.push(currentNodes);
  }

  const renderDesktopPanel = (nodes: MenuNode[], level: number, parentTopId?: string) => (
    <motion.div
      key={`panel-${level}`}
      initial={{ opacity: 0, x: level === 0 ? -8 : 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: level === 0 ? -8 : 8 }}
      transition={{ duration: 0.18 }}
      className="w-72 px-3 py-4 border-r last:border-r-0 bg-white"
    >
      <ul className="space-y-1">
        {nodes.map((node) => {
          const nodeHasChildren = hasChildren(node);
          const isSelected = openPath[level] === node.id;
          const routeTopId = level === 0 ? node.id : parentTopId;
          return (
            <li key={node.id}>
              <button
                type="button"
                onMouseEnter={() => {
                  if (!isMobile && nodeHasChildren) {
                    setOpenPath((prev) => [...prev.slice(0, level), node.id]);
                  }
                }}
                onClick={() => {
                  if (nodeHasChildren) {
                    if (isMobile) {
                      setOpenPath((prev) =>
                        prev[level] === node.id ? prev.slice(0, level) : [...prev.slice(0, level), node.id]
                      );
                    } else {
                      setOpenPath((prev) => [...prev.slice(0, level), node.id]);
                    }
                  } else {
                    goToNode(node, routeTopId);
                  }
                }}
                className={`w-full text-left flex items-center justify-between gap-2 px-3 py-3 rounded-lg transition-colors ${
                  nodeHasChildren ? "hover:bg-red-50" : "hover:bg-red-50"
                } ${isSelected ? "bg-red-50" : ""}`}
              >
                <span className="text-sm font-medium text-gray-700">{node.name}</span>
                <div className="flex items-center gap-2">
                  {nodeHasChildren && (
                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isSelected ? "rotate-90" : ""}`} />
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );

  const renderMobileNodes = (nodes: MenuNode[], level = 0, parentTopId?: string) => (
    <div className={`${level > 0 ? "pl-4 border-l border-gray-200" : ""}`}>
      {nodes.map((node) => {
        const nodeHasChildren = hasChildren(node);
        const expanded = openPath[level] === node.id;
        const routeTopId = level === 0 ? node.id : parentTopId;
        return (
          <div key={node.id} className="mb-2">
            <div className="flex items-center justify-between gap-3 bg-gray-50 px-3 py-3 rounded-lg">
              <button
                type="button"
                className="flex-1 text-left text-sm font-medium text-gray-800"
                onClick={() => {
                  if (nodeHasChildren) {
                    setOpenPath((prev) => (prev[level] === node.id ? prev.slice(0, level) : [...prev.slice(0, level), node.id]));
                  } else {
                    goToNode(node, routeTopId);
                  }
                }}
              >
                {node.name}
              </button>
              {nodeHasChildren && (
                <button
                  type="button"
                  className="p-1 rounded-full hover:bg-red-100"
                  onClick={() =>
                    setOpenPath((prev) => (prev[level] === node.id ? prev.slice(0, level) : [...prev.slice(0, level), node.id]))
                  }
                >
                  <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${expanded ? "rotate-90" : ""}`} />
                </button>
              )}
            </div>
            <AnimatePresence>
              {expanded && nodeHasChildren && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2">
                    {renderMobileNodes(node.subcategories!, level + 1, routeTopId)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className="relative"
      onMouseLeave={() => {
        if (!isMobile) closeMenu();
      }}
    >
      <button
        type="button"
        className="relative px-4 py-2 flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
        onClick={() => {
          setOpen((prev) => {
            const next = !prev;
            if (!next) {
              setOpenPath([]);
            }
            return next;
          });
        }}
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
            transition={{ duration: 0.16 }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 w-[min(100vw-2rem,920px)]"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="hidden lg:flex">
                {activePanels.map((nodes, level) => (
                  <div key={level} className="min-w-[18rem] border-r last:border-r-0">
                    {renderDesktopPanel(nodes, level, level === 0 ? undefined : rootTopId)}
                  </div>
                ))}
              </div>
              <div className="lg:hidden p-4">
                {renderMobileNodes(menuNodes)}
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center">
                <span className="text-xs text-gray-500">Main Category → Subcategory → Products</span>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center text-sm font-semibold text-red-600 hover:text-red-700"
                  onClick={closeMenu}
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
