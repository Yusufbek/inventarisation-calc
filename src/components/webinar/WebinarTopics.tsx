import { ArrowRight, ShieldCheck, PackageSearch, Calculator } from "lucide-react";

interface WebinarTopicsProps {
  onRegisterClick: () => void;
}

const topics = [
  {
    icon: Calculator,
    title: "Kassa va moliyaviy intizom",
    description:
      "Chetlab sotish holatlari va kassadagi kamomad (\"minus\") paydo bo'lishining sabablarini aniqlash hamda ularni bartaraf etish usullari.",
  },
  {
    icon: ShieldCheck,
    title: "Mulk himoyasi",
    description:
      "O'g'rilik, tovarlarni almashtirib qo'yish va yashirin yo'qotishlarning oldini olish bo'yicha amaliy choralar.",
  },
  {
    icon: PackageSearch,
    title: "Hisob-kitob nazorati",
    description:
      "Narxlar o'zgarishi, mahsulot miqdori bilan bog'liq firibgarliklar va noto'g'ri hisob-kitoblarni qanday aniqlash mumkinligi.",
  },
];

export const WebinarTopics = ({ onRegisterClick }: WebinarTopicsProps) => {
  return (
    <section className="bg-secondary/30 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4">
            Nimalarni <span className="text-primary">o'rganasiz?</span>
          </h2>

          <p className="text-muted-foreground text-center text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Ushbu vebinar do'konida xavfsizlik va nazoratni kuchaytirishni istagan tadbirkorlar uchun mo'ljallangan.
            Biz yo'qotishlarga olib keladigan asosiy xavflarni aniqlash va ularni tizimli ravishda bartaraf etish yo'llarini ko'rsatamiz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
            {topics.map((topic, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-5 md:p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <topic.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-foreground font-bold text-base md:text-lg mb-2">
                  {topic.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onRegisterClick}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-base md:text-lg px-10 md:px-14 py-4 md:py-5 rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] group"
            >
              Vebinarga yozilish
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
