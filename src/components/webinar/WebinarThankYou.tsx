import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { eventCustom } from "@/lib/fpixel";
import { BillzLogo } from "@/components/BillzLogo";

const TELEGRAM_GROUP = "https://t.me/billzwebinar";

export const WebinarThankYou = () => {
  const [hasTracked, setHasTracked] = useState(false);

  const handleTelegramClick = () => {
    if (!hasTracked) {
      eventCustom("WebinarFinished", {
        content_name: "Foydangiz qayerga yo'qolyapti webinar",
      });
      setHasTracked(true);
    }
    window.open(TELEGRAM_GROUP, "_blank");
  };

  return (
    <div className="text-center py-6 space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <BillzLogo className="h-8" />
      </div>

      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-foreground">
          Tabriklaymiz! 🎉
        </h3>
        <p className="text-muted-foreground">
          Siz vebinarga muvaffaqiyatli ro'yxatdan o'tdingiz
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-secondary/50 rounded-2xl p-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          Vebinarga kirish uchun quyidagi Telegram guruhiga qo'shiling:
        </p>
      </div>

      {/* Telegram Button */}
      <button
        onClick={handleTelegramClick}
        className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-lg py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
      >
        <Send className="w-5 h-5" />
        Telegram guruhiga o'tish
      </button>
    </div>
  );
};
