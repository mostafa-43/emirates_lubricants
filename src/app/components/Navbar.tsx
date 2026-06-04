import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { Menu, Search, Phone, Mail, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import ProductsMegaMenu from "./ProductsMegaMenu";
import { searchProducts } from "../data/products";
import { companyInfo } from "../data/company";
import logo from "../../imports/logo.png";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = query.length >= 2 ? searchProducts(query).slice(0, 6) : [];

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/certifications", label: "Certifications" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isProductsActive = location.pathname.startsWith("/products");

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <span>{companyInfo.phone.join(" | ")}</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span>{companyInfo.email}</span>
              </div>
            </div>
            <div className="text-xs hidden sm:block">{companyInfo.location}</div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(239, 68, 68, 0.2)",
                      "0 0 30px rgba(234, 179, 8, 0.3)",
                      "0 0 20px rgba(239, 68, 68, 0.2)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="rounded-lg"
                >
                  <ImageWithFallback src={logo} alt="Emirates Lubricants" className="h-14 w-auto" />
                </motion.div>
              </motion.div>
              <div className="hidden md:block">
                <div className="font-bold text-xl text-gray-900">EMIRATES LUBRICANTS</div>
                <div className="text-xs text-gray-600">{companyInfo.arabicName}</div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              <Link to="/" className="relative px-4 py-2">
                <span
                  className={`text-sm font-medium transition-colors ${
                    isActive("/") ? "text-red-600" : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  Home
                </span>
                {isActive("/") && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </Link>

              <div className="relative">
                <div className={`${isProductsActive ? "text-red-600" : ""}`}>
                  <ProductsMegaMenu />
                </div>
                {isProductsActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-red-600"
                  />
                )}
              </div>

              {navLinks.slice(1).map((link) => (
                <Link key={link.path} to={link.path} className="relative px-4 py-2">
                  <span
                    className={`text-sm font-medium transition-colors ${
                      isActive(link.path) ? "text-red-600" : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    {link.label}
                  </span>
                  {isActive(link.path) && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                {searchOpen ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-48 lg:w-64 px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      autoFocus
                    />
                    <Button variant="ghost" size="icon" onClick={() => { setSearchOpen(false); setQuery(""); }}>
                      <X className="w-4 h-4" />
                    </Button>
                    {results.length > 0 && (
                      <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border py-2 z-50">
                        {results.map((p) => (
                          <Link
                            key={p.id}
                            to={`/products/${p.category}/${p.id}`}
                            className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-700"
                            onClick={() => { setSearchOpen(false); setQuery(""); }}
                          >
                            {p.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                    <Search className="w-5 h-5" />
                  </Button>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
