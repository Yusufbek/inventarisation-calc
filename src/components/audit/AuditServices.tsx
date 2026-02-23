import { BarChart3, Package, Receipt, Search, Map } from "lucide-react";

interface AuditServicesProps {
  onCtaClick: () => void;
}

const services = [
  { icon: BarChart3, label: "Do'kon faoliyatini tahlil qilish" },
  { icon: Package, label: "Ombordagi mahsulotlar va yo'qotishlar tahlili" },
  { icon: Receipt, label: "Pul mablag'lari nazoratini tekshirish" },
  { icon: Search, label: "Foyda kamayishi sabablarini aniqlash" },
  { icon: Map, label: "Shaxsan siz uchun harakatlar rejasi" },
];

export const AuditServices = ({ onCtaClick }: AuditServicesProps) => {
  return (
    <section className="py-10 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 md:mb-10">
          Bepul audit xizmatiga quyidagilar kiradi:
        </h2>

        <div className="space-y-2 md:space-y-3 mb-6 md:mb-10">
          {services.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl bg-muted/50 border border-border text-left"
            >
              <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <span className="text-foreground font-medium text-sm md:text-base">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
          <span className="text-muted-foreground line-through text-lg md:text-xl">Qiymati: $100</span>
          <span className="bg-primary text-primary-foreground font-extrabold text-lg md:text-xl px-4 md:px-5 py-1.5 md:py-2 rounded-full">
            BEPUL
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-5 md:mb-6">Ramazon taklifi</p>

        <button
          onClick={onCtaClick}
          className="w-full sm:w-auto bg-primary text-primary-foreground font-bold text-base md:text-lg px-6 md:px-8 py-3.5 md:py-4 rounded-full hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
        >
          Bepul auditga yozilish
        </button>
      </div>
    </section>
  );
};
