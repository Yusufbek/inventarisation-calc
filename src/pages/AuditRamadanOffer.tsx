import { useEffect } from "react";
import { AuditHero } from "@/components/audit/AuditHero";
import { AuditStickyTimer } from "@/components/audit/AuditStickyTimer";
import { AuditProblems } from "@/components/audit/AuditProblems";
import { AuditServices } from "@/components/audit/AuditServices";
import { AuditTrust } from "@/components/audit/AuditTrust";
import { AuditForm } from "@/components/audit/AuditForm";
import * as fpixel from "@/lib/fpixel";

const AuditRamadanOffer = () => {
  useEffect(() => {
    fpixel.pageView();
    window.scrollTo(0, 0);
  }, []);

  const scrollToForm = () => {
    document.getElementById("audit-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pt-12">
      <AuditStickyTimer />
      <AuditHero onCtaClick={scrollToForm} />
      <AuditProblems onCtaClick={scrollToForm} />
      <AuditServices onCtaClick={scrollToForm} />
      <AuditTrust />
      <AuditForm />
    </div>
  );
};

export default AuditRamadanOffer;
