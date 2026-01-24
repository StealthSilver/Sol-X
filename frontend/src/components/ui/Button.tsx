import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#F59E0B] text-[#0f0f0f] hover:bg-[#FCD34D] active:bg-[#F59E0B]",
    secondary:
      "bg-transparent border border-[#E5E7EB] text-[#FAFAFA] hover:bg-[#1a1a1a] active:bg-[#404040]",
    destructive:
      "bg-[#EF4444] text-white hover:bg-[#DC2626] active:bg-[#EF4444]",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm rounded-md",
    md: "h-10 px-4 text-base rounded-lg",
    lg: "h-12 px-6 text-lg rounded-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};
