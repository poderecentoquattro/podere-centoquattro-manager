import { supabase } from "../lib/supabase";
import DashboardGrid from "./components/dashboard/DashboardGrid";
import DashboardHeader from "./components/dashboard/DashboardHeader";
import UpcomingArrivals from "./components/dashboard/UpcomingArrivals";
import TodayCard from "./components/dashboard/TodayCard";
import TomorrowArrivalsCard from "./components/dashboard/TomorrowArrivalsCard";

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
  cognome,
  telefono
)
    `);

  const bookingsWithGuest = (bookings ?? []).map((b: any) => ({
  ...b,
  guest: b.guests
    ? `${b.guests.nome} ${b.guests.cognome}`
    : "Ospite",

  telefono: b.guests?.telefono ?? "",
}));

  const oggi = new Date();
  const oggiString = oggi.toISOString().split("T")[0];

  const oggiData = oggi.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // ======================================================
// 🚧 PROVA NUOVA SCHEDA ARRIVI DOMANI
// ======================================================

const domani = new Date();
domani.setDate(oggi.getDate() + 1);

const domaniString = domani.toISOString().split("T")[0];

const arriviDomani = bookingsWithGuest.filter(
  (b: any) => b.check_in === domaniString
);

  // Arrivi di oggi
  const arriviOggi = bookingsWithGuest.filter(
    (b: any) => b.check_in === oggiString
  );

  // Partenze di oggi
  const partenzeOggi = bookingsWithGuest.filter(
    (b: any) => b.check_out === oggiString
  );

  // Ospiti presenti
  const ospitiPresenti = bookingsWithGuest.filter(
    (b: any) =>
      b.check_in <= oggiString &&
      b.check_out > oggiString
  ).length;

  // Prossimi arrivi
  const prossimiArrivi = bookingsWithGuest
    .filter((b: any) => b.check_in >= oggiString)
    .sort((a: any, b: any) =>
      a.check_in.localeCompare(b.check_in)
    )
    .slice(0, 5);

  return (
    <main className="space-y-6">
      <DashboardHeader date={oggiData} />

      <DashboardGrid
  ospitiPresenti={ospitiPresenti}
  arriviDomani={arriviDomani}
  partenzeDomani={partenzeOggi.length}
  daIncassare="€0"
/>

{/* ======================================================
🚧 PROVA NUOVA SCHEDA ARRIVI DOMANI
====================================================== */}


<TodayCard
  arriviOggi={arriviOggi}
  partenzeOggi={partenzeOggi}
/>

      <UpcomingArrivals bookings={prossimiArrivi} />
    </main>
  );
}