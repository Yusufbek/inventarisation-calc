import { BillzLogo } from "@/components/BillzLogo";

interface WebinarHeroProps {
  onRegisterClick: () => void;
}

export const WebinarHero = ({ onRegisterClick }: WebinarHeroProps) => {
  return (
    <section className="relative min-h-[100svh] bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
      {/* Header */}
      <header className="w-full py-4 md:py-6 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <BillzLogo className="h-8 md:h-10" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6 md:pt-12 lg:pt-16 pb-20 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 space-y-5 md:space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center">
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                BILLZ VEBINAR
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1]">
              Foydangiz qayerga{" "}
              <span className="text-primary">yo'qolyapti?</span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Do'konlarda ko'pincha yo'qotishlarga sabab bo'ladigan 6 ta sxemani tahlil qilamiz hamda ularni qanday aniqlash va oldini olish mumkinligini ko'rsatamiz.
            </p>

            <div className="pt-2">
              <button
                onClick={onRegisterClick}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base md:text-lg px-8 md:px-10 py-4 rounded-full transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                Vebinarga yozilish
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl transform -rotate-6 scale-95"></div>
              <img
                src="/images/webinar/hero-webinar.png"
                alt="Foydangiz qayerga yo'qolyapti"
                className="relative w-full h-auto rounded-2xl md:rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
