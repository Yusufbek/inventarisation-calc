import { Gift, FileText } from "lucide-react";

const bonuses = [
  {
    icon: Gift,
    title: "30 kunlik BILLZ bepul foydalanish",
    description: "Barcha imkoniyatlardan foydalaning",
  },
  {
    icon: FileText,
    title: "Ekspertlardan bonuslar",
    description: "Prezentatsiya va foydali materiallar",
  },
];

export const WebinarBonuses = () => {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
            Yana nimalarga <span className="text-primary">ega bo'lasiz?</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {bonuses.map((bonus) => (
              <div
                key={bonus.title}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <bonus.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                  {bonus.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {bonus.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
