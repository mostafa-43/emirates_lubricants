import { ImageWithFallback } from "./figma/ImageWithFallback";
import { companyInfo } from "../data/company";

export function LogoTicker() {
  const validBrands = companyInfo.brands.filter((brand) => brand.logo);
  const logos = [...validBrands, ...validBrands];

  return (
    <div className="logo-ticker relative overflow-hidden rounded-[2rem] border border-slate-800/90 bg-slate-900/95 shadow-xl shadow-slate-950/40">
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none bg-gradient-to-r from-white/95 to-transparent dark:from-slate-950/95 dark:to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none bg-gradient-to-l from-white/95 to-transparent dark:from-slate-950/95 dark:to-transparent" />

      <div className="relative overflow-hidden">
        <div className="logo-ticker-track flex items-center gap-12 px-6 py-8" aria-label="Brand logos ticker">
          {logos.map((brand, index) => (
            <div key={`${brand.name}-${index}`} className="flex-shrink-0 min-w-[180px] max-w-[220px] flex items-center justify-center opacity-90 transition-opacity duration-300 hover:opacity-100">
              <ImageWithFallback
                src={brand.logo}
                alt={brand.name}
                className="h-20 sm:h-24 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
