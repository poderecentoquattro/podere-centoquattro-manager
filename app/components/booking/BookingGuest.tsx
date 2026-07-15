"use client";

import type { Guest } from "@/app/types/guest";
import GuestSelector from "../guests/GuestSelector";

type Props = {
  guest: Guest | null;
  onChange: (guest: Guest) => void;
};

export default function BookingGuest({
  guest,
  onChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-2xl font-bold text-[#0A5A34]">
        👤 Ospite
      </h2>

      <GuestSelector
        value={guest?.id ?? null}
        onChange={onChange}
      />

      {guest && (
        <div className="mt-6 rounded-xl border bg-green-50 p-5">

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-[#0A5A34]">
              {guest.nome} {guest.cognome}
            </h3>
          </div>

          <div className="grid gap-3 md:grid-cols-2">

            <div>
              <span className="font-semibold">
                📞 Telefono
              </span>

              <div className="text-gray-600">
                {guest.telefono || "-"}
              </div>
            </div>

            <div>
              <span className="font-semibold">
                ✉️ Email
              </span>

              <div className="text-gray-600">
                {guest.email || "-"}
              </div>
            </div>

            <div>
              <span className="font-semibold">
                🌍 Nazionalità
              </span>

              <div className="text-gray-600">
                {guest.nazionalita || "-"}
              </div>
            </div>

            <div>
              <span className="font-semibold">
                🎂 Data di nascita
              </span>

              <div className="text-gray-600">
                {guest.data_nascita || "-"}
              </div>
            </div>

          </div>

          <div className="mt-5 flex gap-3">

            <button
              type="button"
              className="rounded-xl bg-[#0A5A34] px-4 py-2 text-white transition hover:bg-[#084728]"
              onClick={() => {
                alert("Scheda ospite (prossimamente)");
              }}
            >
              📄 Apri scheda
            </button>

            <button
              type="button"
              className="rounded-xl border px-4 py-2 transition hover:bg-gray-100"
              onClick={() => {
                alert("Modifica ospite (prossimamente)");
              }}
            >
              ✏️ Modifica
            </button>

          </div>

        </div>
      )}

    </div>
  );
}