import StatCard from "../StatCard";

type Props = {
  ospitiPresenti: number;
  arriviOggi: number;
  partenzeOggi: number;
  daIncassare: string;
};

export default function StatsGrid({
  ospitiPresenti,
  arriviOggi,
  partenzeOggi,
  daIncassare,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

      <StatCard
        title="Ospiti Presenti"
        value={ospitiPresenti}
        icon="👨‍👩‍👧‍👦"
      />

      <StatCard
        title="Arrivi Oggi"
        value={arriviOggi}
        icon="🛎"
      />

      <StatCard
        title="Partenze Oggi"
        value={partenzeOggi}
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