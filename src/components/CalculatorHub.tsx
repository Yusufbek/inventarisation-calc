import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BillzLogo } from "@/components/BillzLogo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import mainCalcImage from "@/assets/main-calc-icon.png";
import liteCalcImage from "@/assets/lite-calc-icon.png";
import telegramBotImage from "@/assets/telegram-bot.webp";

export const CalculatorHub = () => {
  const navigate = useNavigate();

  const calculators = [
    {
      variant: "main",
      title: "Main Calculator",
      image: mainCalcImage,
      imageAlt: "Main Calculator icon"
    },
    {
      variant: "lite",
      title: "Lite Calculator",
      image: liteCalcImage,
      imageAlt: "Lite Calculator icon"
    },
    {
      variant: "formwall",
      title: "FormWall Calculator",
      image: telegramBotImage,
      imageAlt: "FormWall Calculator icon"
    }
  ];

  return (
    <section className="w-full bg-background py-12 px-4 md:py-20 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-12">
          <BillzLogo className="h-12 md:h-16 text-foreground" />
        </div>

        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Inventarizatsiya <span className="text-primary">Kalkulyatorlari</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Biznesingiz uchun mos kalkulyatorni tanlang va yo'qotishlaringizni hisoblang
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {calculators.map((calc) => (
            <Card 
              key={calc.variant}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary"
              onClick={() => navigate(`/inventarisation-calc/${calc.variant}`)}
            >
              <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-secondary to-background flex items-center justify-center p-8">
                <img 
                  src={calc.image} 
                  alt={calc.imageAlt}
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl">{calc.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/inventarisation-calc/${calc.variant}`);
                  }}
                >
                  Boshlash
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
