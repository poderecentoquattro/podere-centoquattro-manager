"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Guest = {
  id: number;
  nome: string | null;
  cognome: string | null;
  email: string | null;
  telefono: string | null;
  nazionalita: string | null;
  lingua: string | null;
  data_nascita: string | null;
};

export default function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuests();
  }, []);

  async function loadGuests() {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .order("cognome")
      .order("nome");

    if (!error && data) {
      setGuests(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
        Caricamento ospiti...
      </div>
    );
  }

  if (guests.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center text-gray-500 shadow-sm">
        Nessun ospite presente.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-5 py-4">Ospite</th>
            <th className="px-5 py-4">Telefono</th>
            <th className="px-5 py-4">Email</th>
            <th className="px-5 py-4">Nazionalità</th>
            <th className="px-5 py-4">Lingua</th>
          </tr>
        </thead>

        <tbody>
          {guests.map((guest) => (
            <tr
              key={guest.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-5 py-4 font-semibold">
                {guest.nome} {guest.cognome}
              </td>

              <td className="px-5 py-4">
                {guest.telefono || "-"}
              </td>

              <td className="px-5 py-4">
                {guest.email || "-"}
              </td>

              <td className="px-5 py-4">
                {guest.nazionalita || "-"}
              </td>

              <td className="px-5 py-4">
                {guest.lingua || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}