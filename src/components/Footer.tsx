import billzLogo from "@/assets/billz-logo.png";

export const Footer = () => {
  return (
    <footer className="w-full bg-foreground text-background px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={billzLogo} alt="BILLZ Logo" className="h-10" />
        </div>
        
        <div className="text-sm text-center md:text-right space-y-1">
          <p>© 2025 BILLZ. Barcha huquqlar himoyalangan.</p>
          <p className="text-background/70">
            Aloqa: +998 78 113 60 14
          </p>
        </div>
      </div>
    </footer>
  );
};
