import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ThankYouProps {
  onBackToHome: () => void;
}

export const ThankYou = ({ onBackToHome }: ThankYouProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-scale-in">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-success" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Rahmat!
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-3">
          Sizning so'rovingiz muvaffaqiyatli qabul qilindi.
        </p>
        
        <p className="text-muted-foreground mb-8">
          BILLZ jamoasi tez orada siz bilan bog'lanadi va sizning biznesingiz uchun eng yaxshi yechimni taklif qiladi.
        </p>

        <div className="bg-secondary rounded-2xl p-6 mb-8">
          <p className="font-semibold text-foreground mb-2">
            📱 Qo'shimcha savollar bo'lsa
          </p>
          <p className="text-muted-foreground">
            Bizga qo'ng'iroq qiling yoki WhatsApp orqali yozing
          </p>
        </div>

        <Button
          onClick={onBackToHome}
          size="lg"
          className="h-14 px-12 text-lg rounded-2xl"
        >
          Bosh sahifaga qaytish
        </Button>
      </div>
    </div>
  );
};