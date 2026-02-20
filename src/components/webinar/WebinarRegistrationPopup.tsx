import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { getFormattedFridayDate } from "./WebinarCTA";
import { event as fbEvent } from "@/lib/fpixel";

interface WebinarRegistrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export const WebinarRegistrationPopup = ({ isOpen, onClose }: WebinarRegistrationPopupProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [willAttend, setWillAttend] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const getDaysUntilFriday = (): number => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    return (5 - dayOfWeek + 7) % 7 || 7;
  };

  const daysUntilFriday = getDaysUntilFriday();

  const handleTelegramClick = () => {
    fbEvent("WebinarFinished");
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <div className="flex flex-col items-center text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Tabriklaymiz!
            </h2>
            <p className="text-muted-foreground">
              Siz vebinarga muvaffaqiyatli ro'yxatdan o'tdingiz. Telegram guruhimizga qo'shiling:
            </p>
            <a
              href="https://t.me/+iEKlHUfZdzQzYjMy"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleTelegramClick}
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold text-base px-8 py-3 rounded-full hover:bg-primary/90 transition-all"
            >
              Telegram guruhga qo'shilish
            </a>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Vebinarga ro'yxatdan o'ting
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
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

          <button
            onClick={handleSubmit}
            disabled={!canSubmit() || isSubmitting}
            className="w-full bg-primary text-primary-foreground font-semibold text-lg py-4 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
