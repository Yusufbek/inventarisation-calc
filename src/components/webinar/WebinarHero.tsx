import { BillzLogo } from "@/components/BillzLogo";

interface WebinarHeroProps {
  onRegisterClick: () => void;
}

export const WebinarHero = ({ onRegisterClick }: WebinarHeroProps) => {
  return (
    <section className="bg-background py-8 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="mb-10 md:mb-16 flex justify-center lg:justify-start">
          <BillzLogo className="h-8 md:h-10" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-semibold">
                Bepul Vebinar
              </span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-foreground text-xs md:text-sm font-medium">
                27 fevral
              </span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-foreground text-xs md:text-sm font-medium">
                soat 11:00da
              </span>
            </div>
            
            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-foreground leading-[1.1] mb-6">
              Foydangiz qayerga{" "}
              <span className="text-primary">yo'qolyapti?</span>
            </h1>
            
            {/* Subtext */}
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Do'konlarda ko'pincha yo'qotishlarga sabab bo'ladigan 6 ta sxemani tahlil qilamiz hamda ularni qanday aniqlash va oldini olish mumkinligini ko'rsatamiz.
            </p>
            
            {/* CTA Button */}
            <button
              onClick={onRegisterClick}
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold text-base md:text-lg px-10 md:px-14 py-4 md:py-5 rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              Vebinarga yozilish
            </button>
          </div>

          {/* Hero Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/images/webinar/hero-specialist.jpg"
                alt="BILLZ Vebinar mutaxassisi"
                className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-3xl shadow-2xl"
              />
              {/* Decorative blur element */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
