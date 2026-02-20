import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { eventCustom } from "@/lib/fpixel";
import { getFormattedFridayDate } from "./WebinarCTA";
import { sendCapiEvent } from '@/lib/capi';

const WEBHOOK_URL = "https://n8n-m2.makebillz.top/webhook/22939f18-3a11-458d-8faf-33d30b92f10d";
const TELEGRAM_GROUP_URL = "https://t.me/billzwebinar";

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

export const WebinarInlineRegistration = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const hasTrackedWebinarFinished = useRef(false);

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
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Failed to submit registration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTelegramClick = () => {
    if (!hasTrackedWebinarFinished.current) {
      const eventId = crypto.randomUUID();
      eventCustom("WebinarFinished", { content_name: "Foyda webinar" });
      sendCapiEvent({
        eventName: "WebinarFinished",
        eventId: eventId,
        customData: {
          content_name: "Foyda webinar",
        },
      });
      hasTrackedWebinarFinished.current = true;
    }
    window.open(TELEGRAM_GROUP_URL, "_blank");
  };

  return (
    <section id="registration" className="bg-primary/5 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          {!isSuccess ? (
            <>
              {/* Tag pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-semibold">
                  Bepul
                </span>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-foreground text-xs md:text-sm font-semibold">
                  27 fevral
                </span>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-foreground text-xs md:text-sm font-semibold">
                  soat 16:00da
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-2">
                Ro'yxatdan o'tish
              </h2>

              <p className="text-muted-foreground text-center text-sm md:text-base mb-8">
                Vebinar haqida barcha ma'lumotlar Telegram guruhida beriladi
              </p>

              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="reg-name" className="text-foreground font-medium">
                    Ismingiz
                  </Label>
                  <Input
                    id="reg-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ismingizni kiriting"
                    className="h-14 rounded-2xl border-border/50 bg-background text-base"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="reg-phone" className="text-foreground font-medium">
                    Telefon raqamingiz
                  </Label>
                  <Input
                    id="reg-phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+998XXXXXXXXX"
                    className="h-14 rounded-2xl border-border/50 bg-background text-base"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit() || isSubmitting}
                  className="w-full bg-primary text-primary-foreground font-semibold text-lg py-4 rounded-full hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Tabriklaymiz!</h3>
              <p className="text-muted-foreground mb-8">
                Siz vebinarga muvaffaqiyatli ro'yxatdan o'tdingiz. Telegram guruhimizga qo'shiling:
              </p>
              <button
                onClick={handleTelegramClick}
                className="inline-flex items-center justify-center gap-3 bg-[#0088cc] text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-[#0077b5] transition-colors"
              >
                <Send className="w-5 h-5" />
                Telegram guruhiga o'tish
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
