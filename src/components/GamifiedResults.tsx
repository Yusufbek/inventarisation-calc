import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalculatorData } from "./Calculator";
import { AlertTriangle, AlertCircle, AlertOctagon, ClipboardCheck, BarChart3, TrendingUp, Package, X, CheckCircle2 } from "lucide-react";
import { calculateStoreHealth, calculateLosses, formatNumber } from "@/lib/calculations";


interface GamifiedResultsProps {
  data: CalculatorData;
  onContactClick: () => void;
}


export const GamifiedResults = ({ data, onContactClick }: GamifiedResultsProps) => {
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
  
  // Determine status color and icon
  const getStatusColor = () => {
    if (healthResult.status === "KRITIK") return "bg-red-500";
    if (healthResult.status === "YOMON") return "bg-orange-500";
    return "bg-yellow-500";
  };
  
  const StatusIcon = () => {
    if (healthResult.status === "KRITIK") {
      return <AlertOctagon className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={3} />;
    }
    if (healthResult.status === "YOMON") {
      return <AlertCircle className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={3} />;
    }
    return <AlertTriangle className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={3} />;
  };

  const scrollToSolution = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Store Health Section */}
        <Card className="bg-primary border-2 border-primary p-6 md:p-8 rounded-3xl">
          <h2 className="text-sm md:text-base font-bold text-white/70 tracking-wider mb-6">
            DO'KON HOLATI BALLI
          </h2>

          <div className="flex items-center justify-between gap-8 mb-6">
            {/* Score and Status */}
            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-7xl md:text-8xl font-black text-white">
                  {healthResult.score}
                </span>
                <span className="text-3xl md:text-4xl font-bold text-white/60">
                  /100
                </span>
              </div>

              {/* Status Badge */}
              <div className="inline-block">
                <div
                  className={`${getStatusColor()} text-white px-6 py-2.5 rounded-full font-bold text-base md:text-lg`}
                >
                  {healthResult.status}
                </div>
              </div>
            </div>

            {/* Status Icon */}
            <div className="flex-shrink-0">
              <div className={`${getStatusColor()} w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-2xl`}>
                <StatusIcon />
              </div>
            </div>
          </div>

          {/* Short Dynamic Message */}
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            {healthResult.status === "YAXSHILASH MUMKIN" ? (
              <p className="text-white text-base md:text-lg font-semibold">
                ✨ Yaxshi natija! Yangi imkoniyatlar uchun tayyor.
              </p>
            ) : healthResult.status === "YOMON" ? (
              <p className="text-orange-200 text-base md:text-lg font-semibold">
                ⚠️ Yaxshilash talab qilinadi. Oylik yo'qotish: {formatNumber(losses.totalMonthly)} so'm
              </p>
            ) : (
              <p className="text-red-200 text-base md:text-lg font-semibold">
                🚨 Jiddiy muammo! Oylik yo'qotish: {formatNumber(losses.totalMonthly)} so'm
              </p>
            )}
          </div>
        </Card>

        {/* Healthy Store Metrics Section */}
        <Card className="bg-card border-2 border-border p-6 md:p-8 rounded-3xl">
          <h2 className="text-sm md:text-base font-bold text-muted-foreground tracking-wider mb-6">
            SOG'LOM DO'KON KO'RSATKICHLARI
          </h2>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Inventarizatsiya */}
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border-2 border-border">
              <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl ${healthResult.metrics.inventarizatsiya ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                <ClipboardCheck className={`w-8 h-8 ${healthResult.metrics.inventarizatsiya ? 'text-green-500' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm md:text-base font-semibold text-foreground mb-1">
                  Inventarizatsiya
                </p>
                <p className="text-xs text-muted-foreground">
                  {healthResult.metrics.inventarizatsiya ? 'Muntazam bajarilmoqda' : 'Yaxshilash kerak'}
                </p>
              </div>
              {healthResult.metrics.inventarizatsiya ? (
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              ) : (
                <X className="w-6 h-6 text-red-500 flex-shrink-0" strokeWidth={3} />
              )}
            </div>

            {/* Ishonchli ma'lumotlar */}
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border-2 border-border">
              <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl ${healthResult.metrics.ishonchliMalumotlar ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                <BarChart3 className={`w-8 h-8 ${healthResult.metrics.ishonchliMalumotlar ? 'text-green-500' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm md:text-base font-semibold text-foreground mb-1">
                  Ishonchli ma'lumotlar
                </p>
                <p className="text-xs text-muted-foreground">
                  {healthResult.metrics.ishonchliMalumotlar ? 'Ma\'lumotlar aniq' : 'Nazorat qiling'}
                </p>
              </div>
              {healthResult.metrics.ishonchliMalumotlar ? (
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              ) : (
                <X className="w-6 h-6 text-red-500 flex-shrink-0" strokeWidth={3} />
              )}
            </div>

            {/* Sog'lom o'sish */}
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border-2 border-border">
              <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl ${healthResult.metrics.soglomOsish ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                <TrendingUp className={`w-8 h-8 ${healthResult.metrics.soglomOsish ? 'text-green-500' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm md:text-base font-semibold text-foreground mb-1">
                  Sog'lom o'sish
                </p>
                <p className="text-xs text-muted-foreground">
                  {healthResult.metrics.soglomOsish ? 'Barqaror rivojlanish' : 'O\'sishni oshiring'}
                </p>
              </div>
              {healthResult.metrics.soglomOsish ? (
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              ) : (
                <X className="w-6 h-6 text-red-500 flex-shrink-0" strokeWidth={3} />
              )}
            </div>

            {/* Mahsulot nazorati */}
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border-2 border-border">
              <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl ${healthResult.metrics.mahsulotNazorati ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                <Package className={`w-8 h-8 ${healthResult.metrics.mahsulotNazorati ? 'text-green-500' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm md:text-base font-semibold text-foreground mb-1">
                  Mahsulot nazorati
                </p>
                <p className="text-xs text-muted-foreground">
                  {healthResult.metrics.mahsulotNazorati ? 'Yaxshi nazorat' : 'Nazoratni kuchaytiring'}
                </p>
              </div>
              {healthResult.metrics.mahsulotNazorati ? (
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              ) : (
                <X className="w-6 h-6 text-red-500 flex-shrink-0" strokeWidth={3} />
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-2xl border-2 border-border">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${healthResult.passedMetrics > 2 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              {healthResult.passedMetrics > 2 ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <X className="w-6 h-6 text-red-500" strokeWidth={3} />
              )}
            </div>
            <p className="text-base md:text-lg font-bold text-foreground">
              {healthResult.passedMetrics}/4 ko'rsatkich me'yorda
            </p>
          </div>
        </Card>

        {/* Solution Section */}
        <div className="space-y-3">
          <h2 className="text-lg md:text-xl font-bold text-foreground text-center">
            {healthResult.status === "YAXSHILASH MUMKIN" ? (
              <>Balingizni oshirish uchun yechim - <span className="text-primary">biznesingizni yanada o'sish</span></>
            ) : (
              <>Balingizni oshirish uchun yechim - <span className="text-primary">balni balandrow qilish</span></>
            )}
          </h2>

          <Card className="bg-primary border-2 border-primary p-5 md:p-6 rounded-3xl relative overflow-hidden">
            <div className="flex flex-col items-center gap-4 text-center">
              {/* Rocket Emoji - Top on mobile */}
              <div className="text-6xl md:text-7xl">
                🚀
              </div>
              
              {/* Text Content */}
              <div className="space-y-3 max-w-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  BILLZ - Do'kon egalari uchun super kuch
                </h3>
                <p className="text-white/80 text-sm md:text-base">
                  {healthResult.status === "YAXSHILASH MUMKIN" ? (
                    <>
                      BILLZ bilan biznesingizni tezroq o'stirish, yangi filiallar ochish va 
                      samaradorlikni maksimal darajaga ko'tarish mumkin.
                    </>
                  ) : (
                    <>
                      Do'konlaringizni tartibga solish, boshqarish va samaradorligini oshirish uchun
                      to'liq tizim.
                    </>
                  )}
                </p>
                <Button
                  id="main-cta-button"
                  onClick={onContactClick}
                  size="lg"
                  className="w-full md:w-auto h-12 px-6 text-base rounded-2xl font-bold bg-white text-primary hover:bg-white/90"
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
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg p-4 z-50">
          <div className="max-w-3xl mx-auto">
            <Button
              size="lg"
              className="w-full h-14 text-lg"
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
