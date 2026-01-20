import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { uz } from "date-fns/locale";
import { User, Phone, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { WebinarThankYou } from "./WebinarThankYou";

interface WebinarRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nextFriday: Date;
}

const WEBHOOK_URL =
  "https://n8n-m2.makebillz.top/webhook/22939f18-3a11-458d-8faf-33d30b92f10d";

export const WebinarRegistrationDialog = ({
  open,
  onOpenChange,
  nextFriday,
}: WebinarRegistrationDialogProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [willAttend, setWillAttend] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const daysUntilWebinar = differenceInDays(nextFriday, new Date());
  const formattedDate = format(nextFriday, "yyyy-MM-dd");
  const displayDate = format(nextFriday, "d MMMM", { locale: uz });

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits except the leading +
    let cleaned = value.replace(/[^\d+]/g, "");

    // Ensure it starts with +998
    if (!cleaned.startsWith("+998")) {
      cleaned = "+998";
    }

    // Limit to 13 characters (+998 + 9 digits)
    return cleaned.slice(0, 13);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const isPhoneValid = phone.length === 13 && /^\+998\d{9}$/.test(phone);
  const isFormValid = name.trim().length > 0 && isPhoneValid && willAttend;

  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      phone: phone,
      webinarType: `Foydangiz qayerga yo'qolyapti | ${formattedDate}`,
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
      } else {
        throw new Error("Access not granted");
      }
    } catch (error) {
      console.error("Webhook error:", error);
      toast({
        title: "Xatolik yuz berdi",
        description: "Iltimos, qaytadan urinib ko'ring",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after closing
    setTimeout(() => {
      setName("");
      setPhone("+998");
      setWillAttend("");
      setIsSuccess(false);
    }, 300);
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <WebinarThankYou />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Vebinarga ro'yxatdan o'tish
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Ismingiz
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingizni kiriting"
                className="pl-12 h-14 rounded-2xl text-base"
                maxLength={100}
              />
            </div>
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Telefon raqamingiz
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+998"
                className="pl-12 h-14 rounded-2xl text-base"
                type="tel"
              />
            </div>
            {phone.length > 4 && !isPhoneValid && (
              <p className="text-sm text-destructive">
                Telefon raqami to'liq emas (masalan: +998977332305)
              </p>
            )}
          </div>

          {/* Will Attend Question */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              {daysUntilWebinar} kundan keyin vebinarga qatnashasizmi?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setWillAttend("Ha")}
                className={`py-4 px-4 rounded-2xl border-2 font-medium transition-all ${
                  willAttend === "Ha"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                Ha, albatta
              </button>
              <button
                type="button"
                onClick={() => setWillAttend("Bilmayman")}
                className={`py-4 px-4 rounded-2xl border-2 font-medium transition-all ${
                  willAttend === "Bilmayman"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                Hali bilmayman
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="w-full h-14 rounded-2xl text-lg font-bold"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Ro'yxatdan o'tish"
            )}
          </Button>

          {/* Date reminder */}
          <p className="text-sm text-muted-foreground text-center">
            Vebinar: Juma, {displayDate} | 16:00
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
