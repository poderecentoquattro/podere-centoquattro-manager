import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  title?: string;
  className?: string;
  padding?: "sm" | "md" | "lg"
};

export default function Card({
  children,
  title,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        bg-white
        rounded-[28px]
        border
        border-[#E7EFE7]
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        p-8
        ${className}
      `}
    >
      {title && (
        <h2 className="text-2xl font-semibold text-[#0A5A34] mb-6">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}