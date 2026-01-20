import { BillzLogo } from "@/components/BillzLogo";

interface WebinarHeroProps {
  onRegisterClick: () => void;
}

export const WebinarHero = ({ onRegisterClick }: WebinarHeroProps) => {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="mb-8 md:mb-12">
          <BillzLogo className="h-8 md:h-10" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-6">
              Foydangiz qayerga yo'qolyapti?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Do'konlarda ko'pincha yo'qotishlarga sabab bo'ladigan 6 ta sxemani tahlil qilamiz hamda ularni qanday aniqlash va oldini olish mumkinligini ko'rsatamiz.
            </p>
            <button
              onClick={onRegisterClick}
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold text-lg px-8 py-4 rounded-full hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Vebinarga yozilish
            </button>
          </div>

          {/* Hero Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <img
              src="/images/webinar/hero-specialist.png"
              alt="BILLZ Vebinar mutaxassisi"
              className="w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
