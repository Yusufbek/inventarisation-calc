import { useState } from "react";
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
