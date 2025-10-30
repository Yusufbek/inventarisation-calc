import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BillzLogo } from "@/components/BillzLogo";
import { CalculatorData } from "./Calculator";
import { calculateLosses, formatNumber } from "@/lib/calculations";
import { Info, ChevronDown, ChevronUp } from "lucide-react";
import { eventCustom } from "@/lib/fpixel";
import { sha256 } from "js-sha256";

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

interface FormWallResultsProps {
  data: CalculatorData & { name: string; phone: string };
  variant: string;
}

export const FormWallResults = ({ data, variant }: FormWallResultsProps) => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const losses = calculateLosses(data);

  const animatedTotal = useCountUp(losses.totalMonthly);
  const animatedInventory = useCountUp(losses.inventoryLoss);
  const animatedTime = useCountUp(losses.timeLoss);
  const animatedCustomer = useCountUp(losses.customerLoss);
  const animatedYearly = useCountUp(losses.totalYearly);
  const animatedRecovered = useCountUp(losses.recoveredProfit);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    // Send to Telegram
    const sendToTelegram = async () => {
      try {
        const TELEGRAM_BOT_TOKEN = "8476842523:AAGdKVP478-q7WR8TJUj1jVocuLjnHYTUGg";
        const TELEGRAM_CHAT_ID = "-4875526331";

        const message = `⭐️ Yangi lead - FormWall Calculator\nIsm: ${data.name}\nTelefon: ${data.phone}\n-\nDo'kon turi: ${data.storeType}\nOylik yo'qotish: ${formatNumber(losses.totalMonthly)} so'm`;

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }),
        });

        // Track Lead event
        eventCustom("Lead", {
          content_name: "Inventory loss calculator formwall",
          name: data.name,
          ph: sha256(data.phone),
        });
      } catch (error) {
        console.error("Failed to send lead to Telegram:", error);
      }
    };

    sendToTelegram();

    eventCustom("CalculatorFinished", {
      content_name: "Inventory loss calculator formwall",
    });
  }, []);

  const scrollToSolution = () => {
    const solutionSection = document.getElementById("billz-solution");
    if (solutionSection) {
      solutionSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleWarmLead = async () => {
    try {
      const TELEGRAM_BOT_TOKEN = "8476842523:AAGdKVP478-q7WR8TJUj1jVocuLjnHYTUGg";
      const TELEGRAM_CHAT_ID = "-4875526331";

      const message = `⭐️⭐️ Warm Lead - FormWall Calculator\nIsm: ${data.name}\nTelefon: ${data.phone}\n-\nMijoz mutaxassis bilan bog'lanishni so'radi\nDo'kon turi: ${data.storeType}\nOylik yo'qotish: ${formatNumber(losses.totalMonthly)} so'm`;

      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });

      // Track warm lead event
      eventCustom("WarmLead", {
        content_name: "FormWall Calculator - Expert Request",
        name: data.name,
        ph: sha256(data.phone),
      });
    } catch (error) {
      console.error("Failed to send warm lead to Telegram:", error);
    }

    // Navigate to thank you page
    navigate("/thank-you/inventarisation-calc/formwall");
  };

  const lossDetails = [
    {
      id: "inventory",
      title: "Yo'qolgan mahsulotlar",
      amount: animatedInventory,
      explanation: "Inventarizatsiya qilishda amalda yo'q, lekin hisobda ko'rsatilgan mahsulotlar. Bu o'g'irlik, xato hisoblash yoki mahsulot buzilishi natijasida yuzaga keladi.",
    },
    {
      id: "time",
      title: "Xodimlar vaqti",
      amount: animatedTime,
      explanation: "Xodimlarning inventarizatsiya qilish, qayta sanash va farqlarni tuzatish uchun sarflaydigan vaqti. Bu vaqtda ular sotish yoki boshqa muhim ishlar bilan shug'ullana olmaydilar.",
    },
    {
      id: "customer",
      title: "Out-of-stock (mijoz yo'qotilishi)",
      amount: animatedCustomer,
      explanation: "Mahsulot tugab qolganda yoki noto'g'ri hisoblanganda mijozlar kerakli mahsulotni topa olmaydilar va boshqa do'konga ketishadi. Bu yo'qotilgan savdo imkoniyatidir.",
    },
  ];

  return (
    <div className="w-full bg-background pb-20">
      <section className="bg-background px-4 py-8 md:py-16 animate-fade-in">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex justify-center">
            <BillzLogo className="h-10 md:h-12 text-foreground" />
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-destructive">
              Siz har oy o'rtacha
            </h2>
            <div className="text-5xl md:text-6xl font-bold text-destructive transition-all duration-500">
              {formatNumber(animatedTotal)} so'm
            </div>
            <p className="text-xl md:text-2xl font-bold text-destructive">
              yo'qotyapsiz.
            </p>
          </div>

          {/* Collapsible Loss Details */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-secondary px-4 md:px-6 py-3">
              <h3 className="text-lg font-semibold text-foreground">
                Yo'qotishlar tafsiloti
              </h3>
            </div>

            <div className="divide-y divide-border">
              {lossDetails.map((loss) => (
                <div key={loss.id}>
                  <button
                    onClick={() =>
                      setExpandedSection(expandedSection === loss.id ? null : loss.id)
                    }
                    className="w-full px-3 md:px-6 py-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-start md:items-center gap-2 md:gap-4">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="font-semibold text-foreground text-sm md:text-base text-left">
                          {loss.title}
                        </span>
                        <Info className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        <div className="text-right">
                          <div className="text-base md:text-2xl font-bold text-destructive whitespace-nowrap">
                            {formatNumber(loss.amount)}
                          </div>
                          <div className="text-xs md:text-sm text-destructive whitespace-nowrap">
                            so'm
                          </div>
                        </div>
                        {expandedSection === loss.id ? (
                          <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </button>

                  {expandedSection === loss.id && (
                    <div className="px-4 md:px-6 pb-4 animate-fade-in">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-foreground leading-relaxed">
                          {loss.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="bg-secondary/80 px-3 md:px-6 py-5 md:py-6 border-t-4 border-destructive">
                <div className="flex justify-between items-center gap-4">
                  <p className="text-base md:text-xl font-bold text-foreground">
                    Yiliga jami:
                  </p>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl md:text-4xl font-bold text-destructive whitespace-nowrap">
                      {formatNumber(animatedYearly)}
                    </div>
                    <div className="text-xs md:text-sm text-destructive">so'm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Single Viewport */}
      <section id="billz-solution" className="bg-gradient-to-b from-background to-muted/30 px-4 py-8 md:py-12 min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto w-full space-y-6">
          <div className="relative rounded-3xl p-6 md:p-8 text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-success/90 to-emerald-500/90"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>

            <div className="relative z-10 space-y-4">
              <p className="text-xl md:text-2xl font-bold text-center">
                BILLZ bilan bu yo'qotishlarning 60% qismini bartaraf etish mumkin.
              </p>

              <div className="text-center space-y-2 py-3">
                <p className="text-lg font-semibold">Taxminiy tejash:</p>
                <div className="text-4xl md:text-5xl font-black">
                  +{formatNumber(animatedRecovered)} so'm / oy
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-6 md:p-8 space-y-4 border-2 border-primary/20">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Natijalaringizni muhokama qilaylik
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Bizning mutaxassis siz bilan bog'lanib, inventarizatsiyani qanday yaxshilash mumkinligini tushuntiradi.
              </p>
            </div>
            <Button
              size="lg"
              className="w-full h-12 md:h-14 text-base md:text-lg"
              onClick={handleWarmLead}
            >
              Mutaxassis bilan bog'lanish
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
