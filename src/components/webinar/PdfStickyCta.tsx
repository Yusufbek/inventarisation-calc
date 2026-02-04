import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PdfStickyCtaProps {
  onClick: () => void;
  isLoading: boolean;
}

export const PdfStickyCta = ({ onClick, isLoading }: PdfStickyCtaProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border p-4 shadow-2xl">
      <div className="max-w-lg mx-auto">
        <Button
          onClick={onClick}
          disabled={isLoading}
          className="w-full rounded-full py-7 text-lg font-bold shadow-lg gap-2"
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Tayyorlanmoqda...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Bepul yuklab olish
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
