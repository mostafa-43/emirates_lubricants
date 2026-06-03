/**
 * Recursively scans drive/ (Google Drive sync folder):
 *   drive/<Category>/<Product>/{images + pdf}
 *   drive/Lubricating greases/<Subcategory>/<Product>/{images + pdf}
 *
 * Products without images are excluded.
 * Output: src/app/data/catalog.generated.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  resolveDriveCategory,
  extractProductName,
  selectBestImages,
} from "./drive-mapping.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DRIVE = path.join(ROOT, "drive");
const PUBLIC_CATALOG = path.join(ROOT, "public", "catalog");
const OUT = path.join(ROOT, "src", "app", "data", "catalog.generated.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const PDF_EXT = new Set([".pdf"]);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}

function isImage(file) {
  return IMAGE_EXT.has(path.extname(file).toLowerCase());
}

function isPdf(file) {
  return PDF_EXT.has(path.extname(file).toLowerCase());
}

function toPublicUrl(relativePath) {
  return `/catalog/${relativePath.replace(/\\/g, "/")}`;
}

function collectFiles(productDrivePath) {
  const images = [];
  const pdfs = [];

  if (!fs.existsSync(productDrivePath)) return { images, pdfs };

  // Recursively collect images and pdfs from the product folder and any nested
  // subfolders (many products store assets inside an `images` subfolder).
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }

      const relFromDrive = path.relative(DRIVE, full);
      if (isImage(entry.name)) {
        images.push({ rel: relFromDrive, name: entry.name, size: fs.statSync(full).size });
      } else if (isPdf(entry.name)) {
        pdfs.push({
          name: path.basename(entry.name, path.extname(entry.name)),
          url: toPublicUrl(relFromDrive),
        });
      }
    }
  }

  walk(productDrivePath);

  return { images, pdfs };
}

function selectBestImagesFromEntries(imageEntries) {
  return selectBestImages(imageEntries);
}

function buildProduct(folderPath, folderName, mainCategory, subcategory, subcategoryName) {
  const { images, pdfs } = collectFiles(folderPath);
  const imageUrls = selectBestImagesFromEntries(images);
  if (imageUrls.length === 0) return null;

  const productName = extractProductName(folderName);
  const id = slugify(folderName);

  return {
    id,
    name: productName,
    category: mainCategory,
    subcategory,
    subcategoryName,
    description: `${productName} — premium lubricant from Emirates Lubricants. Manufactured to international quality standards for reliable performance and protection.`,
    specifications: [],
    features: [],
    images: imageUrls,
    pdfs: pdfs.length ? pdfs : undefined,
  };
}

function scanProductFolders(categoryPath, mapping, products, subOverride) {
  if (!fs.existsSync(categoryPath)) return;

  const entries = fs.readdirSync(categoryPath, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const entryPath = path.join(categoryPath, entry.name);

    const files = fs.readdirSync(entryPath, { withFileTypes: true });
    const hasSubfolders = files.some((f) => f.isDirectory());
    const hasMedia = files.some(
      (f) => f.isFile() && (isImage(f.name) || isPdf(f.name))
    );

    if (hasSubfolders && !hasMedia) {
      const nestedMapping = subOverride ?? {
        mainCategory: mapping.mainCategory,
        subcategory: slugify(entry.name),
        subcategoryName: entry.name,
      };
      scanProductFolders(entryPath, mapping, products, nestedMapping);
      continue;
    }

    const sub = subOverride ?? mapping;
    const product = buildProduct(
      entryPath,
      entry.name,
      sub.mainCategory,
      sub.subcategory,
      sub.subcategoryName
    );
    if (product) products.push(product);
  }
}

function scanDrive() {
  const products = [];
  const stats = { categories: 0, skipped: 0, noImages: 0 };

  if (!fs.existsSync(DRIVE)) {
    console.warn("drive/ folder not found.");
    return { products, stats };
  }

  const categoryDirs = fs
    .readdirSync(DRIVE, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  for (const catDir of categoryDirs) {
    const mapping = resolveDriveCategory(catDir.name);
    if (!mapping) {
      console.warn(`  ⚠ Unmapped category: "${catDir.name}"`);
      stats.skipped++;
      continue;
    }

    stats.categories++;
    const catPath = path.join(DRIVE, catDir.name);
    const before = products.length;
    scanProductFolders(catPath, mapping, products);
    console.log(`  ✓ ${catDir.name}: ${products.length - before} products`);
  }

  return { products, stats };
}

function copyDriveToPublic() {
  if (!fs.existsSync(DRIVE)) return;

  function copyRecursive(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const s = path.join(src, entry.name);
      const d = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyRecursive(s, d);
      } else if (entry.isFile() && (isImage(entry.name) || isPdf(entry.name))) {
        fs.copyFileSync(s, d);
      }
    }
  }

  if (fs.existsSync(PUBLIC_CATALOG)) {
    fs.rmSync(PUBLIC_CATALOG, { recursive: true, force: true });
  }
  copyRecursive(DRIVE, PUBLIC_CATALOG);
  console.log("Copied drive/ → public/catalog/");
}

console.log("Scanning Google Drive folder...");
copyDriveToPublic();
const { products, stats } = scanDrive();

const uniqueProducts = [];
const seenIds = new Set();
for (const p of products) {
  if (seenIds.has(p.id)) continue;
  seenIds.add(p.id);
  uniqueProducts.push(p);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(
  OUT,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      source: "Google Drive",
      stats: {
        categoriesScanned: stats.categories,
        totalProducts: uniqueProducts.length,
      },
      products: uniqueProducts,
    },
    null,
    2
  )
);

console.log(`\n✅ Generated ${uniqueProducts.length} products → ${OUT}`);
