import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { jsPDF } from "jspdf";

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

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      
      // Track calculator completion
      if ((window as any).fbq) {
        (window as any).fbq('trackCustom', 'FinishCalc', {
          storeType: data.storeType,
          skuCount: data.skuCount,
          inventoryFrequency: data.inventoryFrequency,
          theftLevel: data.theftLevel,
          avgPrice: data.avgPrice,
        });
      }

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
    try {
      // Get user metadata
      const metadata = await getUserMetadata();
      const losses = calculateLosses(calcData);
      
      const TELEGRAM_BOT_TOKEN = "8476842523:AAGdKVP478-q7WR8TJUj1jVocuLjnHYTUGg";
      const TELEGRAM_CHAT_ID = "-4875526331";
      
      const storeTypeLabel = storeTypes.find(t => t.id === calcData.storeType)?.label || calcData.storeType;
      const frequencyLabel = frequencies.find(f => f.id === calcData.inventoryFrequency)?.label || calcData.inventoryFrequency;
      const theftLabel = theftLevels.find(l => l.id === calcData.theftLevel)?.label || calcData.theftLevel;
      
      // Generate PDF
      const doc = new jsPDF();
      
      // Set font
      doc.setFontSize(20);
      doc.text("BILLZ Calculator Natijasi", 105, 20, { align: "center" });
      
      // Store Information
      doc.setFontSize(16);
      doc.text("Do'kon ma'lumotlari:", 20, 40);
      doc.setFontSize(12);
      doc.text(`Turi: ${storeTypeLabel}`, 20, 50);
      doc.text(`SKU soni: ${calcData.skuCount.toLocaleString('uz-UZ')}`, 20, 58);
      doc.text(`Inventarizatsiya: ${frequencyLabel}`, 20, 66);
      doc.text(`O'g'irlik darajasi: ${theftLabel}`, 20, 74);
      doc.text(`O'rtacha narx: ${calcData.avgPrice.toLocaleString('uz-UZ')} so'm`, 20, 82);
      
      // Losses
      doc.setFontSize(16);
      doc.text("Hisoblangan yo'qotishlar:", 20, 100);
      doc.setFontSize(12);
      doc.text(`Oylik yo'qotish: ${losses.totalMonthly.toLocaleString('uz-UZ')} so'm`, 20, 110);
      doc.text(`Yillik yo'qotish: ${losses.totalYearly.toLocaleString('uz-UZ')} so'm`, 20, 118);
      doc.text(`BILLZ bilan tejash mumkin: ${losses.recoveredProfit.toLocaleString('uz-UZ')} so'm/oy`, 20, 126);
      
      // Loss breakdown
      doc.setFontSize(16);
      doc.text("Yo'qotishlar tarkibi:", 20, 144);
      doc.setFontSize(12);
      doc.text(`Inventar yo'qotishi: ${losses.inventoryLoss.toLocaleString('uz-UZ')} so'm`, 20, 154);
      doc.text(`Vaqt yo'qotishi: ${losses.timeLoss.toLocaleString('uz-UZ')} so'm`, 20, 162);
      doc.text(`Mijoz yo'qotishi: ${losses.customerLoss.toLocaleString('uz-UZ')} so'm`, 20, 170);
      
      // User metadata
      doc.setFontSize(16);
      doc.text("Foydalanuvchi ma'lumotlari:", 20, 188);
      doc.setFontSize(12);
      doc.text(`IP: ${metadata.ip}`, 20, 198);
      doc.text(`Joylashuv: ${metadata.location}`, 20, 206);
      doc.text(`Brauzer: ${metadata.userAgent.substring(0, 60)}`, 20, 214);
      doc.text(`Ekran: ${metadata.screenSize}`, 20, 222);
      doc.text(`Vaqt: ${metadata.timestamp}`, 20, 230);
      doc.text(`Session ID: ${metadata.sessionId}`, 20, 238);
      
      // Convert PDF to blob
      const pdfBlob = doc.output('blob');
      
      // Send PDF to Telegram
      const formData = new FormData();
      formData.append('chat_id', TELEGRAM_CHAT_ID);
      formData.append('document', pdfBlob, `calculator-${metadata.sessionId}.pdf`);
      formData.append('caption', `🧮 Calculator natijasi - ${storeTypeLabel}\n💰 Oylik yo'qotish: ${losses.totalMonthly.toLocaleString('uz-UZ')} so'm`);
      
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`;
      
      await fetch(url, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Failed to send calculator PDF to Telegram:", error);
    }
  };

  const getUserMetadata = async () => {
    let ip = "Unknown";
    let location = "Unknown";
    
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      ip = ipData.ip;
      
      const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const locationData = await locationResponse.json();
      location = `${locationData.city || "Unknown"}, ${locationData.country_name || "Unknown"}`;
    } catch (error) {
      console.error("Failed to fetch user metadata:", error);
    }
    
    const sessionId = localStorage.getItem("sessionId") || generateSessionId();
    localStorage.setItem("sessionId", sessionId);
    
    return {
      ip,
      location,
      userAgent: navigator.userAgent.substring(0, 100),
      screenSize: `${window.screen.width}x${window.screen.height}`,
      timestamp: new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
      sessionId,
    };
  };

  const generateSessionId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const calculateLosses = (calcData: CalculatorData) => {
    const frequencyFactors: Record<string, number> = {
      hafta: 0.02,
      oy: 0.05,
      "3oy": 0.08,
      hech: 0.12,
      bilmayman: 0.05,
    };
    const errorFactors: Record<string, number> = {
      "tez-tez": 0.10,
      bazan: 0.05,
      kam: 0.02,
      yoq: 0.00,
    };
    const errorFactor = errorFactors[calcData.theftLevel] || 0.05;
    const frequencyFactor = frequencyFactors[calcData.inventoryFrequency] || 0.05;
    const inventoryLoss = Math.round(calcData.skuCount * calcData.avgPrice * errorFactor);
    const timeLoss = Math.round(calcData.skuCount * 1000 * frequencyFactor);
    const customerLoss = Math.round(inventoryLoss * 0.30);
    const totalMonthly = inventoryLoss + timeLoss + customerLoss;
    const totalYearly = totalMonthly * 12;
    const recoveredProfit = Math.round(totalMonthly * 0.60);
    return {
      inventoryLoss,
      timeLoss,
      customerLoss,
      totalMonthly,
      totalYearly,
      recoveredProfit,
    };
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
