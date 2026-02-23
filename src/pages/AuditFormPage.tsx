import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { BillzLogo } from "@/components/BillzLogo";
import * as fpixel from "@/lib/fpixel";
import { sendCapiEvent, getBrowserId } from "@/lib/capi";

const WEBHOOK_URL = "https://n8n-m2.makebillz.top/webhook/4f02b59c-af4d-48ca-bba3-cfb0313c0a37";

const segmentOptions = [
  "Kiyim do'koni",
  "Poyabzal do'koni",
  "Oziq-ovqat do'koni",
  "Qurilish mollari do'koni",
  "Kosmetika do'koni",
  "Aksessuar do'koni",
  "Elektronika do'koni",
  "Uy-ro'zg'or buyumlari",
  "Dorixona",
  "Kafe va restoran",
  "Ishlab chiqarish",
  "Ombor",
  "Boshqa",
];

const revenueOptions = [
  "500 000 so'mdan kamroq",
  "600 000 – 2 500 000 so'm",
  "2 500 000 – 25 000 000 so'm",
  "25 000 000 dan ko'proq so'm",
];

const regionOptions = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Samarqand",
  "Buxoro",
  "Farg'ona",
  "Andijon",
  "Namangan",
  "Qashqadaryo",
  "Surxondaryo",
  "Xorazm",
  "Navoiy",
  "Jizzax",
  "Sirdaryo",
  "Qoraqalpog'iston",
];

const TOTAL_STEPS = 6;

const getUtmParams = () => {
  // Check URL params first, then fallback to sessionStorage (passed from landing page)
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  params.forEach((value, key) => {
    if (key.startsWith("utm_") || key === "fbclid") {
      utmParams[key] = value;
    }
  });
  // If no UTMs in current URL, try sessionStorage (saved from landing page)
  if (Object.keys(utmParams).length === 0) {
    const saved = sessionStorage.getItem("audit_utm_params");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { /* ignore */ }
    }
  }
  return utmParams;
};

const AuditFormPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [storeName, setStoreName] = useState("");
  const [storeSegment, setStoreSegment] = useState("");
  const [dailyRevenue, setDailyRevenue] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    fpixel.pageView();
    window.scrollTo(0, 0);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith("+998")) value = "+998";
    const digits = value.slice(4).replace(/\D/g, "").slice(0, 9);
    setPhone("+998" + digits);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return name.trim().length > 0;
      case 2: return phone.length === 13;
      case 3: return storeName.trim().length > 0;
      case 4: return storeSegment !== "";
      case 5: return dailyRevenue !== "";
      case 6: return region !== "";
      default: return false;
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const utmParams = getUtmParams();
    const eventId = crypto.randomUUID();

    const revenueMap: Record<string, string> = {
      [revenueOptions[0]]: "nano",
      [revenueOptions[1]]: "micro",
      [revenueOptions[2]]: "small",
      [revenueOptions[3]]: "medium",
    };

    const payload = {
      name: name.trim(),
      phone,
      storeName: storeName.trim(),
      storeSegment,
      dailyRevenue: revenueMap[dailyRevenue] || dailyRevenue,
      region,
      type: "ramadan-audit",
      ...utmParams,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      fpixel.event("Lead", { content_name: "ramadan-audit" }, eventId);
      sendCapiEvent({
        eventName: "Lead",
        eventId,
        phones: [phone],
        externalId: getBrowserId(),
        customData: { content_name: "ramadan-audit" },
      });

      const auditEventId = crypto.randomUUID();
      fpixel.eventCustom("AuditRegistered", { content_name: "ramadan-audit" }, auditEventId);
      sendCapiEvent({
        eventName: "AuditRegistered",
        eventId: auditEventId,
        phones: [phone],
        externalId: getBrowserId(),
        customData: { content_name: "ramadan-audit" },
      });

      setIsSuccess(true);
    } catch (error) {
      console.error("Audit form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;
    if (step === TOTAL_STEPS) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate("/");
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <CheckCircle className="h-16 w-16 text-primary mx-auto" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Arizangiz qabul qilindi!
          </h2>
          <p className="text-muted-foreground">
            Tez orada mutaxassisimiz siz bilan bog'lanadi.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-primary font-semibold hover:underline"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  const stepLabels: Record<number, string> = {
    1: "Ismingiz",
    2: "Telefon raqamingiz",
    3: "Do'koningiz nomi",
    4: "Do'koningiz segmenti",
    5: "Kunlik tushum (taxminan) qancha?",
    6: "Viloyat",
  };

  const renderSelectOptions = (options: string[], selected: string, onSelect: (v: string) => void) => (
    <div className="space-y-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`w-full text-left px-4 py-3.5 rounded-2xl border transition-all text-sm md:text-base font-medium ${
            selected === opt
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-background text-foreground hover:border-primary/50"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ismingizni kiriting"
            className="h-14 rounded-2xl border-border/50 bg-background text-base"
            autoFocus
          />
        );
      case 2:
        return (
          <Input
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+998XXXXXXXXX"
            className="h-14 rounded-2xl border-border/50 bg-background text-base"
            autoFocus
          />
        );
      case 3:
        return (
          <Input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="Do'koningiz nomini kiriting"
            className="h-14 rounded-2xl border-border/50 bg-background text-base"
            autoFocus
          />
        );
      case 4:
        return renderSelectOptions(segmentOptions, storeSegment, setStoreSegment);
      case 5:
        return renderSelectOptions(revenueOptions, dailyRevenue, setDailyRevenue);
      case 6:
        return renderSelectOptions(regionOptions, region, setRegion);
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={handleBack} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <BillzLogo />
        </div>
      </div>

      {/* Progress */}
      <div className="container mx-auto px-4 pt-6 max-w-lg">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{step}/{TOTAL_STEPS} qadam</span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <Progress value={(step / TOTAL_STEPS) * 100} className="h-2" />
      </div>

      {/* Content */}
      <div className="flex-1 container mx-auto px-4 py-8 pb-28 max-w-lg">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
          {stepLabels[step]}
        </h2>

        {renderStepContent()}
      </div>

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-background z-40">
        <div className="container mx-auto px-4 py-4 max-w-lg">
          <button
            onClick={handleNext}
            disabled={!canProceed() || isSubmitting}
            className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 rounded-full hover:bg-primary/90 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Yuborilmoqda..."
              : step === TOTAL_STEPS
              ? "Bepul auditga yozilish"
              : "Keyingisi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditFormPage;
