import { Trophy, TrendingUp, Clock } from "lucide-react";

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
  { icon: TrendingUp, value: "30%", label: "Savdo hajmining o'sishi" },
  { icon: Clock, value: "40%", label: "Boshqaruvda tejalgan vaqt" },
];

export const WebinarTrust = () => {
  return (
    <section className="bg-secondary/30 py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 max-w-3xl mx-auto">
          Dunyoning yetakchi brendlari va 4000 dan ortiq mahalliy tadbirkorlar ishonchi
        </h2>

        {/* Logo Wall */}
        <div className="bg-background rounded-2xl shadow-lg p-6 md:p-8 mb-10">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {brands.map((brand) => (
              <img
                key={brand.alt}
                src={brand.src}
                alt={brand.alt}
                className="h-8 md:h-10 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
              />
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-background rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
