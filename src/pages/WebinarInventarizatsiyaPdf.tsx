import { useState, useEffect, useRef } from "react";
import { BillzCalculatorLogo } from "@/components/BillzCalculatorLogo";
import { PdfHero } from "@/components/webinar/PdfHero";
import { PdfContent } from "@/components/webinar/PdfContent";
import { PdfStickyCta } from "@/components/webinar/PdfStickyCta";
import { Button } from "@/components/ui/button";
import { pageView, eventCustom } from "@/lib/fpixel";
import { sendCapiEvent, getBrowserId } from "@/lib/capi";
import { Send } from "lucide-react";

const WEBHOOK_URL = "https://n8n-m2.makebillz.top/webhook/f88e72ec-197c-401a-8028-6d9cf5ee188d";

const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    fbclid: params.get("fbclid") || "",
  };
};

const WebinarInventarizatsiyaPdf = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [telegramUrl, setTelegramUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasTrackedPdfDownload = useRef(false);

  // Track PageView on mount
  useEffect(() => {
    pageView();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleDownloadClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const utmParams = getUtmParams();
      const payload = {
        pdf_type: "inventarizatsiya",
        ...utmParams,
      };

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Webhook request failed");
      }

      const result = await response.json();

      if (result.telegram_url) {
        setTelegramUrl(result.telegram_url);
      } else {
        throw new Error("No telegram_url in response");
      }
    } catch (err) {
      console.error("Failed to send data to webhook:", err);
      setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTelegramClick = () => {
    // Fire pixel event only once
    if (!hasTrackedPdfDownload.current) {
      const eventId = crypto.randomUUID();
      const browserId = getBrowserId();

      // Client-side pixel
      eventCustom("PDFDownload", { content_name: "Inventarizatsiya PDF" }, eventId);

      // Server-side CAPI for deduplication
      sendCapiEvent({
        eventName: "PDFDownload",
        eventId,
        externalId: browserId,
        customData: { content_name: "Inventarizatsiya PDF" },
      });

      hasTrackedPdfDownload.current = true;
    }

    if (telegramUrl) {
      window.open(telegramUrl, "_blank");
    }
  };

  // Success state - Telegram redirect screen
  if (telegramUrl) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
        <header className="w-full flex justify-center mb-12">
          <BillzCalculatorLogo className="h-10 md:h-14" />
        </header>

        <div className="text-center space-y-6 max-w-md">
          {/* Telegram Icon */}
          <div className="mx-auto w-20 h-20 bg-[#0088cc] rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            PDF tayyor!
          </h2>

          <p className="text-lg text-muted-foreground">
            Telegram botda PDF yuklab olishingiz mumkin
          </p>

          <Button
            onClick={handleTelegramClick}
            className="inline-flex items-center justify-center gap-3 bg-[#0088cc] hover:bg-[#0077b5] text-white font-semibold text-lg px-8 py-6 rounded-full"
            size="lg"
          >
            <Send className="w-5 h-5" />
            Telegram botga o'tish
          </Button>
        </div>
      </div>
    );
  }

  // Default state - Landing page
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-6 pb-28">
        {/* Header */}
        <header className="w-full flex justify-center mb-6">
          <BillzCalculatorLogo className="h-8 md:h-10" />
        </header>

        {/* Hero Section */}
        <PdfHero onDownloadClick={handleDownloadClick} isLoading={isLoading} />

        {/* Content Section */}
        <PdfContent />

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-xl text-center">
            {error}
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <PdfStickyCta onClick={handleDownloadClick} isLoading={isLoading} />
    </div>
  );
};

export default WebinarInventarizatsiyaPdf;
