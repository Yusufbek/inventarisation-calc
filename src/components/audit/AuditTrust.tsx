import { CheckCircle } from "lucide-react";

const trustPoints = [
  "5000 dan ortiq do'kon faoliyati yaxshilandi",
  "Chakana savdo sohasida 8 yildan ortiq tajriba",
  "Yo'qotishlarning oldini olish va foydani optimallashtirish bo'yicha mutaxassislik",
  "Amaliy, aniq ma'lumotlarga asoslangan yechimlar",
];

export const AuditTrust = () => {
  return (
    <section className="py-10 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 md:mb-10">
          Nima uchun do'kon egalari auditlarimizga ishonadi?
        </h2>

        {/* Experts photo */}
        <div className="mb-6 md:mb-10">
          <img
            src="/images/audit-experts.png"
            alt="Bizning mutaxassislar jamoasi"
            className="w-full max-w-md mx-auto rounded-2xl"
            loading="lazy"
          />
        </div>

        <div className="space-y-3 md:space-y-4 text-left max-w-xl mx-auto">
          {trustPoints.map((point) => (
            <div key={point} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-foreground font-medium text-sm md:text-base">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
