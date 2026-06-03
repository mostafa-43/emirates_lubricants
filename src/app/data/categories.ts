export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
}

const MAIN: Record<string, Omit<Category, "subcategories">> = {
  "automotive-lubricants": {
    id: "automotive-lubricants",
    name: "Automotive Lubricants",
    description:
      "Engine oils, transmission fluids, and automotive function fluids for passenger cars, commercial vehicles, and specialty applications.",
    icon: "car",
  },
  "industrial-lubricants": {
    id: "industrial-lubricants",
    name: "Industrial Lubricants",
    description:
      "Hydraulic fluids, gear oils, compressor oils, and specialty industrial lubricants for manufacturing and heavy industry.",
    icon: "factory",
  },
  "marine-railroad": {
    id: "marine-railroad",
    name: "Marine and Railroad",
    description:
      "Marine engine oils, railroad lubricants, and watercraft solutions for demanding maritime and rail applications.",
    icon: "ship",
  },
  "lubricating-greases": {
    id: "lubricating-greases",
    name: "Lubricating Greases",
    description:
      "Multi-purpose, high-temperature, food-grade, and specialty greases for bearings, machinery, and extreme conditions.",
    icon: "droplets",
  },
};

/** Subcategories aligned with Google Drive folder names */
const SUBCATEGORIES: Subcategory[] = [
  { id: "engine-oils-passenger-cars", name: "Engine Oils – Passenger Cars", categoryId: "automotive-lubricants" },
  { id: "engine-oils-commercial-vehicles", name: "Engine Oils – Commercial Vehicles", categoryId: "automotive-lubricants" },
  { id: "automotive-transmission-oils", name: "Automotive Transmission Oils", categoryId: "automotive-lubricants" },
  { id: "automatic-transmission-fluids", name: "Automatic Transmission Fluids", categoryId: "automotive-lubricants" },
  { id: "automotive-function-fluids", name: "Automotive Function Fluids", categoryId: "automotive-lubricants" },
  { id: "universal-tractor-oils", name: "Universal Tractor Oils", categoryId: "automotive-lubricants" },
  { id: "engine-oils-2-stroke-4-stroke-motorbikes", name: "Engine Oils – 2-Stroke & 4-Stroke Motorbikes", categoryId: "automotive-lubricants" },
  { id: "hydraulic-fluids", name: "Hydraulic Fluids", categoryId: "industrial-lubricants" },
  { id: "industrial-gear-oils", name: "Industrial Gear Oils", categoryId: "industrial-lubricants" },
  { id: "compressor-oils", name: "Compressor Oils", categoryId: "industrial-lubricants" },
  { id: "turbine-oils", name: "Turbine Oils", categoryId: "industrial-lubricants" },
  { id: "chain-lubricants", name: "Chain Lubricants", categoryId: "industrial-lubricants" },
  { id: "heat-transfer-oils", name: "Heat Transfer Oils", categoryId: "industrial-lubricants" },
  { id: "transformer-oils", name: "Transformer Oils", categoryId: "industrial-lubricants" },
  { id: "sprays", name: "Sprays", categoryId: "industrial-lubricants" },
  { id: "special-products", name: "Special Products", categoryId: "industrial-lubricants" },
  { id: "anti-corrosion-oils", name: "Anti-Corrosion Oils", categoryId: "industrial-lubricants" },
  { id: "bearing-machine-oils", name: "Bearing, Machine and Circulating Oils", categoryId: "industrial-lubricants" },
  { id: "guideway-oils", name: "Guideway Oils", categoryId: "industrial-lubricants" },
  { id: "mould-release-oils", name: "Mould Release Oils", categoryId: "industrial-lubricants" },
  { id: "refrigerator-oils", name: "Refrigerator Oils", categoryId: "industrial-lubricants" },
  { id: "vacuum-pump-oils", name: "Vacuum Pump Oils", categoryId: "industrial-lubricants" },
  { id: "food-industry-lubricants", name: "Lubricants for Food Industry", categoryId: "industrial-lubricants" },
  { id: "metalworking-non-miscible", name: "Metalworking Coolants – Non Water-Miscible", categoryId: "industrial-lubricants" },
  { id: "metalworking-miscible", name: "Metalworking Coolants – Water-Miscible", categoryId: "industrial-lubricants" },
  { id: "marine-and-railroad", name: "Marine and Railroad", categoryId: "marine-railroad" },
  { id: "engine-oils-watercraft", name: "Engine Oils – Watercraft", categoryId: "marine-railroad" },
  { id: "gas-engine-oils", name: "Gas Engine Oils", categoryId: "marine-railroad" },
  { id: "lubricating-greases", name: "Lubricating Greases", categoryId: "lubricating-greases" },
];

export const categories: Category[] = Object.values(MAIN).map((main) => ({
  ...main,
  subcategories: SUBCATEGORIES.filter((s) => s.categoryId === main.id),
}));

export const getCategoryById = (id: string) => categories.find((c) => c.id === id);
export const getSubcategoryById = (id: string) => SUBCATEGORIES.find((s) => s.id === id);

/** Merge subcategories discovered in catalog (e.g. nested grease types) */
export function mergeDiscoveredSubcategories(
  discovered: { id: string; name: string; categoryId: string }[]
): void {
  for (const sub of discovered) {
    if (!SUBCATEGORIES.find((s) => s.id === sub.id)) {
      SUBCATEGORIES.push(sub);
      const cat = categories.find((c) => c.id === sub.categoryId);
      if (cat) cat.subcategories.push(sub);
    }
  }
}
