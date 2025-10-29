import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Calculator, CalculatorData } from "@/components/Calculator";
import { LiteCalculator } from "@/components/LiteCalculator";
import { Results } from "@/components/Results";
import { LiteResults } from "@/components/LiteResults";
import { LeadForm } from "@/components/LeadForm";
import { pageView } from "@/lib/fpixel";

type Screen = "calculator" | "results" | "lead-form";

const InventarisationCalc = () => {
  const { variant } = useParams<{ variant: string }>();
  const [currentScreen, setCurrentScreen] = useState<Screen>("calculator");
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null);

  // Track PageView on mount
  useEffect(() => {
    pageView();
  }, []);

  // Validate variant
  if (!variant || !["main", "lite"].includes(variant)) {
    return <Navigate to="/404" replace />;
  }

  const handleCalculatorComplete = (data: CalculatorData) => {
    setCalculatorData(data);
    setCurrentScreen("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactClick = () => {
    setCurrentScreen("lead-form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLeadSuccess = () => {
    window.location.href = `/thank-you/inventarisation-calc/${variant}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === "calculator" && (
        <section className="w-full bg-background py-12 min-h-screen">
          {variant === "main" ? (
            <Calculator onComplete={handleCalculatorComplete} variant={variant} />
          ) : (
            <LiteCalculator onComplete={handleCalculatorComplete} variant={variant} />
          )}
        </section>
      )}

      {currentScreen === "results" && calculatorData && (
        <div className="min-h-screen">
          {variant === "main" ? (
            <Results data={calculatorData} onContactClick={handleContactClick} />
          ) : (
            <LiteResults data={calculatorData} variant={variant} />
          )}
        </div>
      )}

      {currentScreen === "lead-form" && variant === "main" && (
        <LeadForm
          calculatorData={calculatorData}
          variant={variant}
          onSuccess={handleLeadSuccess}
        />
      )}
    </div>
  );
};

export default InventarisationCalc;
