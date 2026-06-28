import Link from "next/link";
import { supabase } from "../lib/supabase";
export default async function Home() {
  const { data, error } = await supabase
  .from("bookings")
  .select("*");

console.log(data);
  return (
    <main className="min-h-screen bg-green-50 p-10">

      <h1 className="text-5xl font-bold text-green-800">
        🏡 Podere Centoquattro Manager
      </h1>

      <p className="mt-3 text-xl text-gray-700">
        Il cuore operativo del Podere 🌿
      </p>

      <div className="grid grid-cols-3 gap-6 mt-12">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold">📅 Arrivi Oggi</h2>
          <p className="text-4xl mt-4">0</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold">🚗 Partenze Oggi</h2>
          <p className="text-4xl mt-4">0</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold">🔔 Attività</h2>
          <p className="mt-4">Nessuna attività</p>
        </div>

      </div>

      <div className="mt-12">
        <Link
        href="/nuova-pratica"
        className="bg-green-700 text-white px-8 py-4 rounded-xl text-xl hover:bg-green-800"
        >
          ➕ Nuova Pratica
        </Link>
      </div>

    </main>
  );
}

