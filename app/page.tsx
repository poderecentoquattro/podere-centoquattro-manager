import { supabase } from "../lib/supabase";
import StatsGrid from "./components/dashboard/StatsGrid";
import DashboardHeader from "./components/dashboard/DashboardHeader";
import UpcomingArrivals from "./components/dashboard/UpcomingArrivals";
import TodayCard from "./components/dashboard/TodayCard";

export default async function Home() {
  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      *,
      apartments (
        name
      ),
      guests!bookings_guest_id_fkey (
        nome,
        cognome
      )
    `);

  const bookingsWithGuest = (bookings ?? []).map((b: any) => ({
    ...b,
    guest: b.guests
      ? `${b.guests.nome} ${b.guests.cognome}`
      : "Ospite",
  }));

  const oggi = new Date().toISOString().split("T")[0];

  const oggiData = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const arriviOggi = bookingsWithGuest.filter(
    (b: any) => b.check_in === oggi
  );

  const partenzeOggi = bookingsWithGuest.filter(
    (b: any) => b.check_out === oggi
  );

  const ospitiPresenti = bookingsWithGuest.filter(
    (b: any) => b.check_in <= oggi && b.check_out > oggi
  ).length;

  const prossimiArrivi = bookingsWithGuest
    .filter((b: any) => b.check_in >= oggi)
    .sort((a: any, b: any) =>
      a.check_in.localeCompare(b.check_in)
    )
    .slice(0, 5);

  return (
    <main className="space-y-6">
      <DashboardHeader date={oggiData} />

      <StatsGrid
        ospitiPresenti={ospitiPresenti}
        arriviOggi={arriviOggi.length}
        partenzeOggi={partenzeOggi.length}
        daIncassare="€0"
      />

      <TodayCard
        arriviOggi={arriviOggi}
        partenzeOggi={partenzeOggi}
      />

      <UpcomingArrivals bookings={prossimiArrivi} />
    </main>
  );
}