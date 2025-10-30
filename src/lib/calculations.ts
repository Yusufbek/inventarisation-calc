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
 * Format number with Uzbek locale (spaces as thousands separator)
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString("uz-UZ");
};

export interface StoreHealthData {
  score: number;
  status: "KRITIK" | "YOMON" | "YAXSHILASH MUMKIN";
  monthlyLoss: number;
  metrics: {
    name: string;
    passed: boolean;
  }[];
  passedCount: number;
}

/**
 * Calculate store health score based on calculator data
 * Score is deliberately kept low/moderate (0-70) to encourage improvement
 */
export const calculateStoreHealth = (data: CalculatorData): StoreHealthData => {
  const losses = calculateLosses(data);
  
  // Calculate individual metric scores (deliberately harsh to keep overall score low)
  const inventoryScore = data.inventoryFrequency === "hafta" ? 15 : 
                        data.inventoryFrequency === "oy" ? 10 : 
                        data.inventoryFrequency === "3oy" ? 5 : 0;
  
  const dataReliabilityScore = data.theftLevel === "yoq" ? 20 : 
                               data.theftLevel === "kam" ? 10 : 
                               data.theftLevel === "bazan" ? 5 : 0;
  
  const growthScore = data.skuCount < 300 ? 15 : 
                     data.skuCount < 1000 ? 10 : 
                     data.skuCount < 3000 ? 5 : 0;
  
  const productControlScore = data.avgPrice > 200000 ? 10 : 
                             data.avgPrice > 100000 ? 8 : 
                             data.avgPrice > 50000 ? 5 : 3;
  
  // Total score (max 60, ensuring never goes above 70)
  const rawScore = inventoryScore + dataReliabilityScore + growthScore + productControlScore;
  const score = Math.min(rawScore, 70);
  
  // Determine status based on score
  let status: "KRITIK" | "YOMON" | "YAXSHILASH MUMKIN";
  if (score < 50) {
    status = "KRITIK";
  } else if (score < 65) {
    status = "YOMON";
  } else {
    status = "YAXSHILASH MUMKIN";
  }
  
  // Metrics evaluation (deliberately harsh criteria)
  const metrics = [
    {
      name: "Inventarizatsiya",
      passed: data.inventoryFrequency === "hafta" || data.inventoryFrequency === "oy"
    },
    {
      name: "Ishonchli ma'lumotlar",
      passed: data.theftLevel === "yoq"
    },
    {
      name: "Sog'lom o'sish",
      passed: data.skuCount < 500 // Most stores fail this
    },
    {
      name: "Mahsulot nazorati",
      passed: data.avgPrice > 200000 // Most stores fail this
    }
  ];
  
  const passedCount = metrics.filter(m => m.passed).length;
  
  return {
    score,
    status,
    monthlyLoss: losses.totalMonthly,
    metrics,
    passedCount
  };
};
