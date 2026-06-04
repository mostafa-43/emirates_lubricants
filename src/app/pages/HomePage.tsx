import { motion } from "motion/react";
import { Link } from "react-router";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Award,
  Shield,
  Zap,
  Factory,
  FileText,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { HeroVideo } from "../components/HeroVideo";
import BrowseByCategory from "../components/BrowseByCategory";
import { LogoTicker } from "../components/LogoTicker";
import ProductCard from "../components/ProductCard";
import { getFeaturedProducts, products } from "../data/products";
import { companyInfo } from "../data/company";
import isoCert1 from "../../imports/WhatsApp_Image_2026-05-26_at_5.20.50_PM__1_.jpeg";
import isoCert2 from "../../imports/WhatsApp_Image_2026-05-26_at_5.20.50_PM__2_.jpeg";
import isoCert3 from "../../imports/WhatsApp_Image_2026-05-26_at_5.20.50_PM.jpeg";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(6);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-gray-50 via-white to-red-50 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-red-400/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-400/15 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              >
                German Quality since {companyInfo.founded}
              </motion.span>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Excellence in
                <motion.span
                  className="block text-red-600 mt-2"
                  animate={{ backgroundPosition: ["0%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                  style={{
                    backgroundImage: "linear-gradient(90deg, #dc2626, #ca8a04, #dc2626)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Lubrication Technology
                </motion.span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {companyInfo.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200">
                  <Link to="/products">
                    Explore Products
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/about">Our Factory</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12">
                {[
                  { value: companyInfo.productCount, label: "Products" },
                  { value: "25+", label: "Years Experience" },
                  { value: companyInfo.oemApprovals, label: "OEM Approvals" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-red-600">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 60px rgba(220, 38, 38, 0.25)",
                    "0 0 90px rgba(234, 179, 8, 0.35)",
                    "0 0 60px rgba(220, 38, 38, 0.25)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative bg-white rounded-3xl p-6 shadow-2xl"
              >
                <HeroVideo
                  videoId="c4AO5evi6v4"
                  posterUrl="https://img.youtube.com/vi/c4AO5evi6v4/maxresdefault.jpg"
                  title="Emirates Lubricants Introduction Video"
                />
                <motion.div
                  animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-5 -right-5 bg-red-600 text-white p-4 rounded-2xl shadow-xl"
                >
                  <Award className="w-8 h-8" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-5 -left-5 bg-yellow-500 text-white p-4 rounded-2xl shadow-xl"
                >
                  <Shield className="w-8 h-8" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, iconBg: "bg-red-100", iconColor: "text-red-600", title: "ISO Certified", text: "ISO 9001, 14001 & 45001 certified quality and environmental management." },
              { icon: Shield, iconBg: "bg-yellow-100", iconColor: "text-yellow-600", title: "Premium Quality", text: "High-performance lubricants meeting international OEM specifications." },
              { icon: Zap, iconBg: "bg-green-100", iconColor: "text-green-600", title: `${products.length}+ Products`, text: "Comprehensive automotive, industrial, marine, and grease solutions." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="border-2 hover:border-red-200 transition-all h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                      <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Showcase */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 text-red-400 mb-4">
                <Factory className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Factory Showcase</span>
              </div>
              <h2 className="text-4xl font-bold mb-6">State-of-the-Art Manufacturing in UAE</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">{companyInfo.factoryDescription}</p>
              <ul className="space-y-3 mb-8">
                {companyInfo.certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200">{cert}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="secondary">
                <Link to="/about">Learn More About Our Factory</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-4"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-black">
                <HeroVideo
                  videoId="F5YegI26wyg"
                  posterUrl="https://img.youtube.com/vi/F5YegI26wyg/maxresdefault.jpg"
                  title="Emirates Lubricants Factory Showcase"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BrowseByCategory />

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-xl text-gray-600">Premium lubricants from our catalog</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">Our Brands</h2>
          <LogoTicker />
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Documents</h2>
            <p className="text-xl text-gray-600">Download company profiles and product catalogs</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {companyInfo.documents.map((doc, i) => (
              <motion.a
                key={doc.title}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="block"
              >
                <Card className="h-full hover:border-red-400 hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <FileText className="w-10 h-10 text-red-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">{doc.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-600">
                      <Download className="w-4 h-4" />
                      PDF · {doc.size}
                    </span>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Certifications</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[isoCert3, isoCert2, isoCert1].map((cert, i) => (
              <motion.div key={i} whileHover={{ scale: 1.04 }} className="cursor-pointer">
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <CardContent className="p-0">
                    <ImageWithFallback src={cert} alt="ISO Certificate" className="w-full h-auto" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/certifications">View All Certifications <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-gray-900 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{
            background: "conic-gradient(from 0deg, transparent, white, transparent)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-6">Ready to Experience Premium Quality?</h2>
            <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
              Contact us today for product inquiries, technical support, or partnership opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-red-600">
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
