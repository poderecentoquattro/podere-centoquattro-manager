"use client";

import { useEffect, useState } from "react";

type Guest = {
  nome: string;
  cognome: string;
  data_nascita: string;
  nazionalita: string;
  telefono: string;
  email: string;
  note: string;
};

type Props = {
  initialData?: Guest;
  onSubmit: (guest: Guest) => Promise<void>;
};

const emptyGuest: Guest = {
  nome: "",
  cognome: "",
  data_nascita: "",
  nazionalita: "",
  telefono: "",
  email: "",
  note: "",
};

export default function GuestForm({
  initialData,
  onSubmit,
}: Props) {
  const [guest, setGuest] = useState<Guest>(
  initialData ?? emptyGuest
);

useEffect(() => {
  if (initialData) {
    setGuest(initialData);
  } else {
    setGuest(emptyGuest);
  }
}, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGuest({
      ...guest,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(guest);
      }}
      className="space-y-8"
    >
      <div className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold text-[#0A5A34]">
          👤 Dati Ospite
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Nome
            </label>

            <input
              name="nome"
              value={guest.nome}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Cognome
            </label>

            <input
              name="cognome"
              value={guest.cognome}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Data di nascita
            </label>

            <input
              type="date"
              name="data_nascita"
              value={guest.data_nascita}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Nazionalità
            </label>

            <input
              name="nazionalita"
              value={guest.nazionalita}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Telefono
            </label>

            <input
              name="telefono"
              value={guest.telefono}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={guest.email}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />
          </div>

        </div>

      </div>

      <div className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold text-[#0A5A34]">
          📝 Note
        </h2>

        <textarea
          name="note"
          value={guest.note}
          onChange={handleChange}
          rows={6}
          className="w-full rounded-xl border p-3"
        />

      </div>

      <div className="flex justify-end">

        <button
          type="submit"
          className="rounded-xl bg-[#0A5A34] px-8 py-3 font-semibold text-white hover:bg-[#084728]"
        >
          💾 Salva Ospite
        </button>

      </div>
    </form>
  );
}