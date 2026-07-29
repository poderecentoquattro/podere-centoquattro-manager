"use client";

import { NumericFormat } from "react-number-format";

type MoneyInputProps = {
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
};

export default function MoneyInput({
  value,
  onChange,
  className = "",
  placeholder,
}: MoneyInputProps) {
  return (
  <div className="relative">
    <NumericFormat
      value={value}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      className={`w-full rounded-lg border p-3 pr-10 ${className}`}
      placeholder={placeholder}
      onValueChange={(values) => onChange(values.value)}
    />

    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
      €
    </span>
  </div>
);
}