import logoSrc from "@/assets/billz-calculator-logo.svg";

interface BillzCalculatorLogoProps {
  className?: string;
}

export const BillzCalculatorLogo = ({ className = "h-10 md:h-14" }: BillzCalculatorLogoProps) => {
  return (
    <img 
      src={logoSrc} 
      alt="BILLZ Calculator"
      className={className}
    />
  );
};
