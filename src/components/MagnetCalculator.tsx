import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { calculateLosses, formatNumber } from "@/lib/calculations";
import { eventCustom, pageView } from "@/lib/fpixel";
import { sendCapiEvent, getBrowserId } from "@/lib/capi";
import { ArrowLeft } from "lucide-react";

export interface CalculatorData {
  storeType: string;
  skuCount: number;
  inventoryFrequency: string;
  theftLevel: string;
  avgPrice: number;
  revenue?: number;
  region?: string;
}

const storeTypes = [
  {
    id: "kiyim",
    label: "Kiyim",
    avgPrice: 300000,
  },
  {
    id: "poyabzal",
    label: "Poyabzal",
    avgPrice: 280000,
  },
  {
    id: "kantselyariya",
    label: "Kantselyariya",
    avgPrice: 50000,
  },
  {
    id: "qurilish",
    label: "Qurilish mollari",
    avgPrice: 180000,
  },
  {
    id: "kosmetika",
    label: "Kosmetika",
    avgPrice: 95000,
  },
  {
    id: "aksessuar",
    label: "Aksessuar",
    avgPrice: 120000,
  },
  {
    id: "elektronika",
    label: "Elektronika",
    avgPrice: 1000000,
  },
  {
    id: "uy-rozgor",
    label: "Uy-ro'zg'or buyumlari",
    avgPrice: 200000,
  },
  {
    id: "oziq-ovqat",
    label: "Oziq-ovqat",
    avgPrice: 28000,
  },
  {
    id: "dorixona",
    label: "Dorixona",
    avgPrice: 60000,
  },
  {
    id: "kafe",
    label: "Kafe/Restoran",
    avgPrice: 45000,
  },
  {
    id: "ishlab-chiqarish",
    label: "Ishlab chiqarish",
    avgPrice: 350000,
  },
  {
    id: "ombor",
    label: "Ombor",
    avgPrice: 250000,
  },
  {
    id: "boshqa",
    label: "Boshqa",
    avgPrice: 150000,
  },
];

const frequencies = [
  {
    id: "hafta",
    label: "Har hafta",
  },
  {
    id: "oy",
    label: "Har oy",
  },
  {
    id: "3oy",
    label: "Har 3 oyda",
  },
  {
    id: "hech",
    label: "Hech qachon",
  },
  {
    id: "bilmayman",
    label: "Bilmayman",
  },
];

const theftLevels = [
  {
    id: "tez-tez",
    label: "Ha, tez-tez",
  },
  {
    id: "bazan",
    label: "Ba'zan",
  },
  {
    id: "kam",
    label: "Juda kam",
  },
  {
    id: "yoq",
    label: "Yo'q",
  },
];

const skuRanges = [
  {
    id: "0-100",
    label: "100 tagacha",
    value: 50,
  },
  {
    id: "101-500",
    label: "101 - 500",
    value: 300,
  },
  {
    id: "501-1000",
    label: "501 - 1 000",
    value: 750,
  },
  {
    id: "1001-2000",
    label: "1 001 - 2 000",
    value: 1500,
  },
  {
    id: "2001-5000",
    label: "2 001 - 5 000",
    value: 3500,
  },
  {
    id: "5001+",
    label: "5 000+",
    value: 7000,
  },
];

const revenueRanges = [
  { id: "micro", label: "< 80 mln so'm", value: 40000000, category: "micro" },
  { id: "small", label: "80–800 mln so'm", value: 440000000, category: "small" },
  { id: "medium", label: "800 mln–1 mlrd so'm", value: 900000000, category: "medium" },
];

const uzbekistanRegions = [
  { id: "toshkent-shahar", label: "Toshkent shahri" },
  { id: "toshkent-viloyat", label: "Toshkent viloyati" },
  { id: "andijon", label: "Andijon viloyati" },
  { id: "buxoro", label: "Buxoro viloyati" },
  { id: "fargona", label: "Farg'ona viloyati" },
  { id: "jizzax", label: "Jizzax viloyati" },
  { id: "xorazm", label: "Xorazm viloyati" },
  { id: "namangan", label: "Namangan viloyati" },
  { id: "navoiy", label: "Navoiy viloyati" },
  { id: "qashqadaryo", label: "Qashqadaryo viloyati" },
  { id: "samarqand", label: "Samarqand viloyati" },
  { id: "sirdaryo", label: "Sirdaryo viloyati" },
  { id: "surxondaryo", label: "Surxondaryo viloyati" },
  { id: "qoraqalpogiston", label: "Qoraqalpog'iston Respublikasi" },
];

const getRevenueCategory = (value: number | undefined): string | undefined => {
  if (!value) return undefined;
  const range = revenueRanges.find(r => r.value === value);
  return range?.category;
};

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

const TRACKING_WEBHOOK_URL = "https://n8n-m2.makebillz.top/webhook/e2b981b8-e691-4f70-a9b8-2b82cfa42386";

interface MagnetCalculatorProps {
  isTestMode?: boolean;
}

export const MagnetCalculator = ({ isTestMode = false }: MagnetCalculatorProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<CalculatorData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [telegramUrl, setTelegramUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUnsupportedStore, setIsUnsupportedStore] = useState(false);
  const [hasNoStore, setHasNoStore] = useState(false);

  // Fire-and-forget tracking function - never blocks the user flow
  const sendTrackingEvent = (event: string, eventData?: Record<string, any>) => {
    fetch(TRACKING_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        timestamp: new Date().toISOString(),
        isTest: isTestMode,
        ...eventData,
      }),
    }).catch(() => {
      // Silently ignore errors - user should not be affected
    });
  };

  const totalSteps = 8;
  const progress = (step / totalSteps) * 100;

  // Unsupported store types and Telegram credentials for trash notifications
  const unsupportedStoreTypes = ["dorixona", "kafe", "ishlab-chiqarish"];
  const TELEGRAM_BOT_TOKEN = "8476842523:AAGftuNlSSU-ppIsy9DpVQFPL3Nx3KW7bec";
  const TELEGRAM_CHAT_ID = "-1003046303969";

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  // Remove focus from any active element when step changes
  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [step]);

  // Track PageView when user arrives at Magnet Calculator
  useEffect(() => {
    pageView();
  }, []);

  const handleHasStoreSelect = (hasStore: boolean) => {
    sendTrackingEvent("CALC_1qstn", { hasStore });
    if (hasStore) {
      setStep(2);
    } else {
      setHasNoStore(true);
    }
  };

  const handleStoreTypeSelect = (type: string) => {
    sendTrackingEvent("CALC_2qstn", { storeType: type });
    setData({
      ...data,
      storeType: type,
    });
    setStep(3);
  };

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      await submitCalculator();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSkipRevenue = async () => {
    sendTrackingEvent("CALC_7qstn", { revenue: "skipped" });
    await submitCalculator();
  };

  const submitCalculator = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const calcData = data as CalculatorData;

      // Check if store type is unsupported (dorixona or kafe)
      if (unsupportedStoreTypes.includes(calcData.storeType)) {
        // Send "trash" notification to Telegram group
        const storeTypeLabel = storeTypes.find((t) => t.id === calcData.storeType)?.label || calcData.storeType;
        const message = `🗑 Trash - Magnet Calculator\n\nDo'kon turi: ${storeTypeLabel}\nSKU: ${
          calcData.skuCount
        }\nO'rtacha narx: ${calcData.avgPrice?.toLocaleString("uz-UZ")} so'm\n\n❌ Faqat chakana savdo uchun`;
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }),
        });
        setIsUnsupportedStore(true);
        setIsLoading(false);
        return; // Exit early - don't send to n8n, don't track pixels
      }

      // Track with Yandex Metrika (only for supported stores)
      if ((window as any).ym) {
        (window as any).ym(50093230, "reachGoal", "magnet_calculator_complete");
      }
      const losses = calculateLosses(calcData);
      const utmParams = getUtmParams();
      const webhookPayload = {
        storeType: calcData.storeType,
        sku: calcData.skuCount,
        calculatedLoss: losses.totalMonthly,
        avgPrice: calcData.avgPrice,
        theft: losses.inventoryLoss,
        outOfStock: losses.customerLoss,
        time: losses.timeLoss,
        revenue: getRevenueCategory(calcData.revenue),
        region: calcData.region,
        isTest: isTestMode,
        ...utmParams,
      };
      const response = await fetch("https://n8n-m2.makebillz.top/webhook/f88e72ec-197c-401a-8028-6d9cf5ee188d", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      });
      if (!response.ok) {
        throw new Error("Webhook request failed");
      }
      const result = await response.json();
      if (result.telegram_url) {
        setTelegramUrl(result.telegram_url);
      } else {
        throw new Error("No telegram_url in response");
      }
    } catch (error) {
      console.error("Failed to send data to webhook:", error);
      setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 3:
        return data.skuCount && data.skuCount > 0;
      case 4:
        return data.inventoryFrequency;
      case 5:
        return data.theftLevel;
      case 6:
        return data.avgPrice && data.avgPrice > 0;
      case 7:
        return data.revenue && data.revenue > 0;
      case 8:
        return !!data.region;
      default:
        return false;
    }
  };

  // Show "no store" message
  if (hasNoStore) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
        <div className="text-center space-y-6 max-w-md">
          <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Bu kalkulyator faqat do'kon egalari uchun</h2>
          <p className="text-lg text-muted-foreground">
            Kafe, ishlab chiqarish va boshqa biznes turlari uchun hisoblash imkoni yo'q. Do'koningiz bo'lsa, qaytadan
            urinib ko'ring.
          </p>
          <Button variant="outline" onClick={() => setHasNoStore(false)} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Orqaga qaytish
          </Button>
        </div>
      </div>
    );
  }

  // Show unsupported store message
  if (isUnsupportedStore) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
        <div className="text-center space-y-6 max-w-md">
          <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Afsuski, bu kalkulyator faqat chakana savdo do'konlari uchun
          </h2>
          <p className="text-lg text-muted-foreground">
            Dorixona, Kafe/Restoran, Ishlab-chiqarish uchun hisoblash imkoni yo'q. Biz faqat retail do'konlar uchun
            yo'qotishlarni hisoblashimiz mumkin.
          </p>
        </div>
      </div>
    );
  }

  // Show Telegram redirect screen
  if (telegramUrl) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
        <div className="text-center space-y-6 max-w-md">
          {/* Simple Telegram Icon */}
          <div className="mx-auto w-20 h-20 bg-[#0088cc] rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Hisobotingiz tayyor!</h2>

          {/* Simple Description */}
          <p className="text-lg text-muted-foreground">Telegram botda batafsil natijalar va tavsiyalar kutmoqda</p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="w-full text-lg h-14 bg-[#0088cc] hover:bg-[#0088cc]/90 text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => {
              // Track CALC_finish event
              sendTrackingEvent("CALC_finish", {
                storeType: data.storeType,
                skuCount: data.skuCount,
                inventoryFrequency: data.inventoryFrequency,
                theftLevel: data.theftLevel,
                avgPrice: data.avgPrice,
                revenue: data.revenue ? getRevenueCategory(data.revenue) : undefined,
              });

              const eventId = crypto.randomUUID();
              const browserId = getBrowserId();
              eventCustom(
                "CalculatorFinished",
                {
                  content_name: "Inventory loss calculator magnet",
                  external_id: browserId,
                },
                eventId,
              );

              sendCapiEvent({
                eventName: "CalculatorFinished",
                eventId: eventId,
                externalId: browserId,
                customData: {
                  content_name: "Inventory loss calculator magnet",
                },
              }).then(() => {
                window.location.href = telegramUrl;
              });
            }}
          >
            Telegram botga o'tish
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-[500px] flex flex-col items-center justify-center gap-6 py-12 animate-fade-in">
        <div className="text-center space-y-4">
          <p className="text-3xl md:text-4xl font-bold text-foreground">Tahlil qilinmoqda</p>
          <div className="flex items-center justify-center gap-1.5">
            <span
              className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
              style={{
                animationDelay: "0ms",
              }}
            ></span>
            <span
              className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
              style={{
                animationDelay: "150ms",
              }}
            ></span>
            <span
              className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
              style={{
                animationDelay: "300ms",
              }}
            ></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {/* Test mode indicator */}
      {isTestMode && (
        <div className="mb-4 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg inline-flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-amber-600">Test Mode</span>
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

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => {
              setError(null);
              submitCalculator();
            }}
          >
            Qaytadan urinish
          </Button>
        </div>
      )}

      <div className="animate-fade-in">
        {/* Step 1: Do you have a store? */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Do'koningiz bormi?</h2>
            <div className="grid gap-3">
              <button
                onClick={(e) => {
                  e.currentTarget.blur();
                  sendTrackingEvent("CALC_Start");
                  handleHasStoreSelect(true);
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.blur();
                }}
                className="p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98] font-medium text-lg focus:outline-none border-border"
              >
                Ha, do'konim bor
              </button>
              <button
                onClick={(e) => {
                  e.currentTarget.blur();
                  sendTrackingEvent("CALC_Start");
                  handleHasStoreSelect(false);
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.blur();
                }}
                className="p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98] font-medium text-lg focus:outline-none border-border"
              >
                Yo'q, do'konim yo'q
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Store type */}
        {step === 2 && (
          <div className="space-y-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Orqaga</span>
            </button>
            <h2 className="text-2xl md:text-3xl font-bold">Do'koningiz qaysi turga kiradi?</h2>
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
                    data.storeType === type.id ? "border-primary bg-secondary" : "border-border",
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: SKU count */}
        {step === 3 && (
          <div className="space-y-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Orqaga</span>
            </button>
            <h2 className="text-2xl md:text-3xl font-bold">Do'koningizda nechta mahsulot sotiladi?</h2>
            <p className="text-muted-foreground">{data.storeType && getStoreTypeHint(data.storeType)}</p>
            <div className="grid gap-3">
              {skuRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    sendTrackingEvent("CALC_3qstn", { skuCount: range.value });
                    setData({
                      ...data,
                      skuCount: range.value,
                    });
                    setTimeout(handleNext, 300);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.blur();
                  }}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98]",
                    "font-medium text-lg focus:outline-none",
                    data.skuCount === range.value ? "border-primary bg-secondary" : "border-border",
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Inventory frequency */}
        {step === 4 && (
          <div className="space-y-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Orqaga</span>
            </button>
            <h2 className="text-2xl md:text-3xl font-bold">Inventarizatsiyani necha marta o'tkazasiz?</h2>
            <div className="grid gap-3">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    sendTrackingEvent("CALC_4qstn", { inventoryFrequency: freq.id });
                    setData({
                      ...data,
                      inventoryFrequency: freq.id,
                    });
                    setTimeout(handleNext, 300);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.blur();
                  }}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98]",
                    "font-medium text-lg focus:outline-none",
                    data.inventoryFrequency === freq.id ? "border-primary bg-secondary" : "border-border",
                  )}
                >
                  {freq.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Theft level */}
        {step === 5 && (
          <div className="space-y-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Orqaga</span>
            </button>
            <h2 className="text-2xl md:text-3xl font-bold">
              So'nggi 3 oyda mahsulot yo'qolishi yoki noto'g'ri sanalishi bo'lganmi?
            </h2>
            <div className="grid gap-3">
              {theftLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    sendTrackingEvent("CALC_5qstn", { theftLevel: level.id });
                    setData({
                      ...data,
                      theftLevel: level.id,
                    });
                    setTimeout(handleNext, 300);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.blur();
                  }}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98]",
                    "font-medium text-lg focus:outline-none",
                    data.theftLevel === level.id ? "border-primary bg-secondary" : "border-border",
                  )}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Average price */}
        {step === 6 && (
          <div className="space-y-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Orqaga</span>
            </button>
            <h2 className="text-2xl md:text-3xl font-bold">
              Siz sotadigan mahsulotlarning o'rtacha narxi qancha (so'm)?
            </h2>
            <p className="text-muted-foreground">{data.storeType && getPriceHint(data.storeType)}</p>
            <Input
              type="text"
              placeholder="Masalan: 250 000"
              value={data.avgPrice && data.avgPrice > 0 ? data.avgPrice.toLocaleString("uz-UZ").replace(/,/g, " ") : ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, "");
                const numValue = parseInt(value) || 0;
                setData({
                  ...data,
                  avgPrice: numValue,
                });
              }}
              className="h-14 text-lg rounded-2xl"
              autoFocus
            />
            <Button onClick={() => {
              sendTrackingEvent("CALC_6qstn", { avgPrice: data.avgPrice });
              handleNext();
            }} disabled={!canProceed()} className="w-full h-14 text-lg rounded-2xl">
              Keyingi savol
            </Button>
          </div>
        )}

        {/* Step 7: Revenue (Optional) */}
        {step === 7 && (
          <div className="space-y-6 pb-28">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Orqaga</span>
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                O'tgan oyda do'koningiz savdosi (taxminan) qancha bo'lgan?
              </h2>
              <p className="text-sm text-muted-foreground flex items-start gap-2 bg-secondary/50 p-4 rounded-xl">
                <span className="text-lg">🔒</span>
                <span>Natijangizni aniqroq hisoblash uchun kerak.</span>
              </p>
            </div>
            <div className="grid gap-3">
              {revenueRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    setData({ ...data, revenue: range.value });
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.blur();
                  }}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98]",
                    "font-medium text-lg focus:outline-none",
                    data.revenue === range.value ? "border-primary bg-secondary" : "border-border",
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Sticky footer CTA */}
            <div className="fixed inset-x-0 bottom-0 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border">
              <div className="max-w-3xl mx-auto px-4 py-3">
                <Button
                  onClick={() => {
                    sendTrackingEvent("CALC_7qstn", { revenue: getRevenueCategory(data.revenue) });
                    handleNext();
                  }}
                  disabled={!data.revenue}
                  className="w-full h-12 text-base md:text-lg rounded-xl"
                >
                  Keyingi savol
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 8: Region Selection */}
        {step === 8 && (
          <div className="space-y-6 pb-28">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Orqaga</span>
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Qaysi viloyatdansiz?
              </h2>
              <p className="text-sm text-muted-foreground">
                Hududingizni tanlang
              </p>
            </div>
            <div className="grid gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {uzbekistanRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    setData({ ...data, region: region.id });
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.blur();
                  }}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98]",
                    "font-medium text-lg focus:outline-none",
                    data.region === region.id ? "border-primary bg-secondary" : "border-border",
                  )}
                >
                  {region.label}
                </button>
              ))}
            </div>

            {/* Sticky footer CTA */}
            <div className="fixed inset-x-0 bottom-0 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border">
              <div className="max-w-3xl mx-auto px-4 py-3">
                <Button
                  onClick={() => {
                    sendTrackingEvent("CALC_8qstn", { region: data.region });
                    sendTrackingEvent("CALC_qstnsfinish", {
                      storeType: data.storeType,
                      skuCount: data.skuCount,
                      inventoryFrequency: data.inventoryFrequency,
                      theftLevel: data.theftLevel,
                      avgPrice: data.avgPrice,
                      revenue: getRevenueCategory(data.revenue),
                      region: data.region,
                    });
                    handleNext();
                  }}
                  disabled={!data.region}
                  className="w-full h-12 text-base md:text-lg rounded-xl"
                >
                  Natijani ko'rish
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
