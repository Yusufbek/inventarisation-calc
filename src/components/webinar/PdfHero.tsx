import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/pdf-hero-inventory.webp";

export const PdfHero = () => {
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
          Bepul
        </Badge>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
          4000+ o'zbek do'konlari to'g'ri inventarizatsiya qilib, millionlab so'm yo'qotishni qanday to'xtatdi
        </h1>
      </div>
    </section>
  );
};
