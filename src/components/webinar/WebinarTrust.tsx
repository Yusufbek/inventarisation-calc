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
    <section className="py-12 md:py-20 lg:py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Headline */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-foreground mb-10 md:mb-14 max-w-3xl mx-auto leading-snug">
          Dunyoning yetakchi brendlari va{" "}
          <span className="text-primary">4000 dan ortiq</span> mahalliy
          tadbirkorlar ishonchi
        </h2>

        {/* Logo Wall */}
        <div className="relative mb-10 md:mb-14">
          <div className="overflow-x-auto scrollbar-hide pb-2">
            <div className="flex items-center justify-start md:justify-center gap-6 md:gap-10 lg:gap-12 min-w-max px-2 md:px-0">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100"
                >
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-5 md:p-6 lg:p-8 bg-background rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
              <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary mb-1">
                {stat.value}
              </span>
              <span className="text-muted-foreground text-sm md:text-base text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
