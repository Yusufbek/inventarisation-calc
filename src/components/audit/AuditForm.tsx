import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon, CheckCircle } from "lucide-react";
import * as fpixel from "@/lib/fpixel";
import { sendCapiEvent, getBrowserId } from "@/lib/capi";

const WEBHOOK_URL = "https://n8n-m2.makebillz.top/webhook/22939f18-3a11-458d-8faf-33d30b92f10d";

const revenueOptions = [
  "50 mln gacha",
  "50–200 mln",
  "200–500 mln",
  "500 mln dan ortiq",
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

const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  params.forEach((value, key) => {
    if (key.startsWith("utm_") || key === "fbclid") {
      utmParams[key] = value;
    }
  });
  return utmParams;
};

export const AuditForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [revenue, setRevenue] = useState("");
  const [region, setRegion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith("+998")) value = "+998";
    const digits = value.slice(4).replace(/\D/g, "").slice(0, 9);
    setPhone("+998" + digits);
  };

  const isPhoneValid = () => phone.length === 13;
  const canSubmit = () => name.trim().length > 0 && isPhoneValid() && revenue && region;

  const handleSubmit = async () => {
    if (!canSubmit() || isSubmitting) return;
    setIsSubmitting(true);

    const utmParams = getUtmParams();
    const eventId = crypto.randomUUID();

    const payload = {
      name: name.trim(),
      phone,
      storeRevenue: revenue,
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

      // Track Lead event
      fpixel.event("Lead", { content_name: "ramadan-audit" }, eventId);
      sendCapiEvent({
        eventName: "Lead",
        eventId,
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

  if (isSuccess) {
    return (
      <section id="audit-form" className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 max-w-lg text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-primary mx-auto" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Arizangiz qabul qilindi!
          </h2>
          <p className="text-muted-foreground">
            Tez orada mutaxassisimiz siz bilan bog'lanadi.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="audit-form" className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center mb-10 space-y-3">
          <p className="text-foreground font-semibold text-lg">
            Taxmin qilishni bas qiling. Foydangizni nazorat qilishni boshlang.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm">
            <Moon className="h-4 w-4" />
            RAMAZON TASHABBUSI
          </div>
          <p className="text-muted-foreground text-sm">
            Ramazon oyi davomida biz kuniga faqat 5 ta bepul audit o'tkazamiz.
            <br />
            O'z auditingizni band qilish uchun anketani to'ldiring.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="audit-name" className="text-foreground font-medium">Ismingiz</Label>
            <Input
              id="audit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ismingizni kiriting"
              className="h-14 rounded-2xl border-border/50 bg-background text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audit-phone" className="text-foreground font-medium">Telefon raqamingiz</Label>
            <Input
              id="audit-phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+998XXXXXXXXX"
              className="h-14 rounded-2xl border-border/50 bg-background text-base"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">Do'kon daromadi</Label>
            <Select value={revenue} onValueChange={setRevenue}>
              <SelectTrigger className="h-14 rounded-2xl border-border/50 bg-background text-base">
                <SelectValue placeholder="Oylik daromadni tanlang" />
              </SelectTrigger>
              <SelectContent>
                {revenueOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">Viloyat</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="h-14 rounded-2xl border-border/50 bg-background text-base">
                <SelectValue placeholder="Viloyatingizni tanlang" />
              </SelectTrigger>
              <SelectContent>
                {regionOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit() || isSubmitting}
            className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 rounded-full hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? "Yuborilmoqda..." : "Bepul auditga yozilish"}
          </button>
        </div>
      </div>
    </section>
  );
};
