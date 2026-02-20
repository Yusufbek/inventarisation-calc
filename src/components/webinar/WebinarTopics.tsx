import { ArrowRight, ShieldCheck, PackageSearch, Calculator } from "lucide-react";

interface WebinarTopicsProps {
  onRegisterClick: () => void;
}

const topics = [
  {
    icon: Calculator,
    step: "01",
    title: "Kassa va moliyaviy intizom",
    description:
      "Chetlab sotish va kassadagi kamomadni aniqlash hamda bartaraf etish usullari.",
    gradient: "from-primary/10 to-primary/5",
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
    borderColor: "border-l-primary",
    badgeBg: "bg-primary/10",
    badgeText: "text-primary",
  },
  {
    icon: ShieldCheck,
    step: "02",
    title: "Mulk himoyasi",
    description:
      "O'g'rilik va yashirin yo'qotishlarning oldini olish bo'yicha amaliy choralar.",
    gradient: "from-emerald-50 to-emerald-50/50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    borderColor: "border-l-emerald-500",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-600",
  },
  {
    icon: PackageSearch,
    step: "03",
    title: "Hisob-kitob nazorati",
    description:
      "Narx va miqdor bilan bog'liq firibgarliklarni aniqlash usullari.",
    gradient: "from-amber-50 to-amber-50/50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    borderColor: "border-l-amber-500",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-600",
  },
];

export const WebinarTopics = ({ onRegisterClick }: WebinarTopicsProps) => {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-20">
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
                className={`relative bg-gradient-to-br ${topic.gradient} border border-border border-l-4 ${topic.borderColor} rounded-2xl p-6 md:p-7 hover:shadow-lg transition-all duration-300`}
              >
                <span className={`absolute top-4 right-4 text-xs font-bold ${topic.badgeText} ${topic.badgeBg} rounded-full w-8 h-8 flex items-center justify-center`}>
                  {topic.step}
                </span>
                <div className={`w-14 h-14 rounded-xl ${topic.iconBg} flex items-center justify-center mb-4`}>
                  <topic.icon className={`w-7 h-7 ${topic.iconColor}`} />
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
