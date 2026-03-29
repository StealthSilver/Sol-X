import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
}) => {
  const paddingStyles = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`rounded-xl border border-[#e7e2dc] bg-white dark:border-[#404040] dark:bg-[#1a1a1a] ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
};
