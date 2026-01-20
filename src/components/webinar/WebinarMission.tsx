import { Sparkles } from "lucide-react";

export const WebinarMission = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-background rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-6 md:mb-8">
              Biz chakana savdo uchun{" "}
              <span className="text-primary">"super kuch"</span> taqdim etamiz
            </h2>

            {/* Copy */}
            <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
              Bizning fikrimizcha, do'kon egalari tovarlarni sanash va
              qog'ozbozlik bilan emas, balki strategiya va mijozlar bilan
              ishlashi kerak. Bizning missiyamiz — texnologiyalarni barchaga
              yetkazish: kichik va o'rta biznesga xuddi global gigantlar
              foydalanadigan kuchli avtomatlashtirish vositalarini taqdim etish.
            </p>

            {/* Closing statement */}
            <p className="text-xl md:text-2xl font-semibold text-foreground text-center mt-8">
              Ushbu vebinar — biznesingiz erkinligi sari{" "}
              <span className="text-primary">birinchi qadamingiz</span>dir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
