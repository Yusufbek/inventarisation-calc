import { useEffect } from "react";
import { CalculatorHub } from "@/components/CalculatorHub";
import { WebinarPromoSection } from "@/components/webinar/WebinarPromoSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CalculatorHub />
      <WebinarPromoSection />
      <Footer />
    </div>
  );
};

export default Index;
