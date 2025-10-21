import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalculatorData } from "./Calculator";

interface ResultsProps {
  data: CalculatorData;
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
    hech: 0.12,
  };

  const errorFactors: Record<string, number> = {
    "tez-tez": 0.10,
    bazan: 0.05,
    kam: 0.02,
    yoq: 0.00,
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
    recoveredProfit,
  };
};

export const Results = ({ data }: ResultsProps) => {
  const losses = calculateLosses(data);
  
  const animatedTotal = useCountUp(losses.totalMonthly);
  const animatedInventory = useCountUp(losses.inventoryLoss);
  const animatedTime = useCountUp(losses.timeLoss);
  const animatedCustomer = useCountUp(losses.customerLoss);
  const animatedYearly = useCountUp(losses.totalYearly);
  const animatedRecovered = useCountUp(losses.recoveredProfit);

  return (
    <div className="w-full space-y-12 py-8">
      {/* Loss Section */}
      <section className="bg-white px-4 py-12 md:py-16 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-destructive">
            Sizning do'koningiz har oy{" "}
            <span className="text-4xl md:text-5xl block mt-2">
              {formatNumber(animatedTotal)} so'm
            </span>{" "}
            yo'qotmoqda.
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4 font-bold">Yo'qotish turi</th>
                  <th className="text-right py-4 px-4 font-bold">Miqdor</th>
                  <th className="text-left py-4 px-4 font-bold hidden md:table-cell">Izoh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-4 font-medium">Yo'qolgan mahsulotlar</td>
                  <td className="py-4 px-4 text-right text-destructive font-bold">
                    {formatNumber(animatedInventory)} so'm
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground hidden md:table-cell">
                    Hisobda bor, amalda yo'q.
                  </td>
                </tr>
                <tr className="hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-4 font-medium">Qayta hisob (vaqt yo'qotishi)</td>
                  <td className="py-4 px-4 text-right text-destructive font-bold">
                    {formatNumber(animatedTime)} so'm
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground hidden md:table-cell">
                    Xodimlar sarflagan soatlar.
                  </td>
                </tr>
                <tr className="hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-4 font-medium">Mijoz yo'qotilishi</td>
                  <td className="py-4 px-4 text-right text-destructive font-bold">
                    {formatNumber(animatedCustomer)} so'm
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground hidden md:table-cell">
                    Omborda yo'q mahsulot sabab sotuv yo'qotish.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t-2 border-border">
            <p className="text-xl md:text-2xl font-bold text-foreground">
              Bu 12 oyda{" "}
              <span className="text-destructive">
                {formatNumber(animatedYearly)} so'm
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-gradient-to-br from-success to-emerald-500 px-4 py-12 md:py-16 text-white animate-fade-in">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            BILLZ bilan bu yo'qotishlarning 60% qismini bartaraf etish mumkin.
          </h2>

          <div className="text-4xl md:text-5xl font-bold">
            Taxminiy tejash: +{formatNumber(animatedRecovered)} so'm / oy
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto pt-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✅</div>
              <div>
                <h3 className="font-bold text-lg">Avtomatik inventarizatsiya</h3>
                <p className="text-white/90 text-sm">Real vaqtda stok nazorati</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">✅</div>
              <div>
                <h3 className="font-bold text-lg">Stok aniqligi 90%+</h3>
                <p className="text-white/90 text-sm">Xatolarni minimallashtirish</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">✅</div>
              <div>
                <h3 className="font-bold text-lg">Qayta sanash vaqti −40%</h3>
                <p className="text-white/90 text-sm">Xodimlar vaqtini tejang</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">✅</div>
              <div>
                <h3 className="font-bold text-lg">Out-of-stock holatlari −30%</h3>
                <p className="text-white/90 text-sm">Mijozlarni yo'qotmang</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button
              size="lg"
              className="bg-white text-success hover:bg-white/90 h-14 px-12 text-lg rounded-2xl font-bold"
              onClick={() => window.open('tel:+998781136014', '_self')}
            >
              📞 BILLZ bilan bog'lanish
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
