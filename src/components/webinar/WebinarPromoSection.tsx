import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { uz } from "date-fns/locale";

// Get next Friday from today
const getNextFriday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilFriday = dayOfWeek === 5 ? 7 : (5 - dayOfWeek + 7) % 7 || 7;
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + daysUntilFriday);
  return nextFriday;
};

export const WebinarPromoSection = () => {
  const nextFriday = getNextFriday();
  const formattedDate = format(nextFriday, "d MMMM", { locale: uz });

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-6 md:p-10 lg:p-12 overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Calendar className="w-4 h-4" />
                <span>Juma, {formattedDate} | 16:00</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Foydangiz qayerga{" "}
                <span className="text-primary">yo'qolyapti?</span>
              </h2>
              
              <p className="text-muted-foreground text-base md:text-lg max-w-lg">
                Do'konlarda ko'pincha yo'qotishlarga sabab bo'ladigan 6 ta sxemani tahlil qilamiz.
              </p>
              
              <Link
                to="/webinar/foyda-webinar"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:gap-3"
              >
                Batafsil
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Image */}
            <div className="hidden lg:flex justify-end">
              <img
                src="/images/webinar/hero-webinar.png"
                alt="Webinar"
                className="w-full max-w-sm rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
