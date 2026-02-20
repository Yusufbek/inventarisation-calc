const bonuses = [
  {
    title: "Avtomatlashtirish eksperti bilan uchrashuv",
    description:
      "Do'koningizni tizimlashtirish va foydani oshirish bo'yicha individual tavsiyalar",
  },
  {
    title: "Do'koningiz uchun amaliy qo'llanmalar",
    description:
      "Savdo nazorati va samaradorlikni oshirish bo'yicha tayyor yechimlar",
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
                className="relative bg-secondary/30 rounded-3xl p-7 md:p-9 overflow-hidden min-h-[180px] md:min-h-[200px]"
              >
                <div className="relative z-10 pr-16 sm:pr-24">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
                    {bonus.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {bonus.description}
                  </p>
                </div>
                <img
                  src="/images/webinar/gift-box.png"
                  alt="Sovg'a"
                  className="absolute bottom-[-4px] right-2 w-20 sm:w-24 md:w-28 max-w-full h-auto opacity-80"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
