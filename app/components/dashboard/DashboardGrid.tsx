import OspitiPresentiCard from "./OspitiPresentiCard";
import TomorrowArrivalsCard from "./TomorrowArrivalsCard";
import StatCard from "./StatCard";

type Props = {
  ospitiPresenti: number;
  arriviDomani: any[];
  partenzeDomani: number;
  daIncassare: string;
};

export default function DashboardGrid({
  ospitiPresenti,
  arriviDomani,
  partenzeDomani,
  daIncassare,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

      <OspitiPresentiCard
        ospitiPresenti={ospitiPresenti}
      />

      <TomorrowArrivalsCard
        bookings={arriviDomani}
      />

      <StatCard
        title="Partenze Domani"
        value={partenzeDomani}
        icon="🚪"
      />

      <StatCard
        title="Da Incassare"
        value={daIncassare}
        icon="💶"
      />

    </div>
  );
}