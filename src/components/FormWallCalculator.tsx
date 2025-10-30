import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BillzLogo } from "@/components/BillzLogo";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorData } from "./Calculator";

interface FormWallCalculatorProps {
  onComplete: (data: CalculatorData & { name: string; phone: string }) => void;
  variant: string;
}

interface Question {
  id: keyof CalculatorData;
  question: string;
  answers: { value: any; label: string }[];
  type?: "number" | "choice";
}

const questions: Question[] = [
  {
    id: "storeType",
    question: "Do'koningiz qanday?",
    answers: [
      { value: "kiyim", label: "Kiyim" },
      { value: "oziq-ovqat", label: "Oziq-ovqat" },
      { value: "elektronika", label: "Elektronika" },
      { value: "boshqa", label: "Boshqa" },
    ],
  },
  {
    id: "skuCount",
    question: "Qancha xil mahsulot (SKU) bor?",
    type: "number",
    answers: [],
  },
  {
    id: "avgPrice",
    question: "O'rtacha mahsulot narxi qancha? (so'm)",
    type: "number",
    answers: [],
  },
];

export const FormWallCalculator = ({ onComplete, variant }: FormWallCalculatorProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [answers, setAnswers] = useState<Partial<CalculatorData>>({});
  const [numberInput, setNumberInput] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("+998");

  const currentQuestion = questions[currentStep];
  const isNumberQuestion = currentQuestion?.type === "number";

  const handleAnswer = (value: any) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setNumberInput("");
    } else {
      // Set defaults for missing fields
      const completeData: CalculatorData = {
        ...newAnswers,
        theftLevel: "bazan",
        inventoryFrequency: "oy",
      } as CalculatorData;
      
      setShowForm(true);
    }
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
    
    if (!name.trim() || !surname.trim() || !isPhoneValid()) {
      return;
    }

    const completeData: CalculatorData & { name: string; phone: string } = {
      ...answers,
      theftLevel: "bazan",
      inventoryFrequency: "oy",
      name: `${name} ${surname}`,
      phone,
    } as CalculatorData & { name: string; phone: string };

    onComplete(completeData);
  };

  if (showForm) {
    return (
      <section className="w-full bg-background py-12 px-4 min-h-screen">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex justify-center">
            <BillzLogo className="h-10 md:h-12 text-foreground" />
          </div>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Natijalarni olish uchun
                </h2>
                <p className="text-muted-foreground">
                  Quyidagi ma'lumotlarni kiriting — sizga tasdiqlash kodi yuboriladi
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ism</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ismingizni kiriting"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surname">Familiya</Label>
                  <Input
                    id="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Familiyangizni kiriting"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon raqam</Label>
                  <p className="text-sm text-muted-foreground">
                    Biz sizga tasdiqlash kodi yuboramiz
                  </p>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+998901234567"
                    required
                  />
                  {phone.length > 4 && !isPhoneValid() && (
                    <p className="text-sm text-destructive">
                      Telefon raqam 9 ta raqamdan iborat bo'lishi kerak
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!name.trim() || !surname.trim() || !isPhoneValid()}
                >
                  Natijalarni ko'rish
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-background py-12 px-4 min-h-screen">
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
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-12 rounded-full transition-colors ${
                    idx <= currentStep ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 md:p-8 space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
                {currentQuestion.question}
              </h2>

              {isNumberQuestion ? (
                <div className="space-y-4">
                  <Input
                    type="number"
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}
                    placeholder="Raqamni kiriting"
                    className="text-lg h-14"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleNumberSubmit();
                      }
                    }}
                  />
                  <Button
                    onClick={handleNumberSubmit}
                    size="lg"
                    className="w-full"
                    disabled={!numberInput || parseInt(numberInput) <= 0}
                  >
                    Davom etish
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3">
                  {currentQuestion.answers.map((answer) => (
                    <Button
                      key={answer.value}
                      onClick={() => handleAnswer(answer.value)}
                      variant="outline"
                      size="lg"
                      className="h-auto py-4 text-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {answer.label}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
