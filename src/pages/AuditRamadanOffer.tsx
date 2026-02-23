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
    // Save UTM params to sessionStorage so the form page can access them
    const params = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};
    params.forEach((value, key) => {
      if (key.startsWith("utm_") || key === "fbclid") {
        utmParams[key] = value;
      }
    });
    if (Object.keys(utmParams).length > 0) {
      sessionStorage.setItem("audit_utm_params", JSON.stringify(utmParams));
    }
  }, []);

  const goToForm = () => {
    const saved = sessionStorage.getItem("audit_utm_params");
    const params = saved ? new URLSearchParams(JSON.parse(saved)).toString() : "";
    navigate(`/audit/ramadan-offer/form${params ? `?${params}` : ""}`);
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
