import { motion } from "motion/react";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, Download, FileText, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import ProductGallery from "../components/ProductGallery";
import ProductCard from "../components/ProductCard";
import {
  getProductById,
  getCategoryById,
  getSubcategoryById,
  getRelatedProducts,
} from "../data/products";

export default function ProductDetailPage() {
  const { productId, category } = useParams();
  const navigate = useNavigate();
  const product = getProductById(productId || "");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/products")}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const categoryData = getCategoryById(product.category);
  const subcategoryData = getSubcategoryById(product.subcategory);
  const relatedProducts = getRelatedProducts(product);

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in ${product.name} (${categoryData?.name} / ${subcategoryData?.name}). Could you provide more information?`
    );
    window.open(`https://wa.me/971502110108?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-red-600">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-red-600">Products</Link>
            <span>/</span>
            <Link to={`/products/${category}`} className="hover:text-red-600">
              {categoryData?.name}
            </Link>
            {subcategoryData && (
              <>
                <span>/</span>
                <Link
                  to={`/products/${category}?subcategory=${product.subcategory}`}
                  className="hover:text-red-600"
                >
                  {subcategoryData.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <ProductGallery images={product.images} name={product.name} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-red-600">Main: {categoryData?.name}</Badge>
                {subcategoryData && (
                  <Badge variant="secondary">Sub: {subcategoryData.name}</Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <Card>
              <CardContent className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 block mb-1">Main Category</span>
                    <span className="font-semibold text-gray-900">{categoryData?.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Subcategory</span>
                    <span className="font-semibold text-gray-900">{subcategoryData?.name ?? "—"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={handleWhatsAppInquiry}>
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Inquiry
              </Button>
              {product.pdfs?.map((pdf) => (
                <Button key={pdf.url} size="lg" variant="outline" asChild>
                  <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                    <Download className="w-5 h-5 mr-2" />
                    {pdf.name}
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>

        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-4">Product Overview</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                {product.features && product.features.length > 0 && (
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-6">Technical Specifications</h3>
                {product.specifications && product.specifications.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.specifications.map((spec, i) => (
                      <div key={i} className="flex justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">{spec.label}</span>
                        <span className="font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Contact us for detailed technical specifications for this product.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-6">Technical Documents</h3>
                {product.pdfs && product.pdfs.length > 0 ? (
                  <div className="space-y-3">
                    {product.pdfs.map((pdf) => (
                      <a
                        key={pdf.url}
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-red-600" />
                          <span className="font-medium group-hover:text-red-700">{pdf.name}</span>
                        </div>
                        <Download className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Request product datasheets and SDS documents via WhatsApp or contact form.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
