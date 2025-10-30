import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BillzLogo } from "@/components/BillzLogo";
import { CalculatorData } from "./Calculator";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { calculateStoreHealth, formatNumber } from "@/lib/calculations";
import { eventCustom } from "@/lib/fpixel";

interface GamifiedResultsProps {
  data: CalculatorData;
  onContactClick: () => void;
}

export const GamifiedResults = ({ data, onContactClick }: GamifiedResultsProps) => {
  const healthData = calculateStoreHealth(data);

  useEffect(() => {
    eventCustom("CalculatorFinished", {
      content_name: "Gamified Inventory Calculator",
    });
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "KRITIK":
        return {
          label: "KRITIK",
          bgColor: "bg-amber-100",
          textColor: "text-amber-800",
          borderColor: "border-amber-400",
        };
      case "YOMON":
        return {
          label: "YOMON",
          bgColor: "bg-orange-100",
          textColor: "text-orange-800",
          borderColor: "border-orange-400",
        };
      case "YAXSHILASH MUMKIN":
        return {
          label: "YAXSHILASH MUMKIN",
          bgColor: "bg-emerald-100",
          textColor: "text-emerald-800",
          borderColor: "border-emerald-400",
        };
      default:
        return {
          label: status,
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          borderColor: "border-gray-400",
        };
    }
  };

  const statusConfig = getStatusConfig(healthData.status);

  return (
    <div className="w-full bg-background pb-20">
      {/* Logo */}
      <div className="px-4 pt-8 pb-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <BillzLogo className="h-10 md:h-12 text-foreground" />
        </div>
      </div>

      {/* Store Health Section */}
      <section className="px-4 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">
            DO'KON HOLATI
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="text-center md:text-left">
                  <div className="text-5xl md:text-6xl font-black text-foreground mb-2">
                    {healthData.score}
                    <span className="text-3xl md:text-4xl text-muted-foreground">/100</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <AlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-destructive" />
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div
                className={`inline-flex items-center justify-center px-6 py-3 rounded-2xl border-2 ${statusConfig.borderColor} ${statusConfig.bgColor}`}
              >
                <span className={`text-lg md:text-xl font-bold ${statusConfig.textColor}`}>
                  {statusConfig.label}
                </span>
              </div>
            </div>

            <p className="text-center text-base md:text-lg text-foreground leading-relaxed">
              Inventarizatsiya qilinmagani sababli siz oyiga{" "}
              <span className="font-bold text-destructive">
                {formatNumber(healthData.monthlyLoss)} so'm
              </span>{" "}
              yo'qotmoqdasiz.
            </p>
          </div>
        </div>
      </section>

      {/* Healthy Store Metrics Section */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">
            SOG'LOM DO'KON KO'RSATKICHLARI
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6">
              {healthData.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-border bg-secondary/30"
                >
                  <div className="flex-shrink-0">
                    {metric.passed ? (
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    ) : (
                      <XCircle className="w-8 h-8 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm md:text-base text-foreground">
                      {metric.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4 border-t-2 border-border">
              <p className="text-xl md:text-2xl font-bold text-foreground">
                {healthData.passedCount}/4 ko'rsatkich me'yorda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">
            YECHIM – scorni balandroq qilish
          </h2>

          <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl shadow-xl p-6 md:p-8 overflow-hidden border-2 border-primary/20">
            <div className="absolute top-4 right-4 text-6xl md:text-7xl opacity-20">
              🚀
            </div>

            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                BILLZ – do'konlar uchun tizimlashtirish
              </h3>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Do'konlaringizni tartibga solish, boshqarish va samaradorligini oshirish
                uchun to'liq tizim.
              </p>

              <div className="pt-4">
                <Button
                  onClick={onContactClick}
                  size="lg"
                  className="w-full md:w-auto text-lg px-8 py-6 rounded-2xl font-bold"
                >
                  SINAB KO'RISH
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
