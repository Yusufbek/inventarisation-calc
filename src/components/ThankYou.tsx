import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { BillzLogo } from "@/components/BillzLogo";

export const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-scale-in">
        <div className="flex justify-center mb-4">
          <BillzLogo className="h-10 md:h-12 text-foreground" />
        </div>
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-success" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Rahmat!
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-3">
          Sizning so'rovingiz muvaffaqiyatli qabul qilindi.
        </p>
        
        <p className="text-muted-foreground mb-8">
          BILLZ jamoasi tez orada siz bilan bog'lanadi va sizning biznesingiz uchun eng yaxshi yechimni taklif qiladi.
        </p>

        {/* Animated transition section matching Results page */}
        <div className="relative py-6 px-4 overflow-hidden">
          {/* Animated background circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          
          <div className="relative space-y-4 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              <span className="text-primary">💡 Biznesni rivojlantirish</span> sirlari
            </h3>

            <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto">
              Telegram botimizga obuna bo'ling va har kuni foydali maslahatlar oling
            </p>

            {/* Animated Arrow */}
            <div className="pt-2">
              <div className="inline-flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center animate-bounce">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => {
            // Track Telegram bot subscription click
            if ((window as any).fbq) {
              (window as any).fbq('trackCustom', 'TelegramBotClick');
            }
            window.open('https://t.me/billzinfobot', '_blank');
          }}
          size="lg"
          className="h-14 px-12 text-lg rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
        >
          Telegram botga obuna bo'lish
        </Button>
      </div>
    </div>
  );
};