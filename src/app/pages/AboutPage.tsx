import { motion } from "motion/react";
import { Link } from "react-router";
import { Award, Users, Factory, Target, CheckCircle2, Download, FileText } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { companyInfo } from "../data/company";
import { products } from "../data/products";

export default function AboutPage() {
  const values = [
    { icon: Award, title: "Quality Excellence", description: "Committed to delivering the highest quality lubricants that meet international standards." },
    { icon: Users, title: "Customer Focus", description: "Building lasting relationships through exceptional service and product support." },
    { icon: Factory, title: "Innovation", description: "Continuously advancing our formulations and manufacturing processes." },
    { icon: Target, title: "Reliability", description: "Consistent performance and dependable supply for all our customers." },
  ];

  const milestones = [
    { year: "2004", event: "Company Founded — German Quality Standards" },
    { year: "2010", event: "Expanded Manufacturing in Al Hamra Industrial Zone" },
    { year: "2015", event: "ISO 14001 Environmental Certification" },
    { year: "2018", event: "ISO 9001 Quality Management Certification" },
    { year: "2023", event: "ISO 45001 Occupational Health & Safety" },
    { year: "2024", event: `${companyInfo.productCount} Products — Global Distribution in ${companyInfo.countries} Countries` },
  ];

  return (
    <div className="bg-white">
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white py-24 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold mb-6">About Emirates Lubricants</h1>
            <p className="text-xl text-gray-300 max-w-3xl">{companyInfo.description}</p>
          </motion.div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  Emirates Modern Lubricants Factory L.L.C was established in {companyInfo.founded} with a vision to
                  provide the Middle East region with world-class lubricating solutions.
                </p>
                <p>{companyInfo.factoryDescription}</p>
                <p>
                  With more than {companyInfo.oemApprovals} OEM approvals from leading manufacturers including
                  Mercedes-Benz, Volkswagen Group, and others, our products are trusted across {companyInfo.countries} countries.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[
                { value: "25+", label: "Years", color: "from-red-500 to-red-600" },
                { value: companyInfo.productCount, label: "Products", color: "from-yellow-500 to-yellow-600" },
                { value: products.length.toString(), label: "In Catalog", color: "from-green-500 to-green-600" },
                { value: "UAE", label: "Made in UAE", color: "from-blue-500 to-blue-600" },
              ].map((stat) => (
                <Card key={stat.label} className={`bg-gradient-to-br ${stat.color} text-white`}>
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="opacity-90">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Factory Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Factory & Facilities</h2>
            <p className="text-xl text-gray-600">{companyInfo.location}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {companyInfo.factoryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <ImageWithFallback src={img} alt={`Factory view ${i + 1}`} className="w-full h-64 object-cover" />
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {[
                "State-of-the-art blending and packaging equipment",
                "Advanced quality control laboratory",
                "ISO-certified processes and procedures",
                "Environmentally responsible manufacturing",
                "H1 food-grade lubricant production (ISO 21469)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {companyInfo.brands.map((brand) => (
                <div key={brand.name} className="bg-white p-4 rounded-xl shadow-md">
                  <ImageWithFallback src={brand.logo} alt={brand.name} className="h-14 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents from PDFs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Company Documents</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {companyInfo.documents.map((doc) => (
              <Card key={doc.title} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <FileText className="w-8 h-8 text-red-600 mb-3" />
                  <h3 className="font-bold mb-2">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                  <Button asChild variant="outline" size="sm">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="h-full border-2 hover:border-red-500 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-red-200 md:-translate-x-1/2" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-12 md:pl-0 md:flex md:items-center md:gap-8"
                >
                  <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-red-600 rounded-full border-4 border-white shadow z-10" />
                  <Card className="md:flex-1 shadow-lg">
                    <CardContent className="p-5">
                      <div className="text-xl font-bold text-red-600 mb-1">{milestone.year}</div>
                      <div className="text-gray-700">{milestone.event}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
