import { Check, Calendar, Clock, Gift, ArrowRight } from "lucide-react";

interface WebinarCTAProps {
  onRegisterClick: () => void;
}

const syllabusItems = [
  {
    title: "Kassa va moliyaviy intizom",
    description: "Chetlab sotish hamda kassadagi kamomat (\"minus\") ni bartaraf etish."
  },
  {
    title: "Mulk himoyasi",
    description: "O'g'rilik va tovarlarni almashtirib qo'yish holatlarining oldini olish."
  },
  {
    title: "Hisob-kitob nazorati",
    description: "Narxlar va mahsulot miqdori bilan bo'ladigan firibgarliklarni fosh etish."
  }
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
  return `${day}-${month}`;
};

export const getFormattedFridayDate = (): string => {
  return formatDateUzbek(getNextFriday());
};

export const WebinarCTA = ({ onRegisterClick }: WebinarCTAProps) => {
  const nextFridayFormatted = getFormattedFridayDate();

  return (
    <section className="bg-secondary/30 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="bg-primary/5 rounded-3xl p-6 md:p-10 lg:p-12">
            {/* Headline */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-8">
              Do'koningiz xavfsizligini ta'minlashga tayyormisiz?
            </h2>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-8">
              {/* Left - Date & Time */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-lg mb-4">
                  Keyingi vebinar
                </h3>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center shadow-sm">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Juma, {nextFridayFormatted}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center shadow-sm">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">17:00</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Gift className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">Ishtirok bepul</span>
                  </div>
                </div>
              </div>

              {/* Right - Syllabus */}
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-4">
                  Nimalarni o'rganasiz: Xavfsizlik va Nazorat
                </h3>
                <div className="space-y-3">
                  {syllabusItems.map((item) => (
                    <div key={item.title} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-left">
                        <span className="font-medium text-foreground">{item.title}:</span>{" "}
                        <span className="text-muted-foreground">{item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
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
      </div>
    </section>
  );
};
