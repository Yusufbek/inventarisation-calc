import { Users, Calendar } from "lucide-react";

const speakerBrands = [
  { src: "/images/webinar/brands/brand5.webp", alt: "Calvin Klein" },
  { src: "/images/webinar/brands/brand8.webp", alt: "Yves Rocher" },
  { src: "/images/webinar/brands/brand6.webp", alt: "Vicco" },
  { src: "/images/webinar/brands/brand3.webp", alt: "Lacoste" },
];

export const WebinarSpeaker = () => {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-10 md:mb-14">
          Bizning <span className="text-primary">spikerimiz</span> bilan tanishing
        </h2>

        {/* Speaker Card - Horizontal Layout */}
        <div className="bg-secondary/30 rounded-2xl md:rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-0">
            {/* Photo */}
            <div className="relative h-64 md:h-full">
              <img
                src="/images/webinar/speaker-shohrukh.png"
                alt="Shohrukh Pirmuhametov"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Info */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1">
                Shohrukh Pirmuhametov
              </h3>
              <p className="text-base md:text-lg text-primary font-medium mb-6">
                Mijozlarni ulash va o'qitish bo'yicha rahbar
              </p>

              {/* Stats */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex items-center gap-3 bg-background rounded-xl px-4 py-3 shadow-sm flex-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium text-sm md:text-base">
                    3 yillik tajriba
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-background rounded-xl px-4 py-3 shadow-sm flex-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium text-sm md:text-base">
                    500+ ulangan mijozlar
                  </span>
                </div>
              </div>

              {/* Brands worked with */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Quyidagi brendlar bilan ishlagan:
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  {speakerBrands.map((brand, index) => (
                    <img
                      key={index}
                      src={brand.src}
                      alt={brand.alt}
                      className="h-6 md:h-8 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
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
