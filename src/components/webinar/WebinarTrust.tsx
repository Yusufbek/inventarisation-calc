import { Trophy, TrendingUp, Clock, Users } from "lucide-react";

const brands = [
  { src: "/images/webinar/brand-levis.webp", alt: "Levi's" },
  { src: "/images/webinar/brand-lacoste.webp", alt: "Lacoste" },
  { src: "/images/webinar/brand-tommy.webp", alt: "Tommy Hilfiger" },
  { src: "/images/webinar/brand-vicco.webp", alt: "Vicco" },
  { src: "/images/webinar/brand-button.webp", alt: "Button" },
  { src: "/images/webinar/brand-marccain.webp", alt: "Marc Cain" },
];

const stats = [
  { icon: Trophy, value: "4,000+", label: "Faol do'konlar" },
  { icon: TrendingUp, value: "30%", label: "Savdo o'sishi" },
  { icon: Clock, value: "40%", label: "Vaqt tejash" },
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
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12 mb-12 md:mb-16">
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

        {/* Stats Row - Clean, minimal */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-16">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </div>
              {/* Separator */}
              {index < stats.length - 1 && (
                <div className="hidden sm:block w-px h-10 bg-border ml-6 md:ml-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
