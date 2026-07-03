import { ReactNode } from "react";

type PageTitleProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export default function PageTitle({
  title,
  subtitle,
  action,
}: PageTitleProps) {
  return (
    <div className="flex items-center justify-between mb-10">

      <div>

        <h1 className="text-5xl font-serif text-[#0A5A34] leading-none">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg text-gray-500 mt-3">
            {subtitle}
          </p>
        )}

      </div>

      {action && (
        <div>
          {action}
        </div>
      )}

    </div>
  );
}