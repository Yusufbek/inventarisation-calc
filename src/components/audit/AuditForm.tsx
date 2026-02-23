interface AuditFormProps {
  onCtaClick: () => void;
}

export const AuditForm = ({ onCtaClick }: AuditFormProps) => {
  return (
    <section id="audit-form" className="py-12 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4 max-w-xl text-center space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          Foydangizni nazorat qilishni boshlang
        </h2>
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
