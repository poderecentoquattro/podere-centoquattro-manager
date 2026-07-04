import { supabase } from "../lib/supabase";

import DashboardHeader from "./components/dashboard/DashboardHeader";
import StatCard from "./components/StatCard";
import Card from "./components/Card";

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

  const oggi = new Date().toISOString().split("T")[0];

  const oggiData = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const arriviOggi =
    bookings?.filter((b) => b.check_in === oggi) ?? [];

  const partenzeOggi =
    bookings?.filter((b) => b.check_out === oggi) ?? [];

  const ospitiPresenti =
    bookings?.filter(
      (b) => b.check_in <= oggi && b.check_out > oggi
    ).length ?? 0;

  const prossimiArrivi =
    bookings
      ?.filter((b) => b.check_in >= oggi)
      .sort((a, b) => a.check_in.localeCompare(b.check_in))
      .slice(0, 5) ?? [];

  return (
    <main className="space-y-6">

      <DashboardHeader date={oggiData} />

      {/* Statistiche */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        <StatCard
          title="Ospiti Presenti"
          value={ospitiPresenti}
          icon="👨‍👩‍👧‍👦"
        />

        <StatCard
          title="Arrivi Oggi"
          value={arriviOggi.length}
          icon="🛎"
        />

        <StatCard
          title="Partenze Oggi"
          value={partenzeOggi.length}
          icon="🚪"
        />

        <StatCard
          title="Da Incassare"
          value="€0"
          icon="💶"
        />

      </div>

      {/* Oggi al Podere */}

      <Card title="🌿 Oggi al Podere">

        <div className="space-y-5">

          {arriviOggi.map((booking) => (
            <div key={booking.id}>

              <p className="font-semibold text-[#0A5A34]">
                🛎 Check-in
              </p>

              <p className="text-gray-600">
                {booking.guest}
              </p>

              <p className="text-sm text-gray-500">
                🏡 {booking.apartments?.name}
              </p>

            </div>
          ))}

          {partenzeOggi.map((booking) => (
            <div key={booking.id}>

              <p className="font-semibold text-[#0A5A34]">
                🚪 Check-out
              </p>

              <p className="text-gray-600">
                {booking.guest}
              </p>

              <p className="text-sm text-gray-500">
                🏡 {booking.apartments?.name}
              </p>

            </div>
          ))}

          {arriviOggi.length === 0 &&
            partenzeOggi.length === 0 && (

              <div className="rounded-2xl bg-green-50 p-8 text-center">

                <div className="text-4xl">
                  ✅
                </div>

                <h3 className="mt-4 text-xl font-bold text-[#0A5A34]">
                  Nessuna attività in sospeso
                </h3>

                <p className="mt-2 text-gray-500">
                  Buona giornata! 🌿
                </p>

              </div>

            )}

        </div>

      </Card>

      {/* Prossimi arrivi */}

      <Card title="📅 Prossimi Arrivi">

        {prossimiArrivi.length === 0 ? (

          <p className="text-gray-500">
            Nessun arrivo programmato.
          </p>

        ) : (

          <div className="space-y-4">

            {prossimiArrivi.map((booking) => (

              <div
                key={booking.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0"
              >

                <div>

                  <p className="font-semibold text-[#0A5A34]">
                    {booking.guest}
                  </p>

                  <p className="text-sm text-gray-500">
                    🏡 {booking.apartments?.name}
                  </p>

                </div>

                <div className="text-right">

                  <p>
                    {formatDate(booking.check_in)}
                  </p>

                  <p className="text-xs text-gray-400">
                    Check-in
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </Card>

    </main>
  );
}