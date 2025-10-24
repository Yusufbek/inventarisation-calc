import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { calculateLosses, formatNumber } from "@/lib/calculations";
import { CalculatorData } from "./Calculator";

interface LiteCalculatorProps {
  onComplete: (data: CalculatorData & { revenue?: number }) => void;
}

const storeTypes = [
  { id: "kiyim", label: "Kiyim", avgPrice: 300000 },
  { id: "poyabzal", label: "Poyabzal", avgPrice: 280000 },
  { id: "dorixona", label: "Dorixona", avgPrice: 60000 },
  { id: "oziq-ovqat", label: "Oziq-ovqat", avgPrice: 28000 },
  { id: "kosmetika", label: "Kosmetika", avgPrice: 95000 },
  { id: "elektronika", label: "Elektronika", avgPrice: 1000000 },
  { id: "qurilish", label: "Qurilish mollari", avgPrice: 180000 },
  { id: "kafe", label: "Kafe/Restoran", avgPrice: 45000 },
  { id: "boshqa", label: "Boshqa", avgPrice: 150000 },
];

const skuRanges = [
  { id: "0-100", label: "100 tagacha", value: 50 },
  { id: "101-500", label: "101–500", value: 300 },
  { id: "501-1000", label: "501–1 000", value: 750 },
  { id: "1001-2000", label: "1 001–2 000", value: 1500 },
  { id: "2001-5000", label: "2 001–5 000", value: 3500 },
  { id: "5001+", label: "5 000+", value: 7000 },
];

const theftLevels = [
  { id: "tez-tez", label: "Ha, tez-tez" },
  { id: "bazan", label: "Ba'zan" },
  { id: "kam", label: "Juda kam" },
  { id: "yoq", label: "Yo'q" },
];

const getPriceHint = (storeTypeId: string): string => {
  const hints: Record<string, string> = {
    kiyim: "Odatda 250–350 ming so'm",
    poyabzal: "Odatda 200–400 ming so'm",
    kosmetika: "Odatda 70–120 ming so'm",
    dorixona: "Odatda 40–80 ming so'm",
    elektronika: "Odatda 500 ming–1.5 mln so'm",
    "oziq-ovqat": "Odatda 15–40 ming so'm",
  };
  return hints[storeTypeId] || "Taxminiy o'rtacha narx";
};

export const LiteCalculator = ({ onComplete }: LiteCalculatorProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<CalculatorData & { revenue?: number }>>({});

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleStoreTypeSelect = (type: string) => {
    const selected = storeTypes.find((t) => t.id === type);
    setData({ ...data, storeType: type, avgPrice: selected?.avgPrice || 150000 });
    setTimeout(() => setStep(2), 300);
  };

  const sendCalculatorToTelegram = async (calcData: CalculatorData & { revenue?: number }) => {
    try {
      const losses = calculateLosses(calcData as CalculatorData);
      const TELEGRAM_BOT_TOKEN = "8476842523:AAGdKVP478-q7WR8TJUj1jVocuLjnHYTUGg";
      const TELEGRAM_CHAT_ID = "-4875526331";
      const storeTypeLabel = storeTypes.find(t => t.id === calcData.storeType)?.label || calcData.storeType;
      const parts = [
        `🧮 Lite kalkulyator yakunlandi`,
        `🏪 ${storeTypeLabel}`,
        `📦 SKU: ${calcData.skuCount}`,
        `🔒 O'g'irlik: ${calcData.theftLevel}`,
        `💵 O'rtacha narx: ${formatNumber(calcData.avgPrice)} so'm`,
        calcData.revenue ? `📈 Savdo (oy): ${formatNumber(calcData.revenue)} so'm` : undefined,
        `💰 Oylik yo'qotish: ${formatNumber(losses.totalMonthly)} so'm`
      ].filter(Boolean);
      const message = parts.join("\n");
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
      });
    } catch (error) {
      console.error("Failed to send lite calculator notification to Telegram:", error);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Fire-and-forget Telegram notification on completion
      sendCalculatorToTelegram(data as CalculatorData & { revenue?: number });
      onComplete(data as CalculatorData & { revenue?: number });
    }
  };

  const handleSkip = () => {
    // Fire-and-forget Telegram notification even if revenue skipped
    sendCalculatorToTelegram(data as CalculatorData & { revenue?: number });
    onComplete(data as CalculatorData & { revenue?: number });
  };
  const canProceed = () => {
    switch (step) {
      case 2:
        return data.skuCount && data.skuCount > 0;
      case 3:
        return data.theftLevel;
      case 4:
        return data.avgPrice && data.avgPrice > 0;
      case 5:
        return true; // Optional step
      default:
        return false;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="mb-8 text-center space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          BILLZ – Inventarizatsiya yo'qotish kalkulyatori
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          5 ta tez savolga javob bering va do'koningiz har oy qancha pul yo'qotayotganini aniqlang.
        </p>
        <p className="text-sm text-muted-foreground">(O'rtacha davomiylik: 1 daqiqa)</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">
            Savol {step} / {totalSteps}
          </p>
          <p className="text-sm font-medium text-primary">{Math.round(progress)}%</p>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="animate-fade-in">
        {/* Step 1: Store Type */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Sizning do'koningiz qaysi turga kiradi?
              </h2>
              <p className="text-sm text-muted-foreground">
                Bu bizga sizning yo'qotish modelingizni to'g'ri hisoblashga yordam beradi.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {storeTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleStoreTypeSelect(type.id)}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all hover:border-primary hover:bg-secondary",
                    "font-medium"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: SKU Count */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Do'koningizda taxminan nechta turdagi mahsulot sotiladi?
              </h2>
              <p className="text-sm text-muted-foreground">
                Ko'p turdagi mahsulot — ko'proq nazorat xatosi xavfi.
              </p>
            </div>
            <div className="grid gap-3">
              {skuRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => {
                    setData({ ...data, skuCount: range.value });
                    setTimeout(handleNext, 300);
                  }}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all hover:border-primary hover:bg-secondary",
                    "font-medium text-lg",
                    data.skuCount === range.value && "border-primary bg-secondary"
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Theft Level */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              So'nggi 3 oyda mahsulot yo'qolishi yoki noto'g'ri sanalishi holatlari bo'lganmi?
            </h2>
            <div className="grid gap-3">
              {theftLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => {
                    setData({ ...data, theftLevel: level.id });
                    setTimeout(handleNext, 300);
                  }}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all hover:border-primary hover:bg-secondary",
                    "font-medium text-lg",
                    data.theftLevel === level.id && "border-primary bg-secondary"
                  )}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Average Price */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Sotayotgan mahsulotlaringizning o'rtacha narxi (so'm)?
              </h2>
              <p className="text-muted-foreground">
                {data.storeType && getPriceHint(data.storeType)}
              </p>
            </div>
            <Input
              type="text"
              placeholder="Masalan: 95 000"
              value={data.avgPrice ? data.avgPrice.toLocaleString('uz-UZ').replace(/,/g, ' ') : ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, '');
                const numValue = parseInt(value) || 0;
                setData({ ...data, avgPrice: numValue });
              }}
              className="h-14 text-lg rounded-2xl"
            />
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="w-full h-14 text-lg rounded-2xl"
            >
              Keyingi savol
            </Button>
          </div>
        )}

        {/* Step 5: Revenue (Optional) */}
        {step === 5 && (
          <div className="space-y-6 pb-28">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                O'tgan oyda do'koningiz savdosi (taxminan) qancha bo'lgan?
              </h2>
              <p className="text-sm text-muted-foreground flex items-start gap-2 bg-secondary/50 p-4 rounded-xl">
                <span className="text-lg">💡</span>
                <span>Bu savol majburiy emas, lekin natija aniqroq bo'lishi uchun tavsiya qilamiz.</span>
              </p>
            </div>
            <div className="grid gap-3">
              {[
                { id: "0-50", label: "< 50 mln so'm", value: 25000000 },
                { id: "50-100", label: "50–100 mln so'm", value: 75000000 },
                { id: "100-200", label: "100–200 mln so'm", value: 150000000 },
                { id: "200-500", label: "200–500 mln so'm", value: 350000000 },
                { id: "500+", label: "500 mln+ so'm", value: 750000000 },
              ].map((range) => (
                <button
                  key={range.id}
                  onClick={() => {
                    setData({ ...data, revenue: range.value });
                  }}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all hover:border-primary hover:bg-secondary",
                    "font-medium text-lg",
                    data.revenue === range.value && "border-primary bg-secondary"
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Sticky footer CTA */}
            <div className="fixed inset-x-0 bottom-0 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border">
              <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
                <Button
                  onClick={handleNext}
                  disabled={!data.revenue}
                  className="flex-1 h-12 text-base md:text-lg rounded-xl"
                >
                  Natijani ko'rish
                </Button>
                <Button
                  onClick={handleSkip}
                  variant="ghost"
                  className="h-12 text-base rounded-xl"
                >
                  O'tkazib yuborish
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
