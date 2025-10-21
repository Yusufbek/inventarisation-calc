interface BillzLogoProps {
  className?: string;
}

export const BillzLogo = ({ className = "h-8 md:h-10" }: BillzLogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 40"
      className={className}
      fill="currentColor"
    >
      <text
        x="10"
        y="30"
        fontFamily="Arial, sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill="currentColor"
      >
        BILLZ
      </text>
    </svg>
  );
};
