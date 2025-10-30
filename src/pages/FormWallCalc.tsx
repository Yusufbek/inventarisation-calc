import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FormWallCalculator } from "@/components/FormWallCalculator";
import { FormWallResults } from "@/components/FormWallResults";
import { CalculatorData } from "@/components/Calculator";
import { pageView } from "@/lib/fpixel";

type Screen = "calculator" | "results";

const FormWallCalc = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("calculator");
  const [calculatorData, setCalculatorData] = useState<(CalculatorData & { name: string; phone: string }) | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    pageView();
  }, []);

  const handleCalculatorComplete = (data: CalculatorData & { name: string; phone: string }) => {
    setCalculatorData(data);
    setCurrentScreen("results");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === "calculator" && (
        <FormWallCalculator onComplete={handleCalculatorComplete} variant="formwall" />
      )}

      {currentScreen === "results" && calculatorData && (
        <FormWallResults data={calculatorData} variant="formwall" />
      )}
    </div>
  );
};

export default FormWallCalc;
