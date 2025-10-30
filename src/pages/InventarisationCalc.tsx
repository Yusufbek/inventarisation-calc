import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Calculator, CalculatorData } from "@/components/Calculator";
import { LiteCalculator } from "@/components/LiteCalculator";
import { Results } from "@/components/Results";
import { LiteResults } from "@/components/LiteResults";
import { GamifiedResults } from "@/components/GamifiedResults";
import { LeadForm } from "@/components/LeadForm";
import { HeroSection } from "@/components/HeroSection";
import { pageView } from "@/lib/fpixel";

type Screen = "hero" | "calculator" | "results" | "lead-form";

const InventarisationCalc = () => {
  const { variant } = useParams<{ variant: string }>();
  
  // Validate variant first
  if (!variant || !["main", "lite", "gamified"].includes(variant)) {
    return <Navigate to="/404" replace />;
  }
  
  // Lite and gamified start directly with calculator, main starts with hero
  const [currentScreen, setCurrentScreen] = useState<Screen>(
    variant === "lite" || variant === "gamified" ? "calculator" : "hero"
  );
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null);

  // Track PageView on mount
  useEffect(() => {
    pageView();
  }, []);

  const handleStartCalculator = () => {
    setCurrentScreen("calculator");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCalculatorComplete = (data: CalculatorData) => {
    setCalculatorData(data);
    setCurrentScreen("results");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleContactClick = () => {
    setCurrentScreen("lead-form");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleLeadSuccess = () => {
    window.location.href = `/thank-you/inventarisation-calc/${variant}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === "hero" && (
        <HeroSection onStartCalculator={handleStartCalculator} />
      )}

      {currentScreen === "calculator" && (
        <section className="w-full bg-background py-12 min-h-screen">
          {variant === "main" || variant === "gamified" ? (
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
          ) : variant === "gamified" ? (
            <GamifiedResults data={calculatorData} onContactClick={handleContactClick} />
          ) : (
            <LiteResults data={calculatorData} variant={variant} />
          )}
        </div>
      )}

      {currentScreen === "lead-form" && (variant === "main" || variant === "gamified") && (
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
