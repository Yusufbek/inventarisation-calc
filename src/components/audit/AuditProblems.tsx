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
    <section className="py-12 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Savdo bor-u... lekin foyda yo'qmi?
        </h2>
        <p className="text-muted-foreground mb-10">
          Aksariyat do'konlar quyidagilar sababli pul yo'qotadi:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {problems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-start gap-3 p-5 rounded-2xl bg-background border border-border shadow-sm text-left"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-foreground font-medium text-sm md:text-base">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground mb-6">
          Biz pulingiz aynan qayerdan chiqib ketayotganini va buning oldini olish yo'lini ko'rsatamiz.
        </p>

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
