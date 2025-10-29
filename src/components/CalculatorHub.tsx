import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BillzLogo } from "@/components/BillzLogo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import mainCalcImage from "@/assets/hero-inventory.webp";
import liteCalcImage from "@/assets/hero-confusion.webp";

export const CalculatorHub = () => {
  const navigate = useNavigate();

  const calculators = [
    {
      variant: "main",
      title: "To'liq Inventarizatsiya Kalkulyatori",
      description: "5 ta savol orqali inventarizatsiya yo'qotishlarini hisoblang va qanday to'xtatishni bilib oling",
      image: mainCalcImage,
      imageAlt: "Warehouse worker organizing colorful inventory boxes on shelves"
    },
    {
      variant: "lite",
      title: "Yengil Inventarizatsiya Kalkulyatori",
      description: "3 ta savol bilan tezkor yo'qotishlarni aniqlang",
      image: liteCalcImage,
      imageAlt: "Business person confused about inventory management"
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

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {calculators.map((calc) => (
            <Card 
              key={calc.variant}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/inventarisation-calc/${calc.variant}`)}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={calc.image} 
                  alt={calc.imageAlt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{calc.title}</CardTitle>
                <CardDescription className="text-base">{calc.description}</CardDescription>
              </CardHeader>
              <CardContent>
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
