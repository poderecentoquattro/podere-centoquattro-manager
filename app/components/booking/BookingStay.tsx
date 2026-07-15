"use client";

import { useEffect, useMemo } from "react";

type Props = {
  checkIn: string;
  checkOut: string;

  adults: number;
  children: number;

  animals: number;

  onChange: (
    field:
      | "checkIn"
      | "checkOut"
      | "adults"
      | "children"
      | "animals",
    value: string | number
  ) => void;
};

export default function BookingStay({
  checkIn,
  checkOut,
  adults,
  children,
  animals,
  onChange,
}: Props) {

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diff = end.getTime() - start.getTime();

    return Math.max(
      0,
      Math.round(diff / (1000 * 60 * 60 * 24))
    );
  }, [checkIn, checkOut]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-2xl font-bold text-[#0A5A34]">
        📅 Soggiorno
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Check-in
          </label>

          <input
            type="date"
            value={checkIn}
            onChange={(e) =>
              onChange("checkIn", e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Check-out
          </label>

          <input
            type="date"
            value={checkOut}
            onChange={(e) =>
              onChange("checkOut", e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Adulti
          </label>

          <input
            type="number"
            min={1}
            value={adults}
            onChange={(e) =>
              onChange(
                "adults",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Bambini
          </label>

          <input
            type="number"
            min={0}
            value={children}
            onChange={(e) =>
              onChange(
                "children",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Animali
          </label>

          <input
            type="number"
            min={0}
            value={animals}
            onChange={(e) =>
              onChange(
                "animals",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div className="flex items-end">

          <div className="w-full rounded-xl bg-green-50 p-4">

            <div className="text-sm text-gray-500">
              Durata soggiorno
            </div>

            <div className="text-3xl font-bold text-[#0A5A34]">
              {nights} {nights === 1 ? "notte" : "notti"}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}