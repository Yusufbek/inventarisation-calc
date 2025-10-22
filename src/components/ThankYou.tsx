import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { BillzLogo } from "@/components/BillzLogo";

export const ThankYou = () => {
  return (
    <div className="w-full bg-background">
      {/* Success Message Section */}
      <section className="bg-background px-4 py-8 md:py-20 animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center">
            <BillzLogo className="h-10 md:h-12 text-foreground" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center animate-scale-in">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-success" strokeWidth={1.5} />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Rahmat!
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-3">
              Sizning so'rovingiz muvaffaqiyatli qabul qilindi.
            </p>
            
            <p className="text-muted-foreground">
              BILLZ jamoasi tez orada siz bilan bog'lanadi va sizning biznesingiz uchun eng yaxshi yechimni taklif qiladi.
            </p>
          </div>
        </div>
      </section>

      {/* Eye-Catching Transition Section - Matching Results Page */}
      <section className="relative py-8 md:py-12 px-4 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="relative max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
          <h3 className="text-3xl md:text-5xl font-bold text-foreground leading-tight animate-slide-up">
            <span className="text-primary">💡 Biznesni rivojlantirish</span> sirlari
          </h3>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
            Telegram botimizga obuna bo'ling va har kuni foydali maslahatlar oling
          </p>

          {/* Animated Arrow */}
          <div className="pt-2 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            <div className="inline-flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center animate-bounce">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                Pastga qarang
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <Button
            onClick={() => {
              // Track Telegram bot subscription click
              if ((window as any).fbq) {
                (window as any).fbq('trackCustom', 'TelegramBotClick');
              }
              window.open('https://t.me/billzinfobot', '_blank');
            }}
            size="lg"
            className="h-16 px-16 text-xl rounded-2xl font-bold shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 animate-scale-in"
          >
            Telegram botga obuna bo'lish
          </Button>
        </div>
      </section>
    </div>
  );
};