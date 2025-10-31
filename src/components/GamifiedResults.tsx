import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalculatorData } from "./Calculator";
import {
  AlertTriangle,
  AlertCircle,
  AlertOctagon,
  ClipboardCheck,
  BarChart3,
  TrendingUp,
  Package,
  X,
  CheckCircle2,
} from "lucide-react";
import {
  calculateStoreHealth,
  calculateLosses,
  formatNumber,
} from "@/lib/calculations";
import { eventCustom } from "@/lib/fpixel";

interface GamifiedResultsProps {
  data: CalculatorData;
  onContactClick: () => void;
}

export const GamifiedResults = ({
  data,
  onContactClick,
}: GamifiedResultsProps) => {
  const [showStickyButton, setShowStickyButton] = useState(true);
  const healthResult = calculateStoreHealth(data);
  const losses = calculateLosses(data);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Hide sticky button when main CTA is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyButton(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const ctaButton = document.getElementById("main-cta-button");
    if (ctaButton) {
      observer.observe(ctaButton);
    }

    return () => {
      if (ctaButton) {
        observer.unobserve(ctaButton);
      }
    };
  }, []);

  // Determine status color and icon using semantic tokens
  const getStatusColor = () => {
    if (healthResult.status === "KRITIK") return "bg-destructive";
    if (healthResult.status === "YOMON") return "bg-orange-500"; // warning state
    return "bg-amber-500"; // caution state
  };
  
  const getStatusTextColor = () => {
    if (healthResult.status === "KRITIK") return "text-destructive-foreground";
    if (healthResult.status === "YOMON") return "text-white";
    return "text-white";
  };

  const StatusIcon = () => {
    const iconClass = "w-16 h-16 md:w-20 md:h-20 text-white";
    if (healthResult.status === "KRITIK") {
      return <AlertOctagon className={iconClass} strokeWidth={2.5} />;
    }
    if (healthResult.status === "YOMON") {
      return <AlertCircle className={iconClass} strokeWidth={2.5} />;
    }
    return <AlertTriangle className={iconClass} strokeWidth={2.5} />;
  };

  const scrollToSolution = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    eventCustom("CalculatorFinished", {
      content_name: "Inventory loss calculator gamified",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Store Health Section */}
        <Card className="bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border-0 p-8 md:p-12 rounded-3xl shadow-2xl overflow-hidden relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
          
          <div className="relative">
            <h2 className="text-xs md:text-sm font-bold text-white/40 tracking-[0.3em] mb-10 uppercase">
              STORE HEALTH
            </h2>

            <div className="flex items-center justify-between gap-8 mb-10">
              {/* Left: Score and Status */}
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-8xl md:text-[10rem] font-black text-white leading-none tracking-tight">
                    {healthResult.score}
                  </span>
                  <span className="text-4xl md:text-5xl font-medium text-white/40 mb-4">
                    /100
                  </span>
                </div>

                {/* Status Badge */}
                <div
                  className={`inline-flex items-center justify-center ${getStatusColor()} ${getStatusTextColor()} px-7 py-3 rounded-full font-black text-base md:text-lg tracking-wide uppercase shadow-lg`}
                >
                  {healthResult.status}
                </div>
              </div>

              {/* Right: Warning Icon */}
              <div className="hidden md:flex flex-shrink-0">
                <div className={`${getStatusColor()} w-44 h-44 flex items-center justify-center rounded-3xl shadow-2xl`}>
                  <StatusIcon />
                </div>
              </div>
            </div>

            {/* Mobile Warning Icon */}
            <div className="md:hidden flex justify-center mb-8">
              <div className={`${getStatusColor()} w-32 h-32 flex items-center justify-center rounded-3xl shadow-2xl`}>
                <StatusIcon />
              </div>
            </div>

            {/* Bottom Message */}
            <div className="pt-6 border-t border-white/10">
              {healthResult.status === "YAXSHILASH MUMKIN" ? (
                <p className="text-amber-400 text-lg md:text-xl font-semibold leading-relaxed">
                  ✨ Yaxshi natija! Yangi imkoniyatlar uchun tayyor.
                </p>
              ) : healthResult.status === "YOMON" ? (
                <p className="text-amber-400 text-lg md:text-xl font-semibold leading-relaxed">
                  Siz oyiga <span className="font-black">{formatNumber(losses.totalMonthly)} so'm</span> yo'qotmoqdasiz inventarizatsiya qilmaganingiz uchun.
                </p>
              ) : (
                <p className="text-amber-400 text-lg md:text-xl font-semibold leading-relaxed">
                  Siz oyiga <span className="font-black">{formatNumber(losses.totalMonthly)} so'm</span> yo'qotmoqdasiz inventarizatsiya qilmaganingiz uchun.
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Healthy Store Metrics Section */}
        <Card className="bg-card border-0 p-8 md:p-10 rounded-3xl shadow-xl">
          <h2 className="text-xs md:text-sm font-bold text-muted-foreground tracking-widest mb-8 uppercase">
            SOG'LOM DO'KON KO'RSATKICHLARI
          </h2>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {/* Inventarizatsiya */}
            <div className="flex items-center gap-5 p-5 bg-muted/50 rounded-2xl border border-border hover:shadow-md transition-all">
              <div
                className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-xl ${
                  healthResult.metrics.inventarizatsiya
                    ? "bg-success/10"
                    : "bg-destructive/10"
                }`}
              >
                <ClipboardCheck
                  className={`w-9 h-9 ${
                    healthResult.metrics.inventarizatsiya
                      ? "text-success"
                      : "text-muted-foreground"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base md:text-lg font-bold text-foreground mb-1.5 truncate">
                  Inventarizatsiya
                </p>
                <p className="text-sm text-muted-foreground">
                  {healthResult.metrics.inventarizatsiya
                    ? "Muntazam bajarilmoqda"
                    : "Yaxshilash kerak"}
                </p>
              </div>
              {healthResult.metrics.inventarizatsiya ? (
                <CheckCircle2 className="w-7 h-7 text-success flex-shrink-0" />
              ) : (
                <X className="w-7 h-7 text-destructive flex-shrink-0" strokeWidth={2.5} />
              )}
            </div>

            {/* Ishonchli ma'lumotlar */}
            <div className="flex items-center gap-5 p-5 bg-muted/50 rounded-2xl border border-border hover:shadow-md transition-all">
              <div
                className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-xl ${
                  healthResult.metrics.ishonchliMalumotlar
                    ? "bg-success/10"
                    : "bg-destructive/10"
                }`}
              >
                <BarChart3
                  className={`w-9 h-9 ${
                    healthResult.metrics.ishonchliMalumotlar
                      ? "text-success"
                      : "text-muted-foreground"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base md:text-lg font-bold text-foreground mb-1.5 truncate">
                  Ishonchli ma'lumotlar
                </p>
                <p className="text-sm text-muted-foreground">
                  {healthResult.metrics.ishonchliMalumotlar
                    ? "Ma'lumotlar aniq"
                    : "Nazorat qiling"}
                </p>
              </div>
              {healthResult.metrics.ishonchliMalumotlar ? (
                <CheckCircle2 className="w-7 h-7 text-success flex-shrink-0" />
              ) : (
                <X className="w-7 h-7 text-destructive flex-shrink-0" strokeWidth={2.5} />
              )}
            </div>

            {/* Sog'lom o'sish */}
            <div className="flex items-center gap-5 p-5 bg-muted/50 rounded-2xl border border-border hover:shadow-md transition-all">
              <div
                className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-xl ${
                  healthResult.metrics.soglomOsish
                    ? "bg-success/10"
                    : "bg-destructive/10"
                }`}
              >
                <TrendingUp
                  className={`w-9 h-9 ${
                    healthResult.metrics.soglomOsish
                      ? "text-success"
                      : "text-muted-foreground"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base md:text-lg font-bold text-foreground mb-1.5 truncate">
                  Sog'lom o'sish
                </p>
                <p className="text-sm text-muted-foreground">
                  {healthResult.metrics.soglomOsish
                    ? "Barqaror rivojlanish"
                    : "O'sishni oshiring"}
                </p>
              </div>
              {healthResult.metrics.soglomOsish ? (
                <CheckCircle2 className="w-7 h-7 text-success flex-shrink-0" />
              ) : (
                <X className="w-7 h-7 text-destructive flex-shrink-0" strokeWidth={2.5} />
              )}
            </div>

            {/* Mahsulot nazorati */}
            <div className="flex items-center gap-5 p-5 bg-muted/50 rounded-2xl border border-border hover:shadow-md transition-all">
              <div
                className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-xl ${
                  healthResult.metrics.mahsulotNazorati
                    ? "bg-success/10"
                    : "bg-destructive/10"
                }`}
              >
                <Package
                  className={`w-9 h-9 ${
                    healthResult.metrics.mahsulotNazorati
                      ? "text-success"
                      : "text-muted-foreground"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base md:text-lg font-bold text-foreground mb-1.5 truncate">
                  Mahsulot nazorati
                </p>
                <p className="text-sm text-muted-foreground">
                  {healthResult.metrics.mahsulotNazorati
                    ? "Yaxshi nazorat"
                    : "Nazoratni kuchaytiring"}
                </p>
              </div>
              {healthResult.metrics.mahsulotNazorati ? (
                <CheckCircle2 className="w-7 h-7 text-success flex-shrink-0" />
              ) : (
                <X className="w-7 h-7 text-destructive flex-shrink-0" strokeWidth={2.5} />
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="flex items-center justify-center gap-4 p-6 bg-muted/70 rounded-2xl border-2 border-border">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                healthResult.passedMetrics > 2
                  ? "bg-success/20"
                  : "bg-destructive/20"
              }`}
            >
              {healthResult.passedMetrics > 2 ? (
                <CheckCircle2 className="w-7 h-7 text-success" />
              ) : (
                <X className="w-7 h-7 text-destructive" strokeWidth={2.5} />
              )}
            </div>
            <p className="text-lg md:text-xl font-bold text-foreground">
              {healthResult.passedMetrics}/4 ko'rsatkich me'yorda
            </p>
          </div>
        </Card>

        {/* Solution Section */}
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center px-4">
            {healthResult.status === "YAXSHILASH MUMKIN" ? (
              <>
                Balingizni oshirish uchun yechim -{" "}
                <span className="text-primary">
                  biznesingizni yanada o'sish
                </span>
              </>
            ) : (
              <>Balingizni oshirish uchun yechim</>
            )}
          </h2>

          <Card className="bg-primary border-0 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            <div className="relative flex flex-col items-center gap-6 text-center">
              {/* Rocket Emoji */}
              <div className="text-7xl md:text-8xl animate-scale-in">🚀</div>

              {/* Text Content */}
              <div className="space-y-5 max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-black text-primary-foreground leading-tight">
                  BILLZ - Do'kon egalari uchun super kuch
                </h3>
                <p className="text-primary-foreground/90 text-base md:text-lg leading-relaxed">
                  {healthResult.status === "YAXSHILASH MUMKIN" ? (
                    <>
                      BILLZ bilan biznesingizni tezroq o'stirish, yangi
                      filiallar ochish va samaradorlikni maksimal darajaga
                      ko'tarish mumkin.
                    </>
                  ) : (
                    <>
                      Do'konlaringizni tartibga solish, boshqarish va
                      samaradorligini oshirish uchun to'liq tizim.
                    </>
                  )}
                </p>
                <Button
                  id="main-cta-button"
                  onClick={onContactClick}
                  size="lg"
                  className="w-full md:w-auto h-14 px-8 text-lg rounded-2xl font-bold bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all shadow-lg"
                >
                  SINAB KO'RISH
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Sticky Bottom Panel */}
      {showStickyButton && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/98 backdrop-blur-md border-t-2 border-border shadow-2xl p-4 z-50 animate-slide-up">
          <div className="max-w-3xl mx-auto">
            <Button
              size="lg"
              className="w-full h-14 md:h-16 text-lg md:text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              onClick={scrollToSolution}
            >
              Muammongizga yechim aniqlash
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
