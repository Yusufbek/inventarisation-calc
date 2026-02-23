import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuditHero } from "@/components/audit/AuditHero";
import { AuditStickyTimer } from "@/components/audit/AuditStickyTimer";
import { AuditProblems } from "@/components/audit/AuditProblems";
import { AuditServices } from "@/components/audit/AuditServices";
import { AuditTrust } from "@/components/audit/AuditTrust";
import { AuditForm } from "@/components/audit/AuditForm";
import * as fpixel from "@/lib/fpixel";

const AuditRamadanOffer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fpixel.pageView();
    window.scrollTo(0, 0);
  }, []);

  const goToForm = () => {
    navigate("/audit/ramadan-offer/form");
  };

  return (
    <div className="min-h-screen bg-background pt-12">
      <AuditStickyTimer />
      <AuditHero onCtaClick={goToForm} />
      <AuditProblems onCtaClick={goToForm} />
      <AuditServices onCtaClick={goToForm} />
      <AuditTrust />
      <AuditForm onCtaClick={goToForm} />
    </div>
  );
};

export default AuditRamadanOffer;
