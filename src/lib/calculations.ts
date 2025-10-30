import { CalculatorData } from "@/components/Calculator";

// Frequency factors for inventory check frequency
const FREQUENCY_FACTORS: Record<string, number> = {
  hafta: 0.02,    // Weekly
  oy: 0.05,       // Monthly
  "3oy": 0.08,    // Quarterly
  hech: 0.12,     // Never
  bilmayman: 0.05 // Don't know
};

// Error factors for theft/loss levels
const ERROR_FACTORS: Record<string, number> = {
  "tez-tez": 0.10, // Frequently (10%)
  bazan: 0.05,     // Sometimes (5%)
  kam: 0.02,       // Rarely (2%)
  yoq: 0.00        // Never (0%)
};

export interface CalculationResults {
  inventoryLoss: number;
  timeLoss: number;
  customerLoss: number;
  totalMonthly: number;
  totalYearly: number;
  recoveredProfit: number;
}

/**
 * Calculate financial losses based on calculator data
 * This is the single source of truth for all loss calculations
 */
export const calculateLosses = (data: CalculatorData): CalculationResults => {
  // Get factors or use defaults
  const errorFactor = ERROR_FACTORS[data.theftLevel] || 0.05;
  const frequencyFactor = FREQUENCY_FACTORS[data.inventoryFrequency] || 0.05;

  // Calculate individual loss components
  const inventoryLoss = Math.round(data.skuCount * data.avgPrice * errorFactor);
  const timeLoss = Math.round(data.skuCount * 1000 * frequencyFactor);
  const customerLoss = Math.round(inventoryLoss * 0.30);

  // Calculate totals
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

/**
 * Calculate store health score for gamified results
 */
export interface StoreHealthMetrics {
  score: number;
  status: "KRITIK" | "YOMON" | "YAXSHILASH MUMKIN";
  lossAmount: number;
  metrics: {
    inventarizatsiya: boolean;
    ishonchliMalumotlar: boolean;
    soglomOsish: boolean;
    mahsulotNazorati: boolean;
  };
  passedMetrics: number;
}

export const calculateStoreHealth = (data: CalculatorData): StoreHealthMetrics => {
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
  if (score < 50) {
    status = "KRITIK";
  } else if (score < 65) {
    status = "YOMON";
  } else {
    status = "YAXSHILASH MUMKIN";
  }

  const passedMetrics = Object.values(metrics).filter(Boolean).length;

  return {
    score,
    status,
    lossAmount,
    metrics,
    passedMetrics,
  };
};

/**
 * Format number with Uzbek locale (spaces as thousands separator)
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString("uz-UZ");
};
