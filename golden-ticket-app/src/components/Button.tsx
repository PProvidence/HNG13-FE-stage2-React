// import { cn } from "@/lib/utils"; // optional helper for className merging (can omit)
import type { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

export const Button: FC<ButtonProps> = ({ 
  variant = "default", 
  className, 
  children, 
  ...props 
}) => {
  const base = "px-4 py-2 rounded-lg text-sm flex font-semibold transition-smooth focus:outline";
  const variants = {
    default: "bg-gradient-hero cursor-pointer text-white shadow-card hover:shadow-golden hover:scale-[1.02]",
    outline: "border cursor-pointer border-border text-foreground hover:bg-muted",
    ghost: "text-foreground cursor-pointer hover:bg-muted/40"
  };

  return (
    <button className={`${base} ${variants[variant]} ${className || ""}`} {...props}>
      {children}
    </button>
  );
};
