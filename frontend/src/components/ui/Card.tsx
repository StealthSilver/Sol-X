import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
}) => {
  const paddingStyles = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-[#1a1a1a] border border-[#404040] rounded-xl ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
};
