import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";

export const AuditStickyTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calcTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const diff = midnight.getTime() - now.getTime();

      if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calcTimeLeft());
    const interval = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-md text-background py-2.5 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between text-sm md:text-base">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span>
            Bugungi ro'yxatga olish{" "}
            <span className="font-bold text-primary">
              {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </span>{" "}
            dan so'ng yakunlanadi
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-destructive font-semibold">
          <AlertTriangle className="h-4 w-4" />
          Faqat 3 ta joy qoldi
        </div>
      </div>
    </div>
  );
};
