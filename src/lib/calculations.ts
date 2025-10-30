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
