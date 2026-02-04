import { Check } from "lucide-react";

const contentItems = [
  {
    title: "Tovar sanash tartibi",
    subtitle: "(kim, qachon, qanday)",
  },
  {
    title: "Xatolarni oldindan yopish:",
    subtitle: "nazorat ro'yxati",
  },
  {
    title: "Sanab bo'lgandan keyin:",
    subtitle: "farqni topish va tuzatish",
  },
];

export const PdfContent = () => {
  return (
    <section className="w-full py-8">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
        Nimalar ichida?
      </h2>

      <div className="space-y-4">
        {contentItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-secondary/30 rounded-2xl"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-muted-foreground">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
