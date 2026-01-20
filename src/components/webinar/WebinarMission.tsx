import { Star, Puzzle, Users, GraduationCap } from "lucide-react";

interface WebinarMissionProps {
  onRegisterClick?: () => void;
}

const features = [
  {
    icon: Star,
    title: "Tajribali spiker",
    description: "3 yillik BILLZ tajribasi",
  },
  {
    icon: Puzzle,
    title: "Amaliy misollar",
    description: "Real biznes holatlari",
  },
  {
    icon: Users,
    title: "Biznes jamoasi",
    description: "Boshqa tadbirkorlar bilan aloqa",
  },
  {
    icon: GraduationCap,
    title: "Sifatli ta'lim",
    description: "Tushuntirish bilan o'rganish",
  },
];

export const WebinarMission = ({ onRegisterClick }: WebinarMissionProps) => {
  return (
    <section className="bg-primary/5 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Biz chakana savdo uchun{" "}
            <span className="text-primary">"super kuch"</span> taqdim etamiz
          </h2>
          
          {/* Subtext */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 md:mb-14 max-w-2xl mx-auto">
            Texnologiyalarni barchaga yetkazish — kichik va o'rta biznesga xuddi global gigantlar foydalanadigan kuchli vositalarni taqdim etish.
          </p>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-background rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          {onRegisterClick && (
            <button
              onClick={onRegisterClick}
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold text-base md:text-lg px-10 md:px-12 py-4 rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              Vebinarga yozilish
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
