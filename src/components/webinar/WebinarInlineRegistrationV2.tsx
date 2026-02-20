import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFormattedFridayDate } from "./WebinarCTA";

const WEBHOOK_URL = "https://n8n-m2.makebillz.top/webhook/22939f18-3a11-458d-8faf-33d30b92f10d";

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

export const WebinarInlineRegistrationV2 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith("+998")) {
      value = "+998";
    }
    const digitsAfterPrefix = value.slice(4).replace(/\D/g, "");
    const limitedDigits = digitsAfterPrefix.slice(0, 9);
    setPhone("+998" + limitedDigits);
  };

  const isPhoneValid = () => phone.length === 13;

  const canSubmit = () => name.trim().length > 0 && isPhoneValid();

  const handleSubmit = async () => {
    if (!canSubmit() || isSubmitting) return;
    setIsSubmitting(true);

    const webinarType = `Foydangiz qayerga yo'qolyapti | ${getFormattedFridayDate()}`;
    const utmParams = getUtmParams();

    const payload = {
      name: name.trim(),
      phone,
      webinarType,
      willAttend: "yes",
      ...utmParams,
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.access === "granted") {
        navigate("/webinar/foyda-webinar/success");
      }
    } catch (error) {
      console.error("Failed to submit registration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="registration" className="bg-primary/5 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          {/* Tag pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-semibold">
              Bepul
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-foreground text-xs md:text-sm font-semibold">
              27 fevral
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-foreground text-xs md:text-sm font-semibold">
              soat 11:00da
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-2">
            Ro'yxatdan o'tish
          </h2>

          <p className="text-muted-foreground text-center text-sm md:text-base mb-8">
            Vebinar haqida barcha ma'lumotlar Telegram guruhida beriladi
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reg-name-v2" className="text-foreground font-medium">
                Ismingiz
              </Label>
              <Input
                id="reg-name-v2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingizni kiriting"
                className="h-14 rounded-2xl border-border/50 bg-background text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-phone-v2" className="text-foreground font-medium">
                Telefon raqamingiz
              </Label>
              <Input
                id="reg-phone-v2"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+998XXXXXXXXX"
                className="h-14 rounded-2xl border-border/50 bg-background text-base"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit() || isSubmitting}
              className="w-full bg-primary text-primary-foreground font-semibold text-lg py-4 rounded-full hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
