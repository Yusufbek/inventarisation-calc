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

export const LiteResults = ({ data }: LiteResultsProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);

  const losses = calculateLosses(data);

  const animatedTotal = useCountUp(losses.totalMonthly);
  const animatedInventory = useCountUp(losses.inventoryLoss);
  const animatedTime = useCountUp(losses.timeLoss);
  const animatedCustomer = useCountUp(losses.customerLoss);
  const animatedYearly = useCountUp(losses.totalYearly);
  const animatedRecovered = useCountUp(losses.recoveredProfit);

  // Track CalculatorFinished when results are shown
  useEffect(() => {
    eventCustom("CalculatorFinished", {
      content_name: "Inventory loss calculator lite",
    });
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
      const TELEGRAM_CHAT_ID = "-4875526331";

      const phoneDigits = phone.replace(/\D/g, "");
      const fullPhone = `+998${phoneDigits}`;

      const message = `🆕 Yangi lead (Lite Calculator)!\n\n👤 Ism: ${name}\n📱 Telefon: ${fullPhone}\n💰 Oylik yo'qotish: ${formatNumber(
        losses.totalMonthly
      )} so'm\n\n📊 Hisoblash natijalari:\n🏪 Do'kon turi: ${
        data.storeType
      }\n📦 SKU soni: ${data.skuCount}\n🔒 O'g'irlik darajasi: ${
        data.theftLevel
      }\n💵 O'rtacha narx: ${formatNumber(data.avgPrice)} so'm`;

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
        navigate("/thank-you");
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
                <div className="grid grid-cols-2 gap-px bg-border p-px">
                  <div className="bg-white px-4 md:px-6 py-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground">
                        Yo'qolgan mahsulotlar
                      </span>
                      <button
                        onClick={() =>
                          setExpandedInfo(
                            expandedInfo === "inventory" ? null : "inventory"
                          )
                        }
                        className="text-muted-foreground hover:text-primary transition-colors p-1 hover:bg-secondary rounded-full"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {expandedInfo === "inventory" && (
                      <div className="p-4 bg-gradient-to-br from-destructive/5 to-destructive/10 rounded-xl border border-destructive/20 animate-fade-in">
                        <p className="text-sm text-foreground leading-relaxed">
                          <span className="font-semibold text-destructive">
                            Nima?
                          </span>{" "}
                          Inventarizatsiya qilishda amalda yo'q, lekin hisobda
                          ko'rsatilgan mahsulotlar.
                        </p>
                        <p className="text-sm text-foreground leading-relaxed mt-2">
                          <span className="font-semibold text-destructive">
                            Sabab:
                          </span>{" "}
                          O'g'irlik, xato hisoblash, mahsulot buzilishi yoki
                          yo'qolishi.
                        </p>
                        <p className="text-sm text-foreground leading-relaxed mt-2">
                          <span className="font-semibold text-destructive">
                            Ta'sir:
                          </span>{" "}
                          Siz pulini to'lagan mahsulot yo'q — sof zarar.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="bg-white px-4 md:px-6 py-5 text-right">
                    <div className="text-2xl md:text-3xl font-bold text-destructive transition-all duration-500">
                      {formatNumber(animatedInventory)}
                    </div>
                    <div className="text-sm text-destructive font-medium">
                      so'm
                    </div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="grid grid-cols-2 gap-px bg-border p-px">
                  <div className="bg-white px-4 md:px-6 py-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground">
                        Xodimlar vaqti
                      </span>
                      <button
                        onClick={() =>
                          setExpandedInfo(
                            expandedInfo === "time" ? null : "time"
                          )
                        }
                        className="text-muted-foreground hover:text-primary transition-colors p-1 hover:bg-secondary rounded-full"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {expandedInfo === "time" && (
                      <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 animate-fade-in">
                        <p className="text-sm text-foreground leading-relaxed">
                          <span className="font-semibold text-orange-600">
                            Nima?
                          </span>{" "}
                          Xodimlarning inventarizatsiya, qayta sanash va
                          farqlarni tuzatish uchun sarflaydigan vaqti.
                        </p>
                        <p className="text-sm text-foreground leading-relaxed mt-2">
                          <span className="font-semibold text-orange-600">
                            Sabab:
                          </span>{" "}
                          Tizim yo'q, manual hisob, xatolarni qidirish.
                        </p>
                        <p className="text-sm text-foreground leading-relaxed mt-2">
                          <span className="font-semibold text-orange-600">
                            Ta'sir:
                          </span>{" "}
                          Bu vaqtda sotish, mijoz xizmati yoki boshqa muhim
                          ishlar bilan shug'ullanish mumkin emas.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="bg-white px-4 md:px-6 py-5 text-right">
                    <div className="text-2xl md:text-3xl font-bold text-destructive transition-all duration-500">
                      {formatNumber(animatedTime)}
                    </div>
                    <div className="text-sm text-destructive font-medium">
                      so'm
                    </div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="grid grid-cols-2 gap-px bg-border p-px">
                  <div className="bg-white px-4 md:px-6 py-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground">
                        Out-of-stock (mijoz yo'qotilishi)
                      </span>
                      <button
                        onClick={() =>
                          setExpandedInfo(
                            expandedInfo === "customer" ? null : "customer"
                          )
                        }
                        className="text-muted-foreground hover:text-primary transition-colors p-1 hover:bg-secondary rounded-full"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    {expandedInfo === "customer" && (
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 animate-fade-in">
                        <p className="text-sm text-foreground leading-relaxed">
                          <span className="font-semibold text-blue-600">
                            Nima?
                          </span>{" "}
                          Mahsulot tugab qolganda yoki noto'g'ri hisoblanganda
                          mijozlar kerakli mahsulotni topa olmaydi.
                        </p>
                        <p className="text-sm text-foreground leading-relaxed mt-2">
                          <span className="font-semibold text-blue-600">
                            Sabab:
                          </span>{" "}
                          Stok noto'g'ri, real vaqt nazorat yo'q, buyurtma
                          berish kechikadi.
                        </p>
                        <p className="text-sm text-foreground leading-relaxed mt-2">
                          <span className="font-semibold text-blue-600">
                            Ta'sir:
                          </span>{" "}
                          Mijoz boshqa do'konga ketadi — yo'qotilgan savdo va
                          obro' zarari.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="bg-white px-4 md:px-6 py-5 text-right">
                    <div className="text-2xl md:text-3xl font-bold text-destructive transition-all duration-500">
                      {formatNumber(animatedCustomer)}
                    </div>
                    <div className="text-sm text-destructive font-medium">
                      so'm
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/80 px-4 md:px-6 py-6 border-t-4 border-destructive">
                <div className="flex justify-between items-center">
                  <p className="text-lg md:text-xl font-bold text-foreground">
                    Yiliga jami:
                  </p>
                  <div className="text-right">
                    <div className="text-3xl md:text-4xl font-bold text-destructive transition-all duration-500">
                      {formatNumber(animatedYearly)}
                    </div>
                    <div className="text-sm text-destructive font-medium">
                      so'm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Green Solution Block */}
          <div className="relative rounded-3xl p-6 md:p-10 text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-success/90 to-emerald-500/90"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>
            <div className="absolute inset-0 border-2 border-white/20 rounded-3xl"></div>

            <div className="relative z-10 space-y-6">
              <p className="text-xl md:text-2xl font-bold text-center">
                BILLZ bilan bu yo'qotishlarning 60% qismini bartaraf etish
                mumkin.
              </p>

              <p className="text-center text-white/90">
                Avtomatik inventarizatsiya, real-vaqt stok nazorati va xatolarni
                kamaytirish orqali.
              </p>

              <div className="text-center space-y-2 py-4">
                <p className="text-lg font-semibold">Taxminiy tejash:</p>
                <div className="text-4xl md:text-5xl font-black transition-all duration-500">
                  +{formatNumber(animatedRecovered)} so'm / oy
                </div>
              </div>
            </div>
          </div>

          {/* CTA Block */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 space-y-6">
            <div className="text-center space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                BILLZ siz izlayotgan yechim bo'lishi mumkin.
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Bizning chakana ekspertimiz siz bilan do'koningizni tahlil
                qilib chiqadi va aynan siz uchun qanday yechimlar eng
                foydali bo'lishini ko'rsatadi.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label
                  htmlFor="name"
                  className="text-base font-semibold text-foreground"
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
                  className="h-14 text-lg rounded-2xl border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="phone"
                  className="text-base font-semibold text-foreground"
                >
                  Telefon raqam
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-muted-foreground">
                    +998
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(90) 123-45-67"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                    className="h-14 text-lg rounded-2xl border-2 focus:border-primary transition-colors pl-20"
                  />
                </div>
                {phone && !isPhoneValid() && (
                  <p className="text-sm text-destructive">
                    9 ta raqam kiriting
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !name.trim() || !isPhoneValid()}
                className="w-full h-16 text-xl rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {isSubmitting
                  ? "Yuborilmoqda..."
                  : "BILLZ bilan bog'lanish"}
              </Button>
            </form>

            <p className="text-sm text-center text-muted-foreground">
              Qo'ng'iroq majburiy emas — faqat maslahat va tahlil uchun.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
