import { Trophy, TrendingUp, Clock } from "lucide-react";

const brands = [
  { src: "/images/webinar/brands/brand5.webp", alt: "Calvin Klein" },
  { src: "/images/webinar/brands/brand8.webp", alt: "Yves Rocher" },
  { src: "/images/webinar/brands/brand6.webp", alt: "Vicco" },
  { src: "/images/webinar/brands/brand2.webp", alt: "Levi's" },
  { src: "/images/webinar/brands/brand3.webp", alt: "Lacoste" },
  { src: "/images/webinar/brands/brand4.webp", alt: "Tommy Hilfiger" },
  { src: "/images/webinar/brands/brand7.webp", alt: "Button" },
  { src: "/images/webinar/brands/brand9.webp", alt: "Marc Cain" },
];

const stats = [
  {
    icon: Trophy,
    value: "4,000+",
    label: "Faol do'konlar",
  },
  {
    icon: TrendingUp,
    value: "30%",
    label: "Savdo hajmining o'sishi",
  },
  {
    icon: Clock,
    value: "40%",
    label: "Boshqaruvda tejalgan vaqt",
  },
];

export const WebinarTrust = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Headline */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-12 md:mb-16">
          Dunyoning yetakchi brendlari va{" "}
          <span className="text-primary">4000 dan ortiq</span> mahalliy
          tadbirkorlar ishonchi
        </h2>

        {/* Logo Wall */}
        <div className="relative mb-12 md:mb-16">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-center justify-start md:justify-center gap-8 md:gap-12 min-w-max px-4 md:px-0">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className="h-10 md:h-14 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 md:p-8 bg-secondary/50 rounded-2xl hover:bg-secondary/70 transition-colors"
            >
              <stat.icon className="w-10 h-10 md:w-12 md:h-12 text-primary mb-4" />
              <span className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
                {stat.value}
              </span>
              <span className="text-muted-foreground text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
