import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BillzLogo } from "@/components/BillzLogo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import mainCalcImage from "@/assets/main-calc-icon.png";
import liteCalcImage from "@/assets/lite-calc-icon.png";
import formwallIcon from "@/assets/formwall-icon.png";
import gamifiedIcon from "@/assets/gamified-icon.png";

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

        <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
          {calculators.map((calc) => (
            <Card 
              key={calc.variant}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary group"
              onClick={() => navigate(`/inventarisation-calc/${calc.variant}`)}
            >
              <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-secondary to-background flex items-center justify-center p-4 md:p-6">
                <img 
                  src={calc.image} 
                  alt={calc.imageAlt}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center py-3 md:py-4">
                <CardTitle className="text-base md:text-xl lg:text-2xl">{calc.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-3 md:pb-4 px-3 md:px-6">
                <Button 
                  className="w-full h-9 md:h-10 text-sm md:text-base"
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
