import { Button } from "@/components/ui/button";

interface PdfStickyCtaProps {
  onClick: () => void;
  isLoading: boolean;
}

export const PdfStickyCta = ({ onClick, isLoading }: PdfStickyCtaProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-4 shadow-lg">
      <div className="max-w-lg mx-auto">
        <Button
          onClick={onClick}
          disabled={isLoading}
          className="w-full rounded-full py-6 text-lg font-semibold"
          size="lg"
        >
          {isLoading ? "Tayyorlanmoqda..." : "Yuklab olish"}
        </Button>
      </div>
    </div>
  );
};
