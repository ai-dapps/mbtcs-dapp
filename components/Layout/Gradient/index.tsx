export const GradientBorder = ({
  className,
  condition,
  colorCSS,
  children,
}: GradientProps) => {
  return (
    <div
      className={`${className} pb-1 ${
        condition && "bg-gradient-to-r from-[#b774ff] to-[#ee9383]"
      }`}
    >
      <div className={`pb-1 ${colorCSS}`}>{children}</div>
    </div>
  );
};

export const GradientText = ({
  className,
  condition,
  children,
}: GradientProps) => {
  return (
    <div
      className={`${className} ${
        condition &&
        "text-transparent bg-clip-text bg-gradient-to-r from-[#b774ff] to-[#ee9383]"
      }`}
    >
      {children}
    </div>
  );
};

export const GradientButton = ({
  className,
  condition,
  children,
}: GradientProps) => {
  return (
    <button
      className={`${className} ${
        condition && "bg-gradient-to-r from-[#b774ff] to-[#ee9383]"
      }`}
    >
      {children}
    </button>
  );
};
