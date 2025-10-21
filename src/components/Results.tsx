import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalculatorData } from "./Calculator";
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
const formatNumber = (num: number): string => {
  return num.toLocaleString('uz-UZ');
};
const calculateLosses = (data: CalculatorData) => {
  const frequencyFactors: Record<string, number> = {
    hafta: 0.02,
    oy: 0.05,
    "3oy": 0.08,
    hech: 0.12
  };
  const errorFactors: Record<string, number> = {
    "tez-tez": 0.10,
    bazan: 0.05,
    kam: 0.02,
    yoq: 0.00
  };
  const errorFactor = errorFactors[data.theftLevel] || 0.05;
  const frequencyFactor = frequencyFactors[data.inventoryFrequency] || 0.05;
  const inventoryLoss = Math.round(data.skuCount * data.avgPrice * errorFactor);
  const timeLoss = Math.round(data.skuCount * 1000 * frequencyFactor);
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
    recoveredProfit
  };
};
export const Results = ({
  data,
  onContactClick
}: ResultsProps) => {
  const losses = calculateLosses(data);
  const animatedTotal = useCountUp(losses.totalMonthly);
  const animatedInventory = useCountUp(losses.inventoryLoss);
  const animatedTime = useCountUp(losses.timeLoss);
  const animatedCustomer = useCountUp(losses.customerLoss);
  const animatedYearly = useCountUp(losses.totalYearly);
  const animatedRecovered = useCountUp(losses.recoveredProfit);
  return <div className="w-full bg-background">
      {/* Loss Section */}
      <section className="bg-background px-4 py-8 md:py-20 animate-fade-in relative pb-16 md:pb-20">
        {/* Scroll indicator - visible on mobile */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 md:hidden animate-bounce z-10">
          <div className="flex flex-col items-center gap-0.5 text-muted-foreground">
            <span className="text-xs font-medium">Pastga suring</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
        <div className="max-w-4xl mx-auto space-y-10">
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

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-2 gap-px bg-border p-px">
                  <div className="bg-secondary px-6 py-4 font-bold text-foreground">
                    Yo'qotish turi
                  </div>
                  <div className="bg-secondary px-6 py-4 font-bold text-right text-foreground">
                    Miqdor
                  </div>
                </div>
                
                <div className="divide-y divide-border">
                  <div className="grid grid-cols-2 gap-px bg-border p-px animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
                    <div className="bg-white px-6 py-5">
                      <div className="font-semibold text-foreground">Yo'qolgan mahsulotlar</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Hisobda bor, amalda yo'q
                      </div>
                    </div>
                    <div className="bg-white px-6 py-5 text-right">
                      <div className="text-2xl font-bold text-destructive transition-all duration-500">
                        {formatNumber(animatedInventory)}
                      </div>
                      <div className="text-sm text-destructive font-medium">so'm</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-px bg-border p-px animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
                    <div className="bg-white px-6 py-5">
                      <div className="font-semibold text-foreground">Qayta hisob (vaqt yo'qotishi)</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Xodimlar vaqti
                      </div>
                    </div>
                    <div className="bg-white px-6 py-5 text-right">
                      <div className="text-2xl font-bold text-destructive transition-all duration-500">
                        {formatNumber(animatedTime)}
                      </div>
                      <div className="text-sm text-destructive font-medium">so'm</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-px bg-border p-px animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
                    <div className="bg-white px-6 py-5">
                      <div className="font-semibold text-foreground">Mijoz yo'qotilishi</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Out-of-stock holatlari
                      </div>
                    </div>
                    <div className="bg-white px-6 py-5 text-right">
                      <div className="text-2xl font-bold text-destructive transition-all duration-500">
                        {formatNumber(animatedCustomer)}
                      </div>
                      <div className="text-sm text-destructive font-medium">so'm</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary px-6 py-6 border-t-4 border-destructive animate-slide-up" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
              <div className="flex justify-between items-center">
                <p className="text-lg md:text-xl font-bold text-foreground">
                  Bu 12 oyda
                </p>
                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-bold text-destructive transition-all duration-500">
                    {formatNumber(animatedYearly)}
                  </div>
                  <div className="text-sm text-destructive font-medium">so'm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition Divider */}
      <div className="relative py-4 md:py-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-primary/20"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-6 py-2 text-sm font-medium text-primary border-2 border-primary/20 rounded-full">
            Yechim
          </span>
        </div>
      </div>

      {/* Solution Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-6">
            
            
          </div>

          

          <div className="relative rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden animate-scale-in" style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}>
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-success/90 to-emerald-500/90 backdrop-blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>
            <div className="absolute inset-0 border-2 border-white/20 rounded-3xl"></div>
            
            <div className="relative z-10 space-y-6">
              <p className="text-2xl md:text-3xl font-bold animate-slide-up drop-shadow-lg" style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}>
                BILLZ bilan bu yo'qotishlarning 60% qismini bartaraf etish mumkin.
              </p>

              <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.9s', animationFillMode: 'backwards' }}>
                <p className="text-xl md:text-2xl font-semibold drop-shadow-md">Taxminiy tejash:</p>
                <div className="text-6xl md:text-8xl font-black transition-all duration-500 bg-gradient-to-r from-cyan-200 via-white to-blue-200 bg-clip-text text-transparent" style={{ fontWeight: 900, textShadow: '0 0 60px rgba(255,255,255,0.8), 0 0 100px rgba(6,182,212,0.6)' }}>
                  +{formatNumber(animatedRecovered)}
                </div>
                <p className="text-2xl md:text-3xl font-bold drop-shadow-md">so'm / oy</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-6">
                <div className="relative rounded-2xl p-5 overflow-hidden border-2 border-white/30 backdrop-blur-md hover:border-white/50 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '1s', animationFillMode: 'backwards' }}>
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="relative flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">✅</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg mb-1 drop-shadow-md">Avtomatik inventarizatsiya</h3>
                      <p className="text-white/90 text-sm">Real vaqtda stok nazorati</p>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl p-5 overflow-hidden border-2 border-white/30 backdrop-blur-md hover:border-white/50 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '1.1s', animationFillMode: 'backwards' }}>
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="relative flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">✅</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg mb-1 drop-shadow-md">Stok aniqligi 90%+</h3>
                      <p className="text-white/90 text-sm">Xatolarni minimallashtirish</p>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl p-5 overflow-hidden border-2 border-white/30 backdrop-blur-md hover:border-white/50 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '1.2s', animationFillMode: 'backwards' }}>
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="relative flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">✅</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg mb-1 drop-shadow-md">Qayta sanash vaqti −40%</h3>
                      <p className="text-white/90 text-sm">Xodimlar vaqtini tejang</p>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl p-5 overflow-hidden border-2 border-white/30 backdrop-blur-md hover:border-white/50 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '1.3s', animationFillMode: 'backwards' }}>
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="relative flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">✅</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg mb-1 drop-shadow-md">Out-of-stock −30%</h3>
                      <p className="text-white/90 text-sm">Mijozlarni yo'qotmang</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 animate-slide-up" style={{ animationDelay: '1.4s', animationFillMode: 'backwards' }}>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-16 text-xl rounded-2xl font-bold shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105" onClick={onContactClick}>
                  BILLZ bilan bog'lanish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};