import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import { CalendarIcon, Phone, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BillzLogo } from "@/components/BillzLogo";
import { CalculatorData } from "./Calculator";

interface LeadFormProps {
  onSuccess?: () => void;
  calculatorData?: CalculatorData | null;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

export const LeadForm = ({ onSuccess, calculatorData }: LeadFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.startsWith('998')) {
      return digits.slice(0, 12);
    }
    return digits.slice(0, 9);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phoneNumber: formatted });
  };

  const isPhoneValid = () => {
    const digits = formData.phoneNumber.replace(/\D/g, '');
    return digits.length === 9 || (digits.startsWith('998') && digits.length === 12);
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

  // Helper function to check webhook connectivity with timeout
  const checkWebhookHealth = async (url: string, timeoutMs = 5000): Promise<{ ok: boolean; error?: string }> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      
      const response = await fetch(url, {
        method: "OPTIONS",
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return { ok: true };
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return { ok: false, error: 'timeout' };
        }
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          return { ok: false, error: 'network' };
        }
      }
      return { ok: false, error: 'unknown' };
    }
  };

  // Helper function to submit with timeout
  const submitWithTimeout = async (url: string, data: any, timeoutMs = 10000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };

  // Save form data to localStorage
  const saveFormDataToLocal = (data: any) => {
    try {
      localStorage.setItem('billz_form_backup', JSON.stringify({
        ...data,
        savedAt: new Date().toISOString(),
      }));
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

    const webhookUrl = "https://n8n-m.billz.work/webhook/2cf1c5b0-09c8-4be3-87f2-262e01436d5d";
    
    const rawDigits = formData.phoneNumber.replace(/\D/g, '');
    const phoneE164 = rawDigits.startsWith('998') ? `+${rawDigits}` : `+998${rawDigits}`;
    
    const leadData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: phoneE164,
      appointmentDate: format(date!, 'dd.MM.yyyy'),
      appointmentTime: selectedTime,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      // Calculator data
      ...(calculatorData && {
        storeType: calculatorData.storeType,
        skuCount: calculatorData.skuCount,
        inventoryFrequency: calculatorData.inventoryFrequency,
        theftLevel: calculatorData.theftLevel,
        avgPrice: calculatorData.avgPrice,
      }),
    };

    // Save form data in case submission fails
    saveFormDataToLocal(leadData);

    console.log("📤 Starting submission process:", {
      url: webhookUrl,
      timestamp: new Date().toISOString(),
      data: leadData
    });

    // Step 1: Check webhook health
    console.log("🏥 Checking webhook health...");
    const healthCheck = await checkWebhookHealth(webhookUrl);
    
    if (!healthCheck.ok) {
      console.error("❌ Webhook health check failed:", healthCheck.error);
      setIsSubmitting(false);
      
      let errorTitle = "Xato";
      let errorDescription = "Qayta urinib ko'ring";
      
      if (healthCheck.error === 'timeout') {
        errorTitle = "Vaqt tugadi";
        errorDescription = "Server javob bermadi. Iltimos, biroz vaqtdan keyin qayta urinib ko'ring";
      } else if (healthCheck.error === 'network') {
        errorTitle = "Tarmoq xatosi";
        errorDescription = "Internet aloqangizni tekshiring yoki biroz vaqtdan keyin qayta urinib ko'ring";
      }
      
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
      });
      return;
    }
    
    console.log("✅ Webhook is reachable");

    // Step 2: Attempt submission with retries
    const maxRetries = 3;
    let lastError: any = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        setRetryCount(attempt);
        console.log(`📤 Submission attempt ${attempt}/${maxRetries}`);
        
        const res = await submitWithTimeout(webhookUrl, leadData, 10000);

        console.log("📥 Webhook response:", {
          attempt,
          status: res.status,
          statusText: res.statusText,
          ok: res.ok,
          headers: Object.fromEntries(res.headers.entries())
        });

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          console.error("❌ Webhook error response:", {
            attempt,
            status: res.status,
            statusText: res.statusText,
            body: text
          });
          
          // Don't retry on client errors (400-499), only on server errors (500+)
          if (res.status >= 400 && res.status < 500) {
            let errorDescription = "Ma'lumotlar noto'g'ri";
            if (res.status === 404) {
              errorDescription = "Webhook topilmadi. Texnik xizmat bilan bog'laning";
            } else if (res.status === 403 || res.status === 401) {
              errorDescription = "Ruxsat yo'q. Texnik xizmat bilan bog'laning";
            }
            
            throw new Error(`Client error ${res.status}: ${errorDescription}`);
          }
          
          // Server error - will retry
          lastError = new Error(`Server error ${res.status}: ${text}`);
          
          if (attempt < maxRetries) {
            const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
            console.log(`⏳ Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          
          throw lastError;
        }

        console.log("✅ Lead submitted successfully on attempt", attempt);

        // Clear saved form data on success
        localStorage.removeItem('billz_form_backup');

        // Track successful form submission
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            firstName: leadData.firstName,
            lastName: leadData.lastName,
            phoneNumber: leadData.phoneNumber,
            appointmentDate: leadData.appointmentDate,
            appointmentTime: leadData.appointmentTime,
          });
        }

        toast({
          title: "Muvaffaqiyatli!",
          description: "Tez orada siz bilan bog'lanamiz",
        });

        setIsSubmitting(false);
        setRetryCount(0);
        onSuccess?.();
        return;
        
      } catch (error) {
        lastError = error;
        console.error(`❌ Attempt ${attempt} failed:`, error);
        
        // If it's a client error or last attempt, break
        if (error instanceof Error && error.message.includes('Client error')) {
          break;
        }
        
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff: 2s, 4s, 8s
          console.log(`⏳ Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // All attempts failed
    console.error("❌ All submission attempts failed:", lastError);
    setIsSubmitting(false);
    setRetryCount(0);
    
    let errorTitle = "Xato";
    let errorDescription = "Barcha urinishlar muvaffaqiyatsiz tugadi. Iltimos, biroz vaqtdan keyin qayta urinib ko'ring";
    
    if (lastError instanceof Error) {
      if (lastError.name === 'AbortError' || lastError.message.includes('timeout')) {
        errorTitle = "Vaqt tugadi";
        errorDescription = "Server juda sekin javob bermoqda. Iltimos, biroz vaqtdan keyin qayta urinib ko'ring";
      } else if (lastError.message.includes('Failed to fetch') || lastError.message.includes('NetworkError')) {
        errorTitle = "Tarmoq xatosi";
        errorDescription = "Internet aloqangizni tekshiring va qayta urinib ko'ring";
      } else if (lastError.message.includes('Client error')) {
        errorTitle = "Xato";
        errorDescription = lastError.message.split(': ')[1] || "Ma'lumotlar noto'g'ri";
      } else if (lastError.message.includes('Server error')) {
        errorTitle = "Server xatosi";
        errorDescription = "Server bilan bog'lanishda muammo. Biroz vaqtdan keyin qayta urinib ko'ring";
      }
    }
    
    toast({
      title: errorTitle,
      description: errorDescription,
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
            <Popover>
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
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
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
                {retryCount > 0 ? `Qayta urinilmoqda... (${retryCount}/3)` : "Yuborilmoqda..."}
              </>
            ) : (
              "Jo'natish"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
