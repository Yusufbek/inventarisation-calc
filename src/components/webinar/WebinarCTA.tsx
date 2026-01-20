import { Check, Calendar, Clock, Gift } from "lucide-react";

interface WebinarCTAProps {
  onRegisterClick: () => void;
}

const syllabus = [
  "Kassadan chetlab sotish",
  "Tovarni o'g'irlash",
  "Narxlar bilan firibgarlik",
  "Tovarni almashtirish",
  "Kamroq miqdorni qayd etish",
  'Kassada "minus"',
];

// Get next Friday date
const getNextFriday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + daysUntilFriday);
  return nextFriday;
};

// Format date in Uzbek
const formatDateUzbek = (date: Date): string => {
  const months = [
    "yanvar", "fevral", "mart", "aprel", "may", "iyun",
    "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `Juma, ${day}-${month} ${year}`;
};

export const getFormattedFridayDate = (): string => {
  return formatDateUzbek(getNextFriday());
};

export const WebinarCTA = ({ onRegisterClick }: WebinarCTAProps) => {
  const nextFridayFormatted = getFormattedFridayDate();

  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
            Do'koningiz xavfsizligini ta'minlashga tayyormisiz?{" "}
            <span className="text-primary">Keyingi juma kuni bizga qo'shiling.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Date Box */}
            <div className="bg-secondary/30 rounded-3xl p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Keyingi vebinar
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{nextFridayFormatted}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">Vaqt: 16:00</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                    <Gift className="w-5 h-5 text-success" />
                  </div>
                  <span className="font-medium text-success">Ishtirok bepul</span>
                </div>
              </div>
            </div>

            {/* Syllabus */}
            <div className="bg-secondary/30 rounded-3xl p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Vebinarda nimalarni o'rganasiz:
              </h3>
              
              <div className="space-y-3">
                {syllabus.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Closing Hook */}
          <p className="text-center text-muted-foreground mt-8 mb-8 max-w-2xl mx-auto">
            Birinchi oydan boshlab yo'qotishlarni kamaytirishga yordam beradigan haqiqiy misollar va vositalarni namoyish etamiz.
          </p>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={onRegisterClick}
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold text-lg px-10 py-4 rounded-full hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Vebinarga yozilish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
