import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { BillzLogo } from "@/components/BillzLogo";
import telegramBotImage from "@/assets/telegram-bot.webp";

export const ThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto w-full space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center">
          <BillzLogo className="h-10 md:h-12 text-foreground" />
        </div>

        {/* Success Message */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 text-center animate-scale-in">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-success" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Rahmat!
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Sizning so'rovingiz muvaffaqiyatli qabul qilindi.
          </p>
        </div>

        {/* Telegram Bot CTA */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 text-center space-y-6 animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
          {/* Bot Image */}
          <div className="flex justify-center">
            <img 
              src={telegramBotImage} 
              alt="BILLZ Telegram Bot" 
              className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Biznesni rivojlantirish sirlari
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">
              Telegram botimizga obuna bo'ling va har kuni biznesingizni o'stirish uchun foydali maslahatlar oling
            </p>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => window.open('https://t.me/billzinfobot', '_blank')}
            size="lg"
            className="h-14 px-12 text-lg rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Telegram botga obuna bo'lish
          </Button>
        </div>
      </div>
    </div>
  );
};