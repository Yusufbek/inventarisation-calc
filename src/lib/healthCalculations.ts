// Health Calculator Data Interface
export interface HealthCalculatorData {
  businessType: string;
  trackingMethod: string;
  dailySales: string;
  staffCount: string;
  hoursAtShop: number;
  stockCountFrequency: string;
  debtHandling: string;
  profitWithdrawal: string;
  trustLevel: string;
  deadStockAwareness: string;
  supplierDisputes: string;
  pricingStrategy: string;
  customerDataCollection: string;
  survivalBuffer: string;
  customerLoyalty: string;
  topPriority: string;
}

// Scoring configuration for each question
const SCORE_CONFIG = {
  trackingMethod: {
    notebook: 0,
    memory: 0,
    excel: 10,
    pos: 20,
  },
  staffCount: {
    alone: 5,
    "2-3": 5,
    "4+": 0,
  },
  stockCountFrequency: {
    weekly: 20,
    monthly: 10,
    yearly: 0,
    never: 0,
    "on-suspicion": 0,
  },
  debtHandling: {
    none: 0,
    notebook: 0,
    automated: 15,
  },
  profitWithdrawal: {
    "from-register": 0,
    fixed: 10,
    calculated: 10,
  },
  trustLevel: {
    full: 10,
    partial: 5,
    none: 0,
  },
  deadStockAwareness: {
    yes: 10,
    no: 0,
  },
  supplierDisputes: {
    never: 10,
    sometimes: 5,
    often: 0,
  },
  pricingStrategy: {
    copy: 0,
    fixed: 5,
    margin: 10,
  },
  customerDataCollection: {
    none: 0,
    notebook: 5,
    database: 15,
  },
  survivalBuffer: {
    no: 0,
    yes: 10,
  },
  customerLoyalty: {
    "mostly-new": 0,
    mixed: 5,
    "mostly-regular": 10,
  },
};

// Hours at shop scoring (special formula based on PDF)
const calculateHoursScore = (hours: number, staffCount: string): number => {
  // For solo owners, fewer hours is concerning
  // For 4+ staff, fewer hours is actually better (delegation)
  if (staffCount === "4+") {
    // Good delegation if under 8 hours
    return hours <= 8 ? 5 : 0;
  }
  // For small teams, high presence expected
  if (hours >= 8) return 5;
  if (hours >= 4) return 2;
  return 0;
};

// Maximum possible score
const MAX_SCORE = 135;

export interface HealthGrade {
  level: "critical" | "weak" | "average" | "healthy";
  label: string;
  color: string;
  emoji: string;
}

export const getHealthGrade = (score: number): HealthGrade => {
  if (score <= 39) {
    return { level: "critical", label: "Tanazzul", color: "hsl(0, 84%, 60%)", emoji: "🔴" };
  }
  if (score <= 59) {
    return { level: "weak", label: "Xavfli", color: "hsl(25, 95%, 53%)", emoji: "🟠" };
  }
  if (score <= 79) {
    return { level: "average", label: "O'rtacha", color: "hsl(48, 96%, 53%)", emoji: "🟡" };
  }
  return { level: "healthy", label: "Sog'lom", color: "hsl(142, 71%, 45%)", emoji: "🟢" };
};

export interface HealthCalculationResults {
  totalScore: number;
  healthScore: number; // 0-100 percentage
  grade: HealthGrade;
  potentialAnnualLoss: number;
  riskFactors: string[];
  prescriptions: string[];
}

// Daily sales value mapping
const DAILY_SALES_VALUES: Record<string, number> = {
  "under-1m": 500000,
  "1-2m": 1500000,
  "3-10m": 6500000,
  "10m+": 15000000,
};

// Calculate potential annual loss based on risk factors
const calculatePotentialLoss = (data: HealthCalculatorData): number => {
  const dailySalesValue = DAILY_SALES_VALUES[data.dailySales] || 1500000;
  let riskFactor = 0;

  // Tracking method risk
  if (data.trackingMethod === "notebook" || data.trackingMethod === "memory") {
    riskFactor += 0.12;
  }

  // Stock count risk
  if (data.stockCountFrequency === "never" || data.stockCountFrequency === "yearly") {
    riskFactor += 0.03;
  }

  // Trust risk
  if (data.trustLevel === "none") {
    riskFactor += 0.02;
  }

  // Debt handling risk
  if (data.debtHandling === "notebook" || data.debtHandling === "none") {
    riskFactor += 0.02;
  }

  // Profit withdrawal risk
  if (data.profitWithdrawal === "from-register") {
    riskFactor += 0.01;
  }

  const annualRevenue = dailySalesValue * 360;
  return Math.round(annualRevenue * riskFactor);
};

// Generate risk factors based on answers
const generateRiskFactors = (data: HealthCalculatorData): string[] => {
  const risks: string[] = [];

  if (data.trackingMethod === "memory") {
    risks.push("Savdo va pulni faqat xotirada saqlash katta xavf");
  }
  if (data.trackingMethod === "notebook") {
    risks.push("Daftar bilan kuzatish xatolarga olib kelishi mumkin");
  }
  if (data.stockCountFrequency === "never" || data.stockCountFrequency === "yearly") {
    risks.push("Kam inventarizatsiya = kam nazorat");
  }
  if (data.debtHandling === "none") {
    risks.push("Nasiya bermay turib, potentsial mijozlarni yo'qotish");
  }
  if (data.trustLevel === "none") {
    risks.push("Xodimlarga ishonch muammosi - boshqaruv zaif");
  }
  if (data.deadStockAwareness === "no") {
    risks.push("O'lik tovarlardan xabarsizlik - capital tied up");
  }
  if (data.supplierDisputes === "often") {
    risks.push("Ta'minotchilar bilan muammo - munosabatlar zaif");
  }
  if (data.customerDataCollection === "none") {
    risks.push("Mijoz ma'lumotlarini yig'maslik - qayta sotish imkoni past");
  }
  if (data.survivalBuffer === "no") {
    risks.push("Moliyaviy zaxira yo'q - stress davrida xavf");
  }

  return risks.slice(0, 5); // Return top 5 risks
};

// Generate prescriptions (top 3 recommendations)
const generatePrescriptions = (data: HealthCalculatorData): string[] => {
  const prescriptions: { priority: number; text: string }[] = [];

  // Tracking method
  if (data.trackingMethod === "memory" || data.trackingMethod === "notebook") {
    prescriptions.push({
      priority: 10,
      text: "POS tizimiga o'ting - barcha savdolar avtomatik hisoblanadi",
    });
  }

  // Stock count
  if (data.stockCountFrequency === "never" || data.stockCountFrequency === "yearly") {
    prescriptions.push({
      priority: 9,
      text: "Har oyda inventarizatsiya o'tkazing",
    });
  }

  // Trust issues
  if (data.trustLevel === "none" || data.trustLevel === "partial") {
    prescriptions.push({
      priority: 8,
      text: "Xodimlar uchun smena hisobotini joriy qiling",
    });
  }

  // Debt handling
  if (data.debtHandling === "notebook" || data.debtHandling === "none") {
    prescriptions.push({
      priority: 7,
      text: "Nasiyani avtomatik kuzatuvchi dastur o'rnating",
    });
  }

  // Dead stock
  if (data.deadStockAwareness === "no") {
    prescriptions.push({
      priority: 6,
      text: "O'lik tovarlarni aniqlash va chegirma bilan sotish",
    });
  }

  // Customer data
  if (data.customerDataCollection === "none") {
    prescriptions.push({
      priority: 5,
      text: "Mijozlar bazasini yig'ishni boshlang",
    });
  }

  // Profit withdrawal
  if (data.profitWithdrawal === "from-register") {
    prescriptions.push({
      priority: 4,
      text: "Oylik foyda hisobini alohida qiling",
    });
  }

  // Pricing
  if (data.pricingStrategy === "copy") {
    prescriptions.push({
      priority: 3,
      text: "O'z narx strategiyangizni ishlab chiqing",
    });
  }

  // Sort by priority and return top 3
  return prescriptions
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3)
    .map((p) => p.text);
};

export const calculateHealthScore = (data: HealthCalculatorData): HealthCalculationResults => {
  let totalScore = 0;

  // Q2: Tracking method
  totalScore += SCORE_CONFIG.trackingMethod[data.trackingMethod as keyof typeof SCORE_CONFIG.trackingMethod] || 0;

  // Q4: Staff count
  totalScore += SCORE_CONFIG.staffCount[data.staffCount as keyof typeof SCORE_CONFIG.staffCount] || 0;

  // Q5: Hours at shop (special calculation)
  totalScore += calculateHoursScore(data.hoursAtShop, data.staffCount);

  // Q6: Stock count frequency
  totalScore += SCORE_CONFIG.stockCountFrequency[data.stockCountFrequency as keyof typeof SCORE_CONFIG.stockCountFrequency] || 0;

  // Q7: Debt handling
  totalScore += SCORE_CONFIG.debtHandling[data.debtHandling as keyof typeof SCORE_CONFIG.debtHandling] || 0;

  // Q8: Profit withdrawal
  totalScore += SCORE_CONFIG.profitWithdrawal[data.profitWithdrawal as keyof typeof SCORE_CONFIG.profitWithdrawal] || 0;

  // Q9: Trust level
  totalScore += SCORE_CONFIG.trustLevel[data.trustLevel as keyof typeof SCORE_CONFIG.trustLevel] || 0;

  // Q10: Dead stock awareness
  totalScore += SCORE_CONFIG.deadStockAwareness[data.deadStockAwareness as keyof typeof SCORE_CONFIG.deadStockAwareness] || 0;

  // Q11: Supplier disputes
  totalScore += SCORE_CONFIG.supplierDisputes[data.supplierDisputes as keyof typeof SCORE_CONFIG.supplierDisputes] || 0;

  // Q12: Pricing strategy
  totalScore += SCORE_CONFIG.pricingStrategy[data.pricingStrategy as keyof typeof SCORE_CONFIG.pricingStrategy] || 0;

  // Q13: Customer data collection
  totalScore += SCORE_CONFIG.customerDataCollection[data.customerDataCollection as keyof typeof SCORE_CONFIG.customerDataCollection] || 0;

  // Q14: Survival buffer
  totalScore += SCORE_CONFIG.survivalBuffer[data.survivalBuffer as keyof typeof SCORE_CONFIG.survivalBuffer] || 0;

  // Q15: Customer loyalty
  totalScore += SCORE_CONFIG.customerLoyalty[data.customerLoyalty as keyof typeof SCORE_CONFIG.customerLoyalty] || 0;

  const healthScore = Math.round((totalScore / MAX_SCORE) * 100);
  const grade = getHealthGrade(healthScore);
  const potentialAnnualLoss = calculatePotentialLoss(data);
  const riskFactors = generateRiskFactors(data);
  const prescriptions = generatePrescriptions(data);

  return {
    totalScore,
    healthScore,
    grade,
    potentialAnnualLoss,
    riskFactors,
    prescriptions,
  };
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString("uz-UZ").replace(/,/g, " ");
};
