import { Users, BookOpen } from "lucide-react";

const bonuses = [
  {
    icon: Users,
    title: "Avtomatlashtirish eksperti bilan uchrashuv",
    description:
      "Do'koningizni tizimlashtirish va foydani oshirish bo'yicha individual tavsiyalar",
    gradient: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
  {
    icon: BookOpen,
    title: "Do'koningiz uchun amaliy qo'llanmalar",
    description:
      "Savdo nazorati, yo'qotishlarni kamaytirish va samaradorlikni oshirish bo'yicha tayyor yechimlar",
    gradient: "from-accent/30 to-accent/5",
    iconBg: "bg-accent/30",
    iconColor: "text-accent-foreground",
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
                className={`bg-gradient-to-br ${bonus.gradient} border border-primary/10 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow`}
              >
                <div
                  className={`w-14 h-14 ${bonus.iconBg} rounded-2xl flex items-center justify-center mb-5`}
                >
                  <bonus.icon className={`w-7 h-7 ${bonus.iconColor}`} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                  {bonus.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
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
