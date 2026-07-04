import Button from "../Button";

type Props = {
  date: string;
};

export default function DashboardHeader({ date }: Props) {
  const hour = new Date().getHours();

  let greeting = "Buongiorno";

  if (hour >= 13 && hour < 18) {
    greeting = "Buon pomeriggio";
  }

  if (hour >= 18 || hour < 5) {
    greeting = "Buonasera";
  }

  return (
    <div className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-md lg:flex-row lg:items-center lg:justify-between">

      <div>

        <h1 className="text-3xl font-bold text-[#0A5A34] md:text-4xl">
          {greeting}, Veronica 🌿
        </h1>

        <p className="mt-2 capitalize text-gray-500">
          {date}
        </p>

      </div>

      <Button href="/nuova-pratica">
        ➕ Nuova Prenotazione
      </Button>

    </div>
  );
}