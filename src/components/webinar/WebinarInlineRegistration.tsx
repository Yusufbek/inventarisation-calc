import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { eventCustom } from "@/lib/fpixel";
import { getFormattedFridayDate } from "./WebinarCTA";

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
  const [willAttend, setWillAttend] = useState<string>("");
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

  const canSubmit = () => name.trim().length > 0 && isPhoneValid() && willAttend !== "";

  const handleSubmit = async () => {
    if (!canSubmit() || isSubmitting) return;
    setIsSubmitting(true);

    const webinarType = `Foydangiz qayerga yo'qolyapti | ${getFormattedFridayDate()}`;
    const utmParams = getUtmParams();

    const payload = {
      name: name.trim(),
      phone,
      webinarType,
      willAttend,
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
      eventCustom("WebinarFinished", { content_name: "Foyda webinar" });
      hasTrackedWebinarFinished.current = true;
    }
    window.open(TELEGRAM_GROUP_URL, "_blank");
  };

  const getDaysUntilFriday = (): number => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    return (5 - dayOfWeek + 7) % 7 || 7;
  };

  const daysUntilFriday = getDaysUntilFriday();

  return (
    <section id="registration" className="bg-primary/5 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          {!isSuccess ? (
            <>
              {/* Tag */}
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs md:text-sm font-medium">
                  Ro'yxatdan o'tish
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-3">
                Vebinarga ro'yxatdan o'ting
              </h2>

              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">

                <div className="space-y-5">
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
                      className="h-12 rounded-xl"
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
                      className="h-12 rounded-xl"
                    />
                  </div>

                  {/* Attendance */}
                  <div className="space-y-3">
                    <Label className="text-foreground font-medium">
                      {daysUntilFriday} kundan keyin vebinarga qatnashasizmi?
                    </Label>
                    <RadioGroup value={willAttend} onValueChange={setWillAttend}>
                      <div className="flex items-center space-x-3 bg-secondary/30 p-4 rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors">
                        <RadioGroupItem value="yes" id="reg-yes" />
                        <Label htmlFor="reg-yes" className="cursor-pointer flex-1">
                          Ha, qatnashaman
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 bg-secondary/30 p-4 rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors">
                        <RadioGroupItem value="maybe" id="reg-maybe" />
                        <Label htmlFor="reg-maybe" className="cursor-pointer flex-1">
                          Bilmayman
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit() || isSubmitting}
                    className="w-full bg-primary text-primary-foreground font-semibold text-lg py-4 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
                  </button>
                </div>
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
