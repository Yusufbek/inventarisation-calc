import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BillzLogo } from "@/components/BillzLogo";
import { CalculatorData } from "./Calculator";
import { calculateLosses, formatNumber } from "@/lib/calculations";
import { CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

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
    explanation: "Inventarizatsiya qilishda amalda yo'q, lekin hisobda ko'rsatilgan mahsulotlar. Bu o'g'irlik, xato hisoblash yoki mahsulot buzilishi natijasida yuzaga keladi."
  },
  time: {
    title: "Xodimlar vaqti",
    explanation: "Xodimlarning inventarizatsiya qilish, qayta sanash va farqlarni tuzatish uchun sarflaydigan vaqti. Bu vaqtda ular sotish yoki boshqa muhim ishlar bilan shug'ullana olmaydilar."
  },
  customer: {
    title: "Out-of-stock (mijoz yo'qotilishi)",
    explanation: "Mahsulot tugab qolganda yoki noto'g'ri hisoblanganda mijozlar kerakli mahsulotni topa olmaydilar va boshqa do'konga ketishadi. Bu yo'qotilgan savdo imkoniyatidir."
  }
};

export const LiteResults = ({ data }: LiteResultsProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);

  const losses = calculateLosses(data);
  
  const animatedTotal = useCountUp(losses.totalMonthly);
  const animatedInventory = useCountUp(losses.inventoryLoss);
  const animatedTime = useCountUp(losses.timeLoss);
  const animatedCustomer = useCountUp(losses.customerLoss);
  const animatedYearly = useCountUp(losses.totalYearly);
  const animatedRecovered = useCountUp(losses.recoveredProfit);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const TELEGRAM_BOT_TOKEN = "8476842523:AAGdKVP478-q7WR8TJUj1jVocuLjnHYTUGg";
      const TELEGRAM_CHAT_ID = "-4875526331";

      const message = `🆕 Yangi lead (Lite Calculator)!\n\n👤 Ism: ${name}\n📱 Telefon: ${phone}\n💰 Oylik yo'qotish: ${formatNumber(losses.totalMonthly)} so'm\n\n📊 Hisoblash natijalari:\n🏪 Do'kon turi: ${data.storeType}\n📦 SKU soni: ${data.skuCount}\n🔒 O'g'irlik darajasi: ${data.theftLevel}\n💵 O'rtacha narx: ${formatNumber(data.avgPrice)} so'm`;

      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });

      setIsSubmitted(true);
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
              Inventarizatsiya qilinmagani, noto'g'ri hisob va stokdagi xatolar tufayli.
            </p>
          </div>

          {/* Short Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-2 bg-secondary text-sm md:text-base font-semibold">
              <div className="px-4 md:px-6 py-3 text-foreground">Yo'qotish turi</div>
              <div className="px-4 md:px-6 py-3 text-right text-foreground">Miqdor</div>
            </div>
            
            <div className="divide-y divide-border">
              <div className="grid grid-cols-2">
                <div className="px-4 md:px-6 py-4 text-sm md:text-base text-foreground">
                  <div className="flex items-center gap-2">
                    <span>Yo'qolgan mahsulotlar</span>
                    <button
                      onClick={() => setExpandedInfo(expandedInfo === 'inventory' ? null : 'inventory')}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  {expandedInfo === 'inventory' && (
                    <div className="mt-2 p-3 bg-secondary/50 rounded-lg text-xs text-muted-foreground animate-fade-in">
                      {lossExplanations.inventory.explanation}
                    </div>
                  )}
                </div>
                <div className="px-4 md:px-6 py-4 text-right font-bold text-destructive text-sm md:text-base transition-all duration-500">
                  {formatNumber(animatedInventory)} so'm
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="px-4 md:px-6 py-4 text-sm md:text-base text-foreground">
                  <div className="flex items-center gap-2">
                    <span>Xodimlar vaqti</span>
                    <button
                      onClick={() => setExpandedInfo(expandedInfo === 'time' ? null : 'time')}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  {expandedInfo === 'time' && (
                    <div className="mt-2 p-3 bg-secondary/50 rounded-lg text-xs text-muted-foreground animate-fade-in">
                      {lossExplanations.time.explanation}
                    </div>
                  )}
                </div>
                <div className="px-4 md:px-6 py-4 text-right font-bold text-destructive text-sm md:text-base transition-all duration-500">
                  {formatNumber(animatedTime)} so'm
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="px-4 md:px-6 py-4 text-sm md:text-base text-foreground">
                  <div className="flex items-center gap-2">
                    <span>Out-of-stock (mijoz yo'qotilishi)</span>
                    <button
                      onClick={() => setExpandedInfo(expandedInfo === 'customer' ? null : 'customer')}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  {expandedInfo === 'customer' && (
                    <div className="mt-2 p-3 bg-secondary/50 rounded-lg text-xs text-muted-foreground animate-fade-in">
                      {lossExplanations.customer.explanation}
                    </div>
                  )}
                </div>
                <div className="px-4 md:px-6 py-4 text-right font-bold text-destructive text-sm md:text-base transition-all duration-500">
                  {formatNumber(animatedCustomer)} so'm
                </div>
              </div>

              <div className="grid grid-cols-2 bg-secondary/50">
                <div className="px-4 md:px-6 py-4 font-bold text-foreground">
                  Yiliga jami:
                </div>
                <div className="px-4 md:px-6 py-4 text-right font-bold text-destructive text-lg transition-all duration-500">
                  {formatNumber(animatedYearly)} so'm
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
                BILLZ bilan bu yo'qotishlarning 60% qismini bartaraf etish mumkin.
              </p>

              <p className="text-center text-white/90">
                Avtomatik inventarizatsiya, real-vaqt stok nazorati va xatolarni kamaytirish orqali.
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
            {isSubmitted ? (
              <div className="text-center space-y-4 py-8">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-success" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Rahmat!
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Bizning ekspertimiz tez orada siz bilan bog'lanadi va do'koningizni tahlil qilishga yordam beradi.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    BILLZ siz izlayotgan yechim bo'lishi mumkin.
                  </h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Bizning chakana ekspertimiz siz bilan do'koningizni tahlil qilib chiqadi va aynan siz uchun qanday yechimlar eng foydali bo'lishini ko'rsatadi.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">
                      Ism
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ismingiz"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-14 text-lg rounded-2xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-medium">
                      Telefon raqam
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="h-14 text-lg rounded-2xl"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || phone.length < 13}
                    className="w-full h-14 text-lg rounded-2xl"
                  >
                    {isSubmitting ? "Yuborilmoqda..." : "BILLZ bilan bog'lanish"}
                  </Button>
                </form>

                <p className="text-sm text-center text-muted-foreground">
                  Qo'ng'iroq majburiy emas — faqat maslahat va tahlil uchun.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
