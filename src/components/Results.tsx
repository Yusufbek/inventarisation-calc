import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BillzLogo } from "@/components/BillzLogo";
import { CalculatorData } from "./Calculator";
import {
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Users,
  Package,
  LineChart,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { calculateLosses, formatNumber } from "@/lib/calculations";
import { eventCustom } from "@/lib/fpixel";
interface ResultsProps {
  data: CalculatorData;
  onContactClick: () => void;
}
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  return count;
};
// formatNumber is now imported from lib/calculations
export const Results = ({ data, onContactClick }: ResultsProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const losses = calculateLosses(data);
  const animatedTotal = useCountUp(losses.totalMonthly);
  const animatedInventory = useCountUp(losses.inventoryLoss);
  const animatedTime = useCountUp(losses.timeLoss);
  const animatedCustomer = useCountUp(losses.customerLoss);
  const animatedYearly = useCountUp(losses.totalYearly);
  const animatedRecovered = useCountUp(losses.recoveredProfit);

  // Track CalculatorFinished when results are shown
  useEffect(() => {
    eventCustom("CalculatorFinished", {
      content_name: "Inventory loss calculator",
    });
  }, []);

  const scrollToSolution = () => {
    const solutionSection = document.getElementById("billz-solution");
    if (solutionSection) {
      solutionSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full bg-background pb-20">
      {/* Loss Section */}
      <section className="bg-background px-4 py-8 md:py-20 animate-fade-in relative">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex justify-center">
            <BillzLogo className="h-10 md:h-12 text-foreground" />
          </div>
          <div className="text-center space-y-4 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-destructive leading-tight">
              Sizning do'koningiz har oy
            </h2>
            <div className="text-5xl md:text-6xl font-bold text-destructive animate-scale-in transition-all duration-500">
              {formatNumber(animatedTotal)} so'm
            </div>
            <p className="text-xl md:text-2xl font-bold text-destructive">
              yo'qotmoqda.
            </p>
          </div>

          <div
            className="bg-white rounded-3xl shadow-xl overflow-hidden animate-scale-in"
            style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
          >
            <div className="bg-secondary px-6 py-4">
              <h3 className="text-lg font-semibold text-foreground">
                Yo'qotishlar tafsiloti
              </h3>
            </div>

            <div className="divide-y divide-border">
              {/* Inventory Loss */}
              <div>
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === "inventory" ? null : "inventory")
                  }
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">
                      Yo'qolgan mahsulotlar
                    </span>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-destructive transition-all duration-500">
                        {formatNumber(animatedInventory)}
                      </div>
                      <div className="text-sm text-destructive font-medium">so'm</div>
                    </div>
                    {expandedSection === "inventory" ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {expandedSection === "inventory" && (
                  <div className="px-6 pb-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-foreground leading-relaxed">
                        Inventarizatsiya qilishda amalda yo'q, lekin hisobda ko'rsatilgan mahsulotlar.
                        Bu o'g'irlik, xato hisoblash yoki mahsulot buzilishi natijasida yuzaga keladi.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Time Loss */}
              <div>
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === "time" ? null : "time")
                  }
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">
                      Xodimlar vaqti
                    </span>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-destructive transition-all duration-500">
                        {formatNumber(animatedTime)}
                      </div>
                      <div className="text-sm text-destructive font-medium">so'm</div>
                    </div>
                    {expandedSection === "time" ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {expandedSection === "time" && (
                  <div className="px-6 pb-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-foreground leading-relaxed">
                        Xodimlarning inventarizatsiya qilish, qayta sanash va farqlarni tuzatish uchun
                        sarflaydigan vaqti. Bu vaqtda ular sotish yoki boshqa muhim ishlar bilan
                        shug'ullana olmaydilar.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Customer Loss */}
              <div>
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === "customer" ? null : "customer")
                  }
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">
                      Out-of-stock (mijoz yo'qotilishi)
                    </span>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-destructive transition-all duration-500">
                        {formatNumber(animatedCustomer)}
                      </div>
                      <div className="text-sm text-destructive font-medium">so'm</div>
                    </div>
                    {expandedSection === "customer" ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {expandedSection === "customer" && (
                  <div className="px-6 pb-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-foreground leading-relaxed">
                        Mahsulot tugab qolganda yoki noto'g'ri hisoblanganda mijozlar kerakli mahsulotni
                        topa olmaydilar va boshqa do'konga ketishadi. Bu yo'qotilgan savdo imkoniyatidir.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className="bg-secondary px-6 py-6 border-t-4 border-destructive animate-slide-up"
              style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}
            >
              <div className="flex justify-between items-center">
                <p className="text-lg md:text-xl font-bold text-foreground">
                  Bu 12 oyda
                </p>
                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-bold text-destructive transition-all duration-500">
                    {formatNumber(animatedYearly)}
                  </div>
                  <div className="text-sm text-destructive font-medium">
                    so'm
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eye-Catching Transition Section */}
      <section className="relative py-8 md:py-12 px-4 bg-gradient-to-b from-background via-muted/20 to-muted/30 overflow-hidden">
        {/* Animated background circles - more subtle and integrated */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-success/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/8 rounded-full blur-[80px] animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>

        <div className="relative max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <h3 className="text-4xl md:text-6xl font-bold text-foreground leading-tight animate-slide-up">
            Muammongizga <span className="text-primary">ideal yechim</span> bor
          </h3>

          <p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-up leading-relaxed"
            style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
          >
            BILLZ sizning yo'qotishlaringizni kamaytiradi va daromadingizni
            oshiradi
          </p>

          {/* Animated Arrow */}
          <div
            className="pt-2 animate-slide-up"
            style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
          >
            <div className="inline-flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm flex items-center justify-center animate-bounce shadow-lg border border-primary/10">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="billz-solution" className="bg-gradient-to-b from-background to-muted/30 px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-6"></div>

          <div
            className="relative rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden animate-scale-in"
            style={{ animationDelay: "0.7s", animationFillMode: "backwards" }}
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-success/90 to-emerald-500/90 backdrop-blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>
            <div className="absolute inset-0 border-2 border-white/20 rounded-3xl"></div>

            <div className="relative z-10 space-y-6">
              <p
                className="text-2xl md:text-3xl font-bold animate-slide-up drop-shadow-lg"
                style={{
                  animationDelay: "0.8s",
                  animationFillMode: "backwards",
                }}
              >
                BILLZ bilan bu yo'qotishlarning 60% qismini bartaraf etish
                mumkin.
              </p>

              <div
                className="space-y-3 animate-slide-up"
                style={{
                  animationDelay: "0.9s",
                  animationFillMode: "backwards",
                }}
              >
                <p className="text-xl md:text-2xl font-semibold drop-shadow-md">
                  Taxminiy tejash:
                </p>
                <div
                  className="text-6xl md:text-8xl font-black transition-all duration-500 bg-gradient-to-r from-cyan-200 via-white to-blue-200 bg-clip-text text-transparent"
                  style={{
                    fontWeight: 900,
                    textShadow:
                      "0 0 60px rgba(255,255,255,0.8), 0 0 100px rgba(6,182,212,0.6)",
                  }}
                >
                  +{formatNumber(animatedRecovered)}
                </div>
                <p className="text-2xl md:text-3xl font-bold drop-shadow-md">
                  so'm / oy
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-6">
                <div
                  className="relative rounded-2xl p-5 overflow-hidden border-2 border-white/30 backdrop-blur-md hover:border-white/50 transition-all duration-300 hover:scale-105 animate-slide-up"
                  style={{
                    animationDelay: "1s",
                    animationFillMode: "backwards",
                  }}
                >
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="relative flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">✅</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg mb-1 drop-shadow-md">
                        Avtomatik inventarizatsiya
                      </h3>
                      <p className="text-white/90 text-sm">
                        Real vaqtda stok nazorati
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="relative rounded-2xl p-5 overflow-hidden border-2 border-white/30 backdrop-blur-md hover:border-white/50 transition-all duration-300 hover:scale-105 animate-slide-up"
                  style={{
                    animationDelay: "1.1s",
                    animationFillMode: "backwards",
                  }}
                >
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="relative flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">✅</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg mb-1 drop-shadow-md">
                        Stok aniqligi 90%+
                      </h3>
                      <p className="text-white/90 text-sm">
                        Xatolarni minimallashtirish
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="relative rounded-2xl p-5 overflow-hidden border-2 border-white/30 backdrop-blur-md hover:border-white/50 transition-all duration-300 hover:scale-105 animate-slide-up"
                  style={{
                    animationDelay: "1.2s",
                    animationFillMode: "backwards",
                  }}
                >
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="relative flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">✅</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg mb-1 drop-shadow-md">
                        Qayta sanash vaqti −40%
                      </h3>
                      <p className="text-white/90 text-sm">
                        Xodimlar vaqtini tejang
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="relative rounded-2xl p-5 overflow-hidden border-2 border-white/30 backdrop-blur-md hover:border-white/50 transition-all duration-300 hover:scale-105 animate-slide-up"
                  style={{
                    animationDelay: "1.3s",
                    animationFillMode: "backwards",
                  }}
                >
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="relative flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">✅</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg mb-1 drop-shadow-md">
                        Out-of-stock −30%
                      </h3>
                      <p className="text-white/90 text-sm">
                        Mijozlarni yo'qotmang
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="pt-6 animate-slide-up"
                style={{
                  animationDelay: "1.4s",
                  animationFillMode: "backwards",
                }}
              >
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-16 text-xl rounded-2xl font-bold shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                  onClick={onContactClick}
                >
                  BILLZ bilan bog'lanish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Panel */}
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
    </div>
  );
};
