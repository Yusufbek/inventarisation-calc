import { Users } from "lucide-react";

const brands = [
  { src: "/images/webinar/brand-levis.webp", alt: "Levi's" },
  { src: "/images/webinar/brand-lacoste.webp", alt: "Lacoste" },
  { src: "/images/webinar/brand-tommy.webp", alt: "Tommy Hilfiger" },
  { src: "/images/webinar/brand-vicco.webp", alt: "Vicco" },
  { src: "/images/webinar/brand-button.webp", alt: "Button" },
  { src: "/images/webinar/brand-marccain.webp", alt: "Marc Cain" },
];

export const WebinarTrust = () => {
  return (
    <section className="bg-secondary/30 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground text-center mb-10 md:mb-12 max-w-2xl mx-auto leading-tight">
          Dunyoning yetakchi brendlari va{" "}
          <span className="text-primary">4000+ mahalliy tadbirkorlar</span>{" "}
          ishonchi
        </h2>

        {/* Logo Row - No container, clean inline */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
          {brands.map((brand) => (
            <img
              key={brand.alt}
              src={brand.src}
              alt={brand.alt}
              className="h-6 md:h-8 lg:h-10 object-contain grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
            />
          ))}
          {/* +500 Badge */}
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">+500</span>
          </div>
        </div>
      </div>
    </section>
  );
};
