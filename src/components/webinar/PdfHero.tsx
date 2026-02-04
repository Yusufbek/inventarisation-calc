import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/pdf-hero-inventory.webp";

interface PdfHeroProps {
  onDownloadClick: () => void;
  isLoading: boolean;
}

export const PdfHero = ({ onDownloadClick, isLoading }: PdfHeroProps) => {
  return (
    <section className="w-full">
      {/* Hero Image */}
      <div className="w-full mb-8">
        <img
          src={heroImage}
          alt="Inventarizatsiya guide hero"
          className="w-full h-auto rounded-3xl object-cover"
        />
      </div>

      {/* Content */}
      <div className="text-center space-y-6">
        <Badge className="bg-primary/10 text-primary border-0 px-4 py-1.5 text-sm font-medium hover:bg-primary/10">
          Bepul PDF
        </Badge>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
          4000+ o'zbek do'konlari to'g'ri inventarizatsiya qilib, millionlab so'm yo'qotishni qanday to'xtatdi
        </h1>

        <Button
          onClick={onDownloadClick}
          disabled={isLoading}
          className="rounded-full px-8 py-6 text-lg font-semibold"
          size="lg"
        >
          {isLoading ? "Tayyorlanmoqda..." : "Yuklab olish"}
        </Button>
      </div>
    </section>
  );
};
