import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { Calculator, CalculatorData } from "@/components/Calculator";
import { Results } from "@/components/Results";
import { LeadForm } from "@/components/LeadForm";
import { ThankYou } from "@/components/ThankYou";
import { Footer } from "@/components/Footer";

type Screen = "hero" | "calculator" | "results" | "lead-form" | "thank-you";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("hero");
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null);

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
    // Track form opened event
    if ((window as any).fbq) {
      (window as any).fbq('trackCustom', 'FormStart');
    }
    
    setCurrentScreen("lead-form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLeadSuccess = () => {
    setCurrentScreen("thank-you");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setCurrentScreen("hero");
    setCalculatorData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        <LeadForm onSuccess={handleLeadSuccess} calculatorData={calculatorData} />
      )}

      {currentScreen === "thank-you" && (
        <ThankYou onBackToHome={handleBackToHome} />
      )}

      {currentScreen === "hero" && (
        <Footer />
      )}
    </div>
  );
};

export default Index;
