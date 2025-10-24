import { useState, useEffect } from "react";
import { LiteCalculator } from "@/components/LiteCalculator";
import { LiteResults } from "@/components/LiteResults";
import { CalculatorData } from "@/components/Calculator";

const CalcLite = () => {
  const [showResults, setShowResults] = useState(false);
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null);

  const handleComplete = (data: CalculatorData) => {
    setCalculatorData(data);
    setShowResults(true);
  };

  // Track PageView on mount
  useEffect(() => {
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'PageView');
    }
  }, []);

  // Scroll to top when results show
  useEffect(() => {
    if (showResults) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showResults]);

  return (
    <div className="min-h-screen bg-background">
      {!showResults ? (
        <LiteCalculator onComplete={handleComplete} />
      ) : (
        calculatorData && <LiteResults data={calculatorData} />
      )}
    </div>
  );
};

export default CalcLite;
