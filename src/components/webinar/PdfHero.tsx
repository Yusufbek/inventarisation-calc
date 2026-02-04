import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/pdf-hero-inventory.webp";

export const PdfHero = () => {
  return (
    <section className="w-full">
      {/* Hero Image Card */}
      <div className="w-full mb-8 bg-background rounded-3xl shadow-lg overflow-hidden">
        <img
          src={heroImage}
          alt="Inventarizatsiya guide hero"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Content */}
      <div className="text-center space-y-5 px-2">
        <Badge className="bg-primary/10 text-primary border-0 px-5 py-2 text-sm font-semibold hover:bg-primary/10 shadow-sm">
          Bepul
        </Badge>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-snug tracking-tight">
          4000+ o'zbek do'konlari to'g'ri inventarizatsiya qilib, millionlab so'm yo'qotishni qanday to'xtatdi
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed">
          Ushbu qo'llanmada do'konlar qanday qilib inventarizatsiya xatolarini kamaytirganini o'rganasiz
        </p>
      </div>
    </section>
  );
};
