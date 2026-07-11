"use client";

import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  date: string;
  initialPrice?: number;
  onClose: () => void;
  onSave: (price: number) => void;
};

export default function PriceModal({
  open,
  date,
  initialPrice,
  onClose,
  onSave,
}: Props) {
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (open) {
      setPrice(initialPrice ? String(initialPrice) : "");
    }
  }, [open, initialPrice]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Tariffa giornaliera
        </h2>

        <p className="text-gray-600 mb-6">
          {date}
        </p>

        <label className="block text-sm font-medium mb-2">
          Prezzo (€)
        </label>

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="es. 245"
          className="w-full border rounded-lg px-4 py-3 text-lg mb-6"
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Annulla
          </button>

          <button
            onClick={() => onSave(Number(price))}
            className="px-5 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800"
          >
            Salva
          </button>

        </div>

      </div>

    </div>
  );
}