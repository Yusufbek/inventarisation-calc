import { Calendar, Users } from "lucide-react";

const workedWithBrands = [
  { src: "/images/webinar/brand-levis.webp", alt: "Levi's" },
  { src: "/images/webinar/brand-lacoste.webp", alt: "Lacoste" },
  { src: "/images/webinar/brand-tommy.webp", alt: "Tommy Hilfiger" },
  { src: "/images/webinar/brand-vicco.webp", alt: "Vicco" },
];

export const WebinarSpeaker = () => {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10 md:mb-14">
          Bizning <span className="text-primary">spikerimiz</span> bilan tanishing
        </h2>

        {/* Speaker Card */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
            {/* Photo - Full Color, Large */}
            <div className="w-full md:w-1/2 flex-shrink-0">
              <div className="relative">
                <img
                  src="/images/webinar/speaker-shohrukh-v2.jpg"
                  alt="Shohrukh Pirmuhametov"
                  className="w-full max-w-sm md:max-w-md mx-auto rounded-3xl shadow-xl"
                />
                {/* Decorative blur */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/10 rounded-full blur-3xl" />
              </div>
            </div>

            {/* Info */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Shohrukh Pirmuhametov
              </h3>
              <p className="text-muted-foreground text-base md:text-lg mb-8">
                Mijozlarni ulash va o'qitish bo'yicha rahbar
              </p>

              {/* Stats Cards - Side by Side */}
              <div className="flex flex-row gap-4 mb-8 justify-center md:justify-start">
                <div className="flex-1 max-w-[160px] bg-secondary/50 rounded-2xl p-4 md:p-5 text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">3</div>
                  <div className="text-xs md:text-sm text-muted-foreground">yillik tajriba</div>
                </div>

                <div className="flex-1 max-w-[160px] bg-secondary/50 rounded-2xl p-4 md:p-5 text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">500+</div>
                  <div className="text-xs md:text-sm text-muted-foreground">ulangan mijozlar</div>
                </div>
              </div>

              {/* Worked With Brands */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Quyidagi brendlar bilan ishlagan:
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {workedWithBrands.map((brand) => (
                    <img
                      key={brand.alt}
                      src={brand.src}
                      alt={brand.alt}
                      className="h-6 md:h-7 object-contain grayscale opacity-60"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
