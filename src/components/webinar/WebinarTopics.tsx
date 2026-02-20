import { ArrowRight } from "lucide-react";

interface WebinarTopicsProps {
  onRegisterClick: () => void;
}

const topics = [
  "O'g'irlik va noto'g'ri hisobdan qanday qutulish",
  "Ortiqcha tovar bilan omborni to'ldirmaslik va avtomatik buyurtma",
  "Do'kon va marketpleysda qoldiqlarni nazorat qilish",
  "Tovarlar, omborlar va xodimlar bo'yicha real foydani ko'rish",
];

export const WebinarTopics = ({ onRegisterClick }: WebinarTopicsProps) => {
  return (
    <section className="bg-secondary/30 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
            Nimalarni <span className="text-primary">o'rganasiz?</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10">
            {topics.map((topic, i) => (
              <div
                key={i}
                className="bg-primary/5 border border-primary/10 rounded-2xl p-5 md:p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-foreground font-medium text-sm md:text-base leading-relaxed">
                    {topic}
                  </p>
                </div>
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
