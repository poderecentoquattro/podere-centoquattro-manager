"use client";

import { useMemo } from "react";

type Props = {
  total: number;
  paidAmount: number;
  touristTax: number;

  onChange: (
    field: "total" | "paidAmount" | "touristTax",
    value: number
  ) => void;
};

export default function BookingPayment({
  total,
  paidAmount,
  touristTax,
  onChange,
}: Props) {
  const saldo = useMemo(() => {
    return Math.max(0, total - paidAmount);
  }, [total, paidAmount]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-2xl font-bold text-[#0A5A34]">
        💳 Pagamento
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Totale soggiorno (€)
          </label>

          <input
            type="number"
            step="0.01"
            value={total}
            onChange={(e) =>
              onChange("total", Number(e.target.value))
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Incassato (€)
          </label>

          <input
            type="number"
            step="0.01"
            value={paidAmount}
            onChange={(e) =>
              onChange(
                "paidAmount",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Tassa di soggiorno (€)
          </label>

          <input
            type="number"
            step="0.01"
            value={touristTax}
            onChange={(e) =>
              onChange(
                "touristTax",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div className="flex items-end">

          <div className="w-full rounded-xl bg-green-50 p-4">

            <div className="text-sm text-gray-500">
              Saldo da riscuotere
            </div>

            <div className="text-3xl font-bold text-[#0A5A34]">
              € {saldo.toFixed(2)}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}