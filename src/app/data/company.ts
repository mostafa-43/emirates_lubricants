import productsProfilePdf from "../../imports/________Emirates_Lubricants_Products_Profile_compressed.pdf?url";
import productsProfileFullPdf from "../../imports/Emirates_Lubricants_Products_Profile_Full.pdf?url";
import signBoardPdf from "../../imports/Emirates_Sign_Board.pdf?url";
import factoryImage1 from "../../imports/WhatsApp_Image_2026-05-26_at_5.23.54_PM.jpeg";
import factoryImage2 from "../../imports/WhatsApp_Image_2026-05-26_at_5.24.18_PM.jpeg";
import logo from "../../imports/WhatsApp_Image_2026-05-26_at_5.24.26_PM.jpeg";
import goldenWheelLogo from "../../imports/WhatsApp_Image_2026-05-26_at_5.21.23_PM__2_.jpeg";
import xtremeLogo from "../../imports/WhatsApp_Image_2026-05-26_at_5.21.23_PM__1_.jpeg";
import nitroLogo from "../../imports/WhatsApp_Image_2026-05-26_at_5.21.22_PM.jpeg";
import everestLogo from "../../imports/WhatsApp_Image_2026-05-26_at_5.21.23_PM.jpeg";
import brandLogoExtra from "../../imports/WhatsApp Image 2026-05-26 at 5.21.23 PM (3).jpeg";

export const companyInfo = {
  name: "Emirates Modern Lubricants Factory L.L.C",
  tagline: "Excellence in Lubrication Technology",
  arabicName: "الإمــــارات للـــزيـــوت",
  founded: 2004,
  location: "Al Hamra Industrial Zone, Ras Al Khaimah - U.A.E.",
  phone: ["07 243 2241", "052 660 6888"],
  email: "emirates.lubricants@yahoo.com",
  website: "www.emiratslubrican.com",
  productCount: "650+",
  countries: "100+",
  oemApprovals: "150+",
  description:
    "Emirates Lubricants is an independent lubricant manufacturer with development and production facilities in the UAE and Germany. Our high-performance lubricants are trusted in more than 100 countries worldwide.",
  factoryDescription:
    "Our state-of-the-art manufacturing facility in Al Hamra Industrial Zone, Ras Al Khaimah, features advanced blending and packaging equipment, an on-site quality control laboratory, and ISO-certified processes. German quality standards since 2004.",
  certifications: [
    "ISO 9001:2015 Quality Management",
    "ISO 14001:2015 Environmental Management",
    "ISO 45001:2018 Occupational Health & Safety",
    "DIN EN ISO 21469:2006 H1 Food Grade Lubricants",
  ],
  factoryImages: [factoryImage1, factoryImage2],
  logo,
  brands: [
    { name: "Emirates Lubricants", logo },
    { name: "Golden Wheel", logo: goldenWheelLogo },
    { name: "Xtreme", logo: xtremeLogo },
    { name: "Everest", logo: everestLogo },
    { name: "NITRO Plus", logo: nitroLogo },
    { name: "Premium Line", logo: brandLogoExtra },
  ],
  documents: [
    {
      title: "Products Profile 2024",
      description:
        "Complete catalog of 650+ high-performance lubricants — automotive, industrial, marine, and greases with specifications and OEM approvals.",
      url: productsProfilePdf,
      size: "3.3 MB",
    },
    {
      title: "Products Profile (Full Edition)",
      description:
        "Complete Emirates Lubricants product profile with full specifications, OEM approvals, and technical data for all product lines.",
      url: productsProfileFullPdf,
      size: "24.7 MB",
    },
    {
      title: "Emirates Sign Board / Factory Overview",
      description: "Company signage and factory location overview document.",
      url: signBoardPdf,
      size: "654 KB",
    },
  ],
};
