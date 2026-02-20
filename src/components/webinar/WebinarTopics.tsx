import { CheckCircle } from "lucide-react";

interface WebinarTopicsProps {
  onRegisterClick: () => void;
}

const topicCards = [
  {
    title: "Kassa va moliyaviy intizom",
    description:
      "Chetlab sotish va kassadagi kamomadni aniqlash hamda bartaraf etish usullari.",
    bg: "bg-[#1a1f36]",
    text: "text-white",
    descText: "text-white/70",
  },
  {
    title: "Mulk himoyasi",
    description:
      "O'g'rilik va yashirin yo'qotishlarning oldini olish bo'yicha amaliy choralar.",
    bg: "bg-[#ff5a5f]",
    text: "text-white",
    descText: "text-white/70",
  },
  {
    title: "Hisob-kitob nazorati",
    description:
      "Narx va miqdor bilan bog'liq firibgarliklarni aniqlash usullari.",
    bg: "bg-primary/10",
    text: "text-foreground",
    descText: "text-muted-foreground",
  },
];

const learningItems = [
  "Kassadagi kamomad va chetlab sotishni qanday aniqlash",
  "Xodimlar tomonidan yo'qotishlarning oldini olish",
  "Tovar qoldiqlarini real vaqtda nazorat qilish",
  "Har bir tovar bo'yicha haqiqiy foydani hisoblash",
  "Avtomatlashtirilgan hisobotlar orqali vaqtni tejash",
];

export const WebinarTopics = ({ onRegisterClick }: WebinarTopicsProps) => {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
            Nimalarni <span className="text-primary">o'rganasiz?</span>
          </h2>

          {/* Part A: 3 colored cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-6">
            {topicCards.map((card, i) => (
              <div
                key={i}
                className={`${card.bg} rounded-3xl p-7 md:p-8 flex flex-col justify-between min-h-[200px]`}
              >
                <h3 className={`${card.text} font-bold text-lg md:text-xl mb-3 leading-tight`}>
                  {card.title}
                </h3>
                <p className={`${card.descText} text-sm md:text-base leading-relaxed`}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Part B: Dark section with two columns */}
          <div className="bg-[#1a1f36] rounded-3xl p-5 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Left column */}
              <div className="bg-primary/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-foreground font-bold text-lg md:text-xl mb-3">
                  Nima haqida gaplashamiz?
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  Ushbu vebinar do'konida xavfsizlik va nazoratni kuchaytirishni istagan tadbirkorlar uchun mo'ljallangan.
                  Biz yo'qotishlarga olib keladigan asosiy xavflarni aniqlash va ularni tizimli ravishda bartaraf etish yo'llarini ko'rsatamiz.
                </p>
              </div>

              {/* Right column */}
              <div className="bg-primary/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-foreground font-bold text-lg md:text-xl mb-4">
                  Vebinarda o'rganasiz
                </h3>
                <ul className="space-y-3">
                  {learningItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
