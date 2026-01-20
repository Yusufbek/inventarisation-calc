import { Users, Calendar } from "lucide-react";

export const WebinarSpeaker = () => {
  return (
    <section className="bg-secondary/30 py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Bizning <span className="text-primary">spikerimiz</span> bilan tanishing
        </h2>

        {/* Speaker Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-background rounded-3xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Photo - Grayscale */}
              <div className="md:w-1/2">
                <img
                  src="/images/webinar/speaker-shohrukh.png"
                  alt="Shohrukh Pirmuhametov"
                  className="w-full h-64 md:h-full object-cover grayscale"
                />
              </div>

              {/* Info */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Shohrukh Pirmuhametov
                </h3>
                <p className="text-muted-foreground mb-6">
                  Mijozlarni ulash va o'qitish bo'yicha rahbar
                </p>

                {/* Stats */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-secondary/50 rounded-xl p-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">3 yillik tajriba</div>
                      <div className="text-sm text-muted-foreground">BILLZ platformasida</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-secondary/50 rounded-xl p-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">500+ ulangan mijozlar</div>
                      <div className="text-sm text-muted-foreground">Muvaffaqiyatli onboarding</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
