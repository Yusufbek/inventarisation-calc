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
];

const theftLevels = [
  { id: "tez-tez", label: "Ha, tez-tez" },
  { id: "bazan", label: "Ba'zan" },
  { id: "kam", label: "Juda kam" },
  { id: "yoq", label: "Yo'q" },
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
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-6 py-12 animate-fade-in">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xl text-muted-foreground">Tahlil qilinmoqda...</p>
        <Progress value={100} className="w-64 h-2" />
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
              Sizda nechta turdagi mahsulot mavjud?
            </h2>
            <p className="text-muted-foreground">
              {data.storeType && getStoreTypeHint(data.storeType)}
            </p>
            <Input
              type="number"
              placeholder="Masalan: 300"
              value={data.skuCount || ""}
              onChange={(e) =>
                setData({ ...data, skuCount: parseInt(e.target.value) || 0 })
              }
              className="h-14 text-lg rounded-2xl"
            />
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="w-full h-14 text-lg rounded-2xl"
            >
              Davom etish
            </Button>
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
              type="number"
              placeholder="Masalan: 250000"
              value={data.avgPrice || ""}
              onChange={(e) =>
                setData({ ...data, avgPrice: parseInt(e.target.value) || 0 })
              }
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
