import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalculatorData } from "./Calculator";
import { AlertTriangle, ClipboardCheck, BarChart3, ScanBarcode, Camera, X, CheckCircle2 } from "lucide-react";
import rocketImage from "@/assets/rocket-billz.png";

interface StoreHealthResult {
  score: number;
  status: "KRITIK" | "YOMON" | "YAXSHILASH MUMKIN";
  statusColor: string;
  lossAmount: number;
  metrics: {
    inventarizatsiya: boolean;
    ishonchliMalumotlar: boolean;
    soglomOsish: boolean;
    mahsulotNazorati: boolean;
  };
  passedMetrics: number;
}

interface GamifiedResultsProps {
  data: CalculatorData;
  onContactClick: () => void;
}

// Calculate store health score and metrics
const calculateStoreHealth = (data: CalculatorData): StoreHealthResult => {
  let score = 0;
  const metrics = {
    inventarizatsiya: false,
    ishonchliMalumotlar: false,
    soglomOsish: false,
    mahsulotNazorati: false,
  };

  // Inventarizatsiya check (good if weekly or monthly)
  if (data.inventoryFrequency === "hafta" || data.inventoryFrequency === "oy") {
    metrics.inventarizatsiya = true;
    score += 25;
  } else if (data.inventoryFrequency === "3oy") {
    score += 10;
  }

  // Ishonchli ma'lumotlar (reliable data - based on theft level)
  if (data.theftLevel === "yoq") {
    metrics.ishonchliMalumotlar = true;
    score += 20;
  } else if (data.theftLevel === "kam") {
    score += 10;
  }

  // Sog'lom o'sish (healthy growth - based on SKU count and frequency)
  if (data.skuCount > 500 && (data.inventoryFrequency === "hafta" || data.inventoryFrequency === "oy")) {
    metrics.soglomOsish = true;
    score += 20;
  } else if (data.skuCount > 200) {
    score += 8;
  }

  // Mahsulot nazorati (product control - based on theft and inventory)
  if (data.theftLevel === "yoq" && data.inventoryFrequency === "hafta") {
    metrics.mahsulotNazorati = true;
    score += 20;
  } else if (data.theftLevel === "kam" && data.inventoryFrequency === "oy") {
    score += 8;
  }

  // Ensure score is always low to moderate (0-70)
  score = Math.min(score, 70);

  // Calculate loss amount (simplified)
  const baseLoss = data.skuCount * data.avgPrice * 0.02;
  const lossAmount = Math.round(baseLoss / 1000000); // Convert to millions

  // Determine status
  let status: "KRITIK" | "YOMON" | "YAXSHILASH MUMKIN";
  let statusColor: string;

  if (score < 50) {
    status = "KRITIK";
    statusColor = "bg-yellow-500";
  } else if (score < 65) {
    status = "YOMON";
    statusColor = "bg-orange-500";
  } else {
    status = "YAXSHILASH MUMKIN";
    statusColor = "bg-green-500";
  }

  const passedMetrics = Object.values(metrics).filter(Boolean).length;

  return {
    score,
    status,
    statusColor,
    lossAmount,
    metrics,
    passedMetrics,
  };
};

export const GamifiedResults = ({ data, onContactClick }: GamifiedResultsProps) => {
  const healthResult = calculateStoreHealth(data);

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Store Health Section */}
        <Card className="bg-card border-2 border-border p-6 md:p-8 rounded-3xl">
          <h2 className="text-sm md:text-base font-bold text-muted-foreground tracking-wider mb-6">
            DO'KON HOLATI
          </h2>

          <div className="flex items-start justify-between gap-6 mb-6">
            {/* Score */}
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-6xl md:text-8xl font-black text-foreground">
                  {healthResult.score}
                </span>
                <span className="text-3xl md:text-4xl font-bold text-muted-foreground">
                  /100
                </span>
              </div>

              {/* Status Badge */}
              <div className="inline-block mb-4">
                <div
                  className={`${healthResult.statusColor} text-white px-6 py-2 rounded-full font-bold text-sm md:text-base`}
                >
                  {healthResult.status}
                </div>
              </div>
            </div>

            {/* Warning Icon */}
            <div className="flex-shrink-0">
              <div className="bg-yellow-500 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl">
                <AlertTriangle className="w-12 h-12 md:w-14 md:h-14 text-gray-900" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Loss Text */}
          <p className="text-yellow-600 dark:text-yellow-500 text-base md:text-lg font-semibold">
            Inventarizatsiya qilinmagani sababli siz oyiga {healthResult.lossAmount} mln so'm
            yo'qotmoqdasiz.
          </p>
        </Card>

        {/* Healthy Store Metrics Section */}
        <Card className="bg-card border-2 border-border p-6 md:p-8 rounded-3xl">
          <h2 className="text-sm md:text-base font-bold text-muted-foreground tracking-wider mb-6">
            SOG'LOM DO'KON KO'RSATKICHLARI
          </h2>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Inventarizatsiya */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="text-muted-foreground">
                <ClipboardCheck className="w-10 h-10 md:w-12 md:h-12" />
              </div>
              <p className="text-xs md:text-sm font-semibold text-foreground">
                Inventarizatsiya
              </p>
              {healthResult.metrics.inventarizatsiya ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <X className="w-8 h-8 text-red-500" strokeWidth={3} />
              )}
            </div>

            {/* Ishonchli ma'lumotlar */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="text-muted-foreground">
                <BarChart3 className="w-10 h-10 md:w-12 md:h-12" />
              </div>
              <p className="text-xs md:text-sm font-semibold text-foreground">
                Ishonchli ma'lumotlar
              </p>
              {healthResult.metrics.ishonchliMalumotlar ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <X className="w-8 h-8 text-red-500" strokeWidth={3} />
              )}
            </div>

            {/* Sog'lom o'sish */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="text-muted-foreground">
                <ScanBarcode className="w-10 h-10 md:w-12 md:h-12" />
              </div>
              <p className="text-xs md:text-sm font-semibold text-foreground">
                Sog'lom o'sish
              </p>
              {healthResult.metrics.soglomOsish ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <X className="w-8 h-8 text-red-500" strokeWidth={3} />
              )}
            </div>

            {/* Mahsulot nazorati */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="text-muted-foreground">
                <Camera className="w-10 h-10 md:w-12 md:h-12" />
              </div>
              <p className="text-xs md:text-sm font-semibold text-foreground">
                Mahsulot nazorati
              </p>
              {healthResult.metrics.mahsulotNazorati ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <X className="w-8 h-8 text-red-500" strokeWidth={3} />
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="flex items-center justify-center gap-2 p-4 bg-muted rounded-2xl">
            <X className="w-6 h-6 text-red-500" strokeWidth={3} />
            <p className="text-sm md:text-base font-semibold text-foreground">
              {healthResult.passedMetrics}/4 ko'rsatkich me'yorda
            </p>
          </div>
        </Card>

        {/* Solution Section */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            YECHIM - <span className="text-yellow-600 dark:text-yellow-500">scoreni balandroq qilish</span>
          </h2>

          <Card className="bg-card border-2 border-border p-6 md:p-8 rounded-3xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Text Content */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  BILLZ - do'konlar uchun tizimlashtirish
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Do'konlaringizni tartibga solish, boshqarish va samaradorligini oshirish uchun
                  to'liq tizim.
                </p>
                <Button
                  onClick={onContactClick}
                  size="lg"
                  className="w-full md:w-auto h-14 px-8 text-lg rounded-2xl font-bold"
                >
                  SINAB KO'RISH
                </Button>
              </div>

              {/* Rocket Image */}
              <div className="flex-shrink-0">
                <img
                  src={rocketImage}
                  alt="BILLZ Rocket"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
