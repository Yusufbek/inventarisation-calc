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
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-10">
          Bepul audit xizmatiga quyidagilar kiradi:
        </h2>

        <div className="space-y-3 mb-10">
          {services.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border text-left"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-muted-foreground line-through text-xl">Qiymati: $100</span>
          <span className="bg-primary text-primary-foreground font-extrabold text-xl px-5 py-2 rounded-full">
            BEPUL
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-6">Ramazon taklifi</p>

        <button
          onClick={onCtaClick}
          className="bg-primary text-primary-foreground font-bold text-lg px-8 py-4 rounded-full hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
        >
          Bepul auditga yozilish
        </button>
      </div>
    </section>
  );
};
