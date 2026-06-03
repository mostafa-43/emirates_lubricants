import { motion } from "motion/react";
import { Award, Download, ExternalLink } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import isoCert1 from "../../imports/WhatsApp_Image_2026-05-26_at_5.20.50_PM__1_.jpeg";
import isoCert2 from "../../imports/WhatsApp_Image_2026-05-26_at_5.20.50_PM__2_.jpeg";
import isoCert3 from "../../imports/WhatsApp_Image_2026-05-26_at_5.20.50_PM.jpeg";

export default function CertificationsPage() {
  const certifications = [
    {
      title: "ISO 9001:2015",
      subtitle: "Quality Management System",
      description: "Certified for meeting the highest requirements of quality management and excellence in manufacturing.",
      image: isoCert3,
      certNumber: "1213Q252623",
      validUntil: "12 December 2026",
      scope: [
        "Oil-Based Lubricating Oils or Greases Provision",
        "Anti-Knock and Antifreeze Chemical Preparations Manufacturing",
      ],
    },
    {
      title: "ISO 14001:2015",
      subtitle: "Environmental Management System",
      description: "Certified for our commitment to environmental responsibility and sustainable manufacturing practices.",
      image: isoCert2,
      certNumber: "1213E252723",
      validUntil: "12 December 2026",
      scope: [
        "Oil-Based Lubricating Oils or Greases Provision",
        "Anti-Knock and Antifreeze Chemical Preparations Manufacturing",
      ],
    },
    {
      title: "ISO 45001:2018",
      subtitle: "Occupational Health & Safety Management System",
      description: "Certified for maintaining the highest standards of workplace health and safety.",
      image: isoCert1,
      certNumber: "1213O252823",
      validUntil: "12 December 2026",
      scope: [
        "Oil-Based Lubricating Oils or Greases Provision",
        "Anti-Knock and Antifreeze Chemical Preparations Manufacturing",
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-6">
              <Award className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Our Certifications</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Committed to international standards of quality, environmental responsibility, 
              and workplace safety
            </p>
          </motion.div>
        </div>
      </div>

      {/* Certifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="overflow-hidden shadow-xl border-2">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Certificate Image */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer overflow-hidden"
                      >
                        <ImageWithFallback
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      {/* Certificate Details */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 text-red-600 font-semibold mb-4">
                          <Award className="w-5 h-5" />
                          <span>CERTIFIED</span>
                        </div>
                        
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {cert.title}
                        </h2>
                        <h3 className="text-xl text-gray-600 mb-6">
                          {cert.subtitle}
                        </h3>
                        
                        <p className="text-gray-600 mb-6">
                          {cert.description}
                        </p>

                        <div className="space-y-4 mb-6">
                          <div className="flex items-start gap-3">
                            <div className="font-semibold text-gray-700 min-w-[140px]">
                              Certificate No:
                            </div>
                            <div className="text-gray-600">{cert.certNumber}</div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="font-semibold text-gray-700 min-w-[140px]">
                              Valid Until:
                            </div>
                            <div className="text-gray-600">{cert.validUntil}</div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="font-semibold text-gray-700 min-w-[140px]">
                              Certified By:
                            </div>
                            <div className="text-gray-600">Otabu Certification Pvt. Ltd.</div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="font-semibold text-gray-700 min-w-[140px]">
                              Scope:
                            </div>
                            <div className="text-gray-600">
                              <ul className="list-disc list-inside space-y-1">
                                {cert.scope.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button className="bg-red-600 hover:bg-red-700">
                            <Download className="w-4 h-4 mr-2" />
                            Download Certificate
                          </Button>
                          <Button variant="outline">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Verify
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Certifications Mean
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our ISO certifications demonstrate our commitment to excellence in every aspect 
              of our operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Quality Assurance</h3>
                  <p className="text-gray-600">
                    Rigorous quality control processes ensure every product meets international 
                    standards and customer expectations.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Environmental Care</h3>
                  <p className="text-gray-600">
                    Our environmental management system minimizes our ecological footprint and 
                    promotes sustainable practices.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Safety First</h3>
                  <p className="text-gray-600">
                    Comprehensive health and safety protocols protect our employees and ensure 
                    safe working conditions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
