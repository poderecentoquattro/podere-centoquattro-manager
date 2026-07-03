import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
  className?: string;
};

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[#0A5A34] hover:bg-[#084529] text-white",

    secondary:
      "bg-white border border-[#D8E5D9] text-[#0A5A34] hover:bg-[#F5F8F4]",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  const classes = `
    inline-flex
    items-center
    justify-center
    rounded-2xl
    px-6
    py-3
    text-lg
    font-semibold
    shadow-md
    transition-all
    duration-300
    hover:scale-[1.02]
    ${variants[variant]}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}