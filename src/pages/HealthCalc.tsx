import { useEffect } from "react";
import { HealthCalculator } from "@/components/HealthCalculator";
import { Footer } from "@/components/Footer";
import { BillzLogo } from "@/components/BillzLogo";

interface HealthCalcProps {
  isTestMode?: boolean;
}

const HealthCalc = ({ isTestMode = false }: HealthCalcProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="w-full py-4 px-4 flex justify-center">
        <BillzLogo className="h-8 text-foreground" />
      </header>
      <main className="pb-8">
        <HealthCalculator isTestMode={isTestMode} />
      </main>
      <Footer />
    </div>
  );
};

export default HealthCalc;
