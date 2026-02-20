import { useRef } from "react";
import { Send } from "lucide-react";
import { eventCustom } from "@/lib/fpixel";
import { sendCapiEvent } from "@/lib/capi";

const TELEGRAM_GROUP_URL = "https://t.me/+iEKlHUfZdzQzYjMy";

const WebinarSuccess = () => {
  const hasTrackedWebinarFinished = useRef(false);

  const handleTelegramClick = () => {
    if (!hasTrackedWebinarFinished.current) {
      const eventId = crypto.randomUUID();
      eventCustom("WebinarFinished", { content_name: "Foyda webinar" });
      sendCapiEvent({
        eventName: "WebinarFinished",
        eventId,
        customData: { content_name: "Foyda webinar" },
      });
      hasTrackedWebinarFinished.current = true;
    }
    window.open(TELEGRAM_GROUP_URL, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Tabriklaymiz!</h1>
        <p className="text-muted-foreground mb-8">
          Siz vebinarga muvaffaqiyatli ro'yxatdan o'tdingiz. Vebinar bo'lib o'tadigan telegram guruhga qo'shilib oling
        </p>
        <button
          onClick={handleTelegramClick}
          className="inline-flex items-center justify-center gap-3 bg-[#0088cc] text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-[#0077b5] transition-colors"
        >
          <Send className="w-5 h-5" />
          Telegram guruhiga o'tish
        </button>
      </div>
    </div>
  );
};

export default WebinarSuccess;
