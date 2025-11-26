import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { calculateLosses, formatNumber } from "@/lib/calculations";

export interface CalculatorData {
  storeType: string;
  skuCount: number;
  inventoryFrequency: string;
  theftLevel: string;
  avgPrice: number;
}

interface CalculatorProps {
  onComplete: (data: CalculatorData) => void;
  variant?: string;
}

const storeTypes = [
  { id: "kiyim", label: "Kiyim", avgPrice: 300000 },
  { id: "poyabzal", label: "Poyabzal", avgPrice: 280000 },
  { id: "kantselyariya", label: "Kantselyariya", avgPrice: 50000 },
  { id: "qurilish", label: "Qurilish mollari", avgPrice: 180000 },
  { id: "kosmetika", label: "Kosmetika", avgPrice: 95000 },
  { id: "aksessuar", label: "Aksessuar", avgPrice: 120000 },
  { id: "elektronika", label: "Elektronika", avgPrice: 1000000 },
  { id: "uy-rozgor", label: "Uy-ro'zg'or buyumlari", avgPrice: 200000 },
  { id: "oziq-ovqat", label: "Oziq-ovqat", avgPrice: 28000 },
  { id: "dorixona", label: "Dorixona", avgPrice: 60000 },
  { id: "kafe", label: "Kafe/Restoran", avgPrice: 45000 },
  { id: "ishlab-chiqarish", label: "Ishlab chiqarish", avgPrice: 350000 },
  { id: "ombor", label: "Ombor", avgPrice: 250000 },
  { id: "boshqa", label: "Boshqa", avgPrice: 150000 },
];

const frequencies = [
  { id: "hafta", label: "Har hafta" },
  { id: "oy", label: "Har oy" },
  { id: "3oy", label: "Har 3 oyda" },
  { id: "hech", label: "Hech qachon" },
  { id: "bilmayman", label: "Bilmayman" },
];

const theftLevels = [
  { id: "tez-tez", label: "Ha, tez-tez" },
  { id: "bazan", label: "Ba'zan" },
  { id: "kam", label: "Juda kam" },
  { id: "yoq", label: "Yo'q" },
];

const skuRanges = [
  { id: "0-100", label: "100 tagacha", value: 50 },
  { id: "101-500", label: "101 - 500", value: 300 },
  { id: "501-1000", label: "501 - 1 000", value: 750 },
  { id: "1001-2000", label: "1 001 - 2 000", value: 1500 },
  { id: "2001-5000", label: "2 001 - 5 000", value: 3500 },
  { id: "5001+", label: "5 000+", value: 7000 },
];

const getStoreTypeHint = (storeTypeId: string): string => {
  const hints: Record<string, string> = {
    kiyim: "Odatda 200-500 turdagi mahsulot",
    poyabzal: "Odatda 150-400 turdagi mahsulot",
    kosmetika: "Odatda 300-800 turdagi mahsulot",
    elektronika: "Odatda 100-300 turdagi mahsulot",
    "oziq-ovqat": "Odatda 500-2000 turdagi mahsulot",
    dorixona: "Odatda 800-2500 turdagi mahsulot",
    boshqa: "O'rtacha 200-600 turdagi mahsulot",
  };
  return hints[storeTypeId] || "O'rtacha 200-500 turdagi mahsulot";
};

const getPriceHint = (storeTypeId: string): string => {
  const hints: Record<string, string> = {
    kiyim: "Odatda 250–350 ming so'm",
    poyabzal: "Odatda 200–400 ming so'm",
    kosmetika: "Odatda 70–120 ming so'm",
    dorixona: "Odatda 40–80 ming so'm",
    elektronika: "Odatda 500 ming–1.5 mln so'm",
    "oziq-ovqat": "Odatda 15–40 ming so'm",
    kantselyariya: "Odatda 30–70 ming so'm",
  };
  return hints[storeTypeId] || "Taxminiy o'rtacha narx";
};

export const Calculator = ({ onComplete, variant = "main" }: CalculatorProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<CalculatorData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Remove focus from any active element when step changes
  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [step]);

  const handleStoreTypeSelect = (type: string) => {
    setData({ ...data, storeType: type });
    setStep(2);
  };

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsLoading(true);

      // Track with Yandex Metrika
      if ((window as any).ym) {
        (window as any).ym(50093230, 'reachGoal', 'calculator_complete');
      }
      
      // Send calculator data to Telegram
      sendCalculatorToTelegram(data as CalculatorData).catch(console.error);
      
      setTimeout(() => {
        onComplete(data as CalculatorData);
      }, 2500);
    }
  };

  const sendCalculatorToTelegram = async (calcData: CalculatorData) => {
    console.log("🚀 Starting Telegram send...");
    try {
      const losses = calculateLosses(calcData);
      
      const TELEGRAM_BOT_TOKEN = "8476842523:AAGftuNlSSU-ppIsy9DpVQFPL3Nx3KW7bec";
      const TELEGRAM_CHAT_ID = "-1003046303969";
      
      const storeTypeLabel = storeTypes.find(t => t.id === calcData.storeType)?.label || calcData.storeType;
      
      let message = "";
      
      if (variant === "gamified") {
        const { calculateStoreHealth } = await import("@/lib/calculations");
        const healthResult = calculateStoreHealth(calcData);
        message = `Gamified kalkulyator yakunlandi\nDo'kon turi: ${storeTypeLabel}\nOylik yo'qotish: ${formatNumber(losses.totalMonthly)} so'm\nStore Health Score: ${healthResult.score}/100 (${healthResult.status})`;
      } else {
        message = `Asosiy kalkulyator yakunlandi\nDo'kon turi: ${storeTypeLabel}\nOylik yo'qotish: ${formatNumber(losses.totalMonthly)} so'm`;
      }
      
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      console.log("📤 Sending to Telegram:", { chat_id: TELEGRAM_CHAT_ID, messageLength: message.length });
      
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        console.log("✅ Telegram message sent successfully:", responseData);
      } else {
        console.error("❌ Telegram API error:", responseData);
      }
    } catch (error) {
      console.error("❌ Failed to send calculator notification to Telegram:", error);
    }
  };

  // Import centralized calculation logic - no need for duplicate function

  const canProceed = () => {
    switch (step) {
      case 2:
        return data.skuCount && data.skuCount > 0;
      case 3:
        return data.inventoryFrequency;
      case 4:
        return data.theftLevel;
      case 5:
        return data.avgPrice && data.avgPrice > 0;
      default:
        return false;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[500px] flex flex-col items-center justify-center gap-6 py-12 animate-fade-in">
        <div className="text-center space-y-4">
          <p className="text-3xl md:text-4xl font-bold text-foreground">Tahlil qilinmoqda</p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {/* Top Header - Only show for gamified variant */}
      {variant === "gamified" && (
        <div className="mb-8 text-center space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            BILLZ – Do'kon salomatligi testi
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            5 ta savolga javob bering va do'koningizning sog'lig'ini baholang. Siz o'z biznesingiz holatini bilib olasiz va uni yaxshilash bo'yicha tavsiyalar olasiz.
          </p>
          <p className="text-sm text-muted-foreground">(O'rtacha davomiylik: 1 daqiqa)</p>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">
            Savol {step} / {totalSteps}
          </p>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="animate-fade-in">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Do'koningiz qaysi turga kiradi?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {storeTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    handleStoreTypeSelect(type.id);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.blur();
                  }}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98]",
                    "font-medium focus:outline-none",
                    data.storeType === type.id ? "border-primary bg-secondary" : "border-border"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Do'koningizda nechta mahsulot sotiladi?
            </h2>
            <p className="text-muted-foreground">
              {data.storeType && getStoreTypeHint(data.storeType)}
            </p>
            <div className="grid gap-3">
              {skuRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    setData({ ...data, skuCount: range.value });
                    setTimeout(handleNext, 300);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.blur();
                  }}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98]",
                    "font-medium text-lg focus:outline-none",
                    data.skuCount === range.value ? "border-primary bg-secondary" : "border-border"
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Inventarizatsiyani necha marta o'tkazasiz?
            </h2>
            <div className="grid gap-3">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    setData({ ...data, inventoryFrequency: freq.id });
                    setTimeout(handleNext, 300);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.blur();
                  }}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98]",
                    "font-medium text-lg focus:outline-none",
                    data.inventoryFrequency === freq.id ? "border-primary bg-secondary" : "border-border"
                  )}
                >
                  {freq.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              So'nggi 3 oyda mahsulot yo'qolishi yoki noto'g'ri sanalishi
              bo'lganmi?
            </h2>
            <div className="grid gap-3">
              {theftLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    setData({ ...data, theftLevel: level.id });
                    setTimeout(handleNext, 300);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.blur();
                  }}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98]",
                    "font-medium text-lg focus:outline-none",
                    data.theftLevel === level.id ? "border-primary bg-secondary" : "border-border"
                  )}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Siz sotadigan mahsulotlarning o'rtacha narxi qancha (so'm)?
            </h2>
            <p className="text-muted-foreground">
              {data.storeType && getPriceHint(data.storeType)}
            </p>
            <Input
              type="text"
              placeholder="Masalan: 250 000"
              value={data.avgPrice && data.avgPrice > 0 ? data.avgPrice.toLocaleString('uz-UZ').replace(/,/g, ' ') : ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, '');
                const numValue = parseInt(value) || 0;
                setData({ ...data, avgPrice: numValue });
              }}
              className="h-14 text-lg rounded-2xl"
              autoFocus
            />
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="w-full h-14 text-lg rounded-2xl"
            >
              Natijani ko'rish
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
