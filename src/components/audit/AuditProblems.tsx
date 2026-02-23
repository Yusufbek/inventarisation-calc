import { Lock, DollarSign, Tag, TrendingDown } from "lucide-react";

interface AuditProblemsProps {
  onCtaClick: () => void;
}

const problems = [
  { icon: Lock, label: "Yashirin o'g'rilik va ombordagi kamomadlar" },
  { icon: DollarSign, label: "Kassir va narx belgilashdagi xatolar" },
  { icon: Tag, label: "Nazoratsiz chegirmalar" },
  { icon: TrendingDown, label: "Samaradorlik nazoratining yo'qligi" },
];

export const AuditProblems = ({ onCtaClick }: AuditProblemsProps) => {
  return (
    <section className="py-10 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
          Savdo bor-u... lekin foyda yo'qmi?
        </h2>
        <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-10">
          Aksariyat do'konlar quyidagilar sababli pul yo'qotadi:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-10">
          {problems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-start gap-3 p-4 md:p-5 rounded-2xl bg-background border border-border shadow-sm text-left"
            >
              <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <span className="text-foreground font-medium text-sm">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground text-sm mb-5 md:mb-6">
          Biz pulingiz aynan qayerdan chiqib ketayotganini va buning oldini olish yo'lini ko'rsatamiz.
        </p>

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
