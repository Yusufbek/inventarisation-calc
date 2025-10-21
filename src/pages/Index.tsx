import { useRef, useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { Calculator, CalculatorData } from "@/components/Calculator";
import { Results } from "@/components/Results";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleStartCalculator = () => {
    setShowCalculator(true);
    setTimeout(() => {
      calculatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleCalculatorComplete = (data: CalculatorData) => {
    setCalculatorData(data);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onStartCalculator={handleStartCalculator} />
      
      {showCalculator && (
        <section ref={calculatorRef} id="calculator" className="w-full bg-white py-12">
          <Calculator onComplete={handleCalculatorComplete} />
        </section>
      )}

      {calculatorData && (
        <div ref={resultsRef}>
          <Results data={calculatorData} />
        </div>
      )}

      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
