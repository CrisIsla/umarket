interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({
  children,
  onClick,
  className,
  type,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} 
      bg-[#031e3c] text-white rounded-lg cursor-pointer`}
    >
      {children}
    </button>
  );
};
