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
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Headline */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-4">
          Do'koningiz xavfsizligini ta'minlashga tayyormisiz?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground text-center mb-12">
          Keyingi juma kuni bizga qo'shiling
        </p>

        {/* Main Card */}
        <div className="bg-background rounded-3xl shadow-xl overflow-hidden">
          {/* Date Box */}
          <div className="bg-primary text-primary-foreground p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Calendar className="w-8 h-8 md:w-10 md:h-10" />
                <div>
                  <p className="text-sm md:text-base opacity-90">
                    Keyingi vebinar
                  </p>
                  <p className="text-xl md:text-2xl font-bold">
                    Juma, {formattedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 md:gap-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">16:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  <span className="font-semibold">Bepul</span>
                </div>
              </div>
            </div>
          </div>

          {/* Syllabus */}
          <div className="p-6 md:p-8 lg:p-10">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
              Vebinarda nimalarni o'rganasiz:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {syllabus.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* Closing Hook */}
            <p className="text-muted-foreground text-center mb-8 italic">
              Birinchi oydan boshlab yo'qotishlarni kamaytirishga yordam
              beradigan haqiqiy misollar va vositalarni namoyish etamiz.
            </p>

            {/* CTA Button */}
            <button
              onClick={onRegisterClick}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg md:text-xl py-4 md:py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Vebinarga yozilish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
