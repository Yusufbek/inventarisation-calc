import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BillzLogo } from "@/components/BillzLogo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import mainCalcImage from "@/assets/main-calc-icon.png";
import liteCalcImage from "@/assets/lite-calc-icon.png";
import formwallIcon from "@/assets/formwall-icon.png";
import gamifiedIcon from "@/assets/gamified-icon.png";
import magnetCalcIcon from "@/assets/telegram-bot.webp";
import healthCalcIcon from "@/assets/health-calc-icon.png";
import webinarIcon from "/images/webinar/webinar-icon.png";
import pdfIcon from "/images/pdf-icon.png";

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
      variant: "gamified",
      title: "Gamified Calculator",
      image: gamifiedIcon,
      imageAlt: "Gamified Calculator icon"
    },
    {
      variant: "formwall",
      title: "FormWall Calculator",
      image: formwallIcon,
      imageAlt: "FormWall Calculator icon"
    },
    {
      variant: "magnet",
      title: "Magnet Calculator",
      image: magnetCalcIcon,
      imageAlt: "Magnet Calculator icon"
    },
    {
      variant: "health",
      title: "Biznes Salomatligi",
      image: healthCalcIcon,
      imageAlt: "Health Calculator icon",
      isHealthCalc: true
    }
  ];

  return (
    <section className="w-full bg-background px-4 py-6 md:py-8 flex items-center justify-center min-h-screen">
      <div className="max-w-5xl w-full">
        <div className="flex justify-center mb-6">
          <BillzLogo className="h-8 md:h-10 text-foreground" />
        </div>

        <div className="text-center mb-6 space-y-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Inventarizatsiya <span className="text-primary">Kalkulyatorlari</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Biznesingiz uchun mos kalkulyatorni tanlang
          </p>
        </div>

        <div className="space-y-3 md:space-y-4 w-full">
          {calculators.map((calc) => (
            <Card 
              key={calc.variant}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary group flex flex-row items-center"
              onClick={() => navigate((calc as any).isHealthCalc ? `/health-calc` : `/inventarisation-calc/${calc.variant}`)}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden bg-gradient-to-br from-secondary to-background flex items-center justify-center p-4 rounded-lg">
                <img 
                  src={calc.image} 
                  alt={calc.imageAlt}
                  className="w-full h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300 rounded-lg"
                />
              </div>
              <div className="flex-1 flex items-center justify-between px-4 md:px-6 py-4">
                <CardTitle className="text-lg md:text-2xl lg:text-3xl">{calc.title}</CardTitle>
                <Button 
                  className="h-10 md:h-12 px-6 md:px-8 text-sm md:text-base"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate((calc as any).isHealthCalc ? `/health-calc` : `/inventarisation-calc/${calc.variant}`);
                  }}
                >
                  Boshlash
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Vebinarlar Section */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
            Vebinarlar
          </h2>
          <Card 
            className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary group flex flex-row items-center"
            onClick={() => navigate('/webinar/foyda-webinar')}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden bg-gradient-to-br from-secondary to-background flex items-center justify-center p-4 rounded-lg">
              <img 
                src={webinarIcon} 
                alt="Webinar icon"
                className="w-full h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300 rounded-lg"
              />
            </div>
            <div className="flex-1 flex items-center justify-between px-4 md:px-6 py-4">
              <CardTitle className="text-lg md:text-2xl lg:text-3xl">Foyda Webinar</CardTitle>
              <Button 
                className="h-10 md:h-12 px-6 md:px-8 text-sm md:text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/webinar/foyda-webinar');
                }}
              >
                Boshlash
              </Button>
            </div>
          </Card>
        </div>

        {/* Amaliy Qo'llanmalar Section */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
            Amaliy Qo'llanmalar
          </h2>
          <Card 
            className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary group flex flex-row items-center"
            onClick={() => navigate('/webinar/inventarizatsiya-pdf')}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden bg-gradient-to-br from-secondary to-background flex items-center justify-center p-4 rounded-lg">
              <img 
                src={pdfIcon} 
                alt="PDF icon"
                className="w-full h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300 rounded-lg"
              />
            </div>
            <div className="flex-1 flex items-center justify-between px-4 md:px-6 py-4">
              <CardTitle className="text-lg md:text-2xl lg:text-3xl">Inventarizatsiya PDF</CardTitle>
              <Button 
                className="h-10 md:h-12 px-6 md:px-8 text-sm md:text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/webinar/inventarizatsiya-pdf');
                }}
              >
                Boshlash
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
