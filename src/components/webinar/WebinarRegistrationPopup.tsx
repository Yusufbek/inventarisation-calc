import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { eventCustom } from "@/lib/fpixel";
import { getFormattedFridayDate } from "./WebinarCTA";

interface WebinarRegistrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WEBHOOK_URL = "https://n8n-m2.makebillz.top/webhook/22939f18-3a11-458d-8faf-33d30b92f10d";
const TELEGRAM_GROUP_URL = "https://t.me/billzwebinar";

const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    fbclid: params.get("fbclid") || "",
  };
};

export const WebinarRegistrationPopup = ({ isOpen, onClose }: WebinarRegistrationPopupProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [willAttend, setWillAttend] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const hasTrackedWebinarFinished = useRef(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Ensure +998 prefix
    if (!value.startsWith("+998")) {
      value = "+998";
    }
    
    // Only allow digits after +998
    const digitsAfterPrefix = value.slice(4).replace(/\D/g, "");
    
    // Limit to 9 digits after prefix
    const limitedDigits = digitsAfterPrefix.slice(0, 9);
    
    setPhone("+998" + limitedDigits);
  };

  const isPhoneValid = () => {
    return phone.length === 13; // +998 + 9 digits
  };

  const canSubmit = () => {
    return name.trim().length > 0 && isPhoneValid() && willAttend !== "";
  };

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
        headers: {
          "Content-Type": "application/json",
        },
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
    // Fire pixel event only once
    if (!hasTrackedWebinarFinished.current) {
      eventCustom("WebinarFinished", { content_name: "Foyda webinar" });
      hasTrackedWebinarFinished.current = true;
    }
    
    window.open(TELEGRAM_GROUP_URL, "_blank");
  };

  const handleClose = () => {
    // Reset state when closing
    if (!isSuccess) {
      onClose();
    }
  };

  // Calculate days until Friday
  const getDaysUntilFriday = (): number => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    return (5 - dayOfWeek + 7) % 7 || 7;
  };

  const daysUntilFriday = getDaysUntilFriday();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Vebinarga ro'yxatdan o'ting
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">
                  Ismingiz
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ismingizni kiriting"
                  className="h-12 rounded-xl"
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-medium">
                  Telefon raqamingiz
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+998XXXXXXXXX"
                  className="h-12 rounded-xl"
                />
              </div>

              {/* Attendance Question */}
              <div className="space-y-3">
                <Label className="text-foreground font-medium">
                  {daysUntilFriday} kundan keyin vebinarga qatnashasizmi?
                </Label>
                <RadioGroup value={willAttend} onValueChange={setWillAttend}>
                  <div className="flex items-center space-x-3 bg-secondary/30 p-4 rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="cursor-pointer flex-1">
                      Ha, qatnashaman
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-secondary/30 p-4 rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="maybe" id="maybe" />
                    <Label htmlFor="maybe" className="cursor-pointer flex-1">
                      Bilmayman
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit() || isSubmitting}
                className="w-full bg-primary text-primary-foreground font-semibold text-lg py-4 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
              </button>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Tabriklaymiz!
            </h3>
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
      </DialogContent>
    </Dialog>
  );
};
