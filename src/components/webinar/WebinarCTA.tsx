import { Calendar, Clock, Gift, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { uz } from "date-fns/locale";

interface WebinarCTAProps {
  onRegisterClick: () => void;
  nextFriday: Date;
}

const syllabus = [
  "Kassadan chetlab sotish",
  "Tovarni o'g'irlash",
  "Narxlar bilan firibgarlik",
  "Tovarni almashtirish",
  "Kamroq miqdorni qayd etish",
  'Kassada "minus"',
];

export const WebinarCTA = ({ onRegisterClick, nextFriday }: WebinarCTAProps) => {
  const formattedDate = format(nextFriday, "d MMMM yyyy", { locale: uz });

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-secondary/20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Headline */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-foreground mb-2 md:mb-3">
          Do'koningiz xavfsizligini ta'minlashga tayyormisiz?
        </h2>
        <p className="text-base md:text-lg text-muted-foreground text-center mb-8 md:mb-10">
          Keyingi juma kuni bizga qo'shiling
        </p>

        {/* Main Card */}
        <div className="bg-background rounded-2xl md:rounded-3xl shadow-xl overflow-hidden">
          {/* Date Box */}
          <div className="bg-primary text-primary-foreground p-5 md:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-xs md:text-sm opacity-80">
                    Keyingi vebinar
                  </p>
                  <p className="text-lg md:text-xl font-bold">
                    Juma, {formattedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 opacity-80" />
                  <span className="font-semibold text-sm md:text-base">16:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 md:w-5 md:h-5 opacity-80" />
                  <span className="font-semibold text-sm md:text-base">Bepul</span>
                </div>
              </div>
            </div>
          </div>

          {/* Syllabus */}
          <div className="p-5 md:p-8 lg:p-10">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-5">
              Vebinarda nimalarni o'rganasiz:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              {syllabus.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>

            {/* Closing Hook */}
            <p className="text-muted-foreground text-center mb-6 md:mb-8 text-sm md:text-base italic">
              Birinchi oydan boshlab yo'qotishlarni kamaytirishga yordam
              beradigan haqiqiy misollar va vositalarni namoyish etamiz.
            </p>

            {/* CTA Button */}
            <button
              onClick={onRegisterClick}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base md:text-lg py-4 rounded-full transition-all duration-300 hover:scale-[1.01] shadow-lg hover:shadow-xl active:scale-[0.99]"
            >
              Vebinarga yozilish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
