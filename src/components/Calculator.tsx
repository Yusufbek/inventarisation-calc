import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface CalculatorData {
  storeType: string;
  skuCount: number;
  inventoryFrequency: string;
  theftLevel: string;
  avgPrice: number;
}

interface CalculatorProps {
  onComplete: (data: CalculatorData) => void;
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

export const Calculator = ({ onComplete }: CalculatorProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<CalculatorData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleStoreTypeSelect = (type: string) => {
    const selected = storeTypes.find((t) => t.id === type);
    setData({ ...data, storeType: type, avgPrice: selected?.avgPrice || 150000 });
    setStep(2);
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      
      // Track calculator completion
      if ((window as any).fbq) {
        (window as any).fbq('trackCustom', 'CalculatorCompleted', {
          storeType: data.storeType,
          skuCount: data.skuCount,
          inventoryFrequency: data.inventoryFrequency,
          theftLevel: data.theftLevel,
          avgPrice: data.avgPrice,
        });
      }
      
      setTimeout(() => {
        onComplete(data as CalculatorData);
      }, 2500);
    }
  };

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
      <div className="w-full min-h-[500px] flex flex-col items-center justify-center gap-8 py-12 animate-fade-in">
        {/* Static Icons - Just changing/pulsing */}
        <div className="flex items-center justify-center gap-4">
          {/* Calculator Icon */}
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center animate-pulse">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          
          {/* Chart Icon */}
          <div className="w-16 h-16 bg-success/20 rounded-2xl flex items-center justify-center animate-pulse" style={{ animationDelay: '0.2s' }}>
            <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          
          {/* Money Icon */}
          <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center animate-pulse" style={{ animationDelay: '0.4s' }}>
            <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          {/* Box Icon */}
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center animate-pulse" style={{ animationDelay: '0.6s' }}>
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        
        <div className="text-center space-y-3">
          <p className="text-2xl font-bold text-foreground">Tahlil qilinmoqda</p>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
        
        <Progress value={100} className="w-80 h-2" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
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

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Inventarizatsiyani necha marta o'tkazasiz?
            </h2>
            <div className="grid gap-3">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => {
                    setData({ ...data, inventoryFrequency: freq.id });
                    setTimeout(handleNext, 300);
                  }}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all hover:border-primary hover:bg-secondary",
                    "font-medium text-lg",
                    data.inventoryFrequency === freq.id &&
                      "border-primary bg-secondary"
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
              Natijani ko'rish
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
