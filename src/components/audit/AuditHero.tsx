import { BillzLogo } from "@/components/BillzLogo";
import { Users } from "lucide-react";

interface AuditHeroProps {
  onCtaClick: () => void;
}

export const AuditHero = ({ onCtaClick }: AuditHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-background pt-4 md:pt-6 pb-8 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6 md:mb-8">
          <BillzLogo />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* Left content */}
          <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              SHU RAMAZONDA DO'KONINGIZNI{" "}
              <span className="text-primary">BEPUL AUDIT</span> QILAMIZ
            </h1>

            <p className="text-muted-foreground text-sm md:text-lg max-w-lg mx-auto md:mx-0">
              Biz yashirin yo'qotishlarni aniqlab, foydani oshirish bo'yicha aniq reja taqdim etamiz.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-destructive/10 text-destructive text-xs md:text-sm font-semibold">
              🔥 Kuniga faqat 5 ta do'kon tanlab olinadi
            </div>

            <div>
              <button
                onClick={onCtaClick}
                className="w-full sm:w-auto bg-primary text-primary-foreground font-bold text-base md:text-lg px-6 md:px-8 py-3.5 md:py-4 rounded-full hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              >
                Bepul auditga yozilish
              </button>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground text-xs md:text-sm">
              <Users className="h-4 w-4" />
              <span>5000 dan ortiq do'kon egalari bizga ishonadi</span>
            </div>
          </div>

          {/* Right image */}
          <div className="flex-1 relative w-full max-w-sm md:max-w-none">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/audit-hero.png"
                alt="Do'kon audit ko'rinishi"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
