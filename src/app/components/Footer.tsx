import { Link } from "react-router";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { categories } from "../data/categories";
import { companyInfo } from "../data/company";
import logo from "../../imports/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <ImageWithFallback src={logo} alt="Emirates Lubricants" className="h-16 w-auto" />
            <h3 className="text-white font-semibold text-lg">{companyInfo.name}</h3>
            <p className="text-sm">{companyInfo.description}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "Products" },
                { to: "/about", label: "About Us" },
                { to: "/certifications", label: "Certifications" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-red-500 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product Categories</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/products/${cat.id}`} className="hover:text-red-500 transition-colors text-sm">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{companyInfo.location}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a
                  href="tel:+971502110108"
                  className="hover:text-red-500 transition-colors"
                >
                  +971 50 211 0108
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>{companyInfo.email}</span>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61569985143275&mibextid=wwXIfr&rdid=eXzUGyow8BolMkUs&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1D8g8jfa1g%2F%3Fmibextid%3DwwXIfr#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/emirateslubricantsuae?igsh=c3BzMm13cHhzcnFt&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
