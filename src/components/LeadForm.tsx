import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import {
  CalendarIcon,
  Phone,
  User,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BillzLogo } from "@/components/BillzLogo";
import { CalculatorData } from "./Calculator";
import { z } from "zod";
import { calculateLosses, formatNumber } from "@/lib/calculations";
import { eventCustom } from "@/lib/fpixel";
import { sha256 } from "js-sha256";

// ⚠️ WARNING: Bot token in client-side code is INSECURE!
// Anyone can view this token in browser DevTools and abuse your bot.
// Replace with your actual token from @BotFather
const TELEGRAM_BOT_TOKEN = "8476842523:AAGdKVP478-q7WR8TJUj1jVocuLjnHYTUGg";
const TELEGRAM_CHAT_ID = "-4875526331";

interface LeadFormProps {
  onSuccess?: () => void;
  calculatorData?: CalculatorData | null;
  variant: string;
}

// Validation schema
const leadFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Ism kiritilishi shart")
    .max(100, "Ism juda uzun"),
  lastName: z
    .string()
    .trim()
    .min(1, "Familiya kiritilishi shart")
    .max(100, "Familiya juda uzun"),
  phoneNumber: z.string().regex(/^\+998\d{9}$/, "Telefon raqam noto'g'ri"),
  appointmentDate: z.string(),
  appointmentTime: z.string(),
});

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

// Contact info for fallback
const BILLZ_PHONE = "+998712009900";
const BILLZ_WHATSAPP = `https://wa.me/998712009900?text=${encodeURIComponent(
  "Assalomu alaykum, BILLZ haqida ma'lumot olmoqchiman"
)}`;

export const LeadForm = ({ onSuccess, calculatorData, variant }: LeadFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [showFallback, setShowFallback] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Scroll to top when form is displayed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Mask phone for safe logging
  const maskPhone = (phone: string) => {
    if (phone.length < 7) return phone;
    return phone.slice(0, -6) + "******";
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.startsWith("998")) {
      return digits.slice(0, 12);
    }
    return digits.slice(0, 9);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phoneNumber: formatted });
  };

  const isPhoneValid = () => {
    const digits = formData.phoneNumber.replace(/\D/g, "");
    return (
      digits.length === 9 || (digits.startsWith("998") && digits.length === 12)
    );
  };

  const canSubmit = () => {
    return (
      formData.firstName.trim().length > 0 &&
      formData.lastName.trim().length > 0 &&
      isPhoneValid() &&
      date &&
      selectedTime
    );
  };

  // Use centralized calculation logic

  // Send message directly to Telegram
  const sendToTelegram = async (data: any): Promise<boolean> => {
    let lossesText = "";

    if (calculatorData) {
      const losses = calculateLosses(calculatorData);
      const storeTypeLabel = calculatorData.storeType;
      lossesText = `\n-\nDo'kon turi: ${storeTypeLabel}\nOylik yo'qotish: ${formatNumber(losses.totalMonthly)} so'm`;
    }

    const message = `⭐️ Yangi lead - Main Calculator\nIsm: ${data.firstName} ${data.lastName}\nTelefon: ${data.phoneNumber}\nSana: ${data.appointmentDate}\nVaqt: ${data.appointmentTime}${lossesText}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "HTML",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Telegram API xatosi:", errorData);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Telegramga yuborishda xato:", error);
      return false;
    }
  };

  // Save form data to localStorage
  const saveFormDataToLocal = (data: any) => {
    try {
      localStorage.setItem(
        "billz_form_backup",
        JSON.stringify({
          ...data,
          savedAt: new Date().toISOString(),
        })
      );
      console.log("💾 Form data saved to localStorage");
    } catch (error) {
      console.error("Failed to save form data:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit()) {
      toast({
        title: "Xato",
        description: "Iltimos, barcha maydonlarni to'ldiring",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setRetryCount(0);
    setShowFallback(false);

    const rawDigits = formData.phoneNumber.replace(/\D/g, "");
    const phoneE164 = rawDigits.startsWith("998")
      ? `+${rawDigits}`
      : `+998${rawDigits}`;

    const leadData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phoneNumber: phoneE164,
      appointmentDate: format(date!, "dd.MM.yyyy"),
      appointmentTime: selectedTime,
      timestamp: new Date().toISOString(),
      // Calculator data
      ...(calculatorData && {
        storeType: calculatorData.storeType,
        skuCount: calculatorData.skuCount,
        inventoryFrequency: calculatorData.inventoryFrequency,
        theftLevel: calculatorData.theftLevel,
        avgPrice: calculatorData.avgPrice,
      }),
    };

    // Validate with zod
    try {
      leadFormSchema.parse(leadData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Xato",
          description: error.errors[0]?.message || "Ma'lumotlar noto'g'ri",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Save form data in case submission fails
    saveFormDataToLocal(leadData);

    console.log("📤 Telegramga yuborilmoqda:", {
      timestamp: new Date().toISOString(),
      phone: maskPhone(phoneE164),
      name: `${formData.firstName} ${formData.lastName}`,
    });

    // Attempt submission with retries
    const MAX_RETRIES = 3;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      setRetryCount(attempt);
      console.log(`📤 Urinish ${attempt}/${MAX_RETRIES}`);

      const success = await sendToTelegram(leadData);

      if (success) {
        console.log("✅ Telegram xabari muvaffaqiyatli yuborildi");

        // Clear saved form data on success
        localStorage.removeItem("billz_form_backup");

        // Track Lead event

        eventCustom("Lead", {
          content_name: "Inventory loss calculator",
          ph: sha256(maskPhone(phoneE164)),
          name: `${formData.firstName} ${formData.lastName}`,
        });

        toast({
          title: "Muvaffaqiyatli!",
          description: "Tez orada siz bilan bog'lanamiz",
        });

        setIsSubmitting(false);
        setRetryCount(0);
        onSuccess?.();
        return;
      }

      // Retry with exponential backoff
      if (attempt < MAX_RETRIES) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.log(`⏳ ${delay / 1000} soniyadan keyin qayta uriniladi...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    // All attempts failed
    console.error("❌ Barcha urinishlar muvaffaqiyatsiz tugadi");
    setIsSubmitting(false);
    setRetryCount(0);
    setShowFallback(true);

    toast({
      title: "Xato",
      description:
        "Xabar yuborilmadi. Iltimos, pastdagi kontaktlar orqali bog'laning",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-scale-in">
        <div className="flex justify-center mb-6">
          <BillzLogo className="h-10 md:h-12 text-foreground" />
        </div>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            BILLZ bilan bog'lanish
          </h2>
          <p className="text-muted-foreground text-lg">
            Ma'lumotlaringizni qoldiring, biz tez orada bog'lanamiz
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-base font-medium">
                Ism
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Ismingiz"
                  className="h-14 pl-12 text-lg rounded-2xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-base font-medium">
                Familiya
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Familiyangiz"
                  className="h-14 pl-12 text-lg rounded-2xl"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-medium">
              Telefon raqam
            </Label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <div className="absolute left-12 top-1/2 -translate-y-1/2 text-lg text-muted-foreground">
                +998
              </div>
              <Input
                id="phone"
                type="tel"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                placeholder="90 123 45 67"
                className="h-14 pl-24 text-lg rounded-2xl"
              />
            </div>
            {formData.phoneNumber && !isPhoneValid() && (
              <p className="text-sm text-destructive">
                Telefon raqam noto'g'ri
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">
              Qo'ng'iroq sanasini tanlang
            </Label>
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-14 justify-start text-left font-normal text-lg rounded-2xl",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-3 h-5 w-5" />
                  {date ? format(date, "PPP", { locale: uz }) : "Sana tanlang"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setIsDatePickerOpen(false);
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Vaqtni tanlang</Label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-2 border rounded-2xl">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "p-3 rounded-xl border-2 transition-all font-medium",
                    selectedTime === time
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary hover:bg-secondary"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={!canSubmit() || isSubmitting}
            className="w-full h-16 text-lg rounded-2xl font-bold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {retryCount > 0
                  ? `Qayta urinilmoqda... (${retryCount}/3)`
                  : "Yuborilmoqda..."}
              </>
            ) : (
              "Jo'natish"
            )}
          </Button>

          {showFallback && (
            <div className="mt-6 p-6 bg-secondary/50 border-2 border-primary/20 rounded-2xl animate-fade-in">
              <h3 className="font-bold text-lg mb-3 text-center">
                Boshqa yo'l bilan bog'laning
              </h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Sizning ma'lumotlaringiz saqlab qolindi. Iltimos, quyidagi
                yo'llardan biri orqali bog'laning:
              </p>
              <div className="space-y-3">
                <a
                  href={BILLZ_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full p-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl transition-colors font-medium"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp orqali yozish
                </a>
                <a
                  href={`tel:${BILLZ_PHONE}`}
                  className="flex items-center justify-center gap-3 w-full p-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors font-medium"
                >
                  <Phone className="h-5 w-5" />
                  {BILLZ_PHONE} ga qo'ng'iroq
                </a>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowFallback(false);
                    handleSubmit(new Event("submit") as any);
                  }}
                  className="w-full h-12 rounded-xl"
                >
                  Qayta urinib ko'rish
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
