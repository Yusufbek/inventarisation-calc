import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BillzLogo } from "@/components/BillzLogo";
import { CalculatorData } from "./Calculator";
import { ArrowRight, TrendingUp, CheckCircle2, Clock, Users, Package, LineChart, ChevronDown, ChevronUp, Info, Download } from "lucide-react";
import { calculateLosses, formatNumber } from "@/lib/calculations";
import jsPDF from "jspdf";
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
export const Results = ({
  data,
  onContactClick
}: ResultsProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showStickyButton, setShowStickyButton] = useState(true);
  const losses = calculateLosses(data);
  const animatedTotal = useCountUp(losses.totalMonthly);
  const animatedInventory = useCountUp(losses.inventoryLoss);
  const animatedTime = useCountUp(losses.timeLoss);
  const animatedCustomer = useCountUp(losses.customerLoss);
  const animatedYearly = useCountUp(losses.totalYearly);
  const animatedRecovered = useCountUp(losses.recoveredProfit);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, []);

  // Track CalculatorFinished when results are shown
  useEffect(() => {
    eventCustom("CalculatorFinished", {
      content_name: "Inventory loss calculator"
    });
  }, []);

  // Hide sticky button when main CTA is visible
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setShowStickyButton(!entry.isIntersecting);
    }, {
      threshold: 0.1
    });
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
  const scrollToSolution = () => {
    const solutionSection = document.getElementById("billz-solution");
    if (solutionSection) {
      solutionSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Title
    pdf.setFontSize(20);
    pdf.setTextColor(220, 38, 38);
    pdf.text("BILLZ - Do'kon Yo'qotishlari Hisoboti", pageWidth / 2, 20, { align: "center" });
    
    // Main loss
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Oylik yo'qotish:", 20, 40);
    pdf.setTextColor(220, 38, 38);
    pdf.setFontSize(24);
    pdf.text(`${formatNumber(losses.totalMonthly)} so'm`, 20, 50);
    
    // Breakdown
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Yo'qotishlar tafsiloti:", 20, 70);
    
    pdf.setFontSize(12);
    pdf.text(`Inventarizatsiya yo'qotishi: ${formatNumber(losses.inventoryLoss)} so'm`, 20, 85);
    pdf.text(`Vaqt yo'qotishi: ${formatNumber(losses.timeLoss)} so'm`, 20, 95);
    pdf.text(`Mijozlar yo'qotishi: ${formatNumber(losses.customerLoss)} so'm`, 20, 105);
    
    // Yearly
    pdf.setFontSize(14);
    pdf.text(`Yillik yo'qotish: ${formatNumber(losses.totalYearly)} so'm`, 20, 125);
    
    // Solution
    pdf.setFontSize(16);
    pdf.setTextColor(34, 197, 94);
    pdf.text("BILLZ bilan qaytib olingan foyda:", 20, 145);
    pdf.setFontSize(20);
    pdf.text(`${formatNumber(losses.recoveredProfit)} so'm/oy`, 20, 155);
    
    pdf.save("billz-hisobot.pdf");
  };
  return <div className="w-full bg-background">
      {/* Loss Section */}
      <section className="bg-background px-4 py-8 md:py-12 pb-4 md:pb-6 animate-fade-in relative">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center relative">
            <BillzLogo className="h-10 md:h-12 text-foreground" />
            <Button
              onClick={handleDownloadPDF}
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 opacity-20 hover:opacity-60 transition-opacity h-8 w-8"
              title="PDF yuklab olish"
            >
              <Download className="h-4 w-4" />
            </Button>
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

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-scale-in" style={{
          animationDelay: "0.2s",
          animationFillMode: "backwards"
        }}>
            <div className="bg-secondary px-6 py-4">
              <h3 className="text-lg font-semibold text-foreground">
                Yo'qotishlar tafsiloti
              </h3>
            </div>

            <div className="divide-y divide-border">
              {/* Inventory Loss */}
              <div>
                <button onClick={() => setExpandedSection(expandedSection === "inventory" ? null : "inventory")} className="w-full px-3 md:px-6 py-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start md:items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="font-semibold text-foreground text-sm md:text-base text-left">
                        Yo'qolgan mahsulotlar
                      </span>
                      <Info className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-base md:text-2xl font-bold text-destructive whitespace-nowrap">
                          {formatNumber(animatedInventory)}
                        </div>
                        <div className="text-xs md:text-sm text-destructive font-medium whitespace-nowrap">so'm</div>
                      </div>
                      {expandedSection === "inventory" ? <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" />}
                    </div>
                  </div>
                </button>

                {expandedSection === "inventory" && <div className="bg-muted/50 px-6 py-4 animate-fade-in border-t border-border/50">
                    <p className="text-sm text-foreground leading-relaxed">
                      Inventarizatsiya qilishda amalda yo'q, lekin hisobda ko'rsatilgan mahsulotlar.
                      Bu o'g'irlik, xato hisoblash yoki mahsulot buzilishi natijasida yuzaga keladi.
                    </p>
                  </div>}
              </div>

              {/* Time Loss */}
              <div>
                <button onClick={() => setExpandedSection(expandedSection === "time" ? null : "time")} className="w-full px-3 md:px-6 py-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start md:items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="font-semibold text-foreground text-sm md:text-base text-left">
                        Xodimlar vaqti
                      </span>
                      <Info className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-base md:text-2xl font-bold text-destructive whitespace-nowrap">
                          {formatNumber(animatedTime)}
                        </div>
                        <div className="text-xs md:text-sm text-destructive font-medium whitespace-nowrap">so'm</div>
                      </div>
                      {expandedSection === "time" ? <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" />}
                    </div>
                  </div>
                </button>

                {expandedSection === "time" && <div className="bg-muted/50 px-6 py-4 animate-fade-in border-t border-border/50">
                    <p className="text-sm text-foreground leading-relaxed">
                      Xodimlarning inventarizatsiya qilish, qayta sanash va farqlarni tuzatish uchun
                      sarflaydigan vaqti. Bu vaqtda ular sotish yoki boshqa muhim ishlar bilan
                      shug'ullana olmaydilar.
                    </p>
                  </div>}
              </div>

              {/* Customer Loss */}
              <div>
                <button onClick={() => setExpandedSection(expandedSection === "customer" ? null : "customer")} className="w-full px-3 md:px-6 py-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start md:items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="font-semibold text-foreground text-sm md:text-base text-left">
                        Out-of-stock
                      </span>
                      <Info className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-base md:text-2xl font-bold text-destructive whitespace-nowrap">
                          {formatNumber(animatedCustomer)}
                        </div>
                        <div className="text-xs md:text-sm text-destructive font-medium whitespace-nowrap">so'm</div>
                      </div>
                      {expandedSection === "customer" ? <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" />}
                    </div>
                  </div>
                </button>

                {expandedSection === "customer" && <div className="bg-muted/50 px-6 py-4 animate-fade-in border-t border-border/50">
                    <p className="text-sm text-foreground leading-relaxed">
                      Mahsulot tugab qolganda yoki noto'g'ri hisoblanganda mijozlar kerakli mahsulotni
                      topa olmaydilar va boshqa do'konga ketishadi. Bu yo'qotilgan savdo imkoniyatidir.
                    </p>
                  </div>}
              </div>
            </div>

            <div className="bg-secondary/80 px-3 md:px-6 py-5 md:py-6 border-t-4 border-destructive animate-slide-up" style={{
            animationDelay: "0.6s",
            animationFillMode: "backwards"
          }}>
              <div className="flex justify-between items-center gap-4">
                <p className="text-base md:text-xl font-bold text-foreground">
                  Bu 12 oyda
                </p>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl md:text-4xl font-bold text-destructive whitespace-nowrap">
                    {formatNumber(animatedYearly)}
                  </div>
                  <div className="text-xs md:text-sm text-destructive font-medium">
                    so'm
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eye-Catching Transition Section */}
      <section className="relative pt-4 md:pt-6 pb-0 px-4 bg-gradient-to-b from-background via-muted/20 to-muted/30 overflow-hidden">
        {/* Animated background circles - more subtle and integrated */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-success/5 rounded-full blur-[100px] animate-pulse" style={{
        animationDelay: "1s"
      }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/8 rounded-full blur-[80px] animate-pulse" style={{
        animationDelay: "0.5s"
      }}></div>

        <div className="relative max-w-3xl mx-auto text-center space-y-4 md:space-y-6 animate-fade-in">
          <h3 className="text-4xl md:text-6xl font-bold text-foreground leading-tight animate-slide-up">
            Muammongizga <span className="text-primary">ideal yechim</span> bor
          </h3>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{
          animationDelay: "0.1s",
          animationFillMode: "backwards"
        }}>
            BILLZ sizning yo'qotishlaringizni kamaytiradi va daromadingizni
            oshiradi
          </p>

          {/* Animated Arrow */}
          <div className="pt-2 animate-slide-up" style={{
          animationDelay: "0.2s",
          animationFillMode: "backwards"
        }}>
            <div className="inline-flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm flex items-center justify-center animate-bounce shadow-lg border border-primary/10">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Single Viewport */}
      <section id="billz-solution" className="bg-gradient-to-b from-muted/30 to-background px-4 pt-0 md:pt-0 pb-8">
        <div className="max-w-4xl mx-auto w-full">
          <div className="relative rounded-3xl p-6 md:p-8 text-white text-center overflow-hidden animate-scale-in" style={{
          animationDelay: "0.7s",
          animationFillMode: "backwards"
        }}>
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-success/90 to-emerald-500/90 backdrop-blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>
            <div className="absolute inset-0 border-2 border-white/20 rounded-3xl"></div>

            <div className="relative z-10 space-y-4">
              <p className="text-lg md:text-xl font-bold animate-slide-up drop-shadow-lg" style={{
              animationDelay: "0.8s",
              animationFillMode: "backwards"
            }}>
                BILLZ bilan bu yo'qotishlarning 60% qismini bartaraf etish
                mumkin.
              </p>

              <div className="space-y-2 py-2 animate-slide-up" style={{
              animationDelay: "0.9s",
              animationFillMode: "backwards"
            }}>
                <p className="text-base md:text-lg font-semibold drop-shadow-md">
                  Taxminiy tejash:
                </p>
                <div className="text-4xl md:text-6xl font-black transition-all duration-500 bg-gradient-to-r from-cyan-200 via-white to-blue-200 bg-clip-text text-transparent" style={{
                fontWeight: 900,
                textShadow: "0 0 60px rgba(255,255,255,0.8), 0 0 100px rgba(6,182,212,0.6)"
              }}>
                  +{formatNumber(animatedRecovered)}
                </div>
                <p className="text-lg md:text-xl font-bold drop-shadow-md">
                  so'm / oy
                </p>
              </div>

              <div className="pt-2 animate-slide-up" style={{
              animationDelay: "1s",
              animationFillMode: "backwards"
            }}>
                <Button id="main-cta-button" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 md:h-14 px-8 md:px-12 text-base md:text-lg rounded-2xl font-bold shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105" onClick={onContactClick}>
                  BILLZ bilan bog'lanish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Panel */}
      {showStickyButton && <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg p-4 z-50">
          <div className="max-w-3xl mx-auto">
            <Button size="lg" className="w-full h-14 text-lg" onClick={scrollToSolution}>
              Muammongizga yechim aniqlash
            </Button>
          </div>
        </div>}
    </div>;
};