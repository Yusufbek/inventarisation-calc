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
    <div className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-md text-background py-2 shadow-lg">
      <div className="container mx-auto px-3 flex items-center justify-between text-xs sm:text-sm md:text-base gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
          <span className="truncate">
            <span className="hidden sm:inline">Bugungi ro'yxatga olish </span>
            <span className="sm:hidden">Ro'yxat </span>
            <span className="font-bold text-primary">
              {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </span>
            <span className="hidden sm:inline"> dan so'ng yakunlanadi</span>
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 text-destructive font-semibold flex-shrink-0">
          <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Faqat 3 ta joy qoldi</span>
          <span className="sm:hidden text-[10px]">3 joy qoldi</span>
        </div>
      </div>
    </div>
  );
};
