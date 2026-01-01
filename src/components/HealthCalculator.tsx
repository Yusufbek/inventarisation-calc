import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { HealthCalculatorData, calculateHealthScore, formatNumber } from "@/lib/healthCalculations";
import { eventCustom, pageView } from "@/lib/fpixel";
import { sendCapiEvent, getBrowserId } from "@/lib/capi";
import { ArrowLeft, Shield, Lock } from "lucide-react";

const TRACKING_WEBHOOK_URL = "https://n8n-m2.makebillz.top/webhook/e2b981b8-e691-4f70-a9b8-2b82cfa42386";

// Business types
const businessTypes = [
  { id: "clothing", label: "Kiyim/Poyabzal" },
  { id: "grocery", label: "Oziq-ovqat/Market" },
  { id: "parts", label: "Ehtiyot qismlar/Xomashyo" },
  { id: "cosmetics", label: "Kosmetika/Parfyumeriya" },
  { id: "electronics", label: "Elektronika" },
  { id: "other", label: "Boshqa" },
];

// Tracking methods
const trackingMethods = [
  { id: "notebook", label: "Daftar/Qog'oz", score: 0 },
  { id: "memory", label: "Faqat xotira", score: 0 },
  { id: "excel", label: "Excel", score: 10 },
  { id: "pos", label: "Avtomatlashtirilgan POS", score: 20 },
];

// Daily sales ranges
const dailySalesRanges = [
  { id: "under-1m", label: "< 1 mln so'm" },
  { id: "1-2m", label: "1-2 mln so'm" },
  { id: "3-10m", label: "3-10 mln so'm" },
  { id: "10m+", label: "10+ mln so'm" },
];

// Staff count options
const staffCountOptions = [
  { id: "alone", label: "Faqat men" },
  { id: "2-3", label: "2-3 kishi" },
  { id: "4+", label: "4 va undan ko'p" },
];

// Stock count frequency
const stockCountFrequencies = [
  { id: "weekly", label: "Har hafta" },
  { id: "monthly", label: "Har oy" },
  { id: "yearly", label: "Yilda bir" },
  { id: "never", label: "Hech qachon" },
  { id: "on-suspicion", label: "O'g'irlik gumon qilganda" },
];

// Debt handling options
const debtHandlingOptions = [
  { id: "none", label: "Nasiya bermayman" },
  { id: "notebook", label: "Alohida daftarda" },
  { id: "automated", label: "Dastur avtomatik kuzatadi" },
];

// Profit withdrawal options
const profitWithdrawalOptions = [
  { id: "from-register", label: "Kassadan kerak bo'lganda" },
  { id: "fixed", label: "Belgilangan miqdorda" },
  { id: "calculated", label: "Oy oxirida hisoblab" },
];

// Trust level options
const trustLevelOptions = [
  { id: "full", label: "Ha, 100%" },
  { id: "partial", label: "Biroz yo'qotaman" },
  { id: "none", label: "Hammani o'g'irlashardi" },
];

// Dead stock awareness options
const deadStockOptions = [
  { id: "yes", label: "Ha" },
  { id: "no", label: "Yo'q" },
];

// Supplier disputes options
const supplierDisputeOptions = [
  { id: "never", label: "Hech qachon" },
  { id: "sometimes", label: "Ba'zan" },
  { id: "often", label: "Tez-tez" },
];

// Pricing strategy options
const pricingStrategyOptions = [
  { id: "copy", label: "Qo'shnilardan ko'chiraman" },
  { id: "fixed", label: "Belgilangan ustama" },
  { id: "margin", label: "Foiz marja" },
];

// Customer data collection options
const customerDataOptions = [
  { id: "none", label: "Yo'q" },
  { id: "notebook", label: "Ba'zan daftarga" },
  { id: "database", label: "Telegram/bazada" },
];

// Survival buffer options
const survivalBufferOptions = [
  { id: "no", label: "Yo'q" },
  { id: "yes", label: "Ha" },
];

// Customer loyalty options
const customerLoyaltyOptions = [
  { id: "mostly-new", label: "Ko'pi yangi" },
  { id: "mixed", label: "50/50" },
  { id: "mostly-regular", label: "Ko'pi doimiy" },
];

// Top priority options (no score)
const topPriorityOptions = [
  { id: "theft", label: "O'g'irlik/Kamomad" },
  { id: "profit", label: "Sof foyda" },
  { id: "inventory", label: "Inventar/Pereuchet" },
  { id: "sales", label: "Savdo/Marketing" },
];

interface HealthCalculatorProps {
  isTestMode?: boolean;
}

export const HealthCalculator = ({ isTestMode = false }: HealthCalculatorProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<HealthCalculatorData>>({
    hoursAtShop: 8,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [telegramUrl, setTelegramUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Total steps: Start + Privacy + 16 questions = 18 steps
  const totalSteps = 18;
  const progress = ((step - 2) / (totalSteps - 2)) * 100; // Start progress from Q1

  // Fire-and-forget tracking function
  const sendTrackingEvent = (event: string, eventData?: Record<string, any>) => {
    fetch(TRACKING_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        calculator: "health",
        timestamp: new Date().toISOString(),
        isTest: isTestMode,
        ...eventData,
      }),
    }).catch(() => {
      // Silently ignore errors
    });
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Remove focus when step changes
  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [step]);

  // Track PageView
  useEffect(() => {
    pageView();
  }, []);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSelectAndNext = (field: keyof HealthCalculatorData, value: string, eventName: string) => {
    sendTrackingEvent(eventName, { [field]: value });
    setData({ ...data, [field]: value });
    setTimeout(() => setStep(step + 1), 200);
  };

  const submitCalculator = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const calcData = data as HealthCalculatorData;
      const results = calculateHealthScore(calcData);

      // Track with Yandex Metrika
      if ((window as any).ym) {
        (window as any).ym(50093230, "reachGoal", "health_calculator_complete");
      }

      const webhookPayload = {
        answers: calcData,
        results: {
          healthScore: results.healthScore,
          grade: results.grade.label,
          potentialAnnualLoss: results.potentialAnnualLoss,
          prescriptions: results.prescriptions,
        },
        isTest: isTestMode,
      };

      // TODO: Replace with actual webhook URL when ready
      const response = await fetch("https://n8n-m2.makebillz.top/webhook/health-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // Render Telegram redirect screen
  if (telegramUrl) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
        <div className="text-center space-y-6 max-w-md">
          <div className="mx-auto w-20 h-20 bg-[#0088cc] rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Hisobotingiz tayyor!</h2>
          <p className="text-lg text-muted-foreground">
            Telegram botda batafsil natijalar va tavsiyalar kutmoqda
          </p>
          <Button
            size="lg"
            className="w-full text-lg h-14 bg-[#0088cc] hover:bg-[#0088cc]/90 text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => {
              sendTrackingEvent("HEALTH_finish", { answers: data });
              const eventId = crypto.randomUUID();
              const browserId = getBrowserId();
              eventCustom(
                "CalculatorFinished",
                { content_name: "Business Health Calculator", external_id: browserId },
                eventId
              );
              sendCapiEvent({
                eventName: "CalculatorFinished",
                eventId,
                externalId: browserId,
                customData: { content_name: "Business Health Calculator" },
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

  // Render loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-[500px] flex flex-col items-center justify-center gap-6 py-12 animate-fade-in">
        <div className="text-center space-y-4">
          <p className="text-3xl md:text-4xl font-bold text-foreground">Tahlil qilinmoqda</p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  // BackButton component
  const BackButton = () => (
    <button
      onClick={handleBack}
      className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-4"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Orqaga</span>
    </button>
  );

  // Option button renderer
  const OptionButton = ({
    selected,
    onClick,
    children,
  }: {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={(e) => {
        e.currentTarget.blur();
        onClick();
      }}
      onTouchEnd={(e) => e.currentTarget.blur()}
      className={cn(
        "p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98]",
        "font-medium text-lg focus:outline-none",
        selected ? "border-primary bg-secondary" : "border-border"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {/* Test mode indicator */}
      {isTestMode && (
        <div className="mb-4 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg inline-flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-amber-600">Test Mode</span>
        </div>
      )}

      {/* Progress bar - only show after privacy screen */}
      {step > 2 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">
              Savol {step - 2} / {totalSteps - 2}
            </p>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => { setError(null); submitCalculator(); }}>
            Qaytadan urinish
          </Button>
        </div>
      )}

      <div className="animate-fade-in">
        {/* Step 1: Start Screen */}
        {step === 1 && (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Biznes Salomatligi Kalkulyatori</h1>
            <p className="text-muted-foreground text-lg">
              16 ta savol orqali biznesingizning haqiqiy holatini bilib oling va muammolarni aniqlang
            </p>
            <div className="space-y-3 text-left bg-secondary/50 p-4 rounded-xl">
              <p className="font-medium">Bu vosita sizga yordam beradi:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  Biznesingizning sog'lig'ini baholash
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  Yashirin yo'qotishlarni aniqlash
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  Shaxsiy tavsiyalar olish
                </li>
              </ul>
            </div>
            <Button
              size="lg"
              className="w-full h-14 text-lg"
              onClick={() => {
                sendTrackingEvent("HEALTH_Start");
                setStep(2);
              }}
            >
              Boshlash
            </Button>
          </div>
        )}

        {/* Step 2: Privacy Screen */}
        {step === 2 && (
          <div className="space-y-6 text-center">
            <BackButton />
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Ma'lumotlaringiz himoyalangan</h2>
            <p className="text-muted-foreground text-lg">
              Barcha javoblaringiz maxfiy saqlanadi va faqat tahlil uchun ishlatiladi
            </p>
            <Button size="lg" className="w-full h-14 text-lg" onClick={() => setStep(3)}>
              Davom etish
            </Button>
          </div>
        )}

        {/* Q1: Business Type (Step 3) */}
        {step === 3 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">Biznesingiz qaysi turga kiradi?</h2>
            <div className="grid grid-cols-2 gap-3">
              {businessTypes.map((type) => (
                <OptionButton
                  key={type.id}
                  selected={data.businessType === type.id}
                  onClick={() => handleSelectAndNext("businessType", type.id, "HEALTH_1qstn")}
                >
                  {type.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q2: Tracking Method (Step 4) */}
        {step === 4 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">Savdo va pulni qanday kuzatasiz?</h2>
            <div className="grid gap-3">
              {trackingMethods.map((method) => (
                <OptionButton
                  key={method.id}
                  selected={data.trackingMethod === method.id}
                  onClick={() => handleSelectAndNext("trackingMethod", method.id, "HEALTH_2qstn")}
                >
                  {method.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q3: Daily Sales (Step 5) */}
        {step === 5 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">Kunlik savdongiz qancha?</h2>
            <div className="grid gap-3">
              {dailySalesRanges.map((range) => (
                <OptionButton
                  key={range.id}
                  selected={data.dailySales === range.id}
                  onClick={() => handleSelectAndNext("dailySales", range.id, "HEALTH_3qstn")}
                >
                  {range.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q4: Staff Count (Step 6) */}
        {step === 6 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">Do'konda necha kishi ishlaydi?</h2>
            <div className="grid gap-3">
              {staffCountOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={data.staffCount === option.id}
                  onClick={() => handleSelectAndNext("staffCount", option.id, "HEALTH_4qstn")}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q5: Hours at Shop - SLIDER (Step 7) */}
        {step === 7 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">O'zingiz kuniga necha soat do'konda bo'lasiz?</h2>
            <div className="space-y-8 py-4">
              <div className="text-center">
                <span className="text-5xl font-bold text-primary">{data.hoursAtShop || 8}</span>
                <span className="text-2xl text-muted-foreground ml-2">soat</span>
              </div>
              <Slider
                value={[data.hoursAtShop || 8]}
                onValueChange={(value) => setData({ ...data, hoursAtShop: value[0] })}
                min={0}
                max={16}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 soat</span>
                <span>16 soat</span>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full h-14 text-lg"
              onClick={() => {
                sendTrackingEvent("HEALTH_5qstn", { hoursAtShop: data.hoursAtShop });
                setStep(8);
              }}
            >
              Keyingi savol
            </Button>
          </div>
        )}

        {/* Intermediary Screen (Step 8) */}
        {step === 8 && (
          <div className="space-y-6 text-center py-12">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-2xl md:text-3xl font-bold">Yaxshi ketyapsiz!</h2>
            <p className="text-muted-foreground text-lg">
              Endi yo'qotishlar va boshqaruv haqida savollar
            </p>
            <Button size="lg" className="w-full h-14 text-lg" onClick={() => setStep(9)}>
              Davom etish
            </Button>
          </div>
        )}

        {/* Q6: Stock Count Frequency (Step 9) */}
        {step === 9 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">Pereuchet qachon o'tkazasiz?</h2>
            <div className="grid gap-3">
              {stockCountFrequencies.map((freq) => (
                <OptionButton
                  key={freq.id}
                  selected={data.stockCountFrequency === freq.id}
                  onClick={() => handleSelectAndNext("stockCountFrequency", freq.id, "HEALTH_6qstn")}
                >
                  {freq.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q7: Debt Handling (Step 10) */}
        {step === 10 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">Nasiyani qanday boshqarasiz?</h2>
            <div className="grid gap-3">
              {debtHandlingOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={data.debtHandling === option.id}
                  onClick={() => handleSelectAndNext("debtHandling", option.id, "HEALTH_7qstn")}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q8: Profit Withdrawal (Step 11) */}
        {step === 11 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">Foydani qanday olasiz?</h2>
            <div className="grid gap-3">
              {profitWithdrawalOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={data.profitWithdrawal === option.id}
                  onClick={() => handleSelectAndNext("profitWithdrawal", option.id, "HEALTH_8qstn")}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q9: Trust Level (Step 12) */}
        {step === 12 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">
              2 hafta safarda bo'lsangiz, pul va tovar to'g'ri kelarmidi?
            </h2>
            <div className="grid gap-3">
              {trustLevelOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={data.trustLevel === option.id}
                  onClick={() => handleSelectAndNext("trustLevel", option.id, "HEALTH_9qstn")}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q10: Dead Stock Awareness (Step 13) */}
        {step === 13 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">
              6 oydan beri sotilmagan mahsulotlarni bilasizmi?
            </h2>
            <div className="grid gap-3">
              {deadStockOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={data.deadStockAwareness === option.id}
                  onClick={() => handleSelectAndNext("deadStockAwareness", option.id, "HEALTH_10qstn")}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q11: Supplier Disputes (Step 14) */}
        {step === 14 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">
              Ta'minotchilar bilan qarz haqida bahslashasizmi?
            </h2>
            <div className="grid gap-3">
              {supplierDisputeOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={data.supplierDisputes === option.id}
                  onClick={() => handleSelectAndNext("supplierDisputes", option.id, "HEALTH_11qstn")}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q12: Pricing Strategy (Step 15) */}
        {step === 15 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">Narxni qanday belgilaysiz?</h2>
            <div className="grid gap-3">
              {pricingStrategyOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={data.pricingStrategy === option.id}
                  onClick={() => handleSelectAndNext("pricingStrategy", option.id, "HEALTH_12qstn")}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q13: Customer Data Collection (Step 16) */}
        {step === 16 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">Mijozlar telefon raqamini yig'asizmi?</h2>
            <div className="grid gap-3">
              {customerDataOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={data.customerDataCollection === option.id}
                  onClick={() => handleSelectAndNext("customerDataCollection", option.id, "HEALTH_13qstn")}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q14: Survival Buffer (Step 17) */}
        {step === 17 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">2 hafta savdosiz yashay olasizmi?</h2>
            <div className="grid gap-3">
              {survivalBufferOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={data.survivalBuffer === option.id}
                  onClick={() => handleSelectAndNext("survivalBuffer", option.id, "HEALTH_14qstn")}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q15: Customer Loyalty (Step 18) */}
        {step === 18 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">Bugun kimlar sotib oldi?</h2>
            <div className="grid gap-3">
              {customerLoyaltyOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={data.customerLoyalty === option.id}
                  onClick={() => handleSelectAndNext("customerLoyalty", option.id, "HEALTH_15qstn")}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {/* Q16: Top Priority (Step 19) */}
        {step === 19 && (
          <div className="space-y-6">
            <BackButton />
            <h2 className="text-2xl md:text-3xl font-bold">Eng muhim muammo nima?</h2>
            <div className="grid gap-3">
              {topPriorityOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={data.topPriority === option.id}
                  onClick={() => {
                    sendTrackingEvent("HEALTH_16qstn", { topPriority: option.id });
                    sendTrackingEvent("HEALTH_qstnsfinish", { answers: data });
                    setData({ ...data, topPriority: option.id });
                    setTimeout(submitCalculator, 200);
                  }}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
