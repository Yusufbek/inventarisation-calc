import { Sparkles } from "lucide-react";

export const WebinarMission = () => {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/50 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative">
            {/* Icon */}
            <div className="flex justify-center mb-5 md:mb-6">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-foreground mb-5 md:mb-6">
              Biz chakana savdo uchun{" "}
              <span className="text-primary">"super kuch"</span> taqdim etamiz
            </h2>

            {/* Copy */}
            <p className="text-base md:text-lg text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto">
              Bizning fikrimizcha, do'kon egalari tovarlarni sanash va
              qog'ozbozlik bilan emas, balki strategiya va mijozlar bilan
              ishlashi kerak. Bizning missiyamiz — texnologiyalarni barchaga
              yetkazish: kichik va o'rta biznesga xuddi global gigantlar
              foydalanadigan kuchli avtomatlashtirish vositalarini taqdim etish.
            </p>

            {/* Closing statement */}
            <p className="text-lg md:text-xl font-semibold text-foreground text-center mt-6 md:mt-8">
              Ushbu vebinar — biznesingiz erkinligi sari{" "}
              <span className="text-primary">birinchi qadamingiz</span>dir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
