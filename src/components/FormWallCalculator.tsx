import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BillzLogo } from "@/components/BillzLogo";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorData } from "./Calculator";
import { calculateLosses, formatNumber } from "@/lib/calculations";
interface FormWallCalculatorProps {
  onComplete: (data: CalculatorData & {
    name: string;
    phone: string;
  }) => void;
  variant: string;
}
interface Question {
  id: keyof CalculatorData | "revenue";
  question: string;
  answers: {
    value: any;
    label: string;
  }[];
  type?: "number" | "choice";
  hint?: string;
}
const storeTypes = [{
  id: "kiyim",
  label: "Kiyim",
  avgPrice: 300000
}, {
  id: "poyabzal",
  label: "Poyabzal",
  avgPrice: 280000
}, {
  id: "dorixona",
  label: "Dorixona",
  avgPrice: 60000
}, {
  id: "oziq-ovqat",
  label: "Oziq-ovqat",
  avgPrice: 28000
}, {
  id: "kosmetika",
  label: "Kosmetika",
  avgPrice: 95000
}, {
  id: "elektronika",
  label: "Elektronika",
  avgPrice: 1000000
}, {
  id: "qurilish",
  label: "Qurilish mollari",
  avgPrice: 180000
}, {
  id: "kafe",
  label: "Kafe/Restoran",
  avgPrice: 45000
}, {
  id: "boshqa",
  label: "Boshqa",
  avgPrice: 150000
}];
const questions: Question[] = [{
  id: "storeType",
  question: "Sizning do'koningiz qaysi turga kiradi?",
  answers: storeTypes.map(t => ({
    value: t.id,
    label: t.label
  }))
}, {
  id: "skuCount",
  question: "Do'koningizda taxminan nechta turdagi mahsulot sotiladi?",
  answers: [{
    value: 50,
    label: "100 tagacha"
  }, {
    value: 300,
    label: "101–500"
  }, {
    value: 750,
    label: "501–1 000"
  }, {
    value: 1500,
    label: "1 001–2 000"
  }, {
    value: 3500,
    label: "2 001–5 000"
  }, {
    value: 7000,
    label: "5 000+"
  }]
}, {
  id: "theftLevel",
  question: "So'nggi 3 oyda mahsulot yo'qolishi yoki noto'g'ri sanalishi holatlari bo'lganmi?",
  answers: [{
    value: "tez-tez",
    label: "Ha, tez-tez"
  }, {
    value: "bazan",
    label: "Ba'zan"
  }, {
    value: "kam",
    label: "Juda kam"
  }, {
    value: "yoq",
    label: "Yo'q"
  }]
}, {
  id: "avgPrice",
  question: "Sotayotgan mahsulotlaringizning o'rtacha narxi (so'm)?",
  type: "number",
  answers: []
}, {
  id: "revenue",
  question: "O'tgan oyda do'koningiz savdosi (taxminan) qancha bo'lgan?",
  hint: "Bu savol majburiy emas, lekin natija aniqroq bo'lishi uchun tavsiya qilamiz.",
  answers: [{
    value: 25000000,
    label: "< 50 mln so'm"
  }, {
    value: 75000000,
    label: "50–100 mln so'm"
  }, {
    value: 150000000,
    label: "100–200 mln so'm"
  }, {
    value: 350000000,
    label: "200–500 mln so'm"
  }, {
    value: 750000000,
    label: "500 mln+ so'm"
  }]
}];
export const FormWallCalculator = ({
  onComplete,
  variant
}: FormWallCalculatorProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [answers, setAnswers] = useState<Partial<CalculatorData & {
    revenue?: number;
  }>>({});
  const [numberInput, setNumberInput] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, []);
  const currentQuestion = questions[currentStep];
  const isNumberQuestion = currentQuestion?.type === "number";
  const handleAnswer = (value: any) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value
    };
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setNumberInput("");
    } else {
      setShowForm(true);
    }
  };
  const handleSkipRevenue = () => {
    setShowForm(true);
  };
  const handleNumberSubmit = () => {
    const value = parseInt(numberInput);
    if (value && value > 0) {
      handleAnswer(value);
    }
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Always keep +998 prefix
    if (!value.startsWith("+998")) {
      value = "+998";
    }

    // Remove all non-digits except the plus
    const cleaned = value.substring(4).replace(/\D/g, "");

    // Limit to 9 digits
    const limited = cleaned.substring(0, 9);
    setPhone("+998" + limited);
  };
  const isPhoneValid = () => {
    const digits = phone.substring(4);
    return digits.length === 9;
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !isPhoneValid()) {
      return;
    }
    const completeData: CalculatorData & {
      name: string;
      phone: string;
    } = {
      ...answers,
      inventoryFrequency: "oy",
      name: name.trim(),
      phone
    } as CalculatorData & {
      name: string;
      phone: string;
    };
    onComplete(completeData);
  };
  if (showForm) {
    const losses = calculateLosses(answers as CalculatorData);
    return <section className="relative w-full bg-background py-8 px-4 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-2xl w-full mx-auto animate-scale-in space-y-6">
          {/* Blurred Losses Container */}
          <div className="rounded-2xl border-2 border-destructive/30 bg-gradient-to-br from-destructive/10 to-destructive/5 backdrop-blur p-6 md:p-8 text-center shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-destructive mb-4">Sizning Yo'qotishlar:</h2>
            <div className="text-5xl md:text-6xl font-bold text-foreground select-none" style={{ filter: 'blur(5.5px)' }}>
              {formatNumber(losses.totalMonthly)} so'm
            </div>
          </div>

          <Card className="border-2 border-primary/20 shadow-2xl">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Natijalarni olish uchun
                </h2>
                <p className="text-muted-foreground">
                  Quyidagi ma'lumotlarni kiriting
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ism va Familiya</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="To'liq ismingizni kiriting" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon raqam</Label>
                  <p className="text-sm text-muted-foreground">
                    Biz sizga tasdiqlash kodi yuboramiz
                  </p>
                  <Input id="phone" type="tel" value={phone} onChange={handlePhoneChange} placeholder="+998901234567" required />
                  {phone.length > 4 && !isPhoneValid() && <p className="text-sm text-destructive">
                      Telefon raqam 9 ta raqamdan iborat bo'lishi kerak
                    </p>}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={!name.trim() || !isPhoneValid()}>
                  Natijalarni ko'rish
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>;
  }
  return <section className="w-full bg-background py-12 px-4 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-center">
          <BillzLogo className="h-10 md:h-12 text-foreground" />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Savol {currentStep + 1} / {questions.length}
            </span>
            <div className="flex gap-2">
              {questions.map((_, idx) => <div key={idx} className={`h-2 w-12 rounded-full transition-colors ${idx <= currentStep ? "bg-primary" : "bg-border"}`} />)}
            </div>
          </div>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 md:p-8 space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
                {currentQuestion.question}
              </h2>

              {currentQuestion.hint && <p className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-xl flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <span>{currentQuestion.hint}</span>
                </p>}

              {isNumberQuestion ? <div className="space-y-4">
                  <Input type="text" value={numberInput} onChange={e => {
                const value = e.target.value.replace(/\s/g, '');
                const numValue = parseInt(value) || "";
                setNumberInput(numValue.toString());
              }} placeholder="Raqamni kiriting" className="text-lg h-14" autoFocus onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNumberSubmit();
                }
              }} />
                  <Button onClick={handleNumberSubmit} size="lg" className="w-full" disabled={!numberInput || parseInt(numberInput) <= 0}>
                    Davom etish
                  </Button>
                </div> : currentQuestion.id === "revenue" ? <div className="space-y-4 pb-28">
                  <div className="grid gap-3">
                    {currentQuestion.answers.map(answer => <button key={answer.value} onClick={e => {
                  e.currentTarget.blur();
                  handleAnswer(answer.value);
                }} onTouchEnd={e => {
                  e.currentTarget.blur();
                }} className="p-4 rounded-2xl border-2 border-border text-left transition-all active:scale-[0.98] font-medium text-lg focus:outline-none">
                      {answer.label}
                    </button>)}
                  </div>
                  
                  {/* Sticky footer with skip option */}
                  <div className="fixed inset-x-0 bottom-0 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border z-50">
                    <div className="max-w-2xl mx-auto px-4 py-3">
                      <Button onClick={handleSkipRevenue} variant="ghost" className="w-full h-12 text-base rounded-xl">
                        O'tkazib yuborish
                      </Button>
                    </div>
                  </div>
                </div> : <div className="grid gap-3">
                  {currentQuestion.answers.map(answer => <button key={answer.value} onClick={e => {
                e.currentTarget.blur();
                handleAnswer(answer.value);
              }} onTouchEnd={e => {
                e.currentTarget.blur();
              }} className="p-4 rounded-2xl border-2 border-border text-left transition-all active:scale-[0.98] font-medium text-lg focus:outline-none">
                      {answer.label}
                    </button>)}
                </div>}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};