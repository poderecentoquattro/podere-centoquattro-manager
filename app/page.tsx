import { supabase } from "../lib/supabase";
import StatsGrid from "./components/dashboard/StatsGrid";
import DashboardHeader from "./components/dashboard/DashboardHeader";
import StatCard from "./components/StatCard";
import Card from "./components/Card";
import UpcomingArrivals from "./components/dashboard/UpcomingArrivals";
import TodayCard from "./components/dashboard/TodayCard";

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

<StatsGrid
  ospitiPresenti={ospitiPresenti}
  arriviOggi={arriviOggi.length}
  partenzeOggi={partenzeOggi.length}
  daIncassare="€0"
/>
      {/* Oggi al Podere */}

     <TodayCard
  arriviOggi={arriviOggi}
  partenzeOggi={partenzeOggi}
/>

      {/* Prossimi arrivi */}

      <UpcomingArrivals
  bookings={prossimiArrivi}
/>

    </main>
  );
}