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
  return <div className="w-full min-h-screen bg-background">
      {/* Loss Section */}
      <section className="bg-background px-4 py-12 md:py-20 animate-fade-in">
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

      {/* Solution Section */}
      <section className="bg-background px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-6">
            
            
          </div>

          

          <div className="bg-gradient-to-br from-success to-emerald-500 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl border-4 border-primary/30 animate-scale-in" style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}>
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl font-bold animate-slide-up" style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}>
                BILLZ bilan bu yo'qotishlarning 60% qismini bartaraf etish mumkin.
              </p>

              <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.9s', animationFillMode: 'backwards' }}>
                <p className="text-xl md:text-2xl font-semibold">Taxminiy tejash:</p>
                <div className="text-5xl md:text-6xl font-bold transition-all duration-500">
                  +{formatNumber(animatedRecovered)}
                </div>
                <p className="text-2xl md:text-3xl font-bold">so'm / oy</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border-2 border-primary/40 hover:border-primary/70 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '1s', animationFillMode: 'backwards' }}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">✅</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg mb-1">Avtomatik inventarizatsiya</h3>
                      <p className="text-white/90 text-sm">Real vaqtda stok nazorati</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border-2 border-primary/40 hover:border-primary/70 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '1.1s', animationFillMode: 'backwards' }}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">✅</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg mb-1">Stok aniqligi 90%+</h3>
                      <p className="text-white/90 text-sm">Xatolarni minimallashtirish</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border-2 border-primary/40 hover:border-primary/70 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '1.2s', animationFillMode: 'backwards' }}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">✅</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg mb-1">Qayta sanash vaqti −40%</h3>
                      <p className="text-white/90 text-sm">Xodimlar vaqtini tejang</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border-2 border-primary/40 hover:border-primary/70 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '1.3s', animationFillMode: 'backwards' }}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">✅</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg mb-1">Out-of-stock −30%</h3>
                      <p className="text-white/90 text-sm">Mijozlarni yo'qotmang</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 animate-slide-up" style={{ animationDelay: '1.4s', animationFillMode: 'backwards' }}>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-16 text-xl rounded-2xl font-bold shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105" onClick={onContactClick}>
                  📞 BILLZ bilan bog'lanish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};