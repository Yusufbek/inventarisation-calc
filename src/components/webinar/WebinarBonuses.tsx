const bonuses = [
  {
    title: "Bepul konsultatsiya",
    description:
      "Do'koningizni tizimlashtirish va foydani oshirish bo'yicha individual tavsiyalar",
    icon: "/images/webinar/bonus-chat-icon.png",
  },
  {
    title: "Tayyor amaliy qo'llanmalar",
    description:
      "Savdo nazorati va samaradorlikni oshirish bo'yicha tayyor yechimlar",
    icon: "/images/webinar/bonus-pdf-icon.png",
  },
];

export const WebinarBonuses = () => {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
            Qatnashuvchilarga <span className="text-primary">bonuslar</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {bonuses.map((bonus) => (
              <div
                key={bonus.title}
                className="relative bg-card border border-border rounded-3xl p-7 md:p-9 overflow-hidden min-h-[200px] md:min-h-[220px] flex items-start"
              >
                <div className="relative z-10 pr-20 sm:pr-28 flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
                    {bonus.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {bonus.description}
                  </p>
                </div>
                <img
                  src={bonus.icon}
                  alt={bonus.title}
                  className="absolute bottom-4 right-4 w-20 sm:w-24 md:w-28 max-w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
