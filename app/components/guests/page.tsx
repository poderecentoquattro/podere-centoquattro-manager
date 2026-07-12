import Link from "next/link";
import GuestList from "@/components/guests/GuestList";

export default function GuestsPage() {
  return (
    <div className="p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-[#0A5A34]">
            👤 Ospiti
          </h1>

          <p className="mt-2 text-gray-500">
            Gestisci l'anagrafica degli ospiti.
          </p>
        </div>

        <Link
          href="/guests/new"
          className="rounded-xl bg-[#0A5A34] px-5 py-3 font-semibold text-white transition hover:bg-[#084728]"
        >
          + Nuovo Ospite
        </Link>

      </div>

      <GuestList />

    </div>
  );
}