import StatCard from "./StatCard";

type Props = {
  ospitiPresenti: number;
};

export default function OspitiPresentiCard({
  ospitiPresenti,
}: Props) {
  return (
    <StatCard
      title="Ospiti Presenti"
      value={ospitiPresenti}
      icon="👨‍👩‍👧‍👦"
    />
  );
}