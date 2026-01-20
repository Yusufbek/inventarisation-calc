import { BillzLogo } from "@/components/BillzLogo";

interface WebinarHeroProps {
  onRegisterClick: () => void;
}

export const WebinarHero = ({ onRegisterClick }: WebinarHeroProps) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-background to-secondary/30 overflow-hidden">
      {/* Header */}
      <header className="w-full py-4 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <BillzLogo className="h-8 md:h-10" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 md:pt-16 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Foydangiz qayerga{" "}
              <span className="text-primary">yo'qolyapti?</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Do'konlarda ko'pincha yo'qotishlarga sabab bo'ladigan 6 ta sxemani tahlil qilamiz hamda ularni qanday aniqlash va oldini olish mumkinligini ko'rsatamiz.
            </p>

            <button
              onClick={onRegisterClick}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Vebinarga yozilish
            </button>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl transform -rotate-6"></div>
              <img
                src="/images/webinar/hero-webinar.png"
                alt="Foydangiz qayerga yo'qolyapti"
                className="relative w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
