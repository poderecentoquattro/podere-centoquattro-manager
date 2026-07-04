import Link from "next/link";
import { supabase } from "../lib/supabase";
import PageTitle from "./components/PageTitle";
import StatCard from "./components/StatCard";
import Card from "./components/Card";
import Button from "./components/Button";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Home() {
  const { data: bookings } = await supabase
  .from("bookings")
  .select(`
    *,
    apartments(name)
  `);
const totalePrenotazioni = bookings?.length ?? 0;

const oggi = new Date().toISOString().split("T")[0];

const arriviOggi =
  bookings?.filter((b) => b.check_in === oggi).length ?? 0;

const partenzeOggi =
  bookings?.filter((b) => b.check_out === oggi).length ?? 0;

const prossimiArrivi =
  bookings
    ?.filter((b) => b.check_in >= oggi)
    .sort((a, b) => a.check_in.localeCompare(b.check_in))
    .slice(0, 5) ?? [];
    const ospitiPresenti =
  bookings?.filter(
    (b) => b.check_in <= oggi && b.check_out > oggi
  ).length ?? 0;
console.log(bookings);
  return (
  <main className="space-y-8">

    <PageTitle
      title="Dashboard"
      subtitle="Benvenuta nel gestionale del Podere Centoquattro 🌿"
      action={
        <Button href="/nuova-pratica">
          ➕ Nuova Prenotazione
        </Button>
      }
    />

    <div className="grid grid-cols-4 gap-6">

      <StatCard
  title="Ospiti Presenti"
  value={ospitiPresenti}
  icon="🏡"
/>

      <StatCard
        title="Arrivi Oggi"
        value={arriviOggi}
        icon="🏡"
      />

      <StatCard
        title="Partenze Oggi"
        value={partenzeOggi}
        icon="🚪"
      />

      <StatCard
        title="Da Incassare"
        value="€ 0"
        icon="💶"
      />

    </div>

    <Card title="🌿 Oggi al Podere">

  <div className="space-y-5">

    {/* Check-in */}
    {bookings?.filter((b) => b.check_in === oggi).length! > 0 && (
      <div>
        <p className="font-semibold text-[#0A5A34]">
          🛎 Check-in di oggi
        </p>

        {bookings
          ?.filter((b) => b.check_in === oggi)
          .map((b) => (
            <p key={b.id} className="text-gray-600">
              {b.guest} · 🏡 {b.apartments?.name}
            </p>
          ))}
      </div>
    )}

    {/* Check-out */}
    {bookings?.filter((b) => b.check_out === oggi).length! > 0 && (
      <div>
        <p className="font-semibold text-[#0A5A34]">
          🚪 Check-out di oggi
        </p>

        {bookings
          ?.filter((b) => b.check_out === oggi)
          .map((b) => (
            <p key={b.id} className="text-gray-600">
              {b.guest} · 🏡 {b.apartments?.name}
            </p>
          ))}
      </div>
    )}

    {/* Qui arriveranno in futuro */}
    {/* 💶 Pagamenti */}
    {/* ⚠️ Alloggiati */}
    {/* 🧹 Pulizie */}

    {arriviOggi === 0 &&
      partenzeOggi === 0 && (
        <div className="rounded-xl bg-green-50 p-5 text-center">

          <p className="text-2xl mb-2">
            ✅
          </p>

          <p className="font-semibold text-[#0A5A34]">
            Nessuna attività in sospeso
          </p>

          <p className="text-gray-500 text-sm mt-1">
            Buona giornata! 🌿
          </p>

        </div>
      )}

  </div>

</Card>

    <div className="grid grid-cols-1 gap-6">

      <Card title="Prossimi Arrivi">

  {prossimiArrivi.length === 0 ? (

    <p className="text-gray-500">
      Nessun arrivo programmato.
    </p>

  ) : (

    <div className="space-y-4">

      {prossimiArrivi.map((booking) => (

  <div
    key={booking.id}
    className="flex justify-between items-center border-b border-gray-100 py-4 last:border-0"
  >

    <div>

      <p className="font-semibold text-lg text-[#0A5A34]">
        {booking.guest}
      </p>

      <p className="text-gray-500">
        🏡 {booking.apartments?.name}
      </p>

    </div>

    <div className="text-right">

      <p className="font-medium">
        📅 {formatDate(booking.check_in)}
      </p>

      <p className="text-sm text-gray-400">
        Check-in
      </p>

    </div>

  </div>

))}

    </div>

  )}

</Card>

    </div>

  </main>
);
}
