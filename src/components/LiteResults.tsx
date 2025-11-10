import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BillzLogo } from "@/components/BillzLogo";
import { CalculatorData } from "./Calculator";
import { calculateLosses, formatNumber } from "@/lib/calculations";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
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

interface LiteResultsProps {
  data: CalculatorData;
  variant?: string;
}

const lossExplanations = {
  inventory: {
    title: "Yo'qolgan mahsulotlar",
    explanation:
      "Inventarizatsiya qilishda amalda yo'q, lekin hisobda ko'rsatilgan mahsulotlar. Bu o'g'irlik, xato hisoblash yoki mahsulot buzilishi natijasida yuzaga keladi.",
  },
  time: {
    title: "Xodimlar vaqti",
    explanation:
      "Xodimlarning inventarizatsiya qilish, qayta sanash va farqlarni tuzatish uchun sarflaydigan vaqti. Bu vaqtda ular sotish yoki boshqa muhim ishlar bilan shug'ullana olmaydilar.",
  },
  customer: {
    title: "Out-of-stock (mijoz yo'qotilishi)",
    explanation:
      "Mahsulot tugab qolganda yoki noto'g'ri hisoblanganda mijozlar kerakli mahsulotni topa olmaydilar va boshqa do'konga ketishadi. Bu yo'qotilgan savdo imkoniyatidir.",
  },
};

export const LiteResults = ({ data, variant = "lite" }: LiteResultsProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);
  const [showStickyButton, setShowStickyButton] = useState(true);

  const losses = calculateLosses(data);

  const scrollToSolution = () => {
    const solutionSection = document.getElementById("billz-solution");
    if (solutionSection) {
      solutionSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

  // Track CalculatorFinished when results are shown
  useEffect(() => {
    eventCustom("CalculatorFinished", {
      content_name: "Inventory loss calculator lite",
    });
  }, []);

  // Hide sticky button when CTA button is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyButton(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const ctaButton = document.getElementById("lite-cta-button");
    if (ctaButton) {
      observer.observe(ctaButton);
    }

    return () => {
      if (ctaButton) {
        observer.unobserve(ctaButton);
      }
    };
  }, []);

  // Format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    // Limit to 9 digits
    const limitedValue = value.slice(0, 9);

    // Format: (90) 123-45-67
    let formatted = "";
    if (limitedValue.length > 0) {
      formatted = "(" + limitedValue.slice(0, 2);
      if (limitedValue.length >= 2) {
        formatted += ") " + limitedValue.slice(2, 5);
      }
      if (limitedValue.length >= 5) {
        formatted += "-" + limitedValue.slice(5, 7);
      }
      if (limitedValue.length >= 7) {
        formatted += "-" + limitedValue.slice(7, 9);
      }
    }
    setPhone(formatted);
  };

  const isPhoneValid = () => {
    const digits = phone.replace(/\D/g, "");
    return digits.length === 9;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !isPhoneValid()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const TELEGRAM_BOT_TOKEN =
        "8476842523:AAGdKVP478-q7WR8TJUj1jVocuLjnHYTUGg";
      const TELEGRAM_CHAT_ID = "-1003046303969";

      const phoneDigits = phone.replace(/\D/g, "");
      const fullPhone = `+998${phoneDigits}`;
      
      const storeTypeLabel = data.storeType;

      const message = `⭐️ Yangi lead - Lite Calculator\nIsm: ${name}\nTelefon: ${fullPhone}\n-\nDo'kon turi: ${storeTypeLabel}\nOylik yo'qotish: ${formatNumber(losses.totalMonthly)} so'm`;

      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });

      if (response.ok) {
        // Track Lead event
        console.log("Lead event tracked", fullPhone, name);
        eventCustom("Lead", {
          content_name: "Inventory loss calculator lite",
          name,
          ph: sha256(fullPhone),
        });

        // Navigate to thank you page
        navigate(`/thank-you/inventarisation-calc/${variant}`);
      } else {
        console.error("Telegram API error:", await response.text());
      }
    } catch (error) {
      console.error("Failed to send lead to Telegram:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-background">
      {/* Loss Section */}
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
            <p className="text-muted-foreground max-w-xl mx-auto">
              Inventarizatsiya qilinmagani, noto'g'ri hisob va stokdagi xatolar
              tufayli.
            </p>
          </div>

          {/* Short Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-2 bg-secondary text-sm md:text-base font-semibold">
              <div className="px-4 md:px-6 py-3 text-foreground">
                Yo'qotish turi
              </div>
              <div className="px-4 md:px-6 py-3 text-right text-foreground">
                Miqdor
              </div>
            </div>

            <div className="divide-y divide-border">
              <div className="group">
                <div className="grid grid-cols-[1fr_auto] gap-2 md:gap-px bg-border p-px">
                  <div className="bg-white px-3 md:px-6 py-4 md:py-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground text-sm md:text-base text-left">
                        Yo'qolgan mahsulotlar
                      </span>
                      <button
                        onClick={() =>
                          setExpandedInfo(
                            expandedInfo === "inventory" ? null : "inventory"
                          )
                        }
                        className="text-muted-foreground hover:text-primary transition-colors p-1 hover:bg-secondary rounded-full flex-shrink-0"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {expandedInfo === "inventory" && (
                      <div className="bg-destructive/5 px-3 md:px-4 py-3 md:py-4 border-t border-destructive/20 animate-fade-in">
                        <p className="text-xs md:text-sm text-foreground leading-relaxed">
                          <span className="font-semibold text-destructive">
                            Nima?
                          </span>{" "}
                          Inventarizatsiya qilishda amalda yo'q, lekin hisobda
                          ko'rsatilgan mahsulotlar.
                        </p>
                        <p className="text-xs md:text-sm text-foreground leading-relaxed mt-2">
                          <span className="font-semibold text-destructive">
                            Sabab:
                          </span>{" "}
                          O'g'irlik, xato hisoblash, mahsulot buzilishi yoki
                          yo'qolishi.
                        </p>
                        <p className="text-xs md:text-sm text-foreground leading-relaxed mt-2">
                          <span className="font-semibold text-destructive">
                            Ta'sir:
                          </span>{" "}
                          Siz pulini to'lagan mahsulot yo'q — sof zarar.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="bg-white px-3 md:px-6 py-4 md:py-5 text-right flex flex-col justify-start">
                    <div className="text-base md:text-3xl font-bold text-destructive whitespace-nowrap">
                      {formatNumber(animatedInventory)}
                    </div>
                    <div className="text-xs md:text-sm text-destructive font-medium whitespace-nowrap">
                      so'm
                    </div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="grid grid-cols-[1fr_auto] gap-2 md:gap-px bg-border p-px">
                  <div className="bg-white px-3 md:px-6 py-4 md:py-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground text-sm md:text-base break-words">
                        Xodimlar vaqti
                      </span>
                      <button
                        onClick={() =>
                          setExpandedInfo(
                            expandedInfo === "time" ? null : "time"
                          )
                        }
                        className="text-muted-foreground hover:text-primary transition-colors p-1 hover:bg-secondary rounded-full flex-shrink-0"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {expandedInfo === "time" && (
                      <div className="bg-orange-50 px-3 md:px-4 py-3 md:py-4 border-t border-orange-200 animate-fade-in">
                        <p className="text-xs md:text-sm text-foreground leading-relaxed">
                          <span className="font-semibold text-orange-600">
                            Nima?
                          </span>{" "}
                          Xodimlarning inventarizatsiya, qayta sanash va
                          farqlarni tuzatish uchun sarflaydigan vaqti.
                        </p>
                        <p className="text-xs md:text-sm text-foreground leading-relaxed mt-2">
                          <span className="font-semibold text-orange-600">
                            Sabab:
                          </span>{" "}
                          Tizim yo'q, manual hisob, xatolarni qidirish.
                        </p>
                        <p className="text-xs md:text-sm text-foreground leading-relaxed mt-2">
                          <span className="font-semibold text-orange-600">
                            Ta'sir:
                          </span>{" "}
                          Bu vaqtda sotish, mijoz xizmati yoki boshqa muhim
                          ishlar bilan shug'ullanish mumkin emas.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="bg-white px-3 md:px-6 py-4 md:py-5 text-right flex flex-col justify-start">
                    <div className="text-base md:text-3xl font-bold text-destructive whitespace-nowrap">
                      {formatNumber(animatedTime)}
                    </div>
                    <div className="text-xs md:text-sm text-destructive font-medium whitespace-nowrap">
                      so'm
                    </div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="grid grid-cols-[1fr_auto] gap-2 md:gap-px bg-border p-px">
                  <div className="bg-white px-3 md:px-6 py-4 md:py-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground text-sm md:text-base text-left">
                        Out-of-stock
                      </span>
                      <button
                        onClick={() =>
                          setExpandedInfo(
                            expandedInfo === "customer" ? null : "customer"
                          )
                        }
                        className="text-muted-foreground hover:text-primary transition-colors p-1 hover:bg-secondary rounded-full flex-shrink-0"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {expandedInfo === "customer" && (
                      <div className="bg-blue-50 px-3 md:px-4 py-3 md:py-4 border-t border-blue-200 animate-fade-in">
                        <p className="text-xs md:text-sm text-foreground leading-relaxed">
                          <span className="font-semibold text-blue-600">
                            Nima?
                          </span>{" "}
                          Mahsulot tugab qolganda yoki noto'g'ri hisoblanganda
                          mijozlar kerakli mahsulotni topa olmaydi.
                        </p>
                        <p className="text-xs md:text-sm text-foreground leading-relaxed mt-2">
                          <span className="font-semibold text-blue-600">
                            Sabab:
                          </span>{" "}
                          Stok noto'g'ri, real vaqt nazorat yo'q, buyurtma
                          berish kechikadi.
                        </p>
                        <p className="text-xs md:text-sm text-foreground leading-relaxed mt-2">
                          <span className="font-semibold text-blue-600">
                            Ta'sir:
                          </span>{" "}
                          Mijoz boshqa do'konga ketadi — yo'qotilgan savdo va obro'.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="bg-white px-3 md:px-6 py-4 md:py-5 text-right flex flex-col justify-start">
                    <div className="text-base md:text-3xl font-bold text-destructive whitespace-nowrap">
                      {formatNumber(animatedCustomer)}
                    </div>
                    <div className="text-xs md:text-sm text-destructive font-medium whitespace-nowrap">
                      so'm
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/80 px-3 md:px-6 py-5 md:py-6 border-t-4 border-destructive">
                <div className="flex justify-between items-center gap-4">
                  <p className="text-base md:text-xl font-bold text-foreground">
                    Yiliga jami:
                  </p>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl md:text-4xl font-bold text-destructive whitespace-nowrap">
                      {formatNumber(animatedYearly)}
                    </div>
                    <div className="text-xs md:text-sm text-destructive font-medium">
                      so'm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Single Viewport */}
      <section id="billz-solution" className="bg-gradient-to-b from-background to-muted/30 px-4 py-6 min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto w-full">
          {/* Green Solution Block */}
          <div className="relative rounded-3xl p-5 md:p-6 text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-success/90 to-emerald-500/90"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>
            <div className="absolute inset-0 border-2 border-white/20 rounded-3xl"></div>

            <div className="relative z-10 space-y-2">
              <p className="text-lg md:text-xl font-bold text-center">
                BILLZ bilan bu yo'qotishlarning 60% qismini bartaraf etish
                mumkin.
              </p>

              <p className="text-center text-white/90 text-sm md:text-base">
                Avtomatik inventarizatsiya, real-vaqt stok nazorati va xatolarni
                kamaytirish orqali.
              </p>

              <div className="text-center space-y-1 py-2">
                <p className="text-base md:text-lg font-semibold">Taxminiy tejash:</p>
                <div className="text-4xl md:text-5xl font-black transition-all duration-500">
                  +{formatNumber(animatedRecovered)} so'm / oy
                </div>
              </div>
            </div>
          </div>

          {/* CTA Block */}
          <div className="bg-white rounded-3xl shadow-xl p-5 md:p-6 space-y-3 mt-4">
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                BILLZ siz izlayotgan yechim bo'lishi mumkin.
              </h3>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Bizning chakana ekspertimiz siz bilan do'koningizni tahlil
                qilib chiqadi va aynan siz uchun qanday yechimlar eng
                foydali bo'lishini ko'rsatadi.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm md:text-base font-semibold text-foreground"
                >
                  Ismingiz
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ismingizni kiriting"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 md:h-14 text-base md:text-lg rounded-2xl border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm md:text-base font-semibold text-foreground"
                >
                  Telefon raqam
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base md:text-lg font-medium text-muted-foreground">
                    +998
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(90) 123-45-67"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                    className="h-12 md:h-14 text-base md:text-lg rounded-2xl border-2 focus:border-primary transition-colors pl-20"
                  />
                </div>
                {phone && !isPhoneValid() && (
                  <p className="text-sm text-destructive">
                    9 ta raqam kiriting
                  </p>
                )}
              </div>

              <Button
                id="lite-cta-button"
                type="submit"
                disabled={isSubmitting || !name.trim() || !isPhoneValid()}
                className="w-full h-12 md:h-14 text-lg md:text-xl rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {isSubmitting
                  ? "Yuborilmoqda..."
                  : "BILLZ bilan bog'lanish"}
              </Button>
            </form>

            <p className="text-xs md:text-sm text-center text-muted-foreground">
              Qo'ng'iroq majburiy emas — faqat maslahat va tahlil uchun.
            </p>
          </div>
        </div>
      </section>
      {/* Sticky Bottom Panel */}
      {showStickyButton && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg p-4 z-50">
          <div className="max-w-3xl mx-auto">
            <Button
              size="lg"
              className="w-full h-14 text-lg"
              onClick={scrollToSolution}
            >
              Muammongizga yechim aniqlash
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
