"use client";

import { useEffect, useMemo, useState } from "react";

import type { Guest } from "@/app/types/guest";

type Props = {
  value: number | null;
  onChange: (guest: Guest) => void;
};

export default function GuestSelector({
  value,
  onChange,
}: Props) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadGuests();
  }, []);

  async function loadGuests() {
    const res = await fetch("/api/guests");
    const json = await res.json();

    if (json.success) {
      setGuests(json.data);
    }
  }

  const filtered = useMemo(() => {
    if (!search) return guests;

    return guests.filter((g) =>
      `${g.nome} ${g.cognome}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [guests, search]);

  const selectedGuest =
    guests.find((g) => g.id === value) ?? null;

  useEffect(() => {
    if (selectedGuest) {
      setSearch(
        `${selectedGuest.nome} ${selectedGuest.cognome}`
      );
    }
  }, [selectedGuest]);

  return (
    <div className="relative">

    <input
        type="text"
        value={search}
        placeholder="🔍 Cerca ospite..."
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
        }}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg focus:border-[#0A5A34] focus:outline-none"
      />

      {open && (
        <div className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border bg-white shadow-xl">
          {filtered.length > 0 ? (
            filtered.map((guest) => (
              <button
                key={guest.id}
                type="button"
                onClick={() => {
                  setSearch(
                    `${guest.nome} ${guest.cognome}`
                  );

                  onChange(guest);

                  setOpen(false);
                }}
                className="flex w-full flex-col border-b px-4 py-3 text-left hover:bg-green-50"
              >
                <span className="font-semibold text-[#0A5A34]">
                  {guest.nome} {guest.cognome}
                </span>

                <span className="text-sm text-gray-500">
                  {guest.telefono || "Nessun telefono"}
                </span>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Nessun ospite trovato
            </div>
          )}

          <button
            type="button"
            className="w-full border-t bg-green-50 px-4 py-3 text-left font-semibold text-[#0A5A34] hover:bg-green-100"
            onClick={() => {
              alert(
                "La creazione rapida dell'ospite arriverà nel prossimo passaggio."
              );
            }}
          >
            ➕ Nuovo ospite
          </button>
        </div>
      )}
    </div>
  );
}