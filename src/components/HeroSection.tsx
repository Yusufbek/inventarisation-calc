import { Button } from "@/components/ui/button";
import { BillzLogo } from "@/components/BillzLogo";
import heroImage from "@/assets/hero-inventory.webp";

interface HeroSectionProps {
  onStartCalculator: () => void;
}

export const HeroSection = ({ onStartCalculator }: HeroSectionProps) => {
  return (
    <section className="w-full bg-secondary py-12 px-4 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          <BillzLogo className="h-10 md:h-12 text-foreground" />
        </div>
        <div className="flex flex-col items-center text-center gap-8">
          <img 
            src={heroImage} 
            alt="Warehouse worker organizing colorful inventory boxes on shelves" 
            className="w-full max-w-2xl rounded-3xl shadow-lg animate-fade-in"
          />
          
          <div className="space-y-6 max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              <span className="text-primary">Inventarizatsiyasiz</span> har oy qancha pul yo'qotyapsiz?
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground">
              5 ta savolga javob bering — yo'qotishlaringizni soniyada ko'ring va ularni qanday to'xtatishni bilib oling.
            </p>
            
            <Button 
              size="lg"
              onClick={() => {
                // Track calculator start event
                if ((window as any).fbq) {
                  (window as any).fbq('trackCustom', 'StartCalc');
                }
                onStartCalculator();
              }}
              className="w-full md:w-auto h-14 px-12 text-lg rounded-2xl"
            >
              Hisoblashni boshlash
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
