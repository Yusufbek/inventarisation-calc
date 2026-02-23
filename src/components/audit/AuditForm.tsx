import { Moon } from "lucide-react";

interface AuditFormProps {
  onCtaClick: () => void;
}

export const AuditForm = ({ onCtaClick }: AuditFormProps) => {
  return (
    <section id="audit-form" className="py-12 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4 max-w-xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm">
          <Moon className="h-4 w-4" />
          RAMAZON TASHABBUSI
        </div>
        <p className="text-foreground font-semibold text-base md:text-lg">
          Taxmin qilishni bas qiling. Foydangizni nazorat qilishni boshlang.
        </p>
        <p className="text-muted-foreground text-sm">
          Ramazon oyi davomida biz kuniga faqat 5 ta bepul audit o'tkazamiz.
          <br />
          O'z auditingizni band qilish uchun anketani to'ldiring.
        </p>
        <button
          onClick={onCtaClick}
          className="w-full sm:w-auto bg-primary text-primary-foreground font-bold text-lg px-8 py-4 rounded-full hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
        >
          Bepul auditga yozilish
        </button>
      </div>
    </section>
  );
};
