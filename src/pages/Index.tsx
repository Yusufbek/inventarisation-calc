import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/HeroSection";
import { Calculator, CalculatorData } from "@/components/Calculator";
import { Results } from "@/components/Results";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";
import { eventCustom } from "@/lib/fpixel";

type Screen = "hero" | "calculator" | "results" | "lead-form";

const Index = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState<Screen>("hero");
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(
    null
  );

  const handleStartCalculator = () => {
    setCurrentScreen("calculator");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    navigate("/thank-you");
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === "hero" && (
        <HeroSection onStartCalculator={handleStartCalculator} />
      )}

      {currentScreen === "calculator" && (
        <section className="w-full bg-background py-12 min-h-screen">
          <Calculator onComplete={handleCalculatorComplete} />
        </section>
      )}

      {currentScreen === "results" && calculatorData && (
        <div className="min-h-screen">
          <Results data={calculatorData} onContactClick={handleContactClick} />
        </div>
      )}

      {currentScreen === "lead-form" && (
        <LeadForm
          onSuccess={handleLeadSuccess}
          calculatorData={calculatorData}
        />
      )}

      {currentScreen === "hero" && <Footer />}
    </div>
  );
};

export default Index;
