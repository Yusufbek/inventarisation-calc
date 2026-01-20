import { Users, Calendar } from "lucide-react";

export const WebinarSpeaker = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-12 md:mb-16">
          Bizning <span className="text-primary">spikerimiz</span> bilan
          tanishing
        </h2>

        {/* Speaker Card */}
        <div className="bg-secondary/30 rounded-3xl p-6 md:p-10 lg:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                <img
                  src="/images/webinar/speaker-shohrukh.png"
                  alt="Shohrukh Pirmuhametov"
                  className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-background shadow-xl"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Shohrukh Pirmuhametov
              </h3>
              <p className="text-lg md:text-xl text-primary font-medium mb-6">
                Mijozlarni ulash va o'qitish bo'yicha rahbar
              </p>

              {/* Stats */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center md:justify-start">
                <div className="flex items-center gap-3 bg-background rounded-xl px-5 py-3 shadow-sm">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">
                    3 yillik tajriba
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-background rounded-xl px-5 py-3 shadow-sm">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">
                    500+ ulangan mijozlar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
