import { CheckCircle, ArrowRight } from "lucide-react";

interface WebinarTopicsProps {
  onRegisterClick: () => void;
}

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

          {/* Dark section with two columns */}
          <div className="bg-primary rounded-3xl p-5 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Left column */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-white font-bold text-lg md:text-xl mb-3">
                  Nima haqida gaplashamiz?
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  Ushbu vebinar do'konida xavfsizlik va nazoratni kuchaytirishni istagan tadbirkorlar uchun mo'ljallangan.
                  Biz yo'qotishlarga olib keladigan asosiy xavflarni aniqlash va ularni tizimli ravishda bartaraf etish yo'llarini ko'rsatamiz.
                </p>
              </div>

              {/* Right column */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-white font-bold text-lg md:text-xl mb-4">
                  Vebinarda o'rganasiz
                </h3>
                <ul className="space-y-3">
                  {learningItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm md:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={onRegisterClick}
              className="group bg-primary text-primary-foreground font-semibold text-lg px-12 py-4 rounded-full hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2"
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
