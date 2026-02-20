import { Users, BookOpen } from "lucide-react";

const bonuses = [
  {
    icon: Users,
    title: "Avtomatlashtirish eksperti bilan uchrashuv",
    description:
      "Do'koningizni tizimlashtirish va foydani oshirish bo'yicha individual tavsiyalar",
  },
  {
    icon: BookOpen,
    title: "Do'koningiz uchun amaliy qo'llanmalar",
    description:
      "Savdo nazorati, yo'qotishlarni kamaytirish va samaradorlikni oshirish bo'yicha tayyor yechimlar",
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
                className="relative bg-secondary/40 border border-border rounded-2xl p-6 md:p-8 overflow-hidden min-h-[200px] flex flex-col justify-center"
              >
                {/* Text content */}
                <div className="relative z-10 pr-20 md:pr-28">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                    {bonus.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {bonus.description}
                  </p>
                </div>
                {/* Gift icon in bottom-right */}
                <img
                  src="/images/webinar/gift-box.png"
                  alt="Sovg'a"
                  className="absolute bottom-0 right-2 w-24 md:w-32 opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
