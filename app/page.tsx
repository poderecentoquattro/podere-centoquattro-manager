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

    <div className="rounded-[28px] bg-[#0A5A34] text-white p-8 shadow-lg">

  <h2 className="text-3xl font-serif mb-2">
    🌿 Oggi al Podere
  </h2>

  <p className="text-white/80">
    Arrivi: <strong>{arriviOggi}</strong> ·
    Partenze: <strong>{partenzeOggi}</strong> ·
    Ospiti presenti: <strong>{ospitiPresenti}</strong>
  </p>

</div>

    <div className="grid grid-cols-2 gap-6">

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

      <Card title="Attività">

        <p className="text-gray-500">
          Nessuna attività da visualizzare.
        </p>

      </Card>

    </div>

  </main>
);
}
