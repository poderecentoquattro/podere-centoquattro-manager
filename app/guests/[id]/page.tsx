import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function GuestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: guest } = await supabase
    .from("guests")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (!guest) {
    return <div className="p-8">Ospite non trovato.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link
        href="/guests"
        className="text-[#0A5A34] hover:underline"
      >
        ← Torna agli ospiti
      </Link>

      <div className="mt-6 rounded-2xl border bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">
          👤 {guest.nome} {guest.cognome}
        </h1>

        <div className="grid grid-cols-2 gap-6">
          <Info titolo="Telefono" valore={guest.telefono} />
          <Info titolo="Email" valore={guest.email} />
          <Info titolo="Nazionalità" valore={guest.nazionalita} />
          <Info titolo="Lingua" valore={guest.lingua} />
          <Info titolo="Luogo di nascita" valore={guest.luogo_nascita} />
          <Info titolo="Data di nascita" valore={guest.data_nascita} />
        </div>

        <div className="mt-8">
          <h2 className="mb-2 text-xl font-semibold">
            Note
          </h2>

          <div className="rounded-xl bg-gray-100 p-4">
            {guest.notes || "Nessuna nota"}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({
  titolo,
  valore,
}: {
  titolo: string;
  valore: string | null;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">{titolo}</p>
      <p className="font-semibold">
        {valore || "-"}
      </p>
    </div>
  );
}